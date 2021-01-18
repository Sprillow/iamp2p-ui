/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { ZOME_NAME } from '../holochainConfig'

/* action creator functions */

const whoami = createZomeCallAsyncAction(ZOME_NAME, 'whoami')

const createWhoami = createZomeCallAsyncAction(ZOME_NAME, 'create_whoami')

const updateWhoami = createZomeCallAsyncAction(ZOME_NAME, 'update_whoami')

export { whoami, createWhoami, updateWhoami }
