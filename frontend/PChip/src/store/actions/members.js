import * as actionTypes from './actionTypes';

export const fetchMembers = () => {
    return async (dispatch) => {
        // Starting the fetch procedure
        dispatch({ type: actionTypes.FETCH_MEMBERS_START });

        // Fetch the paintings
        try {
            const response = await fetch(
                `https://${process.env.REACT_APP_API_URL}/api/members`,
                {
                    method: 'GET',
                }
            );
            if (response.status === 200) {
                const responseData = await response.json();
                return dispatch({
                    type: actionTypes.FETCH_MEMBERS_SUCCESS,
                    members: responseData.companyMembers,
                });
            }

            // Failed to fetch data, will be handled in the catch block
            throw new Error(response.statusText);
        } catch (err) {
            return dispatch({
                type: actionTypes.FETCH_MEMBERS_FAILED,
            });
        }
    };
};

export const deleteMember = (memberId) => {
    return async (dispatch) => {
        // Starting to delete
        dispatch({ type: actionTypes.DELETE_MEMBERS_START });

        try {
            let response = await fetch(
                `https://${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                return dispatch({
                    type: actionTypes.DELETE_MEMBERS_SUCCESS,
                    memberId: memberId,
                });
            }
            throw new Error('Failed to delete');
        } catch (err) {
            // Failed to delete a member
            dispatch({ type: actionTypes.DELETE_MEMBERS_FAILED });
        }
    };
};

export const createMember = (member) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.POST_MEMBERS_START });

        // fetch POST
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(member)) {
                formData.append(key, value);
            }

            let response = await fetch(
                `https://${process.env.REACT_APP_API_URL}/api/members`,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

            if (response.status === 201) {
                const responseData = await response.json();
                return dispatch({
                    type: actionTypes.POST_MEMBERS_SUCCESS,
                    newMember: responseData.member,
                });
            }

            // If code reached here - there was an error
            throw new Error('Failed to add a member');
        } catch (err) {
            return dispatch({
                type: actionTypes.POST_MEMBERS_FAILED,
            });
        }
    };
};
