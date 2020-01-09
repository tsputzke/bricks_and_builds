import React, { Component } from 'react';
import Menu from './Menu';

class Inventory extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <Menu/>
        <main role='main' id='inventory' >
          <section className='selected'>
            <div className='selected_image'>
              {/* 
              Selected inventory image - LG: 
              
              if favorite item is selected (tracked in state), else no display.
              */}
            </div>

            <h1 className='favorites-text'>Favorites</h1>
            <div className='favorites_items'>
              {/* 
              favorites images generated 
              
              onclick auto scroll to top, select image and options (build, info, remove)
              */}
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
            </div>
          </section>  
        </main>
      </div>
    )
  }
}

export default Inventory