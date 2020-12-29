import React, { Component } from "react";

import Button from "../Button/Button";
import classes from "./ImageUpload.module.css";

class ImageUpload extends Component {
  state = {
    file: null,
    previewUrl: null,
    isValid: undefined,
  };

  //Declare a ref
  inputRef = null;

  componentWillMount() {
    if (this.props.imagePath) {
      return this.setState({
        previewUrl: this.props.imagePath,
      });
    }
  }

  pickImageHandler = () => {
    this.inputRef.click();
  };

  pickedHandler = (event) => {
    let pickedFile = undefined;
    let isValid = false;
    //vanillaJS way to get files from a file picker
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      isValid = true;
    }
    this.props.onInput(pickedFile);
    this.setState({
      file: pickedFile,
      isValid: isValid,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //Check if there's a file and another condition to check if the file changed from the previous saved one
    if (!this.state.file || prevState.file === this.state.file) {
      return;
    }
    const fileReader = new FileReader();
    //onload executes when readAsDataUrl finishes parsing the file
    fileReader.onload = () => {
      this.setState({ previewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(this.state.file);
  }

  render() {
    return (
      <div>
        <input
          type="file"
          id={this.props.id}
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg,.gif"
          ref={(inputRef) => (this.inputRef = inputRef)}
          onChange={this.pickedHandler}
        />
        {this.state.previewUrl && (
          <div className={`imageUpload ${this.props.center && classes.Center}`}>
            <div className={`${classes.imageUploadPreview}`}>
              {this.state.previewUrl && (
                <img src={this.state.previewUrl} alt="preview" />
              )}
            </div>
          </div>
        )}
        <div className={classes.Center}>
          <Button type="button" clicked={this.pickImageHandler}>
            PICK IMAGE
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
