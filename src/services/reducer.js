import { combineReducers } from 'redux';
import sessionReducer from './session/reducer';
import configReducer from './config/reducer';
import appReducer from './app/reducer';
import dataReducer from './data/reducer';

export default {
    session: sessionReducer,
    config: configReducer,
    app: appReducer,
    data: dataReducer
};