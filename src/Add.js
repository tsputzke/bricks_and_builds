import React, { Component } from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'https://cdn.rebrickable.com/media/sets/10692-1.jpg',
      error: ''
    }
  }

  handleSetSearch = e => {
    e.preventDefault();
    // make a fetch request to rebrickable
    if (!e.target.search_set.value) {
      this.setState({error: 'Enter set number to continue'})
    } else {
    const searchTerm = e.target.search_set.value.trim();

    fetch(`https://rebrickable.com/api/v3/lego/sets/${searchTerm}-1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key f2b3394260806f7bee812c727943dc2d'
      }
    })
    // If call is successful
    .then(res => res.json())
    .then( res => {
      res.set_num ? this.setState({searchResults: res}) : this.setState({error: 'Invalid set number, try again'})
    })
    // If call fails
    .catch(err => console.log(err))
    }
  }

  render() {
    console.log(this.state.searchResults)
    return (
      <div className='root_wrapper'>
        <Menu/>
        <form onSubmit={this.handleSetSearch} className='search_set_form'>
          <fieldset>
            <legend>Search for LEGO sets to add to your inventory</legend>
            <label htmlFor='search_set'>Set-number:  </label>
            <input type='text' name='search_set' id='search_set' />
            <button type='submit'>Search</button>
            {this.state.error ? <p>{this.state.error}</p> : null}
          </fieldset>
        </form>
        {this.state.searchResults ? (
          <>
            <img className='search-image' src={this.state.searchResults.set_img_url} alt='alt'></img>
            <div className='search-result'>
              <h1>{this.state.searchResults.name}</h1>
              <Link to='/home'>
                <button className='search-result_button'>Add</button>
              </Link>
              <a href={this.state.searchResults.set_url} rel='noopener noreferrer' target='_blank'><button className='search-result_button'>Info</button></a>
            </div> 
          </>
        ) : (
          <img className='search-image' src={this.state.placeholder} alt='altPlaceholder'></img>
        )}
      </div>   
    )
  }
}

export default Add