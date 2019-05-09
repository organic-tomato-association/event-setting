import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import mySaga from '../sagas'

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(mySaga);
  console.log(store.getState());
  return store;
}