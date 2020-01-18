import React, { Component } from 'react';
import config from './config';
import TokenService from './services/token-service';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySets: [],
      selected: {image_url: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg'},
      selectId: ''
    }
  }

  componentDidMount() {
    // Add array of sets to state
    const userId = window.sessionStorage.getItem('user_id')
      fetch(config.API_ENDPOINT + `/api/${this.props.selectId}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
      // If call is successful
      .then(res => res.json() )
      .then(res => { this.setState({displaySets: res}) })
      // If call fails
      .catch(res => {
        this.setState({ error: res.error })
      })
  } 

  // Return list item for each set
  renderSets = () => {
    const userSets = this.state.displaySets
    return userSets.map((set, i) => {
        return <li 
                key={i}
                className='display_item'
                onClick={() => this.updateSelectedState(set)}> 
                <img src={set.image_url} alt='set in display'></img>
                <p className='set_name'>{set.set_name}</p>
              </li>
    })    
  }

  updateSelectedState = (selected) => {
    this.setState({selected: selected})
  }

  // Handle delete set
  deleteSet = (setId) => {
    fetch(config.API_ENDPOINT + `/api/${this.props.selectId}/delete/${setId}`, {
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
    // if home choose id as favorites, else choose id as inventory 
    const deleteId = this.state.selected.favorites_id ? this.state.selected.favorites_id : this.state.selected.inventory_id
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
                    this.deleteSet(deleteId)
                    window.location.reload()
                  }}>
                  Remove
                </button>
              </div>
            </div> 
          </>)
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