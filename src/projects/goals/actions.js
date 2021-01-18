import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const CREATE_GOAL_WITH_EDGE = 'create_goal_with_edge'
const ARCHIVE_GOAL_FULLY = 'archive_goal_fully'

const createGoalWithEdge = createZomeCallAsyncAction(
  ZOME_NAME,
  CREATE_GOAL_WITH_EDGE
)

const archiveGoalFully = createZomeCallAsyncAction(
  ZOME_NAME,
  ARCHIVE_GOAL_FULLY
)

const [
  createGoal,
  fetchGoals,
  updateGoal,
  archiveGoal,
] = createCrudActionCreators(ZOME_NAME, 'goal')

export {
  // standard crud
  createGoal,
  fetchGoals,
  updateGoal,
  archiveGoal,
  // non-standard
  createGoalWithEdge,
  archiveGoalFully,
}
