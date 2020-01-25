import React, { Component } from 'react';
import Menu from './Menu';
import config from './config';
import TokenService from './services/token-service';
import LegoSetId from './images/lego-set_id.jpg';
import Context from './Context';

class Add extends Component {
  static contextType = Context

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  componentDidMount() {
    this.context.handleActive('add');
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
      set_num: this.state.searchResults.set_num 
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
    const { error } = this.state
    return (
      <div className='main_wrapper'>
        <Menu/>
        <main role='main' id='add'>
          <header className='display-header'>
            <h1>Add Set</h1>
            <h5>Add sets that you own to your inventory</h5>
          </header>
          {this.state.searchResults ? (
            <>
              <img className='search-image' src={this.state.searchResults.set_img_url} alt='alt'></img>
              <div className='selected-item'>
                <h2>{this.state.searchResults.name}</h2>
                <div className='selected-flex_container'>
                  <button onClick={this.handleNewSet} className='selected-item_button'>Add</button>
                  <a href={this.state.searchResults.set_url} rel='noopener noreferrer' target='_blank'><button className='selected-item_button info_button'>Info</button></a>
                </div>
              </div> 
            </>
          ) : (
            <img className='search-image' src={LegoSetId} alt='LEGO box with set_id'></img>
          )}
          <form onSubmit={this.handleSetSearch} className='search_set_form'>
            <fieldset>
              <label htmlFor='search_set'>Set-number:  </label>
              <input type='text' name='search_set' id='search_set' maxLength='6'/>
              <button type='submit'>Search</button>
              <div role='alert'>
              {error && <p className='error'>{error}</p>}
              </div>
            </fieldset>
          </form>
        </main>
      </div>   
    )
  }
}

export default Add