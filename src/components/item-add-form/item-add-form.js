import React from 'react';
import './item-add-form.css';

const ItemAddForm = ({ onItemAdded }) => {
  return (
    <div className="item-add-form">
      <button onClick={() => onItemAdded('Some text')} className="btn btn-outline-secondary">
        Add item
      </button>
    </div>
  );
};

export default ItemAddForm;
