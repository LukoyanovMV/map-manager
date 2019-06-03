import React from 'react';
import TreeNode from './tree_node';

import './style.less';

class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: []
        };

        this.getNested = this.getNested.bind(this);
        this.getChilds = this.getChilds.bind(this);
        this.getNodeState = this.getNodeState.bind(this);
        this.onExpanderClick = this.onExpanderClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);

        this.api = {
            getNested: this.getNested,
            getChilds: this.getChilds,
            getNodeState: this.getNodeState,
            onExpanderClick: this.onExpanderClick,
            onDoubleClick: this.onDoubleClick,
            getConfig: this.getConfig,
            onContextMenu: this.onContextMenu
        };
    }

    getNodeState(id) {
        const node = this.state.nodes.filter(nodeState => {
            return nodeState.id === id;
        });
        return node.length ? node[0] : false
    }

    getConfig() {
        return this.props.config;
    }

    getNested (id) {

    }

    getChilds (id) {
        return this.props.nodes.filter(node => {
            return node.parent === id;
        })
    }

    getNode(id) {
        return this.props.nodes.filter(node => {
            return node.id === id;
        })[0]
    }

    onExpanderClick(id) {
        if (typeof this.props.onExpanderClick === 'function') {
            this.props.onExpanderClick(this.getNode(id))
        }
    }

    onDoubleClick(id) {
        if (typeof this.props.onDoubleClick === 'function') {
            this.props.onDoubleClick(this.getNode(id))
        }
    }

    onContextMenu(id, e) {
        e.preventDefault();
        if (typeof this.props.onContextMenu === 'function') {
            const node = this.getNode(id) || this.props.rootNode;
            this.props.onContextMenu(node, e);
        }
    }

    render() {
        const rootChilds = this.getChilds(this.props.rootNode.id);
        const _api = this.api;
        const rootNodes = rootChilds.map((child) =>
            <TreeNode
                key={child.id.toString()}
                data={child}
                api={_api}
            />
        );

        return (
            <div className="mvt-tree"
                 onContextMenu={(e) => {this.onContextMenu(null, e)}}
            >
                <ul className="mtv-root">
                    {rootNodes}
                </ul>
            </div>
        )
    }
}


{/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
        {/*<span className="mtv-expander"></span>*/}
        {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
        {/*<div className="mtv-action appearing"><img src="http://adm.parkingspace.msk.ru/static/pub_icons/oms_mos_parking/60f6185c997d2cb973216c1854a25251.png"/></div>*/}
        {/*<span className="mtv-label">item 1</span>*/}
    {/*</div>*/}
{/*</li>*/}
{/*<li className="mtv-node expanded">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*<ul className="mtv-sub">*/}
    {/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<div className="mtv-action appearing"><img src="http://adm.parkingspace.msk.ru/static/pub_icons/oms_mos_parking/60f6185c997d2cb973216c1854a25251.png"/></div>*/}
    {/*<span className="mtv-label">item 1 sdfsddf sdf sd sd fsdf sdfsdfs dfsfsdf sdfsdfdf</span>*/}

{/*</div>*/}
{/*</li>*/}
{/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*</li>*/}
{/*</ul>*/}
{/*</li>*/}
{/*<li className="mtv-node  expanded">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*<ul className="mtv-sub">*/}
    {/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon">*/}
    {/*<img src="http://adm.parkingspace.msk.ru/static/pub_icons/oms_mos_parking/60f6185c997d2cb973216c1854a25251.png"/>*/}
    {/*</span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*</li>*/}
{/*<li className="mtv-node expanded">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*<ul className="mtv-sub">*/}
    {/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon mtv-folder-icon"></span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*</li>*/}
{/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon">*/}
    {/*<img src="https://i.pinimg.com/originals/17/8a/6f/178a6f62b6cc8822c5a5127997b4589f.png"/>*/}
    {/*</span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*</li>*/}
{/*</ul>*/}
{/*</li>*/}
{/*</ul>*/}
{/*</li>*/}
{/*<li className="mtv-node">*/}
    {/*<div className="mtv-item">*/}
    {/*<span className="mtv-expander"></span>*/}
    {/*<span className="mtv-icon">*/}
    {/*<img src="http://lmv.orbismap.com/static/geoicons/polygon.png"/>*/}
    {/*</span>*/}
    {/*<span className="mtv-label">item 1</span>*/}
{/*</div>*/}
{/*</li>*/}


export default TreeView;