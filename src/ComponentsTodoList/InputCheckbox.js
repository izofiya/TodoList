import React from 'react';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/css/materialize.min.css';

export class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }
    handleChangeChecked (event) {
        this.makeRequest(event.target.checked);
    }
    makeRequest(checked) {
       fetch('http://localhost:3002/api/tasks/' + this.props.taskId,
        {method: 'PUT', body: JSON.stringify({isDone: checked}),
         headers: {'content-type': 'application/json'}}).then(response => response.json()).then(taskСhanged => {
            this.setState({
            isLoading: false,
            checked: taskСhanged.isDone
            });
        });
    }
    render () {
        if(this.state.isLoading) {
            return "Loading..."
        }
        return (
            <input type="checkbox" defaultChecked={this.props.taskIsDone} onChange={this.handleChangeChecked}/>
        )
    }
}
