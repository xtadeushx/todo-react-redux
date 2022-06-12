import React, { Component } from 'react';
import './item-add-form.css';
export class ItemAddForm extends Component {
  render() {
    return (
      <div className="item-add-form">
          <button onClick ={()=>this.props.onItemAdded('Some text')} className="btn btn-outline-secondary">Add item</button>
      </div>
    )
  }
}

export default ItemAddForm;
