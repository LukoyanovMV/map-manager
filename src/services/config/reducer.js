import {SET_URLS, SET_CONFIG} from './actions';

export const initialState = {
    baseUrl: "",
    apiUrl: "",
    configLoaded: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_URLS: {
            return {...state, ...action.payload}
        }
        case SET_CONFIG: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
};