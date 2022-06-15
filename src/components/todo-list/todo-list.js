import React from 'react';
import TodoListItem from '../todo-list-item';
import { v4 as uuidv4 } from 'uuid';
import './todo-list.css';

const TodoList = ({ todos, onDelete, onToggleDone, onToggleImportant }) => {
  const elements = todos.map((todo) => {
    return (
      <li key={uuidv4()} className="list-group-item">
    
        <TodoListItem  {...todo} onDelete={onDelete}  onToggleImportant={onToggleImportant} onToggleDone={onToggleDone}/>
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
