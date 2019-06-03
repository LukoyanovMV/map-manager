import {SET_CONTAINERS, SET_MAP} from '../action-types';

export const initialState = {
    containers: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTAINERS: {
            return {...state, ...action.payload}
        }
        case SET_MAP: {
            return {...state, containers:[]}
        }
        // case SET_PATH: {
        //     return {...state, ...action.payload}
        // }
        default: {
            return state;
        }
    }
};