import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import classes from './ContactForm.module.css';
import Modal from '../../../../components/shared/Modal/Modal';
import MoreInfo from './MoreInfo/MoreInfo';

const INITIAL_STATE = {
    email: {
        value: '',
        label: 'Email Address (required)',
        inputType: 'email',
        requirement: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g,
    },
    subject: {
        value: '',
        label: 'Subject (required)',
        inputType: 'input',
    },
    message: {
        value: '',
        label: 'Message (required)',
        textarea: true,
    },
    displayModal: false,
    isVisible: false,
};

class ContactForm extends Component {
    state = {
        ...INITIAL_STATE,
    };

    onVisibileHandler = (isVisible) => {
        if (isVisible === true) {
            return this.setState({
                isVisible: true,
            });
        } else return this.setState({ isVisible: false });
    };

    // Sends a post request to the backend
    onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = {
            sender: this.state.email.value,
            title: this.state.subject.value,
            messageBody: this.state.message.value,
        };

        const response = await fetch(
            `https://${process.env.REACT_APP_API_URL}/api/contactme/`,
            {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // prompt modal if unsuccessful else reset fields
        if (response.status !== 200) {
            this.setState({
                displayModal: true,
            });
        } else {
            this.setState({
                ...INITIAL_STATE,
            });
        }
    };

    //Closes the Modal
    closeModalHandler = () => {
        return this.setState({ displayModal: false });
    };

    // Validation + Input handler
    onInputChangedHandler = (event) => {
        // Destructs the relevant field
        const inputElementToChange = { ...this.state[event.target.name] };
        // Overwrites it
        inputElementToChange.value = event.target.value;

        // Saves
        this.setState({ [event.target.name]: inputElementToChange });
    };

    render() {
        let formTypeElements = [];
        // Ignore the modal and isVisible elements
        for (let key in this.state) {
            if (key !== 'displayModal' && key !== 'isVisible') {
                formTypeElements.push({
                    keyName: key,
                    inputConfig: this.state[key],
                });
            }
        }
        let postForm = (
            <form onSubmit={this.onSubmitHandler}>
                <div className={classes.FormContainer}>
                    {formTypeElements.map((formInput) => {
                        return (
                            <div
                                key={formInput.keyName}
                                className={classes.InputContainer}
                            >
                                <label className={classes.Label}>
                                    {formInput.inputConfig.label}
                                </label>
                                {!formInput.inputConfig.textarea ? (
                                    <input
                                        className={classes.Input}
                                        name={formInput.keyName}
                                        value={formInput.inputConfig.value}
                                        type={formInput.inputConfig.type}
                                        onChange={(event) =>
                                            this.onInputChangedHandler(event)
                                        }
                                    />
                                ) : null}
                                {/* Handles the textarea input */}
                                {formInput.inputConfig.textarea && (
                                    <textarea
                                        rows='6'
                                        className={classes.TextArea}
                                        name={formInput.keyName}
                                        onChange={(event) =>
                                            this.onInputChangedHandler(event)
                                        }
                                    ></textarea>
                                )}
                            </div>
                        );
                    })}
                    <div className={classes.ButtonContainer}>
                        <button type='submit' className={classes.Button}>
                            Contact Us!
                        </button>
                    </div>
                </div>
            </form>
        );
        return (
            <VisibilitySensor
                partialVisibility
                resizeCheck
                onChange={this.onVisibileHandler}
            >
                <div className={classes.container}>
                    <Modal
                        show={this.state.displayModal}
                        modalClosed={this.closeModalHandler}
                    >
                        <div>
                            <p style={{ color: 'black' }}>
                                Failed to send the email. Please make sure all
                                of the fields are filled correctly.
                            </p>
                        </div>
                    </Modal>
                    {postForm}
                    <MoreInfo isVisible={this.state.isVisible} />
                </div>
            </VisibilitySensor>
        );
    }
}

export default ContactForm;
