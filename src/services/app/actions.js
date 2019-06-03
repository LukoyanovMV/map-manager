import {SET_MAP, SET_CONTAINERS} from '../action-types';
import {loadMapUrl, loadMapAddressUrl} from '../urls';
import {loadContainers} from '../data/actions';

export function loadMap(mapCode) {
    return (dispatch, getState) => {
        let mapModel;

        return fetch(loadMapUrl(mapCode), {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then((mapModelData) => {
                mapModel = mapModelData;
                return loadMapAddress(mapCode);
            })
            .then((address) => {
                dispatch({
                    type: SET_MAP,
                    payload: {
                        mapModel: mapModel,
                        mapAddress: address
                    }
                });
            })
            .then(()=> {
                return dispatch(loadContainers(mapModel.id));
            })
    };
}

export function loadMapAddress(mapCode) {
    return fetch(loadMapAddressUrl(mapCode), {
        method: 'GET',
        credentials: 'include'
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            return response.result
        })
}

export const enterMap = (code) => {

};


