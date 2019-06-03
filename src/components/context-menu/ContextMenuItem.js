import React from 'react';

import './style.less';

class ContextMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick(this.props.data, e);
        }
    }

    render() {
        const role = this.props.role ? this.props.role : '';
        return 'divider' in this.props
            ? (<li className="ctx-menu-divider"> </li>)
            : (
                <li className="ctx-menu-item" role={role} onClick={this.onClick}>
                    <a>{this.props.children}</a>
                </li>
            )
    }
}

export default ContextMenuItem;