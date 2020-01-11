import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Home extends Component {
  render() {
    const displayTitle = 'Home'
    const displayHeader = 'Select one of your favorite builds'
    return (
      <div className='root_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader} />
      </div>
    )
  }
}

export default Home
