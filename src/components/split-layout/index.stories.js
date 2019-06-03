import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SplitLayout from './index';


const mainProps = {
    vertical: true,
    splitPoint: 100,
    resizable: true,
    first: {
        minSize: 50,
        // maxSize: 300
    },
    second: {
        minSize: 50
    },
    onResize: action('resize'),
};


storiesOf('SplitLayout', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 400,
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <SplitLayout {...mainProps}>
                <div>Pane1</div>
                <div>Pane2</div>
            </SplitLayout>
        )
    });
