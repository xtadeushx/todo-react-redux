import React, { useRef, useState } from 'react';

import './search-panel.css';

const SearchPanel = ({ handleFilterTodo }) => {
  const [value, setValue] = useState();
  const inputRef = useRef();

  const inputHandleChange = (e) => {
    setValue(e.target.value); 
     handleFilterTodo(inputRef.current.value.toLowerCase());
  };

  const onSubmit = (e) => { 
    e.preventDefault();
    setValue('');
  }
  return (
  <form className="item-add-form d-flex w-100" onSubmit={onSubmit}>
     <input
    ref={inputRef}
      type="text"
      className="form-control search-input"
      placeholder="type to search"
     value={value}
      onChange={inputHandleChange}
    />
  </form>
   
   
  );
};

export default SearchPanel;
