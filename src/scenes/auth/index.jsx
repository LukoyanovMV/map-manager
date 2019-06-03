import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

import AuthForm from 'components/auth-form';
import {authorize} from 'services/session/actions';
import session from 'services/session/selector';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.from = null;
        this.checkAuth = this.checkAuth.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        this.props.authorize(data, this.from);
    }

    checkAuth(props) {
        const pathname = this.props.location.pathname;
        const placeholders = {
            login: 'Имя пользователя',
            password: 'Пароль'
        };

        if (!this.props.isAuthorized) {
            if (pathname !== '/login') {
                return (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: this.props.location }
                    }}/>
                )
            } else {
                return (
                    <Route exact path="/login" render={() => (
                        <AuthForm
                            placeholders={placeholders}
                            headerText="Авторизация"
                            onSubmit={this.onSubmit}
                            errorMsg={this.props.errorMsg}
                        />
                    )}/>
                )
            }
        } else {
            return pathname === '/login'
                ? <Redirect to={props.from.pathname} />
                : <div className="app-container">{this.props.children}</div>

        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        this.from = from;
        return <this.checkAuth from={from} />
    }

}

const mapStateToProps = function(state) {
    return {
        isAuthorized: !!session().token,
        errorMsg: session().authError
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        authorize:(data, from) => {
            dispatch(authorize(data, from))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
