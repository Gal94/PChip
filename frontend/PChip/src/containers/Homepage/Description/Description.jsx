import React from 'react';

import classes from './Description.module.css';

const Description = () => {
    return (
        <div className={classes.DescriptionContainer}>
            <div className={classes.TextContainer}>
                <h2 className={classes.DescriptionTitle}>
                    We revolutionize computer hardware by creating high-end
                    affordable products for gaming and all-around purposes
                </h2>
                <ul className={classes.perks}>
                    <li className={classes.perk}>
                        <h3 className={classes.perkTitle}>Affordable</h3>
                        <p className={classes.perkDescription}>
                            Our products are designed to offer high-end
                            performance at an inclusive price point. save with
                            us.
                        </p>
                    </li>
                    <li className={classes.perk}>
                        <h3 className={classes.perkTitle}>Quality</h3>
                        <p className={classes.perkDescription}>
                            We use the highest quality materials in the market.
                            Chosen to deliver the best performance with the
                            longest life span.
                        </p>
                    </li>
                    <li className={classes.perk}>
                        <h3 className={classes.perkTitle}>Compatible</h3>
                        <p className={classes.perkDescription}>
                            Designed to fit and get maximum performance from all
                            past, current and future sockets. There's no longer need to buy exclusive hardware.
                        </p>
                    </li>
                    <li className={classes.perk}>
                        <h3 className={classes.perkTitle}>Warranty</h3>
                        <p className={classes.perkDescription}>
                            We supply a 7 year warranty for all of our products.
                            If you encounter a problem contact our support and
                            leave it to us.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Description;
