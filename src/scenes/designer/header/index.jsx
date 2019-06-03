import React from 'react';
import { connect } from 'react-redux';

import Breadcrambs from 'components/breadcrumbs';
import app from 'services/app/selector';

import './style.less';

class DesignerHeader extends React.Component {
    render() {
        return (
            <div className="header-bar">
                <Breadcrambs
                    path={this.props.address}
                    className="designer-breadcrumbs"
                />
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        address: app().mapAddress
    }
};

const mapDispatchToProps = function(dispatch){
    return {
    }
};


export default (connect(mapStateToProps, mapDispatchToProps)(DesignerHeader));
