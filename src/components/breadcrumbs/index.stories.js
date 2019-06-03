import React from 'react';
import {HashRouter} from 'react-router-dom';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Breadcrumbs from './index';


const mainProps = {
    path: [
        {
            id: 1,
            type: 1,
            code: 'catalog',
            name: 'catalog'
        },
        {
            id: 2,
            type: 1,
            code: 'map',
            name: 'Карта'
        }
    ]
};

storiesOf('Breadcrumbs', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 50,
            backgroundColor: '#07406a'
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <HashRouter hashType="noslash">
                <Breadcrumbs {...mainProps} />
            </HashRouter>
        )
    });
