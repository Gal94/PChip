import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Slider from './Slider/Slider';
import { fetchMembers } from '../../../store/actions/members';
import classes from './ImagesDisplay.module.css';

class ImagesDisplay extends Component {
    async componentWillMount() {
        this.props.onLoadPage();
    }

    render() {
        return (
            <div className={classes.ImagesDisplay}>
                <h2 className={classes.Title}>The Team</h2>
                <div className={classes.ImagesDisplayContainer}>
                    <div className={classes.ContentContainer}>
                        <div className={classes.Carousel}>
                            <Slider members={this.props.members} />
                        </div>
                    </div>
                    <div className={classes.Description}>
                        <p className={classes.DescriptionText}>
                            Since 2015, PCHIP has provided cutting edge computer
                            hardware solutions while maintaining an affordable
                            price.
                        </p>
                        <p className={classes.DescriptionText}>
                            In the last 5 years, we have been actively
                            recruiting talented aspiring engineers who are truly
                            passionate about hardware.
                        </p>
                        <p className={classes.DescriptionText}>
                            We employ over 150 engineers from all across the
                            world and are still looking for new talent to join us in
                            our London headquarters.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        members: state.members.members,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPage: () => dispatch(fetchMembers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesDisplay);
