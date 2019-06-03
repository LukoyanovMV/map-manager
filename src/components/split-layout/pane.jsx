import React from 'react';

class SplitLayoutPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            order,
            splitting,
            splitPoint
        } = this.props;

        let splitProp;
        let classes = ['sp-layout-pane'];
        classes = classes.concat([splitting, order]);

        if (splitting === 'horizontal') {
            splitProp = order === 'first' ? 'height' : 'top';
        } else {
            splitProp = order === 'first' ? 'width' : 'left';
        }

        const style= {};
        style[splitProp] = splitPoint;

        return (
            <div className={classes.join(' ')} style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default SplitLayoutPane;