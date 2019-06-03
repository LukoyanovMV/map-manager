import React from 'react';
import Pane from './pane';
import Resizer from './resizer';
import './style.less';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
        } catch (e) {}
    }
}

class SplitLayout extends React.Component {

    pane1 = null;
    pane2 = null;
    resizer = null;

    constructor(props) {
        super(props);

        this.state = {
            splitPoint: 100,
            resizeInit:false,
            resizing: false,
            position: null,
            oldSplitPoint: null,
            style: {
                cursor: 'default'
            }
        };

        this.renderResizer = this.renderResizer.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.firstDefaultConfig = {
            minSize: 0,
            maxSize: Infinity
        };
        this.secondDefaultConfig = {
            minSize: 0,
            maxSize: Infinity
        }
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseDown(e) {
        this.setState({
            resizeInit: true,
            position: {
                x: e.pageX,
                y: e.pageY
            },
            style: {
                cursor: this.props.vertical ? 'col-resize' : 'row-resize'
            }
        })
    }

    onMouseMove(e) {
        let delta;
        let newSplitPoint;

        if (this.state.resizeInit) {
            unFocus(document, window);

            delta = !this.props.vertical
                ? e.pageY - this.state.position.y
                : e.pageX - this.state.position.x;

            if (Math.abs(delta) >= 3) {
                this.setState({
                    resizeInit: false,
                    resizing: true,
                    oldSplitPoint: this.state.splitPoint
                })
            }
        }

        if (this.state.resizing) {
            unFocus(document, window);

            delta = !this.props.vertical
                ? e.pageY - this.state.position.y
                : e.pageX - this.state.position.x;

            newSplitPoint = this.state.oldSplitPoint + delta;

            if (this.checkLimitations(newSplitPoint, delta)) {
                return;
            }

            this.setState({
                splitPoint: newSplitPoint
            });

            if (typeof this.props.onResize === 'function') {
                this.props.onResize(newSplitPoint);
            }
        }
    }

    checkLimitations(splitPoint, e) {
        let first;
        let second;
        let limitationFound = false;
        let secondSize;
        let containerSize = !this.props.vertical
            ? this.element.offsetHeight
            : this.element.offsetWidth;

        if (this.props.first) {
            first = {
                ...this.firstDefaultConfig,
                ...this.props.first
            };

            if (splitPoint < first.minSize || splitPoint > first.maxSize) {
                limitationFound  = true;
            }
        }

        if (this.props.second) {
            second = {
                ...this.secondDefaultConfig,
                ...this.props.second
            };

            secondSize = containerSize - splitPoint;

            if (secondSize < second.minSize || secondSize > second.maxSize) {
                limitationFound  = true;
            }
        }

        if (splitPoint < 0 || splitPoint > containerSize) {
            limitationFound  = true;
        }

        return limitationFound;
    }

    onMouseUp() {
        this.setState({
            resizeInit: false,
            resizing: false,
            position: null,
            oldSize: null,
            style: {
                cursor: 'default'
            }
        })
    }

    renderResizer(props) {
        return this.props.resizable
            ? <Resizer
                splitPoint={props.splitPoint}
                splitting={props.splitting}
                onMouseDown={this.onMouseDown}
                ref={props.resizerRef}/>
            : null;
    }

    componentWillMount() {
        this.setState({
            splitPoint: parseInt(this.props.splitPoint)
        })
    }

    componentWillReceiveProps(newProps) {
        // this.setState({
        //     splitPoint: parseInt(newProps.splitPoint)
        // })
    }

    render() {
        const {
            vertical = false,
            className = ''
        } = this.props;

        const splitClass = vertical ? 'vertical': 'horizontal';
        const splitPoint = this.state.splitPoint;
        const classes = ['sp-layout', splitClass];

        classes.push(className);

        return (
            <div
                className={classes.join(' ')}
                style={this.state.style}
                ref={el => this.element = el}>

                <Pane
                    order="first"
                    splitting={splitClass}
                    splitPoint={splitPoint}
                    ref={(node) => this.pane1 = node} >
                    {this.props.children[0]}
                </Pane>

                <this.renderResizer
                    splitPoint={splitPoint}
                    splitting={splitClass}
                    resizerRef = {el => this.resizer = el}/>

                <Pane
                    order="second"
                    splitting={splitClass}
                    splitPoint={splitPoint}
                    ref={(node) => this.pane2 = node}>
                    {this.props.children[1]}
                </Pane>
            </div>
        )
    }
}

export default SplitLayout;