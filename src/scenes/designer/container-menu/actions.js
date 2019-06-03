import contMenu from './selector';
import {SHOW_EDIT_DIALOG} from 'services/action-types';

export const SHOW_CONT_MENU = 'SHOW_CONT_MENU';
export const HIDE_CONT_MENU = 'HIDE_CONT_MENU';

export const showMenu = (id, point) =>{
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_CONT_MENU,
            payload: {
                isOpen: true,
                containerId: id,
                point: point
            }
        })
    }
};

export const hideMenu = (id, point) => {
    return (dispatch, getState) => {
        dispatch({
            type: HIDE_CONT_MENU,
            payload: {
                isOpen: false,
                containerId: null,
                point: {}
            }
        })
    }
};

export const editContainer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_EDIT_DIALOG,
            payload: {
                editDialog: {
                    isOpen: true,
                    containerId: id,
                }
            }
        })
    }
};

