import React, { Component } from 'react';

import classes from './Slider.module.css';

class Slider extends Component {
    state = {
        x: 0,
    };

    // Implementations of goLeft/goRight
    goLeft = () => {
        this.setState((prevState) => {
            // Check to see if at the start of the members array - if so go to the end
            if (this.state.x === 0) {
                return {
                    x: -100 * (this.props.members.length - 1),
                };
            } else {
                return {
                    x: prevState.x + 100,
                };
            }
        });
    };

    goRight = () => {
        this.setState((prevState) => {
            // Check to see if reached the end of the members array - if so return to the start
            if (this.state.x === -100 * (this.props.members.length - 1)) {
                return {
                    x: 0,
                };
            } else {
                return {
                    x: prevState.x - 100,
                };
            }
        });
    };
    render() {
        return (
            <div className={classes.Slider}>
                {this.props.members.map((member) => {
                    return (
                        <div
                            key={member.id}
                            className={classes.Slide}
                            style={{
                                transform: `translateX(${this.state.x}%)`,
                            }}
                        >
                            <img
                                className={`${classes.img}`}
                                src={`https://${process.env.REACT_APP_API_URL}/${member.image}`}
                                alt=''
                            />
                            <div className={classes.infoDiv}>
                                <p className={classes.info}>{member.name}</p>
                                <p
                                    className={`${classes.info} ${classes.positionInfo}`}
                                >
                                    {member.position}
                                </p>
                            </div>
                        </div>
                    );
                })}
                {/* Navigation buttons */}
                <button
                    className={`${classes.goLeft} ${classes.Btn}`}
                    onClick={this.goLeft}
                >
                    <i className='fas fa-chevron-left fa-2x'></i>
                </button>
                <button
                    className={`${classes.goRight} ${classes.Btn}`}
                    onClick={this.goRight}
                >
                    <i className='fas fa-chevron-right fa-2x'></i>
                </button>
            </div>
        );
    }
}

export default Slider;
