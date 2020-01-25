import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      class: 'closed',
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
    const active = window.sessionStorage.getItem('active')
    const username = window.sessionStorage.getItem('user_name')
    return (
      <div className='menu_wrapper'>
        <header>
          <div className='menu' onClick={this.toggleMenu}>
            <span className={`menu_burger ${this.state.class}`}></span>
          </div>

          <nav className={`nav ${this.state.class}`}>
            <ul className={`menu-nav ${this.state.class}`}>
              <li className={((active === 'home') ? 'active' : '') + ` menu-nav_item ${this.state.class}`} onClick={() => this.toggleMenu()}>
                <Link to='/home' className='menu-nav_link'>Home</Link>
              </li>
              <li className={((active === 'add') ? 'active' : '') + ` menu-nav_item ${this.state.class}`} onClick={() => this.toggleMenu()}>
                <Link to='/add' className='menu-nav_link'>Add Set</Link>
              </li>
              <li className={((active === 'inventory') ? 'active' : '') + ` menu-nav_item ${this.state.class}`} onClick={() => this.toggleMenu()}>
                <Link to='/inventory' className='menu-nav_link'>Inventory</Link>
              </li>
              <li className={((active === 'explore') ? 'active' : '') + ` menu-nav_item ${this.state.class}`} onClick={() => this.toggleMenu()}>
                <Link to='/explore' className='menu-nav_link'>Explore</Link>
              </li>
              <li 
                className={`menu-nav_item ${this.state.class}`}
                onClick={() => sessionStorage.clear()}  
              >
                <Link to='/' className='menu-nav_link'>Logout</Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className='logged-user' >
          <h1 className='username_header'>{username}</h1>
            <section className='display-favorites'>
              <ul></ul>
            </section>
        </section>
      </div>
    )
  }
}

export default Menu