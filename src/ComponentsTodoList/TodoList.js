import React from 'react';
import { InputCheckbox } from './InputCheckbox.js';
import { TodoItem } from './TodoItem.js';
import { Modal } from './Modal.js';
import { Select } from './Select.js';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            isLoading: true,
            isAdd: false,
            valueInputModal: '',
            tasksFromModal: '',
            newTask: ''
        }
        this.options = ['Show all', 'Show done', 'Show undone'];
        this.onDelete = this.onDelete.bind(this);
        this.makeRequestDelete = this.makeRequestDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.todoListChanged = this.todoListChanged.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleFormClick = this.handleFormClick.bind(this);
        this.onClickShowIsDone = this.onClickShowIsDone.bind(this);
        this.makeRequestIsDone = this.makeRequestIsDone.bind(this);
        this.onChangeInputModal= this.onChangeInputModal.bind(this);
        this.todoListChengedPost = this.todoListChengedPost.bind(this);
        this.onAddNewTask = this.onAddNewTask.bind(this);
        this.makeRequestPost = this.makeRequestPost.bind(this);
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
            this.setState({isAdd: true});
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
    onCloseModal(event) {
        this.setState({
            isAdd: false
        });
        this.handleSubmit(event);
    }
    onChangeInputModal(event) {
        this.setState({valueInputModal: event.target.value});
    }
    todoListChengedPost () {
        const arrTasks = this.state.tasks.map(task => task.id === this.state.newTask.id ? this.state.newTask : task);
        this.setState({tasks: [...arrTasks]});
      }
      onAddNewTask(event) {    
        event.preventDefault();    
        this.makeRequestPost();
        this.todoListChengedPost();
        this.setState({valueInputModal: ''})
    }    
    handleOutsideClick (event) {
        if (this.form.contains(event.target)) {
            return;
          }
        this.setState ({isAdd: false}); 
    };
    handleFormClick (node) {
        this.form = node;
        if(node) {
            document.addEventListener('click', this.handleOutsideClick);
        } else {
            document.removeEventListener('click', this.handleOutsideClick);
        }
    };
    onClickShowIsDone (event) {
        let result = [];
        switch(event.target.value) {
            case this.options[0]:
                result = this.state.tasks;
                break;
            case this.options[1]:
                result = true;
                break;
            case this.options[2]:
                result = false;
                break;
        }
        this.makeRequestIsDone(result);
    }
    makeRequestPost() {
        fetch('http://localhost:3002/api/tasks',
         {method: 'POST',
         body: JSON.stringify({description: this.state.valueInputModal}),
         headers: {'content-type': 'application/json'}}).then(response => response.json()).then(newTask => {
            this.setState({newTask});
        });
    }
    makeRequestIsDone(result) {
        fetch('http://localhost:3002/api/tasks').then(response => response.json()).then(tasks => {
            if(result === true || result === false) {
            this.setState({
            tasks: tasks.filter(task => task.isDone === result)
            });
            } else {
                this.setState({
                    tasks
                });
            }
        });
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
                {this.state.isAdd && <Modal
                    handleSubmit={this.handleSubmit}
                    onRef={this.handleFormClick}
                    tasks={this.state.tasks}
                    onCloseModal={this.onCloseModal}
                    valueInputModal={this.state.valueInputModal}
                    onChangeInputModal={this.onChangeInputModal}
                    onAddNewTask={this.onAddNewTask}
                />}
                <form className="formId" onSubmit={this.handleSubmit}>
                    <Select 
                    options={this.options}
                    onClickShowIsDone={this.onClickShowIsDone}
                    />
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