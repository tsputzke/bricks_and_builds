import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './css/main.css';

import Landing from './Landing'
import Registration from './Registration'
import Home from './Home'

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
    </Switch>
  );
}

export default App;
