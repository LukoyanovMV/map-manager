import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AuthForm from './index';

const placeholders = {
    login: 'User name',
    password: 'Password'
};

const mainProps = {
    placeholders: placeholders,
    onSubmit: action('submit'),
    headerText: 'Авторизация',
    errorMsg: 'Неверное имя пользователя или пароль!'
};


storiesOf('AuthForm', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 600,
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <AuthForm
                {...mainProps}
            />
        )
    });
