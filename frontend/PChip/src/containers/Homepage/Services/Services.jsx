import React from 'react';

import classes from './Services.module.css';

const Services = (props) => (
    <div className={classes.services}>
        <div className={classes.servicesContainer}>
            <h3 className={classes.servicesPreTitle}>Explore #PCHIP</h3>
            <h2 className={classes.servicesTitle}>Our Services</h2>
            <p className={classes.servicesText}>
                Here are some of the things we currently offer
            </p>
            <ul className={classes.servicesList}>
                <li className={`${classes.service}`}>
                    <div className={classes.itemContainer}>
                        <i
                            className={`fas fa-desktop fa-2x ${classes.icon}`}
                        ></i>
                        <h2 className={classes.serviceTitle}>
                            High-End Desktops
                        </h2>
                        <p className={classes.serviceText}>
                            Manufacturing and assembling top quality, affordable
                            and high end hardware for desktops.
                        </p>
                    </div>
                </li>
                <li className={`${classes.service}`}>
                    <div className={classes.itemContainer}>
                        <i
                            className={`fas fa-laptop fa-2x ${classes.icon}`}
                        ></i>
                        <h2 className={classes.serviceTitle}>
                            All-Purpose Laptops
                        </h2>
                        <p className={classes.serviceText}>
                            Whether you're looking to custom build your laptop
                            or buy a pre-made one, we got you covered.
                        </p>
                    </div>
                </li>
                <li className={`${classes.service}`}>
                    <div className={classes.itemContainer}>
                        <i
                            className={`fas fa-globe-europe fa-2x ${classes.icon}`}
                        ></i>
                        <h2 className={classes.serviceTitle}>
                            Worldwide Support
                        </h2>
                        <p className={classes.serviceText}>
                            Even though we are located right in the heart of
                            England. We strive to provide fast and efficient
                            support to all of our customers worldwide.
                        </p>
                    </div>
                </li>
                <li className={`${classes.service}`}>
                    <div className={classes.itemContainer}>
                        <i
                            className={`fas fa-share-alt fa-2x ${classes.icon}`}
                        ></i>
                        <h2 className={classes.serviceTitle}>Social Media</h2>
                        <p className={classes.serviceText}>
                            Our agents are available on various social media
                            networks including: Facebook, LinkedIn, Instagram
                            @PCHIP
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

export default Services;
