import React, { Component } from 'react';
import Menu from './Menu';

class Add extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <Menu/>
        <main role='main' id='add' >
          <section className='selected'>
            <div className='selected_image'>
              {/* 
              Selected favorites image - LG: 
              
              if favorite item is selected (tracked in state), else no display.
              */}
            </div>
            
            <form className='search-set_form'>
              <fieldset>
                <legend>Search for LEGO sets to add to your inventory</legend>
                <label htmlFor='search-set'>Name or set-number:  </label>
                <input type='text' name='search-set' id='search-set' />
                <button type='submit'>Search</button>
              </fieldset>
            </form>
            <h1 className='favorites-text'>Results: </h1>
            <div className='favorites_items'>
              {/* 
              search images generated 
              
              onclick auto scroll to top, select image and options (add, build, info)
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

export default Add