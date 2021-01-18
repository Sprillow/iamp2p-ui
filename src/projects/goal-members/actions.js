import { ZOME_NAME } from '../../holochainConfig'
import { createCrudActionCreators } from '../../crudRedux'

const [
  createGoalMember,
  fetchGoalMembers,
  updateGoalMember,
  archiveGoalMember,
] = createCrudActionCreators(ZOME_NAME, 'goal_member')

export {
  createGoalMember,
  fetchGoalMembers,
  updateGoalMember,
  archiveGoalMember,
}
