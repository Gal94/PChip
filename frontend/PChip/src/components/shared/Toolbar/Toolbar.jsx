import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from './untitled.svg';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>
                <img src={`${Logo}`} alt='' />
            </div>
            <nav className={classes.Nav}>
                <NavigationItems />
            </nav>
        </header>
    );
};
export default Toolbar;
