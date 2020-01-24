import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
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
            <h1>Brickful Builds</h1>
            <h5>LEGO Curation Made Easy</h5>
          </section>
          <section id='login' className='shadow'>
            <form 
              id='login-form'
              onSubmit={this.handleLogin}  
            >
              <fieldset>
                <legend>Member Login</legend>
                <div>
                  <label htmlFor="user_name">Username: </label>
                  <br/>
                  <input type="text" name='user_name' id='login-user_name' />
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <br/>
                  <input type="password" name='password' id='login-password' />
                </div>
                <button type='submit'>Login</button>
              </fieldset>
              <h6>Not registered? <br/> <Link to='/registration'><span className='link_span'> Create an account!</span></Link></h6>
              <h6> OR <br/> <span className='link_span' onClick={() => this.handleDemoLogin()}>Login to TestUser</span></h6>
              <div role='alert'>
                {error && <p className='error'>{error}</p>}
              </div>
            </form>
          </section>
          <section id='about_section'>
            <table>
              <tbody>
                <tr>
                  <td><FA className='about_icon create_icon' name='plus-circle'/> </td>
                  <td>Create a digital inventory of your collection</td>
                </tr>
                <tr>
                  <td><FA className='about_icon explore_icon' name='search'/></td>
                  <td>Explore alternate builds possible with your collection</td>
                </tr>
                <tr>
                  <td><FA className='about_icon save_icon' name='save'/></td>
                  <td>Save your favorite builds to revisit any time</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    )
  }
}

export default Landing