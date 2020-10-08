
import _ from 'lodash'

import {
  createGoalVote,
  fetchGoalVotes,
  updateGoalVote,
  archiveGoalVote,
} from './actions'
import { archiveGoal } from '../goals/actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  if (
    isCrud(
      action,
      createGoalVote,
      fetchGoalVotes,
      updateGoalVote,
      archiveGoalVote
    )
  ) {
    return crudReducer(
      state,
      action,
      createGoalVote,
      fetchGoalVotes,
      updateGoalVote,
      archiveGoalVote
    )
  }

  let cellId
  if (action.meta && action.meta.cellIdString) {
    cellId = action.meta.cellIdString
  }

  switch (type) {
    // ARCHIVE_GOAL
    case archiveGoal.success().type:
      // filter out the Goalmembers whose addresses are listed as having been
      // archived on account of having archived the Goal it relates to
      return {
        ...state,
        [cellId]: _.pickBy(
          state[cellId],
          (value, key) => payload.archived_goal_votes.indexOf(key) === -1
        ),
      }
    // DEFAULT
    default:
      return state
  }
}
