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

  const toggleProperty = (id, property) => {
    setTodoData((prev) => {
      prev.map((item) => {
        if (item.id === id) {
          item[property] = !item[property];
        }
      });
      return [...prev];
    });
  };

  const onToggleDone = (id) => {
    toggleProperty(id, 'done');
  };

  const onToggleImportant = (id) => {
    toggleProperty(id, 'important');
  };

  const handleFilterTodo = (text) => {
    setTodoData((prev) => {
      return prev.filter((item) => item.label.toLowerCase().includes(text));
    });
  };

  const handleFilterDoneTodo = () => setTodoData((prev) => prev.filter((item) => item.done));
  const handleFilterActiveTodo = () => setTodoData((prev) => prev.filter((item) => !item.done));
  const handleFilterAllTodo = () =>
  setTodoData([
      createTodoItem('Drink coffee'),
      createTodoItem('Create awakes app'),
      createTodoItem('Have a lunch'),
    ]);
  return (
    <div className="todo-app">
      <AppHeader toDo={toDo} done={done} />
      <div className="top-panel d-flex">
        <SearchPanel handleFilterTodo={handleFilterTodo} />
        <ItemStatusFilter
          handleFilterActiveTodo={handleFilterActiveTodo}
          handleFilterDoneTodo={handleFilterDoneTodo}
          handleFilterAllTodo={handleFilterAllTodo}
        />
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
