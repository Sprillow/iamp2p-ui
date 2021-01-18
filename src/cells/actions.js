/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

const SET_CELL_ID = 'SET_CELL_ID'

/* action creator functions */

const setCellId = cellId => {
  return {
    type: SET_CELL_ID,
    payload: cellId,
  }
}

export { SET_CELL_ID, setCellId }
