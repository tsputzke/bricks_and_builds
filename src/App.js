import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/main.css';
import PrivateRoute from '../src/utils/PrivateOnlyRoute';
import PublicOnlyRoute from '../src/utils/PublicOnlyRoute';
import TokenService from './services/token-service';

import Landing from './Landing';
import Registration from './Registration';
import Home from './Home';
import Add from './Add';
import Explore from './Explore';
import Inventory from './Inventory';

class App extends Component {
  render() {

    // If user is logged in
    if (TokenService.hasAuthToken()) {
      // Read the JWT, and queue a timeout just before the token expires.  
      TokenService.queueCallbackBeforeExpiry()
    }

    return (
      <Switch>
        <PublicOnlyRoute
          exact
          path={'/'}
          component={Landing}
        />
        <PublicOnlyRoute
          exact
          path={'/registration'}
          component={Registration}
        />
        <PrivateRoute
          exact
          path={'/home'}
          component={Home}
        />
        <PrivateRoute
          exact
          path={'/add'}
          component={Add}
        />
        <PrivateRoute
          exact
          path={'/explore'}
          component={Explore}
        />
        <PrivateRoute
          exact
          path={'/inventory'}
          component={Inventory}
        />
        <Route
          component={Landing}
        />
      </Switch>
    );
  }
}

export default App;
