// import { createLogger } from 'redux-logger'
//
// export default preloadedState =>
//   createStore(reducer, preloadedState, applyMiddleware(createLogger()))

/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import reducer from './reducer'

const middlewares = []

const enhancers = [applyMiddleware(...middlewares)]

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose
/* eslint-enable */

export default createStore(reducer, fromJS({}), composeEnhancers(...enhancers))
