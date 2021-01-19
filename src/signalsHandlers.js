/*
IMPORTANT NOTE

for now, remotely triggered create actions, and update actions, are just dispatching
the same events types, because their payload signatures match,
and the reducers handle them the same way
*/

import { sendTrx } from './trx/actions'
import { setAgent } from './agents/actions'
import { cellIdToString } from 'connoropolous-hc-redux-middleware'

// We directly use the 'success' type, since these actions
// have already succeeded on another machine, and we're just reflecting them locally
function createSignalAction (holochainAction, cellId, payload) {
  return {
    type: holochainAction.success().type,
    payload,
    meta: {
      cellIdString: cellIdToString(cellId),
    },
  }
}

const SignalType = {
  Agent: 'agent',
  Trx: 'trx',
}

export default store => signal => {
  console.log(signal)
  const { cellId, payload } = signal.data

  // otherwise use non-crud actions
  switch (payload.entry_type) {
    case SignalType.Agent:
      // this one is different than the rest on purpose
      // there's no "local action" equivalent
      store.dispatch(setAgent(payload.data))
      break
    case SignalType.Trx:
      store.dispatch(createSignalAction(sendTrx, cellId, payload.data))
      break
    default:
      console.log('unrecognised entry_type received: ', payload.entry_type)
  }
}
