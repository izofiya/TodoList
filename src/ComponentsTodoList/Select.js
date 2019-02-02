import React from 'react';

export class Select extends React.Component {
    render () {
        return (
            <select onChange={this.props.onClickShowIsDone} className="classSelect" name="list">
                {this.props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        )
    }
}