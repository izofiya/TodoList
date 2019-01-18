import React from 'react';

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItem: this.props.taskDescription
        }
        this.onChangeItem = this.onChangeItem.bind(this);
    }
    onChangeItem = (event) => {
        this.setState({
            changeItem: event.target.value
        });
    }
    componentDidUpdate() {
        fetch('http://localhost:3002/api/tasks/' + this.props.taskId,
        {method: 'PUT', body: JSON.stringify({description: this.state.changeItem}),
         headers: {'content-type': 'application/json'}}).then(response => response.json()).then(taskСhanged => {
            this.setState({
            changeItem: taskСhanged.description
            });
        });
    }
    render () {
        return (
            <label>
                <input id="inputWrapper"
                type="text"
                value={this.state.changeItem}
                onChange={this.onChangeItem}
                />
                <button>delete</button>
            </label>
        )
    }
}