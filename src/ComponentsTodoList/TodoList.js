import React from 'react';
import {MenuTodoList} from './MenuTodoList.js';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/css/materialize.min.css';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            isLoading: true
        }
    }
    componentDidMount () {
        fetch('http://localhost:3002/api/tasks').then(response => response.json()).then(tasks => {
            this.setState({
            tasks,
            isLoading: false
            });
        });
    }
    render () {
        if(this.state.isLoading) {
            return "Loading..."
        }
        return (
            <div id="wrapper">
                <MenuTodoList tasks={this.state.tasks}/>
                <button className="iconAdd">ADD</button>
            </div>
        )
    }
}