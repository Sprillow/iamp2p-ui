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
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

// Local Imports
import iamp2p from './reducer'
import signalsHandlers from './signalsHandlers'
import { setCellId } from './cells/actions'
import App from './routes/App'
import { getAppWs, getAdminWs, APP_WS_URL } from './hcWebsockets'

// trigger caching of adminWs connection
getAdminWs().then(async adminClient => {
  try {
    await adminClient.attachAppInterface({ port: 8888 })
  } catch (e) {
    console.log('address 8888 was already in use')
  }
  const middleware = [holochainMiddleware(APP_WS_URL)]
  // This enables the redux-devtools browser extension
  // which gives really awesome debugging for apps that use redux
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // iamp2p is the top-level reducer. the second argument is custom Holochain middleware
  let store = createStore(
    iamp2p,
    /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
  )

  // initialize the appWs with the signals handler
  getAppWs(signalsHandlers(store)).then(async appClient => {
    const activeApps = await adminClient.listActiveApps()
    if (activeApps.length > 0) {
      const appId = activeApps[0]
      const profilesInfo = await appClient.appInfo({
        installed_app_id: appId,
      })
      const [cellId, _] = profilesInfo.cell_data[0]
      const [_dnaHash, agentPubKey] = cellId
      // cache buffer version of agentPubKey
      // setAgentPubKey(agentPubKey)
      const cellIdString = cellIdToString(cellId)
      store.dispatch(setCellId(cellIdString))
    }
  })

  // By passing the `store` in as a wrapper around our React component
  // we make the state available throughout it
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react')
  )
})
