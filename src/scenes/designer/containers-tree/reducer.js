import {SET_NODE_STATES, SET_NODE_EXPANDED} from './actions';

export const initialState = {
    rootNodeId: null,
    states:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NODE_STATES: {
            return {...state, ...action.payload}
        }
        case SET_NODE_EXPANDED: {
            const newState = {...state};
            newState.states[action.payload.id].expanded = action.payload.expanded;
            return newState;
        }
        // case SET_PATH: {
        //     return {...state, ...action.payload}
        // }
        default: {
            return state;
        }
    }
};