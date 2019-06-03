import React from 'react';
import { connect } from 'react-redux';

import {ContextMenu, ContextMenuItem} from 'components/context-menu/index';
import contMenu from './selector';
import {hideMenu, editContainer} from './actions';
import {getContainer} from 'services/data/selector';
import config from 'services/config/selector';


const contActions = (menuProps) => {
    const container = getContainer(menuProps.containerId);
    let actions = [];
    let contTypeStr;
    if (container) {
        for (let key in config().container_types) {
            if (config().container_types[key] === container.type) {
                contTypeStr = key;
            }
        }
    }

    if (container && contTypeStr) {
        actions = menuProps.actions[contTypeStr];
    } else {
        actions = [];
    }

    return actions;
};

class ContainerMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    onClick(action) {
        if (action === 'openMap') {
            this.props.enterMap(this.props.container.code);
        } else if (action === 'editProps') {
            this.props.edit(this.props.container.id);
        }
    }

    render() {
        const props = {
            point: this.props.point,
            onClose: this.props.onClose,
            isOpen: this.props.isOpen,
        };

        const {
            actions
        } = this.props;

        return (
            <ContextMenu {...props}>
                {actions.map((item, i) => {
                    return item.action !== 'divider'
                        ? (
                        <ContextMenuItem role={item.action === 'remove' ? 'danger' : ''} key={i} data={item.action} onClick={this.onClick}>
                            {item.label}
                        </ContextMenuItem>
                        )
                        : <ContextMenuItem key={i} divider/>;
                })}
            </ContextMenu>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isOpen: contMenu().isOpen,
        point: contMenu().point,
        container: getContainer(contMenu().containerId),
        actions: contActions(contMenu())
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        onClose: () => {
            dispatch(hideMenu());
        },
        edit: (id) => {
            dispatch(editContainer(id));
        }
    }
};


export default (connect(mapStateToProps, mapDispatchToProps)(ContainerMenu));
