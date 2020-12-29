import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: false,
};

let newPosts;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case actionTypes.FETCH_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.DELETE_POST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case actionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    case actionTypes.DELETE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.CREATE_POST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case actionTypes.CREATE_POST_SUCCESS:
      //Push new post to the front of the array
      newPosts = [...state.posts];
      newPosts.unshift(action.newPost);
      return {
        ...state,
        loading: false,
        posts: newPosts,
      };
    case actionTypes.CREATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.MODIFY_POST_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.MODIFY_POST_SUCCESS:
      newPosts = [...state.posts];
      newPosts = newPosts.map((post) => {
        //FIND BY ID AND REPLACE DATA
        if (post.id === action.editedPost.id) {
          post = action.editedPost;
        }
        return post;
      });
      return {
        posts: newPosts,
        loading: false,
      };
    case actionTypes.MODAL_CLOSE_ON_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
