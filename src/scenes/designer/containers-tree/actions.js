import tree from './selector';
import {SHOW_CONTAINER_MENU} from 'services/action-types';

export const SET_NODE_STATES = 'SET_NODES_STATES';
export const SET_NODE_EXPANDED = 'SET_NODE_EXPANDED';

export const updateNodeStates = (mapId, nodes) =>{
    const defaultNodeState = {
        checked: false,
        expanded: false,
        hidden: false,
        disabled: false
    };

    return (dispatch, getState) => {
        const states = {};
        getState().data.containers.forEach(cont => {
            states[cont.id] = {
                ...defaultNodeState
            }
        });

        dispatch({
            type: SET_NODE_STATES,
            payload: {
                states: states,
                rootNodeId: mapId
            }
        })
    }
};

export const toggleExpanded = (id) => {
    return (dispatch, getState) => {
        let expanded = tree().states[id].expanded;

        dispatch({
            type: SET_NODE_EXPANDED,
            payload: {
                id: id,
                expanded: !expanded
            }
        })
    }
};
