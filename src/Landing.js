import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <main role='main' id='landing'>
        <section className='landing_title'>
          <h1>Brickful Builds</h1>
          <h5>LEGO Curation Made Easy</h5>
        </section>
        <section className='landing_hero'>
          <h4><Link to='/registration'><span className='link_span'> Create an account</span></Link> to start organizing your builds today!</h4>
        </section>
        <section id='login'>
          <form id='login-form'>
            <fieldset>
              <legend>User Login:</legend>
              <div>
                <label htmlFor="username">Username: </label>
                <input type="text" name='username' id='login-username' />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name='password' id='login-password' />
              </div>
              <button type='submit'>Login</button>
            </fieldset>
          </form>
        </section>
      </main>
    )
  }
}

export default Landing