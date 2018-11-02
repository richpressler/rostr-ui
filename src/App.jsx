import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';
import { Dashboard } from './Dashboard';

export class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    );
  }
}
