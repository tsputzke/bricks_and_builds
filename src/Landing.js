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

  render() {
    const { error } = this.state
    return (
      <div className='root_wrapper'>
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
            </form>
          </section>
          <section>
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu malesuada quam. Nulla sodales enim sed mauris ullamcorper, at convallis nisi dictum. Vestibulum vehicula ante tellus, nec vehicula arcu porttitor at. Nunc varius quis ipsum at convallis. Nunc sed ante non felis ultrices tincidunt. Aenean at semper diam, vitae imperdiet lacus. Nunc vulputate, nibh luctus ornare consectetur, velit turpis faucibus quam, quis finibus lectus nunc at risus. Quisque eu lacus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at erat luctus, convallis purus in, lobortis nisi.</p>
          </section>
        </main>
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
      </div>
    )
  }
}

export default Landing