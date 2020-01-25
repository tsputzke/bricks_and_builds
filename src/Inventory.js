import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';
import Context from './Context';

class Inventory extends Component {
  static contextType = Context

  componentDidMount() {
    this.context.handleActive('inventory');
  }

  render() {
    const displayTitle = 'Inventory'
    const displayHeader = 'LEGO sets in your collection'
    const selectId = 'inventory'
    return (
      <div className='main_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader} selectId={selectId}/>
      </div>
    )
  }
}

export default Inventory