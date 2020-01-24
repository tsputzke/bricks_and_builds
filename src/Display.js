import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import TokenService from './services/token-service';
import HomeImg from './images/lego-home.jpg';
import InventoryImg from './images/lego-inventory.jpg';


class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySets: [],
      selected: {},
    }
  }

  componentDidMount() {
    if(this.props.selectId === 'favorites') {
      this.setState({selected: {image_url: HomeImg}})
    }
    else if(this.props.selectId === 'inventory') {
      this.setState({selected: {image_url: InventoryImg}})
    }

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
              className='display_item shadow'
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
    window.scroll({top: 0, left: 0, behavior: 'smooth'})
    return (
      <main role='main' id='display' >
        <header className='display-header'>
          <h1>{this.props.displayTitle}</h1>
          <h5>{this.props.displayHeader}</h5>
        </header>
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <section className='selected'>
          <img className='selected_image shadow' src={this.state.selected.image_url} alt='lego build'></img>
          {this.state.selected.set_name ? (
          <>
            <div className='selected-item'>
              <h2>{this.state.selected.set_name}</h2>
              <div className='selected-flex_container'>
                <a href={`https://rebrickable.com/mocs/${this.state.selected.set_num}`} rel='noopener noreferrer' target='_blank'><button className='selected-item_button'>Build</button></a>
                <button 
                  className='selected-item_button remove_button'
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
          {(this.props.selectId === 'favorites') ? 
            (<Link to='/add'><button className='addset_button'>Add Set</button></Link>)
          : null}
        </section>  
      </main>
    )
  }
}

export default Display