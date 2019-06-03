import {SHOW_CONT_MENU, HIDE_CONT_MENU} from './actions';
import {CONTAINER_MENU_APPLY} from 'services/action-types';

export const initialState = {
    isOpen: false,
    point: {
        left: 0,
        top: 0
    },
    actions: {
        map: [
            {
                label: 'Открыть карту',
                action: 'openMap'
            }
        ],
        folder: [],
        layer: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CONT_MENU:
        case HIDE_CONT_MENU:{
            return {...state, ...action.payload}
        }
        case CONTAINER_MENU_APPLY: {
            let newState = {...state};
            for(let key in action.payload) {
                newState.actions[key] = newState.actions[key].concat(action.payload[key]);
            }
            return newState;
        }
        default: {
            return state;
        }
    }
};