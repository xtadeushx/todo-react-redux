import React, { useCallback } from 'react';
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
  // State
  const [todoData, setTodoData] = useState([
    createTodoItem('Drink coffee'),
    createTodoItem('Create awakes app'),
    createTodoItem('Have a lunch'),
  ]);
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('active');


  
  const handleDeleteTodo = (id) => {
    console.log('handleDeleteTodo');
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

  const search = 
    (items, term) => {
      if (term === '') {
        return items;
      }
      return items.filter((item) => item.label.toLowerCase().includes(term));
    }
  

  const handleFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'done':
        return items.filter((item) => item.done);
      case 'active':
        return items.filter((item) => !item.done);
      default:
        return items;
    }
  };

  const visibleTodoData = handleFilter(search(todoData, term), filter);


  const onSearchChanges = (term) => setTerm(term);

  const onFilterChanges = (filter) => setFilter(filter);

  return (
    <div className="todo-app">
      <AppHeader toDo={toDo} done={done} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChanges={onSearchChanges} />
        <ItemStatusFilter onFilterChanges={onFilterChanges} />
      </div>

      <TodoList
        todos={visibleTodoData}
        onDelete={(id) => handleDeleteTodo(id)}
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}
      />
      <ItemAddForm onItemAdded={handleAddTodo} />
    </div>
  );
};
export default App;
