import React from 'react';
import ReactDOM from 'react-dom';
import _ContextMenuItem from './ContextMenuItem';

import './style.less';

export class ContextMenu extends React.Component {
    constructor(props) {
        super(props);

        this.outsideClick = this.outsideClick.bind(this);
        this.insideClick = this.insideClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener("click", this.outsideClick);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.outsideClick);
    }

    outsideClick(e) {
        const node = ReactDOM.findDOMNode(this);
        let target = e.target;

        while(target.parentNode) {
            if(target === node) {
                console.log('!!!!');
                return;
            }

            target = target.parentNode;
        }

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    insideClick() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        let point = this.props.point;
        const style= {
            left: point.left,
            top: point.top
        };

        const classes = ['ctx-menu'];
        if (!this.props.isOpen) {
            classes.push('hidden')
        }

        return (
            <ul className={classes.join(' ')} style={style} onClick={this.insideClick}>
                {this.props.children}
            </ul>
        )
    }
}

export {_ContextMenuItem as ContextMenuItem};
