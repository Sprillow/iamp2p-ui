import _ from 'lodash'

import { sendTrx, fetchTrxs } from './actions'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case sendTrx.success().type:
      return {
        ...state,
        [payload.address]: payload.entry,
      }
    case fetchTrxs.success().type:
      const newObj = {}
      payload.forEach(trx => {
        newObj[trx.address] = trx.entry
      })
      return {
        ...state,
        ...newObj,
      }
    default:
      return state
  }
}
