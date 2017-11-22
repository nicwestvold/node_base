import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../store';
import Home from './one/Home';
import Two from './two/Two';
import './app.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/two" component={Two} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
