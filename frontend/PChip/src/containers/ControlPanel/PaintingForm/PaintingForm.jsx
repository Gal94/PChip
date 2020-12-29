import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./PaintingForm.module.css";
import { createMember } from "../../../store/actions/members";
import Input from "../../../components/shared/Input/Input";
import ImageUpload from "../../../components/shared/ImageUpload/ImageUpload";
import Button from "../../../components/shared/Button/Button";

class PaintingForm extends Component {
  state = {
    isValid: false,
    fields: {
      name: {
        value: "",
        label: "Name",
        inputType: "input",
      },
      position: {
        value: "",
        label: "Position",
        inputType: "input",
      },
      image: {
        value: "",
        label: "Picture",
      },
    },
  };

  onSumitHandler = (event) => {
    event.preventDefault();

    const member = {
      name: this.state.fields.name.value,
      image: this.state.fields.image.value,
      position: this.state.fields.position.value,
    };

    this.props.onCreateHandler(member);
    //close modal
    this.props.closeModal();
  };

  inputChangedHandler = (event, formField) => {
    //DEEP COPY
    const inputForm = { ...this.state.fields };
    const inputElementToChange = { ...inputForm[formField] };
    //saves input/File
    if (formField !== "image") {
      inputElementToChange.value = event.target.value;
    } else {
      inputElementToChange.value = event;
    }

    inputForm[formField] = inputElementToChange;

    //ALSO CHECK FOR VALIDITY
    this.setState({ fields: inputForm });
  };
  render() {
    let formFieldsArray = [];
    for (let key in this.state.fields) {
      //not the image field
      if (key !== "image")
        formFieldsArray.push({
          inputName: key,
          inputConfig: this.state.fields[key],
        });
    }

    let postForm = (
      <form onSubmit={this.onSumitHandler}>
        <div className={classes.Form}>
          {formFieldsArray.map((formInput) => {
            return (
              <Input
                key={formInput.inputName}
                value={formInput.inputConfig.value}
                type={formInput.inputConfig.inputType}
                label={formInput.inputConfig.label}
                onInputChange={(event) => {
                  this.inputChangedHandler(event, formInput.inputName);
                }}
              />
            );
          })}
          <div className={classes.ImageCenter}>
            <ImageUpload
              center
              onInput={(event) => this.inputChangedHandler(event, "image")}
            />
          </div>
          <div className={classes.Center}>
            <Button additionalClasses="Create" type="submit">
              SUBMIT
            </Button>
          </div>
        </div>
      </form>
    );
    return <div className={classes.FormCard}>{postForm}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateHandler: (member) => dispatch(createMember(member)),
  };
};

export default connect(null, mapDispatchToProps)(PaintingForm);
