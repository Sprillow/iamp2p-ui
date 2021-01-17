import React from 'react'
import {
  Switch,
  Route,
  NavLink,
  useLocation,
  withRouter,
  useHistory
} from 'react-router-dom'
// import { CSSTransition } from 'react-transition-group'
// import onClickOutside from 'react-onclickoutside'
// import GuideBook from '../GuideBook/GuideBook'
// import { GUIDE_IS_OPEN } from '../GuideBook/guideIsOpen'
import './Header.css'
// import Avatar from '../Avatar/Avatar'
// import Icon from '../Icon/Icon'
// import ListExport from '../ListExport/ListExport'
// import Preferences from '../Preferences/Preferences'
// import Modal from '../Modal/Modal'

function Header () {
  const history = useHistory()

  return (
    <div className='header-wrapper'>
      <div className='header'>
        <div className='left-panel'>
          <div
            className='header-item'
            onClick={() => history.push('/converse')}
          >
            Converse
          </div>
          <div
            className='header-item'
            onClick={() => history.push('/play-intro')}
          >
            Play
          </div>
          <div
            className='header-item'
            onClick={() => history.push('/glossary')}
          >
            Glossary
          </div>
        </div>
        <div className='center-panel'>
          <div className='page-title'>Page Title</div>
        </div>
        <div className='right-panel'>
          <div className='header-item with-left-border'>Invite a Friend</div>
          <div className='header-item'>Join a Game</div>
          <div className='header-item'>You</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
