import React, { useState } from 'react';
import './item-add-form.css';

const ItemAddForm = ({ onItemAdded }) => {
  const [value, setValue] = useState('');

  const onLabelChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {  
    e.preventDefault();
    onItemAdded(value);
    setValue('');
  }
  return (
    <form className="item-add-form d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="What needs to be"
        onChange={onLabelChange}
        value={value}
      />
      <button
        className="btn btn-outline-secondary">
        Add item
      </button>
    </form>
  );
};

export default ItemAddForm;
