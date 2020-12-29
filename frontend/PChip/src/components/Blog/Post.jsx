import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dateFormatter } from '../../utils/date-formatter';
import classes from './Post.module.css';
import Button from '../shared/Button/Button';
import Card from '../shared/Card/Card';

class Post extends Component {
    state = {
        clicked: false,
    };

    //expands/shrinks a blog post
    toggleClickedHandler = () => {
        this.setState((prevState) => {
            return { clicked: !prevState.clicked };
        });
    };

    render() {
        const dateToConvert = this.props.dateModified
            ? this.props.dateModified
            : this.props.dateCreated;

        const date = dateFormatter(dateToConvert);
        let content = this.props.content;

        let actionButtons = null;
        if (this.props.isAuth) {
            actionButtons = (
                <div className={classes.ActionButtons}>
                    <Button
                        iconButton
                        clicked={() => this.props.modifyHandler(this.props.id)}
                    >
                        <i className={`far fa-edit fa-lg ${classes.Edit}`}></i>
                    </Button>
                    <Button
                        iconButton
                        clicked={() => this.props.deleteHandler(this.props.id)}
                    >
                        <i
                            className={`fas fa-times fa-lg ${classes.Delete}`}
                        ></i>
                    </Button>
                </div>
            );
        }

        return (
            <Card additionalClasses='PostCard' cardImage='noImage'>
                <div className={classes.CardHeader}>
                    <div className={classes.Info}>
                        <h1 className={classes.Title}>{this.props.title}</h1>
                        <h4 className={classes.SubInfo}>
                            By: {this.props.creator.displayName}
                        </h4>
                        <h4 className={classes.SubInfo}>At {date}</h4>
                    </div>
                    {actionButtons}
                </div>
                <div
                    className={`${classes.ContentWrapper} ${
                        this.state.clicked ? classes.Full : classes.Half
                    }`}
                >
                    {this.state.clicked && <p
                        className={`${
                            this.state.clicked
                                ? classes.ContentExpand
                                : classes.ContentShrink
                        } ${classes.Paragraph}`}
                    >
                        {content}
                    </p>}
                </div> 
                <hr />
                <div
                    className={classes.More}
                    onClick={this.toggleClickedHandler}
                >
                    <i className={`fas fa-circle ${classes.Circle}`}></i>
                    <i className={`fas fa-circle ${classes.Circle}`}></i>
                    <i className={`fas fa-circle ${classes.Circle}`}></i>
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps)(Post);
