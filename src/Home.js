import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Home extends Component {
  componentDidMount() {
    window.sessionStorage.setItem('active', 'home');
  }
  
  render() {
    const displayTitle = 'Home'
    const displayHeader = 'Your favorite alternate builds'
    const selectId = 'favorites'
    return (
      <div className='main_wrapper'>
        <Menu/>
        <Display displayTitle={displayTitle} displayHeader={displayHeader} selectId={selectId}/>
      </div>
    )
  }
}

export default Home
