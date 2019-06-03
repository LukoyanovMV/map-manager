import React from 'react';

const NodeIcon = (props) => {
    const iconClass = ['mtv-icon'];

    if (props.iconClass && props.iconClass !== '') {
        iconClass.push(props.iconClass);
    }

    return !props.iconImg
        ? <span className={iconClass.join(' ')}> </span>
        : <span className={iconClass.join(' ')}><img src={props.iconImg}/></span>
};


class TreeNode extends React.Component {
    constructor(props) {
        super(props);

        this.childNodes = this.childNodes.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    childNodes () {
        const api = this.props.api;
        const childs = api.getChilds(this.props.data.id);

        const childNodes = childs.map((child) =>
            <TreeNode
                key={child.id.toString()}
                data={child}
                api={api}
            />
        );

        return childNodes.length
            ? (
                <ul className="mtv-sub">
                    {childNodes}
                </ul>
            )
            : null;
    }

    onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.api.onContextMenu(this.props.data.id, e);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render () {
        const childNodes = this.childNodes();
        const nodeClassName = ['mtv-node'];
        const itemClassName = ['mtv-item'];

        const {
            data={},
            api={},
        } = this.props;

        if (data.expanded) {
            nodeClassName.push('expanded');
        }

        childNodes === null ? itemClassName.push('leaf') : false;

        return (
            <li className={nodeClassName.join(' ')}>
                <div className={itemClassName.join(' ')}
                     onDoubleClick={() => {api.onDoubleClick(data.id)}}
                     onContextMenu={this.onContextMenu}
                >
                    <span className="mtv-expander" onClick={() => {api.onExpanderClick(data.id)}}> </span>
                    <NodeIcon iconClass={data.iconClass} iconImg={data.iconImg}/>
                    <div className="mvt-label-wrapper">
                        <span className="mtv-label">{data.label}</span>
                    </div>
                </div>
                {childNodes}
            </li>
        )
    }
}

export default TreeNode;