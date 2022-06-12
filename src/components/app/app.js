import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import './app.css';
import ItemAddForm from '../item-add-form';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const createTodoItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      id: uuidv4(),
    };
  };
  const [todoData, setTodoData] = useState([
    createTodoItem('Drink coffee'),
    createTodoItem('Create awakes app'),
    createTodoItem('Have a lunch'),
  ]);
  const handleDeleteTodo = (id) => {
    setTodoData((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  let done = todoData.filter((el) => el.done).length;
  let toDo = todoData.length - done;

  const handleAddTodo = (text) => setTodoData((prev) => [...prev, createTodoItem(text)]);

  const onToggleDone = (id) => {
    setTodoData((prev) => {
      prev.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
      return [...prev];
    });
  };

  const onToggleImportant = (id) => {
    setTodoData((prev) => {
      prev.map((item) => {
        if (item.id === id) {
          item.important = !item.important;
        }
      });
      return [...prev];
    });
  };

  return (
    <div className="todo-app">
      <AppHeader toDo={toDo} done={done} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList
        todos={todoData}
        onDelete={(id) => handleDeleteTodo(id)}
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}
      />
      <ItemAddForm onItemAdded={handleAddTodo} />
    </div>
  );
};
export default App;
