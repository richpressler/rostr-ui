import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { SendWelcome } from './SendWelcome';

export class App extends React.Component {

  render() {
    return (
      <div>
        <div className="header">
          <img className="logo" src="/Logo.svg"></img>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/send-welcome/:client/:recipients" component={SendWelcome}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}