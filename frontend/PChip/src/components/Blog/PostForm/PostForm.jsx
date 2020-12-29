import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPost, modifyPost } from '../../../store/actions/blog';
import classes from './PostForm.module.css';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';

class PostForm extends Component {
    state = {
        isValid: false,
        fields: {
            title: {
                value: this.props.title || ``,
                label: `Position`,
                inputType: `input`,
            },
            content: {
                value: this.props.content || ``,
                label: `Job Description`,
                inputType: `textarea`,
            },
        },
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.modalClosed();
        //Converts all \n in order to identify them in the database
        let newContent = this.state.fields.content.value.replace(
            /\n/g,
            'BREAKLINE'
        );
        const post = {
            title: this.state.fields.title.value,
            content: newContent,
            creatorId: localStorage.getItem('userId'),
            postId: this.props.id,
        };

        //create a new post
        if (!this.props.editMode) {
            return this.props.onCreatePost(post);
        }
        this.props.onModifyPost(post);
        //reset the form back
        this.props.onModify();
    };

    inputChangedHandler = (event, formField) => {
        //DEEP COPY
        const inputForm = { ...this.state.fields };
        const inputElementToChange = { ...inputForm[formField] };
        //saves input/File
        inputElementToChange.value = event.target.value;

        inputForm[formField] = inputElementToChange;

        //ALSO CHECK FOR VALIDITY
        this.setState({ fields: inputForm });
    };

    render() {
        let formFieldsArray = [];
        for (let key in this.state.fields) {
            //not the image field
            formFieldsArray.push({
                inputName: key,
                inputConfig: this.state.fields[key],
            });
        }
        let postForm = (
            <form onSubmit={this.onSubmitHandler}>
                <div className={classes.FormContainer}>
                    {formFieldsArray.map((formInput) => {
                        return (
                            <Input
                                key={formInput.inputName}
                                value={formInput.inputConfig.value}
                                type={formInput.inputConfig.inputType}
                                label={formInput.inputConfig.label}
                                onInputChange={(event) =>
                                    this.inputChangedHandler(
                                        event,
                                        formInput.inputName
                                    )
                                }
                            />
                        );
                    })}
                    <div className={classes.Center}>
                        <Button
                            additionalClasses={
                                this.props.editMode ? `Edit` : `Create`
                            }
                            type='submit'
                        >
                            {this.props.editMode ? `UPDATE` : `POST`}
                        </Button>
                        {this.props.editMode ? (
                            <Button
                                additionalClasses={`Cancel`}
                                to='/careers'
                                exact='/careers'
                                cancelOp={this.props.onModify}
                            >
                                CANCEL
                            </Button>
                        ) : null}
                    </div>
                </div>
            </form>
        );

        let title = 'Create Post';
        if (this.props.editMode) {
            title = 'Modify Post';
        }
        return (
            <div className={classes.FormCard}>
                <h1 className={classes.Title}>{title}</h1>
                {postForm}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreatePost: (newPost) => dispatch(createPost(newPost)),
        onModifyPost: (post) => dispatch(modifyPost(post)),
    };
};

export default connect(null, mapDispatchToProps)(PostForm);
