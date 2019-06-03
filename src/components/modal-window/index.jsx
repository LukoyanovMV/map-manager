import React from 'react';
import ReactDOM from 'react-dom';
import CloseButton from './close-button';
import FullscreenButton from './fullscreen--button';

import './style.less';

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        const {
            isOpen = false,
            width = 320,
            height = 240,
            showHeader = true,
            className = ''
        } = this.props;
        const style = {};
        const modalStyle = {};
        const classes = ['modal'];

        style.display = isOpen ? 'block' : 'none';

        modalStyle.width = width;
        modalStyle.height = height;

        if (showHeader) {
            classes.push('has-header');
        }

        if (className) {
            classes.push(className);
        }

        return (
            <div className="modal-shadow" style={style}>
                <div className={classes.join(' ')} style={modalStyle}>
                    <CloseButton onClose={this.onClose}/>
                    <div className="modal-header">
                        {this.props.headerContent}
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalWindow;