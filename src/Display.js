import React, { Component } from 'react';

class Display extends Component {
  render() {
    return (
      <main role='main' id='display' >
        <section className='selected'>
          <div className='selected_image'>
            <img src={this.props.image} alt='text'></img> 
            {/* 
            Selected image (LG): 
            
            if favorite item is selected (tracked in state), else stock img.
            */}
          </div>

          <h1 className='display-text'>Favorites</h1>
          <div className='display_items'>
            {/* 
            favorites/inventory/searched images generated 
            
            onclick auto scroll to top, select image and options (build, info, add, remove)
            */}
            <div className='display_item'></div>
            <div className='display_item'></div>
            <div className='display_item'></div>
            <div className='display_item'></div>
            <div className='display_item'></div>
          </div>
        </section>  
      </main>
    )
  }
}

export default Display