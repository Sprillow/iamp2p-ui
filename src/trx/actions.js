/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { ZOME_NAME } from '../holochainConfig'

/* action creator functions */

const sendTrx = createZomeCallAsyncAction(ZOME_NAME, 'create_trx')

const fetchTrxs = createZomeCallAsyncAction(ZOME_NAME, 'fetch_trxs')

export { sendTrx, fetchTrxs }
