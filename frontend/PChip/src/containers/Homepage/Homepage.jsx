import React, { Component } from 'react';

import classes from './Homepage.module.css';
import ImagesDisplay from './ImageDisplay/ImagesDisplay';
import Description from './Description/Description';
import ContactMe from './ContactMe/ContactMe';
import DownArrow from './downarrow.png';
import Logo from './untitled.svg';
import Services from './Services/Services';

class Homepage extends Component {
    render() {
        return (
            <div style={{ marginTop: '-2rem' }}>
                <header className={classes.homepageHeader}>
                    <section class={classes.section}>
                        <h1
                            className={`${classes.title} ${classes.animatePopIn}`}
                        >
                            <img src={`${Logo}`} />
                        </h1>
                        <h3
                            className={`${classes.subtitle} ${classes.animatePopIn}`}
                        >
                            Revolutionary Computer Hardware
                        </h3>
                    </section>
                    <section>
                        <div className={classes.headerDownArrow}>
                            <img src={DownArrow} width='50' />
                        </div>
                        <p className={`${classes.arrowText}`}>Find out more</p>
                    </section>
                </header>
                <Description />
                <ImagesDisplay />
                <Services />
                <ContactMe />
            </div>
        );
    }
}

export default Homepage;
