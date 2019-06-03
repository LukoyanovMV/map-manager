import React from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';

import SplitLayout from 'components/split-layout';
import Header from './header';
import ContainersTree from './containers-tree';
import ContainerMenu from './container-menu';
import {showMenu} from './container-menu/actions';

import application from 'index';

import './style.less';
import app from 'services/app/selector';
import {loadMap, setPath} from 'services/app/actions';

class DesignerScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMap: null
        };

        this.enterMap = this.enterMap.bind(this);
        this.showContMenu = this.showContMenu.bind(this);
    }

    componentWillMount() {
        const routeParams = {
            ...this.props.match.params
        };
        const map = routeParams.map ? routeParams.map : 'catalog';

        if (this.props.map.code !== map) {
            this.props.loadMap(this.props.routeMapCode);
        }
    }

    componentWillReceiveProps(nextProps) {

        const routeParams = {
            ...nextProps.match.params
        };
        const map = routeParams.map ? routeParams.map : 'catalog';

        if (nextProps.map.code !== map) {
            this.props.loadMap(map);
        }
    }

    enterMap(code) {
        this.props.history.push('/' + code)
    }

    showContMenu(id, point) {
        this.props.showContMenu(id, point)
    }

    render() {
        const horizontalLayoutProps = {
            splitPoint: 50,
        };

        const verticalLayoutProps = {
            vertical: true,
            splitPoint: 400,
            resizable: true,
            first: {
                minSize: 250,
                maxSize: 600
            }
        };

        const EditContainerDialog = application.getComponent('containerEditor.EditDialog');

        return (
            <div className="designer-cont">
                <ContainerMenu
                    enterMap={this.enterMap}
                />
                <EditContainerDialog />
                <SplitLayout {...horizontalLayoutProps}>
                    <div>
                        <Header />
                    </div>
                    <SplitLayout {...verticalLayoutProps}>
                        <SplitLayout splitPoint="40">
                            <div className="containers-toolbar">toolbar</div>
                            <ContainersTree
                                enterMap={this.enterMap}
                                showContMenu={this.showContMenu}
                            />
                        </SplitLayout>
                       <div>main</div>
                    </SplitLayout>
                </SplitLayout>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        map: app().mapModel,
        path: app().path,
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        loadMap: (mapCode) => {
            dispatch(loadMap(mapCode));
        },
        showContMenu: (id, point) => {
            dispatch(showMenu(id, point));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignerScene));
