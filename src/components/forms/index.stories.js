import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {TextInput} from './index';


// const mainProps = {
//     onClose: action('close'),
//     isOpen: true,
//     headerContent: 'Window header',
//     width: 480,
//     height: 320
// };

storiesOf('Forms', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 500
        }} className="forms">
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
            {story()}
        </div>
    ))
    .addWithJSX('Input text', () => {
        return (
            <div>
                <TextInput placeholder="Text input"/>
                <br />
                <TextInput className="input-sm" placeholder="Text input"/>
            </div>
        )
    });
