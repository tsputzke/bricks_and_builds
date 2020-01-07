import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './css/main.css';

import Landing from './Landing'

function App() {
  return (
    <Switch>
      <Landing
        exact
        path={'/'}
      />
    </Switch>
  );
}

export default App;
