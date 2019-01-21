import React from 'react';
import {InputCheckbox} from './InputCheckbox.js';
import {TodoItem} from './TodoItem.js';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/css/materialize.min.css';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            isLoading: true
        }
        this.onDelete = this.onDelete.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.todoListChenged = this.todoListChenged.bind(this);
    }
    componentDidMount () {
        fetch('http://localhost:3002/api/tasks').then(response => response.json()).then(tasks => {
            this.setState({
            tasks,
            isLoading: false
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
      }
    todoListChenged (taskIdDelete) {
        const arrTasks = this.state.tasks.map(task => task.id === taskIdDelete ? '' : task);
        this.setState({
           tasks: [...arrTasks]
        });
      }
    onDelete(taskIdDelete) {
        this.setState({
            taskId: taskIdDelete
        });
        this.makeRequest(taskIdDelete);
        this.todoListChenged(taskIdDelete);
    }
    makeRequest(taskIdDelete) {
        fetch('http://localhost:3002/api/tasks/' + taskIdDelete,
       {method: 'DELETE'});
    }
    render () {
        if(this.state.isLoading) {
            return "Loading..."
        }
        return (
            <div id="wrapper">
                <form id="formId" onSubmit={this.handleSubmit}>
                {this.state.tasks.map((task) => (
                    <div id="divAfterForm" key={task.id}>
                        {!task ? null : <InputCheckbox taskId={task.id} taskIsDone={task.isDone}/>}
                        {!task ? null : <TodoItem taskDescription={task.description} taskId={task.id}/>}
                        {!task ? null : <button className="classButtonDelete" onClick={() => this.onDelete(task.id)}>
                        <img className="classImgDelete" alt="delete" src="https://api.icons8.com/download/a4650c63e77eb297132bc8a67be5abc3797e5e1f/Android/PNG/512/Industry/trash-512.png"/>
                        </button>}
                    </div>
                ))}
            </form>
                <button className="buttonAdd">+</button>
            </div>
        )
    }
}