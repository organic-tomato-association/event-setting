import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { When } from 'react-display-switch';
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import BodyContainer from './containers/BodyContainer';
import HeaderContainer from './containers/HeaderContainer';
import NotFound from './components/NotFound/NotFound';

When.case('screen_xs', () => window.innerWidth < 768)
When.case('screen_md', () => !When.screen_xs && window.innerWidth < 992)
When.case('screen_lg', () => window.innerWidth >= 992)

class App extends Component {
  render() {
    return (
      <Router>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={BodyContainer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
