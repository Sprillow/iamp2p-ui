/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

const SET_CONVERSE_MESSAGES = 'SET_CONVERSE_MESSAGES'

/* action creator functions */

const setConverseMessages = messages => {
  return {
    type: SET_CONVERSE_MESSAGES,
    payload: messages,
  }
}

export { SET_CONVERSE_MESSAGES, setConverseMessages }
