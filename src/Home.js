import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Home extends Component {
  render() {
    const displayTitle = 'Home'
    const displayHeader = 'Select one of your favorite builds'
    const selectId = 'favorites'
    return (
      <div className='root_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader} selectId={selectId}/>
      </div>
    )
  }
}

export default Home
