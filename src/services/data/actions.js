import {loadContainersUrl} from '../urls';
import {SET_CONTAINERS} from '../action-types';

export function loadContainers(mapId) {
    return (dispatch, getState) => {
        return fetch(loadContainersUrl(mapId), {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then((containers) => {
                dispatch({
                    type: SET_CONTAINERS,
                    payload: {
                        containers: containers
                    }
                });
            })
    };
}
