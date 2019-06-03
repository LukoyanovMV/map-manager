import React from 'react';

class FullscreenButton extends React.Component {
    render() {
        return (
            <span className="close-button" onClick={this.props.onClose}>
                <svg fill="#666666" opacity="0.5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            </span>
        )
    }
}

export default FullscreenButton;