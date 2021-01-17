import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './AllPlay.css'

import PlayIntroScreen from './PlayIntroScreen/PlayIntroScreen'
import PlayScreen from './PlayScreen/PlayScreen'
import ProfileCreatedPage from './ProfileCreatedPage/ProfileCreatedPage'
import CreateProfilePage from './CreateProfilePage/CreateProfilePage'

export default function AllPlay({ match }) {
  return (
    <div className='game_wrapper'>
      <div className='game_column_wrapper game_left_column_wrapper'>
      </div>
      <div className='game_center_column_wrapper'>
        <Switch>
          <Route path={`${match.path}/intro`} component={PlayIntroScreen} />
          <Route
            path={`${match.path}/create-profile`}
            component={CreateProfilePage}
          />
          <Route
            path={`${match.path}/profile-created`}
            component={ProfileCreatedPage}
          />
          <Route exact path={`${match.path}`} component={PlayScreen} />
        </Switch>
      </div>
      <div className='game_column_wrapper game_right_column_wrapper'>
      </div>
    </div>
  )
}
