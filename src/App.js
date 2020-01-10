import React from 'react';
import { Switch } from 'react-router-dom';
import './css/main.css';

import Landing from './Landing';
import Registration from './Registration';
import Home from './Home';
import Add from './Add';
import Explore from './Explore';

function App() {
  return (
    <Switch>
      <Landing
        exact
        path={'/'}
      />
      <Registration
        exact
        path={'/registration'}
      />
      <Home
        exact
        path={'/home'}
      />
      <Add
        exact
        path={'/add'}
      />
      <Explore
        exact
        path={'/explore'}
      />
      <Landing/>
    </Switch>
  );
}

export default App;
