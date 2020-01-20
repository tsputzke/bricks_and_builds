import React, { Component } from 'react';
import Menu from './Menu';
import config from './config';
import TokenService from './services/token-service';

class Explore extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      alternates: [],
      placeholder: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg',
      selected: {},
    }
  }

  componentDidMount() {
    const alternates = [];
    // Add array of sets to state
    fetch(config.API_ENDPOINT + `/api/inventory/${window.sessionStorage.getItem('user_id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => res.json() )
    .then(res => res)
    .then(async res => {
      await Promise.all(res.map((set) => {
        return fetch(config.API_ENDPOINT + `/api/rebrickable/alternates/${set.set_num}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
        .then(res => res.json() )
        .then(res => { 
          res.results.map(set => alternates.push(set))
          this.setState({alternates: alternates})
          return res
        })
      }))
    });
  }

  // Return list item for each set
  renderSets = () => {
    const userSets = this.state.alternates
    return userSets.map((set, i) => {
      return <li 
              key={i}
              className='display_item'
              onClick={() => this.updateSelectedState(set)}> 
              <img src={set.moc_img_url} alt='set in display'></img>
              <p className='set_name'>{set.name}</p>
            </li>
    })    
  }
  
  updateSelectedState = (selected) => {
    this.setState({selected: selected})
  }

  // Handle add set to favorites
  handleNewSet = e => {
    e.preventDefault();

    const newSet = {
      user_id: window.sessionStorage.getItem('user_id'),
      set_name: this.state.selected.name, 
      image_url: this.state.selected.moc_img_url, 
      set_num: this.state.selected.set_num 
    };

    fetch(config.API_ENDPOINT + `/api/favorites`, {
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
      .then(window.location = '/home')
    }

  render() {
    const renderSets = this.renderSets();
    const { error } = this.state;
    // Scroll to top of page on any event (select set)
    window.scrollTo(0, 0)
    return (
      <div className='main_wrapper'>
        <Menu/>
          <main role='main' id='explore'>
            <header className='display-header'>
              <h1>Explore</h1>
              <p>Find some inspiration</p>
            </header>
            <div role='alert'>
              {error && <p className='error'>{error}</p>}
            </div>
            <section className='selected'>
              {this.state.selected.name ? (
              <>
                <img className='selected_image' src={this.state.selected.moc_img_url} alt='alt'></img>
                <div className='selected-item'>
                  <h2>Set Name</h2>
                  <div className='selected-flex_container'>
                    <button onClick={this.handleNewSet} className='selected-item_button'>Add</button>
                    <a href={`${this.state.selected.moc_url}/#bi`} rel='noopener noreferrer' target='_blank'><button className='selected-item_button'>Build</button></a>
                  </div>
                </div> 
              </>)
              : <img className='selected_image' src={this.state.placeholder} alt='alt'></img>
              }
              <ul className='display_items'>
                {renderSets}
              </ul>
            </section>  
          </main>
        </div>      
    )
  }
}

export default Explore