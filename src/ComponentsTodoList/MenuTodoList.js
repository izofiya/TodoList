import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';

export const MenuTodoList = (props) => (
    <ul className="collection with-header">
        {props.tasks.map((task, index) => (
            <li 
                key={index}
                className="collection-item">
                <label>
                    <input type="checkbox" className="filled-in"/>
                    <span id="spanWrapper">{task.description}</span>
                </label>
                <a href="#!" className="secondary-content">
                    <i className="small material-icons">delete</i>
                </a>
            </li>
        ))}
    </ul>
  );
