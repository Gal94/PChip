import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './ControlPanel.module.css';
import { CLOSE_ADMIN_MODAL } from '../../store/actions/actionTypes';
import { fetchMembers, deleteMember } from '../../store/actions/members';
import Spinner from '../../hoc/Spinner/Spinner';
import Modal from '../../components/shared/Modal/Modal';
import MessageBox from '../../components/shared/MessageBox/MessageBox';
import PaintingCard from './PaintingCard/PaintingCard';
import Button from '../../components/shared/Button/Button';
import PaintingForm from './PaintingForm/PaintingForm';

class ControlPanel extends Component {
    state = {
        selectedMemberId: '',
        displayFormModal: false,
        isLoggedIn: undefined,
    };

    // check if user has permissions to view the page
    async componentWillMount() {
        let response = await fetch(
            `https://${process.env.REACT_APP_API_URL}/api/poweruser/confirm`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        // If response is OK user is allowed to view the page
        if (response.status === 200) {
            return this.setState({
                ...this.state,
                isLoggedIn: true,
            });
        }
        this.setState({
            ...this.state,
            isLoggedIn: false,
        });
    }

    // Fetch members from the database
    async componentDidMount() {
        this.props.getMembersHandler();
    }

    // Gets clicked member id in order to show modal
    togglePostModalHandler = (memberId) => {
        this.setState({
            selectedMemberId: memberId,
        });
    };

    closeModalHandler = () => {
        this.setState({ selectedMemberId: '' });
    };

    toggleFormModal = () => {
        this.setState((prevState) => {
            return {
                displayFormModal: !prevState.displayFormModal,
            };
        });
    };
    render() {
        // Logic for the structure of the component
        let buttonDisabled = false;
        let pageContent = null;
        let errorBox;

        if (this.props.loading) {
            pageContent = <Spinner />;
        }
        // Managed to fetch members
        else if (this.props.members) {
            //check if there's an excess in the members
            if (!this.props.members.length + 1 >= 6) {
                buttonDisabled = true;
            }

            // Creating a card for each of the members
            const members = this.props.members.map((member) => {
                return (
                    <div key={member.id} className={classes.Card}>
                        <Modal
                            show={this.state.selectedMemberId === member.id}
                            modalClosed={this.closeModalHandler}
                        >
                            <React.Fragment>
                                <div style={{ padding: '4px' }}>
                                    <img
                                        className={classes.Image}
                                        src={`https://localhost:5000/${member.image}`}
                                        alt={member.title}
                                    />
                                    <h2
                                        style={{ marginTop: '12px' }}
                                        className={classes.PageTitle}
                                    >
                                        {member.title}
                                    </h2>
                                </div>
                                <div className={classes.ImageContainer}>
                                    <Button clicked={this.closeModalHandler}>
                                        CLOSE
                                    </Button>
                                </div>
                            </React.Fragment>
                        </Modal>
                        <PaintingCard
                            {...member}
                            modifyHandler={() =>
                                this.togglePostModalHandler(member.id)
                            }
                            deleteHandler={() =>
                                this.props.onDeleteMemberHandler(member.id)
                            }
                        />
                    </div>
                );
            });

            let imageCount = this.props.members.length;
            pageContent = (
                <React.Fragment>
                    <p className={classes.PageText}>
                        Current Images: {imageCount}
                    </p>
                    <p className={classes.PageText}>Max: 5 images</p>
                    <div className={classes.Paintings}>{members}</div>
                </React.Fragment>
            );
        }
        // There was an error
        else {
            errorBox = (
                <MessageBox>
                    Failed to load the members, please refresh to try again
                </MessageBox>
            );
        }

        // Failed to delete an image
        if (this.props.errorMessage) {
            errorBox = <MessageBox>{this.props.errorMessage}</MessageBox>;
        }

        // Redirects user to home page if not logged in
        let toRedirect = null;
        if (this.state.isLoggedIn === false) {
            toRedirect = <Redirect to='/' />;
        }

        return (
            <React.Fragment>
                <div className={classes.Page}>
                    {toRedirect}
                    <div className={classes.PageContainer}>
                        {/* Displays modal on fetch error */}
                        <Modal
                            show={this.props.errorModal}
                            modalClosed={this.props.onModalClick}
                        >
                            <div>
                                <h1>Failed to load the members.</h1>
                                <p>Please refresh the page and try again</p>
                            </div>
                        </Modal>
                        {errorBox}
                        <h2 className={classes.PageTitle}>
                            Homepage members Management
                        </h2>
                        {pageContent}
                        <div className={classes.Center}>
                            <Button
                                disabled={buttonDisabled}
                                clicked={this.toggleFormModal}
                            >
                                Add
                            </Button>
                        </div>
                        <Modal
                            show={this.state.displayFormModal}
                            modalClosed={this.toggleFormModal}
                        >
                            <PaintingForm closeModal={this.toggleFormModal} />
                        </Modal>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMembersHandler: () => dispatch(fetchMembers()),
        onDeleteMemberHandler: (memberId) => dispatch(deleteMember(memberId)),
        onModalClick: () => dispatch({ type: CLOSE_ADMIN_MODAL }),
    };
};

const mapStateToProps = (state) => {
    return {
        members: state.members.members,
        loading: state.members.loading,
        error: state.members.error,
        errorModal: state.members.showModal,
        errorMessage: state.members.errorMessage,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
