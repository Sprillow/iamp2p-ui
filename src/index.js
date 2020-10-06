/*
  This file is ENTRY POINT to the entire web application.
  Only code that gets called at some point from this file (via imports or otherwise)
  will get executed in the browser window.
  Try to keep it clean and minimal in this file, and outsource aspects to more
  modular code in separate files, imported here and called.
*/

// Library Imports
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { holochainMiddleware } from 'connoropolous-hc-redux-middleware'

// Local Imports
import {
  DEVELOPMENT_HOLOCHAIN_PORT,
  PRODUCTION_HOLOCHAIN_PORT,
  DEFAULT_HOLOCHAIN_HOST,
} from './holochainConfig'
import acorn from './reducer'
import signalsHandlers from './signalsHandlers'
import { fetchAgents } from './agents/actions'
import {
  fetchProjectsDnas,
  fetchProjectsInstances,
} from './projects/conductor-admin/actions'
import { whoami } from './who-am-i/actions'
import { fetchAgentAddress } from './agent-address/actions'
import App from './routes/App'

const urlConfig = {
  appUrl: 'ws://localhost:8888',
  adminUrl: 'ws://localhost:1234',
}

// holochainMiddleware takes in the hc-web-client websocket connection
// and uses it to facilitate the calls to Holochain
const middleware = [holochainMiddleware(urlConfig)]

// This enables the redux-devtools browser extension
// which gives really awesome debugging for apps that use redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// acorn is the top-level reducer. the second argument is custom Holochain middleware
let store = createStore(
  acorn,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
)

// set up a "signal" or "events" listener, once
// there is a connection to the Holochain Conductor
// hcWebClient.then(({ onSignal }) => {
//   signalsHandlers(store, onSignal)
// })

// store.dispatch(fetchProjectsDnas.create(null))
// store.dispatch(fetchProjectsInstances.create(null))
store.dispatch(fetchAgents.create(null))
store.dispatch(whoami.create(null))
store.dispatch(fetchAgentAddress.create(null))

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
)
