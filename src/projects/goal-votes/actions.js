import { ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const [
  createGoalVote,
  fetchGoalVotes,
  updateGoalVote,
  archiveGoalVote,
] = createCrudActionCreators(ZOME_NAME, 'goal_vote')

export { createGoalVote, fetchGoalVotes, updateGoalVote, archiveGoalVote }
