import React from 'react';

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInputModal: '',
            newTask: '',
            tasksFromModal: ''
        }
        this.onAddNewTask = this.onAddNewTask.bind(this);
        this.makeRequestPost = this.makeRequestPost.bind(this);
        this.onChangeInputModal= this.onChangeInputModal.bind(this);
        this.todoListChengedPost = this.todoListChengedPost.bind(this);
    }
    onAddNewTask(event) {    
        event.preventDefault();    
        this.makeRequestPost(this.state.valueInputModal);
        this.todoListChengedPost(this.state.newTask);
        this.setState({
            valueInputModal: ''
        })
    }
    onChangeInputModal(event) {
        this.setState({
            valueInputModal: event.target.value
        });
    }
    todoListChengedPost (taskChanged) {
        const arrTasks = this.props.tasks.map(task => task.id === taskChanged.id ? taskChanged : task);
        this.setState({
            tasksFromModal: [...arrTasks]
        });
      }
    makeRequestPost(taskDescription) {
        fetch('http://localhost:3002/api/tasks',
         {method: 'POST',
         body: JSON.stringify({description: taskDescription}),
         headers: {'content-type': 'application/json'}}).then(response => response.json()).then(newTask => {
            this.setState({
                newTask
            });
        });
    }
    render () {
        return (
            <div className="coverDiv">
                <div className="promptFormContainer">
                    <form className="promptForm">
                    <div>
                        Add new task
                        <button className="classButtonClose" onClick={(event) => this.props.onCloseModal(event, this.state.tasksFromModal)}>X</button>
                    </div>
                    <input 
                        name="text" 
                        type="text" 
                        value={this.state.valueInputModal}
                        onChange={this.onChangeInputModal}
                    />
                    <input className="classButtonForm" type="submit" value="Ok" onClick={this.onAddNewTask}/>
                    <input className="classButtonForm" type="button" name="cancel" value="Cancel"/>
                    </form>
                </div>
          </div>
        );
    }
}
