import React from 'react';
import {InputCheckbox} from './InputCheckbox.js';
import {TodoItem} from './TodoItem.js';
import {Modal} from './Modal.js';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            isLoading: true,
            isAdd: false
        }
        this.onDelete = this.onDelete.bind(this);
        this.makeRequestDelete = this.makeRequestDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.todoListChanged = this.todoListChanged.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    componentDidMount () {
        window.addEventListener('keydown', this.onKeyDown);
        fetch('http://localhost:3002/api/tasks').then(response => response.json()).then(tasks => {
            this.setState({
            tasks,
            isLoading: false
            });
        });
    }
    onKeyDown(evt) {
        if(evt.key === 'A') {
            this.setState({
                isAdd: true
            });
        }
      }
    handleSubmit(event) {
        event.preventDefault();
      }
    todoListChanged (taskChanged) {
        const arrTasks = this.state.tasks.map(task => task.id === taskChanged.id ? '' : task);
        this.setState({
           tasks: [...arrTasks]
        });
      }
    onDelete(task) {
        this.setState({
            taskId: task.id
        });
        this.makeRequestDelete(task);
        this.todoListChanged(task);
    }
    onCloseModal(event, tasksFromModal) {
        if(!tasksFromModal) {
            alert("You didn't write a task!");
        }
        this.setState({
            isAdd: false,
            tasks: tasksFromModal
        });
        this.handleSubmit(event);
    }
    makeRequestDelete(taskDelete) {
        fetch('http://localhost:3002/api/tasks/' + taskDelete.id,
       {method: 'DELETE'});
    }
    render () {
        if(this.state.isLoading) {
            return "Loading..."
        }
        return (
            <div className="wrapper">
            {this.state.isAdd ? <Modal
                tasks={this.state.tasks}
                onCloseModal={this.onCloseModal}
            /> : null}
                <form className="formId" onSubmit={this.handleSubmit}>
                {this.state.tasks.map((task) => (
                    <div key={task.id}>
                        {!task ? null : <InputCheckbox taskId={task.id} taskIsDone={task.isDone}/>}
                        {!task ? null : <TodoItem taskDescription={task.description} taskId={task.id}/>}
                        {!task ? null : <button className="classButtonDelete" onClick={() => this.onDelete(task)}>
                        <img className="classImgDelete" alt="delete" src="https://api.icons8.com/download/a4650c63e77eb297132bc8a67be5abc3797e5e1f/Android/PNG/512/Industry/trash-512.png"/>
                        </button>}
                    </div>
                ))}
            </form>
                <button className="buttonAdd" onClick={() => {
                    this.setState({
                        isAdd: true
                    })
                }}>+</button>
            </div>
        )
    }
}