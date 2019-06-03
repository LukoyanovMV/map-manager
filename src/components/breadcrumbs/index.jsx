import React from 'react';
import {
    Link
} from 'react-router-dom'

import './style.less';

class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.path || !this.props.path.length) {
            return null;
        }

        const pathLen = this.props.path.length;

        const {
            className = ''
        } = this.props;

        const classes = ['breadcrumbs'];
        if (className && className.trim() !== '') {
            classes.push(className);
        }

        return (
            <ol className={classes.join(' ')}>
                {this.props.path.map((item, i) => {
                    return i != pathLen - 1
                        ? <li key={item.code}><Link to={'' + item.code}>{item.code}</Link></li>
                        : <li key={item.code}><span>{item.code}</span></li>
                })}
            </ol>
        )
    }
}

export default Breadcrumbs;