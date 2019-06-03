import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const KEY_ENTER = 13;

export default class AuthForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            login: 'orbis',
            password: 'docker'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleChange(event) {
        const updater = {};
        updater[event.target.name] = event.target.value;
        this.setState({
            ...this.state,
            ...updater
        });
    }

    handleSubmit() {
        this.props.onSubmit(this.state);
    }

    handleKeyUp(e) {
        if (e.keyCode == KEY_ENTER) {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        const {
            placeholders={},
            style={},
            className="",
            headerText=""
        } = this.props;

        const classes = className.split(' ');
        classes.push('auth-form');

        return (
            <div className={classes.join(' ')} tabIndex="-1" onKeyUp={this.handleKeyUp} style={style}>
                <h3 className="auth-form-title">
                    {headerText}
                </h3>

                <input
                    type="text"
                    name="login"
                    placeholder={placeholders.login}
                    value={this.state.login}
                    onChange={this.handleChange}/>

                <input
                    type="password"
                    name="password"
                    placeholder={placeholders.password}
                    value={this.state.password}
                    onChange={this.handleChange}/>

                <button className="auth-form-submit" onClick={this.handleSubmit}>Войти</button>
                <div className="auth-form-error">{this.props.errorMsg}</div>
            </div>
        )
    }
}
