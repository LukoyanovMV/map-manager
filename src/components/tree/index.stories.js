import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import TreeView from './index';


const mainProps = {
    nodes: [
        {
            id: 2,
            label: 'Карта',
            icon: 'mtv-icon-map',
            parent: 1,
            checked: false,
            expanded: false,
            hidden: false,
            disabled: false
        },
        {
            id: 6,
            label: 'Группа',
            icon: 'mtv-icon-folder',
            parent: 1,
            checked: false,
            expanded: false,
            hidden: false,
            disabled: false
        },
        {
            id: 3,
            label: 'Scripts',
            icon: 'mtv-icon-map',
            parent: 6,
            checked: false,
            expanded: false,
            hidden: false,
            disabled: false
        },
        {
            id: 4,
            label: 'Mos_parking',
            icon: 'mtv-icon-map',
            parent: 6,
            checked: false,
            expanded: false,
            hidden: false,
            disabled: false
        },
        {
            id: 5,
            label: 'Кадастр',
            icon: 'mtv-icon-map',
            parent: 1,
            checked: false,
            expanded: false,
            hidden: false,
            disabled: false
        }
    ],
    rootNode: {
        id: 1
    },
    config: {
        showIcons: true,
        showCheckboxes: true
    },
    onExpanderClick: action('ExpanderClick'),
    onDoubleClick: action('onDoubleClick')
};

storiesOf('TreeView', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 400
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <TreeView {...mainProps} />
        )
    });
