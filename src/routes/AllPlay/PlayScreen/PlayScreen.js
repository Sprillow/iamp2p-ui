import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

import './PlayScreen.css'

import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'
import { connect } from 'react-redux'

import { PROFILES_APP_ID, PROFILES_DNA_NAME } from '../../../holochainConfig'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'
import { fetchAgentAddress } from '../../../agent-address/actions'
import { getAdminWs, getAppWs } from '../../../hcWebsockets'

function PlayScreen ({ agentAddress, fetchAgentAddress }) {
  const history = useHistory()

  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)

  // run this the first time you load this screen
  // in order to check whether the player is already participating
  // in a game
  useEffect(() => {
    getAdminWs().then(async client => {
      const dnas = await client.listDnas()
      if (dnas.length > 0) {
        setInGame(true)
      } else {
        setInGame(false)
      }
      setHasCheckedInGame(true)
    })
  }, [])

  const [screenContent, setScreenContent] = useState(0)

  const goBack = () => {
    if (screenContent !== 0) setScreenContent(screenContent - 1)
  }

  const goForward = () => {
    if (screenContent !== 3) setScreenContent(screenContent + 1)
  }

  const goToConverse = () => {
    // redirect
    history.push('/converse')
  }

  if (!hasCheckedInGame) {
    return <LoadingScreen />
  }
  if (hasCheckedInGame && !inGame) {
    return <Redirect to='/play/intro' />
  }

  return (
    <>
      <div className='play-screen-header'>
        <div className='your-wallet-wrapper'>Your Wallet</div>
        <div className='your-network-wrapper'>Your Netowrk</div>
        <div className='header-send-button-wrapper'>Send Cat Credits</div>
      </div>
      <div>I am now playing a game</div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    agentAddress: state.agentAddress,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAgentAddress: cellIdString => {
      dispatch(fetchAgentAddress.create({ cellIdString, payload: null }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)

// getAppWs().then(async client => {
//   const profilesInfo = await client.appInfo({
//     installed_app_id: PROFILES_APP_ID
//   })
//   const [cellId, _] = profilesInfo.cell_data.find(
//     ([_cellId, dnaName]) => dnaName === PROFILES_DNA_NAME
//   )
//   const cellIdString = cellIdToString(cellId)
//   fetchAgentAddress(cellIdString)
// })
