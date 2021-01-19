import _ from 'lodash'
import { DISMISS_NOTIF } from './actions'

const defaultState = []

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case DISMISS_NOTIF:
      return [...state, ...[payload]]
    default:
      return state
  }
}
