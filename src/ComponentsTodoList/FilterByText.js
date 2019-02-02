import React from 'react';

export class FilterByText extends React.Component {
    render () {
        return (
            <input 
            className="classSelect"
            type="text" 
            placeholder="Filter by text" 
            value={this.props.valueFilterByText}
            onChange={this.props.onChangeFilterByText}
            />
        )
    }
}