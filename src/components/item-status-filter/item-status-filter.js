import React  from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({onFilterChanges, isLoading})=>  {
 
    return (
      <div className="btn-group">
        <button disabled={isLoading} type="button" className="btn btn-info" onClick={()=>onFilterChanges('all')}>
          All
        </button>
        <button disabled={isLoading} type="button" className="btn btn-outline-secondary" onClick={()=>onFilterChanges('active')}>
          Active
        </button>
        <button disabled={isLoading} type="button" className="btn btn-outline-secondary" onClick={()=>onFilterChanges('done')}>
          Done
        </button>
      </div>
    );

};
export default ItemStatusFilter
