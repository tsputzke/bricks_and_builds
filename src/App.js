import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './css/main.css';

import Landing from './Landing'
import Registration from './Registration'

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
    </Switch>
  );
}

export default App;
