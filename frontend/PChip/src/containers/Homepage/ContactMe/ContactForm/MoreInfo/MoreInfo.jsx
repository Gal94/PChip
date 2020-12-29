import React from 'react';

import './MoreInfo.css';

class MoreInfo extends React.Component {
    render() {
        return (
            <div
                className={`more-info show-on-scroll ${
                    this.props.isVisible ? 'is-visible' : null
                }`}
            >
                <div className='text'>
                    <h3>Fun Fact</h3>
                    <p>Hey There :]</p>
                    <p>
                        If you'd like to see the source code of this project
                        please{' '}
                        <a
                            href='https://github.com/Gal94/PChip'
                            className='more-info__link'
                        >
                            click here
                        </a>{' '}
                        .
                    </p>
                    <p>
                        Created by{' '}
                        <a
                            href='https://www.linkedin.com/in/galy183/'
                            className='more-info__link'
                        >
                            Gal
                        </a>
                        .
                    </p>
                </div>
            </div>
        );
    }
}

export default MoreInfo;
