import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className='root_wrapper'>
        <main role='main' id='landing'>
          <section className='landing_title'>
            <h1>Brickful Builds</h1>
            <h5>LEGO Curation Made Easy</h5>
          </section>
          <section className='landing_hero'>
            <h4><Link to='/registration'><span className='link_span'> Create an account</span></Link> to start organizing your builds like a zen master</h4>
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
          <section>
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu malesuada quam. Nulla sodales enim sed mauris ullamcorper, at convallis nisi dictum. Vestibulum vehicula ante tellus, nec vehicula arcu porttitor at. Nunc varius quis ipsum at convallis. Nunc sed ante non felis ultrices tincidunt. Aenean at semper diam, vitae imperdiet lacus. Nunc vulputate, nibh luctus ornare consectetur, velit turpis faucibus quam, quis finibus lectus nunc at risus. Quisque eu lacus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at erat luctus, convallis purus in, lobortis nisi.</p>
          </section>
        </main>
      </div>
    )
  }
}

export default Landing