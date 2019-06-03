import React from 'react';
import { connect } from 'react-redux';
import ModalWindow from 'components/modal-window';
import {TextInput} from 'components/forms'
import modState from '../selector';
import {getContainer} from 'services/data/selector';
import {closeEditDialog} from '../actions';

class EditDialog extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const updater = {};
        updater[event.target.name] = event.target.value;
        this.setState({
            ...this.state,
            ...updater
        });
    }

    onSubmit() {
        console.log(this.state, this.props.container);
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        const modalProps = {
            onClose: () => this.props.onClose,
            headerContent: 'Window header',
            width: 480,
            height: 300,
            className: 'forms',
            ...this.props
        };

        const container = this.props.container;

        return (
            <ModalWindow {...modalProps}>
                <TextInput
                    placeholder="можно оставить пустым"
                    label="Название"
                    onChange={this.onChange}
                    name="name"
                />
                <br />
                <TextInput
                    placeholder="если не указан, будет назначен автоматически"
                    label="Код"
                    onChange={this.onChange}
                    name="code"
                />
                <br />
                <button onClick={this.onSubmit}>Изменить</button>
            </ModalWindow>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        container: getContainer(modState().editDialog.containerId),
        ...modState().editDialog
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        onClose: () => {
            dispatch(closeEditDialog());
        }
    }
};


export default (connect(mapStateToProps, mapDispatchToProps)(EditDialog));
