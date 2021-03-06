import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { ZOME_NAME } from '../../holochainConfig'

/* action creator functions */
const FETCH_GOAL_HISTORY = 'fetch_goal_history'

const fetchGoalHistory = createZomeCallAsyncAction(
  ZOME_NAME,
  FETCH_GOAL_HISTORY
)

export { FETCH_GOAL_HISTORY, fetchGoalHistory }
