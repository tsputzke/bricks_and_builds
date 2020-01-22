import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Inventory extends Component {
  componentDidMount() {
    window.sessionStorage.setItem('active', 'inventory');
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