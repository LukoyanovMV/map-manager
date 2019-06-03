import {SET_MAP, SET_ADDRESS, SET_PATH} from '../action-types';

export const initialState = {
    mapCode: null,
    mapModel: {},
    routePath: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP: {
            return {...state, ...action.payload}
        }
        case SET_ADDRESS: {
            return {...state, ...action.payload}
        }
        case SET_PATH: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
};