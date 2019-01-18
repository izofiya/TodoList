import React from 'react';
import {InputCheckbox} from './InputCheckbox.js';
import {TodoItem} from './TodoItem.js';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/css/materialize.min.css';

export const MenuTodoList = (props) => (
    <form id="formId">
        {props.tasks.map((task, index) => (
            <div key={task.id}>
                <InputCheckbox taskId={task.id} taskIsDone={task.isDone}/>
                <TodoItem taskDescription={task.description} taskId={task.id} />
            </div>
        ))}
    </form>
  );
  
