import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { fetchProjectMeta } from '../projects/project-meta/actions'
import { fetchAgents } from '../agents/actions'
import { fetchAgentAddress } from '../agent-address/actions'
import { whoami as whoamiAction, updateWhoami } from '../who-am-i/actions'
import { setNavigationPreference } from '../local-preferences/actions'
import { getAdminWs, getAppWs } from '../hcWebsockets'

// import components here
import Header from '../components/Header/Header'
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import InviteMembersModal from '../components/InviteMembersModal/InviteMembersModal'
import Footer from '../components/Footer/Footer'
import Modal from '../components/Modal/Modal'
import Preferences from '../components/Preferences/Preferences'

// import new routes here
import IntroScreen from './IntroScreen/IntroScreen'
import ConverseView from './ConverseView/ConverseView'
import AllPlay from './AllPlay/AllPlay'
import GlossaryScreen from './GlossaryScreen/GlossaryScreen'
import Dashboard from './Dashboard/Dashboard'
import ProjectView from './ProjectView/ProjectView'
import selectEntryPoints from '../projects/entry-points/select'
import ErrorBoundaryScreen from '../components/ErrorScreen/ErrorScreen'

function App ({
  cellIdString,
  agentAddress,
  whoami,
  hasFetchedForWhoami,
  dispatch,
  passphrase,
}) {
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)
  useEffect(() => {
    getAdminWs().then(async client => {
      const activeApps = await client.listActiveApps()
      if (activeApps.length > 0) {
        setInGame(true)
      } else {
        setInGame(false)
      }
      setHasCheckedInGame(true)
    })
  }, [])

  useEffect(() => {
    if (cellIdString) {
      dispatch(fetchAgents.create({ cellIdString, payload: null }))
      dispatch(whoamiAction.create({ cellIdString, payload: null }))
      dispatch(fetchAgentAddress.create({ cellIdString, payload: null }))
      dispatch(fetchProjectMeta.create({ cellIdString, payload: null }))
    }
  }, [cellIdString])

  return (
    <ErrorBoundaryScreen>
      <Router>
        {/* Header Global */}
        <Header
          hasJoinedGame={!!cellIdString}
          whoami={whoami}
          openShowInviteModal={() => setShowInviteMembersModal(true)}
        />
        <Switch>
          {/* Add new routes in here */}
          <Route path='/intro' component={IntroScreen} />
          <Route path='/converse' component={ConverseView} />
          <Route path='/play' component={AllPlay} />
          <Route path='/glossary' component={GlossaryScreen} />
          <Route path='/' render={() => <Redirect to='/intro' />} />
        </Switch>
        {!hasCheckedInGame && <LoadingScreen />}
        {agentAddress && whoami && <Footer />}
        <InviteMembersModal
          passphrase={passphrase}
          showModal={showInviteMembersModal}
          onClose={() => setShowInviteMembersModal(false)}
        />
      </Router>
    </ErrorBoundaryScreen>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

function mapStateToProps (state) {
  const {
    ui: { hasFetchedForWhoami },
    cells: cellIdString,
    whoami,
    agentAddress,
  } = state

  const projectMeta = state.projects.projectMeta[cellIdString]
  let passphrase
  if (projectMeta) {
    passphrase = projectMeta.passphrase
  }

  return {
    passphrase,
    cellIdString,
    whoami,
    hasFetchedForWhoami,
    agentAddress,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
