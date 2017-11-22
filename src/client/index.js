import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app/App', () => {
    render(App);
  });
}
