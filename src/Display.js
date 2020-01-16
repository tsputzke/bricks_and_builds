import React, { Component } from 'react';
import config from './config';
import TokenService from './services/token-service';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      selected: {image_url: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg'}
    }
  }

  componentDidMount() {
    // Add array of favorite sets to state
    const userId = window.sessionStorage.getItem('user_id')
      fetch(config.API_ENDPOINT + `/api/favorites/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
      // If call is successful
      .then(res => res.json() )
      .then(res => { this.setState({favorites: res}) })
      // If call fails
      .catch(res => {
        this.setState({ error: res.error })
      })
  } 

  // Return list item for each set
  renderSets = () => {
    const userFavorites = this.state.favorites
    return userFavorites.map((favorite, i) => {
        return <li 
                key={i}
                className='display_item'
                onClick={() => this.updateSelectedState(favorite)}> 
                <img src={favorite.image_url} alt='favorite set'></img>
                <p className='set_name'>{favorite.set_name}</p>
              </li>
    })    
  }

  updateSelectedState = (selected) => {
    this.setState({selected: selected})
  }

  // Handle delete favorite
  deleteFavorite = (favoriteId) => {
    fetch(config.API_ENDPOINT + `/api/favorites/delete/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      // If call is successful
      .then(response => {
        if (!response.ok) {
          // get the error message from the response,
          return response.json().then(error => {
            // then throw it
            throw error
          })
        }
          return({message: 'delete successful'});
      })
      .then(window.location.reload())
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const renderSets = this.renderSets()
    const { error } = this.state
    // Scroll to top of page on any event (select set)
    window.scrollTo(0, 0)
    return (
      <main role='main' id='display' >
        <header className='display-header'>
          <h1>{this.props.displayTitle}</h1>
          <p>{this.props.displayHeader}</p>
        </header>
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <section className='selected'>
          {this.state.selected ? (
          <>
            <img className='selected_image' src={this.state.selected.image_url} alt='alt'></img>
            <div className='selected-item'>
              <h2>Set Name</h2>
              <div className='selected-flex_container'>
                <a href={this.state.selected.build_url} rel='noopener noreferrer' target='_blank'><button className='selected-item_button'>Build</button></a>
                <button 
                  className='selected-item_button'
                  onClick={() => {
                    if (window.confirm("Are you sure you want to remove this set?"))
                    this.deleteFavorite(this.state.selected.favorites_id)
                    window.location ='/home'
                  }}>
                  Remove
                </button>
              </div>
            </div> 
          </>)
          // : this.props.displayHeader
          : null
          }
          <ul className='display_items'>
            {renderSets}
          </ul>
        </section>  
      </main>
    )
  }
}

export default Display