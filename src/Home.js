import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <header>
          <div className='menu'>
            <span className='menu_burger'></span>
          </div>

          <nav className='nav'>
            <ul className="menu-nav">
              <li className="menu-nav_item active">
                <a href="index.html" className="menu-nav_link">Home</a>
              </li>
              <li className="menu-nav_item">
                <a href="about.html" className="menu-nav_link">Inventory</a>
              </li>
              <li className="menu-nav_item">
                <a href="projects.html" className="menu-nav_link">Add Set</a>
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
