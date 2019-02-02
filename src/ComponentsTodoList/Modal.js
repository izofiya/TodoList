import React from 'react';

export class Modal extends React.Component {
    render () {
        return (
            <div className="coverDiv">
                <div className="promptFormContainer">
                    <form 
                        onSubmit={this.props.handleSubmit} 
                        ref={this.props.onRef} 
                        className="promptForm">
                    <div>
                        Add new task
                        <button 
                            className="classButtonClose" 
                            onClick={this.props.onCloseModal}>
                            X
                        </button>
                    </div>
                    <input 
                        name="text"
                        type="text" 
                        value={this.props.valueInputModal}
                        onChange={this.props.onChangeInputModal}
                    />
                    <input className="classButtonForm" type="submit" value="Ok" onClick={this.props.onAddNewTask}/>
                    <input className="classButtonForm" type="button" value="Cancel"/>
                    </form>
                </div>
          </div>
        );
    }
}
