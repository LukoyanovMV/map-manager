import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ContextMenu, ContextMenuItem} from './index';


const mainProps = {
    point: {
        left:100,
        top: 100
    },
    onClose: action('close'),
    closeOnOutsideClick: true,
    closeOnInsideClick: true,
    isOpen: true
};

storiesOf('ContextMenu', module)
    .addDecorator(story => (
        <div style={{
            position: 'relative',
            margin: 0,
            height: 500
        }}>{story()}</div>
    ))
    .addWithJSX('Default', () => {
        return (
            <ContextMenu {...mainProps}>
                <ContextMenuItem data="item1" onClick={action('click')}>
                    Приблизить к объектам
                </ContextMenuItem>
                <ContextMenuItem data="item2" onClick={action('click')}>
                    Изменить стиль отображения
                </ContextMenuItem>
                <ContextMenuItem divider/>
                <ContextMenuItem data="item3" onClick={action('click')}>
                    Изменить стиль отображения
                </ContextMenuItem>
            </ContextMenu>
        )
    });
