import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import config from '../config';
import rootReducer from './reducers';
import sagas from './sagas';

const initialState = window.___INITIAL_STATE__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware), ...enhancers));

// then run the saga
sagaMiddleware.run(sagas);

// HMR
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default;
    store.replaceReducer(reducers);
  });
}

export default store;
