import React from 'react';
import { connect } from 'react-redux';

class PublicationScene extends React.Component {
    render() {
        return (
            <h1>PublicationScene</h1>
        )
    }
}

const mapStateToProps = function(state) {
    return {
    };
};

const mapDispatchToProps = function(dispatch){
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicationScene);
