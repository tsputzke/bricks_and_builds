import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Inventory extends Component {
  render() {
    const displayTitle = 'Inventory'
    const displayHeader = 'LEGO sets in your collection'
    return (
      <div className='root_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader}/>
      </div>
    )
  }
}

export default Inventory