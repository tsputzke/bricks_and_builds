import React, { Component } from 'react';
import Menu from './Menu';
import Display from './Display';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://cdn.rebrickable.com/media/sets/10692-1.jpg'
    }
  }

  handleSetSearch = e => {
    e.preventDefault();
    // make a fetch request to rebrickable
    const searchTerm = e.target.search_set.value.trim();

    fetch(`https://rebrickable.com/api/v3/lego/sets/${searchTerm}` + '-1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key f2b3394260806f7bee812c727943dc2d'
      }
    })
    // If call is successful
    .then(res => res.json())
    .then( res => {
      this.setState({searchResults: res})
    })
    // If call fails
    .catch(err => console.log(err))
  }

  render() {
    const image = this.state.searchResults ? this.state.searchResults.set_img_url : null
    return (
      <div className='root_wrapper'>
        <Menu/>
        <img className='search-image' src={this.state.searchResults ? image : this.state.image} alt='alt'></img>
        <form onSubmit={this.handleSetSearch} className='search_set_form'>
          <fieldset>
            <legend>Search for LEGO sets to add to your inventory</legend>
            <label htmlFor='search_set'>Set-number:  </label>
            <input type='text' name='search_set' id='search_set' />
            <button type='submit'>Search</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Add