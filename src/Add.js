import React, { Component } from 'react';
import Menu from './Menu';
import config from './config';
import TokenService from './services/token-service';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'https://cdn.rebrickable.com/media/sets/10692-1.jpg',
      error: ''
    }
  }

  // get set by set_id
  handleSetSearch = e => {
    e.preventDefault();
    this.setState({error: ''})
    if (!e.target.search_set.value) {
      this.setState({error: 'Enter set number to continue'})
    } else {
    const searchTerm = e.target.search_set.value.trim();
    fetch(`http://localhost:8000/api/rebrickable/${searchTerm}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    // If call is successful
    .then(res => res.json())
    .then( res => {
      res.set_num ? 
        this.setState({searchResults: res}) : 
        this.setState({searchResults: null, error: 'Invalid set number, try again'})
    })
    // If call fails
    .catch(res => {
      this.setState({ error: res.error })
    })
    }
  }

  // Handle add set to inventory
  handleNewSet = e => {
    e.preventDefault();

    const newSet = {
      user_id: window.sessionStorage.getItem('user_id'),
      set_name: this.state.searchResults.name, 
      image_url: this.state.searchResults.set_img_url, 
      build_url: this.state.searchResults.set_url 
    };

    fetch(config.API_ENDPOINT + `/api/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newSet),
    })
      // If call is successful
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(window.location = '/inventory')
    }

  render() {
    console.log(this.state.searchResults)
    const { error } = this.state
    return (
      <div className='root_wrapper'>
        <Menu/>
        <form onSubmit={this.handleSetSearch} className='search_set_form'>
          <fieldset>
            <legend>Add LEGO sets that you own to your inventory, then explore more possibilities!</legend>
            <label htmlFor='search_set'>Set-number:  </label>
            <input type='text' name='search_set' id='search_set' maxLength='6'/>
            <button type='submit'>Search</button>
            {error.length ? <p>{error}</p> : null}
          </fieldset>
        </form>
        {this.state.searchResults ? (
          <>
            <img className='search-image' src={this.state.searchResults.set_img_url} alt='alt'></img>
            <div className='selected-item'>
              <h1>{this.state.searchResults.name}</h1>
              <div className='selected-flex_container'>
                <button onClick={this.handleNewSet} className='selected-item_button'>Add</button>
                <a href={this.state.searchResults.set_url} rel='noopener noreferrer' target='_blank'><button className='selected-item_button'>Info</button></a>
              </div>
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