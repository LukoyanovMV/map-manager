import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers } from 'redux';
import {HashRouter} from 'react-router-dom';
import {createStore} from './store';

import {setUrls} from './services/config/actions';

import ModLoader from './services/mod-loader';

//reducers
import servicesReduser from './services/reducer';
import scenesReduser from './scenes/reducer';

// Scenes
import Auth from './scenes/auth/index';
import ScenesController from './scenes';

// Styles
import './style.less'

class ModApp {
    constructor(props) {
        this.modLoader = new ModLoader();
        this.modules = {};
        this.moduleReducers = {};

        window.__connectModule = this.connectModule = this.connectModule.bind(this);
    }

    connectModule(modDefinition) {
        const defs = Array.isArray(modDefinition)
            ? modDefinition
            : [modDefinition];

        defs.forEach(mod => {
            this.modules[mod.name] = mod.module;
            this.moduleReducers[mod.name] = mod.reducer;
            if (mod.route) {
                this.routes.push(mod.route);
            }
        });
    }

    loadModuleCss(modFolder)  {
        const scripts = document.getElementsByTagName('script');

        return new Promise((resolve, reject) => {
            const css = document.createElement("link");
            let cssUrl;

            for (let i = 0; i < scripts.length; i++) {
                let src = scripts[i].src;
                if (src && ~src.indexOf(modFolder)) {
                    cssUrl = src.replace('index.js', 'style.css');
                }
            }

            if (!cssUrl) {
                reject();
                return;
            }

            css.setAttribute("rel", "stylesheet");
            css.setAttribute("type", "text/css");

            css.onload = css.onreadystatechange = function() {
                if (!this.readyState || this.readyState === "complete") {
                    resolve();
                }
            };

            css.onerror = css.onabort = () => {
                reject();
            };

            css.setAttribute("href", cssUrl);
            document.getElementsByTagName("head")[0].appendChild(css);
        });
    }

    getComponent(pathStr) {
        const path = pathStr.split('.');
        const moduleName = path[0];
        const componentName = path[1];

        if (!this.modules[moduleName]) {
            return null;
        }

        if (!componentName) {
            return Object.keys(this.modules[moduleName].components).length
                ? this.modules[moduleName].components
                : null
        }

        return this.modules[moduleName].components[componentName] || null;
    }

    init() {
        return fetch('/app_config.json')
            .then(response => {
                return response.json();
            })
            .then(appConfig => {
                this.urls = {
                    baseUrl: appConfig.baseUrl,
                    apiUrl: appConfig.apiUrl
                };
                const modUrls = appConfig.modules.map(mod => {
                    return mod.url;
                });
                return this.modLoader.load(modUrls);
            })
    }

    start() {
        const combinedReducers = combineReducers({
            ...servicesReduser,
            ...scenesReduser,
            ...this.moduleReducers
        });

        this.store = createStore(combinedReducers);

        this.store.dispatch(setUrls(this.urls));

        for (let modName in this.modules) {
            let module = this.modules[modName];
            if (typeof module.init === 'function') {
                module.init(this.store.getState(), this.store.dispatch)
            }
        }

        ReactDOM.render(
            <Provider store={this.store}>
                <HashRouter hashType="noslash">
                    <Auth>
                        <ScenesController />
                    </Auth>
                </HashRouter>
            </Provider>,
            document.getElementById('app_root')
        );
    }
}

const modApp = new ModApp();

window.onload = function(){
    modApp.init().then(() => {
        modApp.start();
    });
};

export  default modApp;
