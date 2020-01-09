import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Add extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <Menu/>
          <form className='search-set_form'>
            <fieldset>
              <legend>Search for LEGO sets to add to your inventory</legend>
              <label htmlFor='search-set'>Name or set-number:  </label>
              <input type='text' name='search-set' id='search-set' />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        <Display/>
      </div>
    )
  }
}

export default Add