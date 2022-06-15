import React, { useRef, useState } from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchChanges }) => {
  const [value, setValue] = useState();
  const inputRef = useRef();

  const inputHandleChange = (e) => {
    setValue(e.target.value); 
    onSearchChanges(value);
  };

 
  return (
     <input  
    ref={inputRef}
      type="text"
      className="form-control search-input d-flex w-100"
      placeholder="type to search"
     value={value}
      onChange={inputHandleChange}
    />
   
   
  );
};

export default SearchPanel;
