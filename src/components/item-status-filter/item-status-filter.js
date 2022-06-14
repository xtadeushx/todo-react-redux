import React  from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({handleFilterActiveTodo,handleFilterDoneTodo,handleFilterAllTodo})=>  {
 
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-info" onClick={handleFilterAllTodo}>
          All
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={handleFilterActiveTodo}>
          Active
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={handleFilterDoneTodo}>
          Done
        </button>
      </div>
    );

};
export default ItemStatusFilter
