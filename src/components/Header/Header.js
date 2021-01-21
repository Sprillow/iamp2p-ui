import React from 'react'
import {
  Switch,
  Route,
  NavLink,
  useLocation,
  withRouter,
  useHistory,
} from 'react-router-dom'
import './Header.css'

function Header ({ openShowInviteModal, hasJoinedGame, whoami }) {
  const history = useHistory()
  const location = useLocation()

  return (
    <div className='header-wrapper'>
      <div className='header'>
        <div className='left-panel'>
          <div
            className={`header-item ${
              location.pathname.includes('/converse')
                ? 'active-header-item'
                : ''
            }`}
            onClick={() => history.push('/converse')}>
            Converse
          </div>
          <div
            className={`header-item ${
              location.pathname.includes('/play') ? 'active-header-item' : ''
            }`}
            onClick={() => history.push('/play/intro')}>
            Play
          </div>
          <div
            className={`header-item last ${
              location.pathname.includes('/glossary')
                ? 'active-header-item'
                : ''
            }`}
            onClick={() => history.push('/glossary')}>
            Glossary
          </div>
        </div>
        <div className='center-panel'>
          <div className='page-title'>
            <Route path='/intro' component={() => <>Welcome</>} />
            <Route path='/play' component={() => <>Transact Game</>} />
            <Route path='/glossary' component={() => <>Glossary</>} />
            <Route path='/converse' component={() => <>Chat with IamP2P</>} />
            <Route path='/you' component={() => <>Your Profile</>} />
          </div>
        </div>
        <div className='right-panel'>
          {whoami && (
            <div
              className='header-item with-left-border'
              onClick={openShowInviteModal}>
              Invite a Friend
            </div>
          )}
          {!hasJoinedGame && (
            <>
              <div
                className='header-item'
                onClick={() => history.push('/play/intro')}>
                Start a Game
              </div>
              <div
                className='header-item'
                onClick={() => history.push('/play/intro')}>
                Join a Game
              </div>
            </>
          )}
          {whoami && (
            <div className='header-item' onClick={() => history.push('/you')}>
              Your Profile
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
