import React, { Component } from 'react';
import Menu from './Menu';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      class: 'closed'
    }
  }  

  toggleMenu = () => {
    if(this.state.class === 'closed') {
      this.setState({class: 'open'});
    } else {
      this.setState({class: 'closed'});
    }
  }

  render() {
    return (
      <div className='root_wrapper'>
        <Menu/>
        <main role='main' id='home' >
          <section className='favorites'>
            <div className='favorites_image'>
              {/* 
              Selected favorites image - LG: 
              
              if favorite item is selected (tracked in state), else stock image.
              */}
            </div>

            <h1 className='favorites-text'>Favorites</h1>
            <div className='favorites_items'>
              {/* 
              favorites images generated 
              
              onclick auto scroll to top, select image and options (build, info, remove)
              */}
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
              <div className='favorites_item'></div>
            </div>
          </section>  
        </main>
      </div>
    )
  }
}

export default Home
