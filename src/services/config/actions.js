import {loadConfigUrl} from '../urls';

export const SET_URLS = 'SET_URLS';
export const SET_CONFIG = 'SET_CONFIG';

export const setUrls = (urls) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_URLS,
            payload: {
                baseUrl: urls.baseUrl,
                apiUrl: urls.apiUrl
            }
        });
    }
};

export const loadConfig = () => {
    return (dispatch, getState) => {
        fetch(loadConfigUrl(), {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                return response.json()
            })
            .then((config) => {
                config.configLoaded = true;
                dispatch({
                    type: SET_CONFIG,
                    payload:config
                })
            })
    }

};
