import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { createCrudActionCreators } from '../../crudRedux'
import { ZOME_NAME } from '../../holochainConfig'

const [
  createProjectMeta,
  fetchProjectMetas,
  updateProjectMeta,
  archiveProjectMeta,
] = createCrudActionCreators(ZOME_NAME, 'project_meta')

// This model has a special "singular fetch"
// since a Project is only supposed to contain ONE
// ProjectMeta record
const FETCH_PROJECT_META = 'fetch_project_meta'
const fetchProjectMeta = createZomeCallAsyncAction(
  ZOME_NAME,
  FETCH_PROJECT_META
)

export {
  createProjectMeta,
  fetchProjectMetas,
  updateProjectMeta,
  fetchProjectMeta,
  archiveProjectMeta,
}
