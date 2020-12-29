import * as actionTypes from "./actionTypes";

//Logic for all async dispatches

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_POSTS_START });
    try {
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/posts`,
        {
          method: "GET",
        }
      );
      if (response.status !== 200) {
        return dispatch({ type: actionTypes.FETCH_POSTS_FAILED });
      }
      response = await response.json();
      dispatch({
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: response.posts,
      });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_POSTS_FAILED });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_POST_START });
    try {
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //deleted successfully
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: actionTypes.DELETE_POST_SUCCESS, postId: postId });
      }
    } catch (error) {
      dispatch({ type: actionTypes.DELETE_POST_FAILED });
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_POST_START });
    try {
      //using formData because there's a file in the object
      const formData = new FormData();
      for (const [key, value] of Object.entries(post)) {
        formData.append(key, value);
      }
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/posts/`,
        {
          method: "post",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const responseData = await response.json();
        return dispatch({
          type: actionTypes.CREATE_POST_SUCCESS,
          newPost: responseData.post,
        });
      }
      dispatch({
        type: actionTypes.CREATE_POST_FAILED,
      });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_POST_FAILED });
    }
  };
};

export const modifyPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_POST_START });
    try {
      const formData = new FormData();
      //appends key & value pairs from the object into a form data type
      for (const [key, value] of Object.entries(post)) {
        formData.append(key, value);
      }
      let response = await fetch(
        `https://${process.env.REACT_APP_API_URL}/api/posts/${post.postId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const responseData = await response.json();
        return dispatch({
          type: actionTypes.MODIFY_POST_SUCCESS,
          editedPost: responseData.post,
        });
      }
      dispatch({ type: actionTypes.MODIFY_POST_FAILED });
    } catch (err) {
      dispatch({ type: actionTypes.MODIFY_POST_FAILED });
    }
  };
};
