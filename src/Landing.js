import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../src/services/auth-api-service'
import TokenService from '../src/services/token-service'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }  

  // User login
  handleLogin = e => {
    e.preventDefault();

    const { user_name, password } = e.target

    const user = {
      user_name: user_name.value.trim(),
      password: password.value.trim(),
    }
    
    AuthApiService.postLogin(user)
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        window.sessionStorage.setItem('user_id', res.user_id)
        window.sessionStorage.setItem('user_name', user.user_name) 
        window.location= '/home'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

    // Demo account credentials
    handleDemoLogin() {
      const user = {
        user_name: 'TestUser',
        password: 'testuser1!',
      }
      
      AuthApiService.postLogin(user)
        .then(res => {
          TokenService.saveAuthToken(res.authToken)
          window.sessionStorage.setItem('user_id', res.user_id)
          window.sessionStorage.setItem('user_name', user.user_name) 
          window.location= '/home'
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }

  render() {
    const { error } = this.state
    return (
      <div className='main_wrapper'>
        <main role='main' id='landing'>
          <section className='landing_title'>
            <h1>Bricks and Builds</h1>
            <h5>LEGO Curation Made Easy</h5>
          </section>
          <section className='landing_hero'>
            <h4><Link to='/registration'><span className='link_span'> Create an account</span></Link> to start organizing your builds like a zen master</h4>
          </section>
          <section id='login'>
            <form 
              id='login-form'
              onSubmit={this.handleLogin}  
            >
              <fieldset>
                <legend>User Login:</legend>
                <div>
                  <label htmlFor="user_name">Username: </label>
                  <input type="text" name='user_name' id='login-user_name' />
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <input type="password" name='password' id='login-password' />
                </div>
                <button type='submit'>Login</button>
              </fieldset>
              <div role='alert'>
                {error && <p className='error'>{error}</p>}
              </div>
            </form>
          </section>
          <section id='about_section'>
            <h2>About</h2>
            <p>Want to create a digital inventory of your LEGO collection? <span className='emphasize'>Bricks and Builds.</span></p>
            <br/>
            <p>Want to explore some amazing alternate builds possible with the pieces that you already have in your collection? <span className='emphasize'>Bricks and Builds.</span></p>
            <br/>
            <p>Want to save your favorites builds so you can go back to them any time you want? That's right. <span className='emphasize'>Bricks and Builds.</span></p>
            <br/>
            <p>Login to a <span className='link_span' onClick={() => this.handleDemoLogin()}>demo account</span> to see for yourself.</p>
          </section>
        </main>
      </div>
    )
  }
}

export default Landing