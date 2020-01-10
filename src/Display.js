import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg'
    }
  }
  render() {
    return (
      <main role='main' id='display' >
        <section className='selected'><img className='selected_image' src={this.state.selected} alt='alt'></img>
          <div className='selected-item'>
            <h1>Selected set name</h1>
            <div className='selected-flex_container'>
              <a href='/' rel='noopener noreferrer' target='_blank'><button className='search-result_button'>Build</button></a>
              <Link to='/home'>
                <button className='selected-item_button'>Remove</button>
              </Link>
            </div>
          </div> 

          <div className='display_items'>
            <div className='display_item' onClick={() => this.setState({selected: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg'})}><img src='https://cdn.rebrickable.com/media/sets/10693-1.jpg' alt='alt'></img></div>
            <div className='display_item' onClick={() => this.setState({selected: 'https://cdn.rebrickable.com/media/sets/10695-1.jpg'})}><img src='https://cdn.rebrickable.com/media/sets/10695-1.jpg' alt='alt'></img></div>
            <div className='display_item' onClick={() => this.setState({selected: 'https://cdn.rebrickable.com/media/sets/10687-1.jpg'})}><img src='https://cdn.rebrickable.com/media/sets/10687-1.jpg' alt='alt'></img></div>
            <div className='display_item' onClick={() => this.setState({selected: 'https://cdn.rebrickable.com/media/sets/10686-1.jpg'})}><img src='https://cdn.rebrickable.com/media/sets/10686-1.jpg' alt='alt'></img></div>
            <div className='display_item' onClick={() => this.setState({selected: 'https://cdn.rebrickable.com/media/sets/10684-1.jpg'})}><img src='https://cdn.rebrickable.com/media/sets/10684-1.jpg' alt='alt'></img></div>
          </div>
        </section>  
      </main>
    )
  }
}

export default Display