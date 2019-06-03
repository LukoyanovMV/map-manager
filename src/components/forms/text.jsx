import React from 'react';

class TextInput extends React.Component {

    label(label) {
        return label && label !== ''
            ? <label>{label}</label>
            : null;
    }

    render() {
        const {
            label = '',
            inlineLabel = false,
            ...props
        } = this.props;

        const classes = ["text-input"];
        if (inlineLabel) {
            classes.push("inline-label");
        }

        return (
            <div className={classes.join(' ')}>
                {this.label(label)}
                <input type="text" {...props}/>
                <span className="focus-indicator"></span>
            </div>
        )
    }
}

export default TextInput;