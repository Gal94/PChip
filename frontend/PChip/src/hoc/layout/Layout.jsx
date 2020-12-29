import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/shared/Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showMobileMenu: false,
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
