import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, deletePost } from '../../store/actions/blog';
import classes from './Blog.module.css';
import Post from '../../components/Blog/Post';
import Spinner from '../../hoc/Spinner/Spinner';
import PostForm from '../../components/Blog/PostForm/PostForm';
import Modal from '../../components/shared/Modal/Modal';
import Button from '../../components/shared/Button/Button';
import { MODAL_CLOSE_ON_ERROR } from '../../store/actions/actionTypes';

class Blog extends Component {
    state = {
        postModified: '',
        createMode: false,
        editMode: false,
    };

    async componentDidMount() {
        this.props.onFetchPosts();
    }

    postDeleteHandler = async (postId) => {
        this.props.onDeletePost(postId);
    };

    postModifyToggle = (postId) => {
        this.setState({ postModified: postId });
    };

    postModifiedReset = () => {
        this.setState({ postModified: '' });
    };

    createModeHandler = () => {
        this.setState((prevState) => {
            return { createMode: !prevState.createMode };
        });
    };

    modalCloseHandler = () => {
        this.setState({ createMode: false });
    };

    render() {
        let blog = <Spinner />;

        if (this.props.loading) {
            blog = <Spinner />;
        } else if (this.props.posts) {
            blog = (
                <React.Fragment>
                    {this.props.posts.map((post) => {
                        //re-applies \n to posts content
                        post.content = post.content.replace(/BREAKLINE/g, '\n');
                        return (
                            <React.Fragment key={post.id}>
                                <Modal
                                    show={this.state.postModified === post.id}
                                    modalClosed={() => {
                                        this.setState({ postModified: '' });
                                    }}
                                >
                                    <PostForm
                                        key={post.id}
                                        {...post}
                                        editMode
                                        onModify={this.postModifiedReset}
                                    />
                                </Modal>
                                <Post
                                    key={post.id}
                                    {...post}
                                    modifyHandler={(postId) =>
                                        this.postModifyToggle(postId)
                                    }
                                    deleteHandler={(postId) =>
                                        this.postDeleteHandler(postId)
                                    }
                                />
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            );
        }

        return (
            <div className={classes.BlogContainer}>
                <div className={classes.Blog}>
                    {!this.props.error && (
                        <h1 className={classes.Title}>Jobs & Openings</h1>
                    )}
                    <div className={classes.Header}>
                        {this.props.isAuth && (
                            <div className={classes.btnDiv}>
                                <Button
                                    additionalClasses='PostBtn'
                                    clicked={this.createModeHandler}
                                >
                                    New Post
                                </Button>
                            </div>
                        )}
                    </div>
                    <Modal
                        show={this.props.error}
                        modalClosed={this.props.onModalClick}
                    >
                        <div>
                            <h1>Failed to load page.</h1>
                            <p>Please refresh the page and try again</p>
                        </div>
                    </Modal>
                    <Modal
                        show={this.state.createMode}
                        modalClosed={this.modalCloseHandler}
                    >
                        <PostForm />
                    </Modal>
                    {blog}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.blog.posts,
        error: state.blog.error,
        loading: state.blog.loading,
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPosts: () => dispatch(fetchPosts()),
        onDeletePost: (postId) => dispatch(deletePost(postId)),
        onModalClick: () => dispatch({ type: MODAL_CLOSE_ON_ERROR }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
