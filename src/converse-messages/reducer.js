import _ from 'lodash'
import { SET_CONVERSE_MESSAGES } from './actions'

const defaultState = []

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case SET_CONVERSE_MESSAGES:
      return payload
    default:
      return state
  }
}
