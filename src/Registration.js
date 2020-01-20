import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../src/services/auth-api-service'

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      user_name: '',
      password: '',
      userAdded: false,
      error: null,
    };
  }

  // Handle registration of new user
  handleNewUser = e => {
    e.preventDefault();
    const { user_name, password, confirm_password } = e.target

    // Confirm username is greater than 5 characters in length
    if (user_name.value.length < 5) {
      this.setState({ error: 'Username must be 5+ characters' })
      // window.location ='/registration'
      throw Error
    }

    // Confirm that passwords match
    if (password.value !== confirm_password.value) {
      this.setState({ error: 'Passwords must match' })
      // window.location ='/registration'
      throw Error
    }

    this.setState({ error: null })
      AuthApiService.postUser({
        user_name: user_name.value,
        password: password.value,
      })
        .then(user => {
          user_name.value = ''
          password.value = ''
          .then(window.location= '/')
        })  
        .catch(res => {
          this.setState({ error: res.error })
        })
  }

  render() {
    const { error } = this.state
    return (
      <div className='main_wrapper'>
        <main role='main' id='registration'>
          <form className='registration_form' onSubmit={this.handleNewUser}>
            <fieldset>
              <legend>Register: </legend>
              <div>
                <label htmlFor='user_name'>Username: </label>
                <input type='text' name='user_name'id='signup-user_name' />
              </div>
              <div>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password'id='signup-password' />
              </div>
              <div>
                <label htmlFor='confirm_password'>Confirm Password: </label>
                <input type='password'name='confirm_password'id='signup-confirm_password' />
              </div>
              <button type='submit'>Sign Up</button>
              <p><Link to='/'><span className='link-span'>Already a user?</span></Link></p>
              <div className="password-rules">
                <strong>Password must contain: </strong>
                <ul>
                  <li>5+ characters.</li>
                  <li>At least 1 number.</li>
                  <li>At least 1 special character.</li>
                </ul>
              </div>
            </fieldset>
            <div role='alert'>
              {error && <p className='error'>{error}</p>}
            </div>
          </form>
        </main>
      </div>
    )
  }
}

export default Registration;