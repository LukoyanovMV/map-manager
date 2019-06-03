import {SESSION_APPLY_TOKEN, SESSION_AUTH_ERROR, SESSION_SET_CONFIG} from '../action-types';

export const initialState = {
    token: false,
    authError: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SESSION_APPLY_TOKEN: {
            return {...state, ...action.payload}
        }
        case SESSION_AUTH_ERROR: {
            return {...state, ...action.payload}
        }
        case SESSION_SET_CONFIG: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        default: {
            return state;
        }
    }
};