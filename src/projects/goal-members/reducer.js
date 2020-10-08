/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import {
  createGoalMember,
  fetchGoalMembers,
  updateGoalMember,
  archiveGoalMember,
} from './actions'
import { archiveGoal } from '../goals/actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  if (
    isCrud(
      action,
      createGoalMember,
      fetchGoalMembers,
      updateGoalMember,
      archiveGoalMember
    )
  ) {
    return crudReducer(
      state,
      action,
      createGoalMember,
      fetchGoalMembers,
      updateGoalMember,
      archiveGoalMember
    )
  }

  let cellId
  if (action.meta && action.meta.cell_id) {
    cellId = action.meta.cell_id
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
          (value, key) => payload.archived_goal_members.indexOf(key) === -1
        ),
      }
    // DEFAULT
    default:
      return state
  }
}
