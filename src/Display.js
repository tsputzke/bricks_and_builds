import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // selected: 'https://cdn.rebrickable.com/media/sets/10693-1.jpg'
    }
  }

  render() {
    // Scroll to top of page on any event (select set)
    window.scrollTo(0, 0)
    return (
      <main role='main' id='display' >
        <header className='display-header'>
          <h1>{this.props.displayTitle}</h1>
          <p>{this.props.displayHeader}</p>
        </header>
        <section className='selected'>
          {this.state.selected ? (
          <>
            <img className='selected_image' src={this.state.selected} alt='alt'></img>
            <div className='selected-item'>
              <h2>Set Name</h2>
              <div className='selected-flex_container'>
                <a href='/' rel='noopener noreferrer' target='_blank'><button className='selected-item_button'>Build</button></a>
                <Link to='/home'>
                  <button className='selected-item_button'>Remove</button>
                </Link>
              </div>
            </div> 
          </>)
          // : this.props.displayHeader
          : null
          }

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