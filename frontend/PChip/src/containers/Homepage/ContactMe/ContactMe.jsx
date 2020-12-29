import React, { Component } from 'react';

import classes from './ContactMe.module.css';
import ContactForm from './ContactForm/ContactForm';

class ContactMe extends Component {
  render() {
    return (
      <div className={classes.ContactMeContainer}>
        <div className={classes.FormContainer}>
          <div>
            <h2 className={classes.Title}>We would Love To Hear From You</h2>
            <p className={classes.Text}>
              Whether you have a question or a business inquiry, please fill out
              this form and we will get in touch with you shortly!
            </p>
          </div>
        </div>
        <div className={classes.Form}>
          <ContactForm />
        </div>
      </div>
    );
  }
}

export default ContactMe;
