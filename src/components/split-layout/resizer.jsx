import React from 'react';

class SplitLayoutResizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {};
        const classes = ['sp-layout-resizer'];
        const {
            splitPoint,
            splitting,
            onMouseDown
        } = this.props;

        classes.push(splitting);

        let splitProp = splitting === 'horizontal' ? 'top' : 'left';
        style[splitProp] = splitPoint;

        return (
            <div
                className={classes.join(' ')}
                style={style}
                onMouseDown={event => onMouseDown(event)}
            />
        )
    }
}

export default SplitLayoutResizer;