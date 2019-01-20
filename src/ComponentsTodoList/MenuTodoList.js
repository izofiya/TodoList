import React from 'react';
import {InputCheckbox} from './InputCheckbox.js';
import {TodoItem} from './TodoItem.js';
import {ButtonDelete} from './ButtonDelete.js';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/css/materialize.min.css';

export const MenuTodoList = (props) => (
    <form id="formId">
        {props.tasks.map((task) => (
            <div key={task.id}>
                <InputCheckbox taskId={task.id} taskIsDone={task.isDone}/>
                <TodoItem taskDescription={task.description} taskId={task.id} />
                <ButtonDelete taskId={task.id}/>
            </div>
        ))}
    </form>
  );
  
