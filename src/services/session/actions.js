// Actions types
import {SESSION_APPLY_TOKEN, SESSION_AUTH_ERROR} from '../action-types';

const EMPTY_FIELDS_MSG = 'Одно из полей не заполнено';
const AUTH_ERROR_MSG = 'Неверное имя пользователя или пароль';


export const authorize = (data, from) => {
    return (dispatch, getState) => {
        if (data.login.trim() !== '' && data.password.trim() !== '') {

            const loginUrl = getState().config.baseUrl + 'api/2.5/oms_dev/login/';
            const form = new FormData();

            form.set('user', data.login);
            form.set('pass', data.password);

            fetch(loginUrl, {
                method: 'POST',
                body: form,
                credentials: 'include',
                mode: 'cors'
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    dispatch({
                        type: SESSION_APPLY_TOKEN,
                        payload: {
                            token: json.token
                        }
                    });

                    window.location.hash = from.pathname;
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: SESSION_AUTH_ERROR,
                        payload: {
                            authError: AUTH_ERROR_MSG
                        }
                    });
                });
        } else {
            dispatch({
                type: SESSION_AUTH_ERROR,
                payload: {
                    authError: EMPTY_FIELDS_MSG
                }
            });
        }
    }
};