import _ from 'lodash'
import { SET_CELL_ID } from './actions'

const defaultState = null

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case SET_CELL_ID:
      return payload
    default:
      return state
  }
}
