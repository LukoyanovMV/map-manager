import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import  DesignerScene from './designer';
import  PublicationScene from './publication';

import {loadConfig} from 'services/config/actions';
import {setPath} from 'services/app/actions';

class ScenesController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationPath: null
        }
    }

    componentWillMount() {
        if (!this.props.configIsLoaded) {
            this.props.loadConfig()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                locationPath: nextProps.location
            });
        }
    }

    render() {
        return this.props.configIsLoaded
            ? (
                <Switch>
                    <Route path="/publication/:map" render={(r) => {
                        return (
                            <PublicationScene
                                routeMapCode={r.match.params.map  ? r.match.params.map  : 'catalog'}
                            />
                        )
                    }}/>
                    <Route path="/:map?/:action?/:id?" render={(r) => {
                        return (
                            <DesignerScene
                                routeMapCode={r.match.params.map ? r.match.params.map : 'catalog'}
                            />
                        )
                    }}/>
                </Switch>
            )
            : null;
    }
}

const mapStateToProps = function(state) {
    return {
        configIsLoaded: state.config.configLoaded
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        loadConfig: () => {
            dispatch(loadConfig())
        },
        setLocation: (path) => {
            dispatch(setPath(path));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScenesController));
