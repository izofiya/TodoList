import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isLoading: false
        }
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
    }
    handleChangeChecked (event) {
        this.setState({
          checked: event.target.checked
        });
        console.log('checked: ' + this.state.checked + event.target.checked);
    }
    componentDidUpdate () {
        fetch('http://localhost:3002/api/tasks/' + this.props.taskId,
        {method: 'PUT', body: JSON.stringify({isDone: this.state.checked}),
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
            <input type="checkbox" className="filled-in" defaultChecked={this.props.taskIsDone} onChange={this.handleChangeChecked}/>
        )
    }
}
