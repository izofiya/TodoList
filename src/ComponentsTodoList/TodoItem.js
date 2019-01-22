import React from 'react';

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            changeItem: this.props.taskDescription
        }
        this.onChangeItem = this.onChangeItem.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }
    onChangeItem = (event) => {
        this.makeRequest(event.target.value)
    }
    makeRequest(taskValue) {
        fetch('http://localhost:3002/api/tasks/' + this.props.taskId,
        {method: 'PUT', body: JSON.stringify({description: taskValue}),
         headers: {'content-type': 'application/json'}}).then(response => response.json()).then(taskСhanged => {
            this.setState({
                isLoading: false,
                changeItem: taskСhanged.description
            });
        });
    }
    render () {
        if(this.state.isLoading) {
            return "Loading..."
        }
        return (
            <label>
                <input className="inputWrapper"
                type="text"
                value={this.state.changeItem}
                onChange={this.onChangeItem}
                />
            </label>
        )
    }
}