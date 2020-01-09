import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <main role='main' id='registration'>
          <form className='registration_form'>
            <fieldset>
              <legend>Register: </legend>
              <div>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username'id='signup-username' />
              </div>
              <div>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password'id='signup-password' />
              </div>
              <div>
                <label htmlFor='confirm-password'>Confirm Password: </label>
                <input type='password'name='confirm-password'id='singup-confirm-password' />
              </div>
              <button type='submit'>Sign Up</button>
              <p><Link to='/'><span className='link-span'>Already a user?</span></Link></p>
            </fieldset>
          </form>
        </main>
      </div>
    )
  }
}

export default Registration;