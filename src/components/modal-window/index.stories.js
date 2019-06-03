import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import ModalWindow from './index';


const mainProps = {
    onClose: action('close'),
    isOpen: true,
    headerContent: 'Window header',
    width: 480,
    height: 320
};

storiesOf('ModalWindow', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 500
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <ModalWindow {...mainProps}>
                This is my window
            </ModalWindow>
        )
    });
