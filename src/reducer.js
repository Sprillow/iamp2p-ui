/*
This file is the top level reducer.
Import all the reducers from each feature here

"reducers" are the things that contain key application logic
of how ACTIONS affect STATE
*/

import { combineReducers } from 'redux'

import agents from './agents/reducer'
import whoami from './who-am-i/reducer'
import agentAddress from './agent-address/reducer'
import projects from './projects/reducer'
import goalForm from './goal-form/reducer'
import selection from './selection/reducer'
import hover from './hover/reducer'
import keyboard from './keyboard/reducer'
import mouse from './mouse/reducer'
import screensize from './screensize/reducer'
import viewport from './viewport/reducer'
import expandedView from './expanded-view/reducer'
import goalClone from './goal-clone/reducer'
import activeProject from './active-project/reducer'
// import anotherone from './another/path'

// combine reducers from each feature to create the top-level reducer
export default combineReducers({
  agents,
  projects,
  whoami,
  agentAddress,
  ui: combineReducers({
    goalForm,
    selection,
    hover,
    keyboard,
    screensize,
    viewport,
    mouse,
    expandedView,
    goalClone,
    activeProject,
  }), // ,
  // anotherone: anotherone
})
