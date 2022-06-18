import React, { useCallback, useEffect } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import './app.css';
import ItemAddForm from '../item-add-form';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Alert from '../alert/Alert';

const App = () => {
  const URL = `https://jsonplaceholder.typicode.com/todos`;
  let numberOfTodos = 5;

  const createTodoItem = (title) => {
    return {
      title,
      important: false,
      completed: false,
      id: uuidv4(),
      date : new Date().getMinutes() + ':' +  new Date().getSeconds(),
    };
  };
  // State
  const [todoData, setTodoData] = useState([]);
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('active');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fechDataFromJSONPlaceholder(numberOfTodos);
  }, []);

  const fechDataFromJSONPlaceholder = (number) => {
    try {
      axios.get(`${URL}?_limit=${number}`).then((response) => {
        setTimeout(() => {
          setTodoData(response.data);
        }, 3000);
        setTodoData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const handleDeleteTodo = (id) => {
    console.log('handleDeleteTodo');
    setTodoData((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  let completed = todoData ? todoData.filter((el) => el.completed).length : 0;
  let toDo = todoData.length - completed;

  const handleAddTodo = (text) => {
    if (typeof text === 'string') {
      if (text === '') {
        alert('Please enter a text');
        setTodoData(todoData);
      }
      let titleTodosArr = todoData.filter((todo) => todo.title === text);
      if (titleTodosArr.length > 0) {
        alert('You can not add the same todo');
        setTodoData(todoData);
      } else {
        setTodoData((prev) => [...prev, createTodoItem(text)]);
      }
    }else{
      alert('Wrong type of data. Please select one of the following data')
    }
  };

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
    toggleProperty(id, 'completed');
  };

  const onToggleImportant = (id) => {
    toggleProperty(id, 'important');
  };

  const search = (items, term) => {
    if (term === '') {
      return items;
    }
    return items.filter((item) => item.title.toLowerCase().includes(term));
  };

  const handleFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'completed':
        return items.filter((item) => item.completed);
      case 'active':
        return items.filter((item) => !item.completed);
      default:
        return items;
    }
  };

  const visibleTodoData = handleFilter(search(todoData, term), filter);

  const onSearchChanges = (term) => setTerm(term);

  const onFilterChanges = (filter) => setFilter(filter);
  let style = {
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
  };
  return (
    <div className="todo-app">
      <AppHeader toDo={toDo} completed={completed} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChanges={onSearchChanges} isLoading={isLoading} />
        <ItemStatusFilter isLoading={isLoading} onFilterChanges={onFilterChanges} />
      </div>
      {isLoading ? (
        <p style={style}>Loading...</p>
      ) : todoData.length > 0 ? (
        <TodoList
          todos={visibleTodoData}
          onDelete={(id) => handleDeleteTodo(id)}
          onToggleDone={onToggleDone}
          onToggleImportant={onToggleImportant}
        />
      ) : (
        <p style={style}>
          You complied all for today.{' '}
          <span style={{ color: 'tomato', fontSize: '20px' }}> Good job</span>
        </p>
      )}
      <ItemAddForm onItemAdded={handleAddTodo} />
    </div>
  );
};
export default App;
