import React  from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({onFilterChanges})=>  {
 
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-info" onClick={()=>onFilterChanges('all')}>
          All
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={()=>onFilterChanges('active')}>
          Active
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={()=>onFilterChanges('done')}>
          Done
        </button>
      </div>
    );

};
export default ItemStatusFilter
