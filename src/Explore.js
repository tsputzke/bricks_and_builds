import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Explore extends Component {
  render() {
    const displayTitle = 'Explore'
    const displayHeader = 'See what else you can build with your collection'
    return (
      <div className='root_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader}/>
      </div>
    )
  }
}

export default Explore