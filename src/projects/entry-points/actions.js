/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const [
  createEntryPoint,
  fetchEntryPoints,
  updateEntryPoint,
  archiveEntryPoint,
] = createCrudActionCreators(ZOME_NAME, 'entry_point')

export {
  createEntryPoint,
  fetchEntryPoints,
  updateEntryPoint,
  archiveEntryPoint,
}
