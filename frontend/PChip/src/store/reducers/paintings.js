import * as actionTypes from "../actions/actionTypes";

const initialState = {
  members: [],
  loading: false,
  error: false,
  errorMessage: null,
  showModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_ADMIN_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case actionTypes.FETCH_MEMBERS_START:
      return {
        ...state,
        loading: true,
        showModal: false,
        errorMessage: null,
      };
    case actionTypes.FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        members: action.members,
      };
    case actionTypes.FETCH_MEMBERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        showModal: true,
      };
    case actionTypes.DELETE_MEMBERS_START:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: null,
      };
    case actionTypes.DELETE_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.filter(
          (member) => member.id !== action.memberId
        ),
      };
    case actionTypes.DELETE_MEMBERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: "Failed to delete the member. Please try again.",
      };
    case actionTypes.POST_MEMBERS_START:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case actionTypes.POST_MEMBERS_SUCCESS:
      let newMembers = [...state.members];
      newMembers.unshift(action.newMember);
      return {
        ...state,
        loading: false,
        members: newMembers,
      };
    case actionTypes.POST_MEMBERS_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: "Failed to add the members. Please try again.",
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
