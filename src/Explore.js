import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Explore extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <Menu/>
        <Display/>
      </div>
    )
  }
}

export default Explore