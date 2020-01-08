import React, { Component } from 'react';

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
        <header>
          <div className='menu' onClick={this.toggleMenu}>
            <span className={`menu_burger ${this.state.class}`}></span>
          </div>

          <nav className={`nav ${this.state.class}`}>
            <ul className={`menu-nav ${this.state.class}`}>
              <li className={`menu-nav_item active ${this.state.class}`}>
                <a href='index.html' className='menu-nav_link'>Home</a>
              </li>
              <li className={`menu-nav_item ${this.state.class}`}>
                <a href='about.html' className='menu-nav_link'>Inventory</a>
              </li>
              <li className={`menu-nav_item ${this.state.class}`}>
                <a href='projects.html' className='menu-nav_link'>Add Set</a>
              </li>
              <li className={`menu-nav_item ${this.state.class}`}>
                <a href='projects.html' className='menu-nav_link'>Logout</a>
              </li>
            </ul>
          </nav>
        </header>

        <main role='main' id='user' >
          <h1>Hello, UserName</h1>
            <section id='search-results'>
              <ul></ul>
            </section>
        </main>
      </div>
    )
  }
}

export default Home
