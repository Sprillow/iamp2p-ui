import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

import './PlayIntroScreen.css'

import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import { connect } from 'react-redux'

import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { fetchAgentAddress } from '../../agent-address/actions'
import { getAdminWs } from '../../hcWebsockets'

function PlayIntroScreen () {
  const history = useHistory()

  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)

  // run this the first time you load this screen
  // in order to check whether the player is already participating
  // in a game
  useEffect(() => {
    getAdminWs().then(async client => {
      const dnas = await client.listDnas()
      setHasCheckedInGame(true)
      if (dnas.length > 0) {
        setInGame(true)
      } else {
        setInGame(false)
      }
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
  if (hasCheckedInGame && inGame) {
    return <Redirect to='/play' />
  }

  return (
    <div className='intro-screen-wrapper'>
      {/* <div className='skip-intro-button'>
        <div onClick={goToRegister}>Skip Intro</div>
      </div> */}
      <div className='intro-screen-content-frame'>
        {/* all 4 screens */}
        <div className={`content-wrapper active-screen-${screenContent}`}>
          <div className={`screen active-screen`}>
            <div className='intro-screen-image'>
              {/* <img src={screen.image} /> */}
            </div>
            <div className='intro-screen-text'>
              <div className='intro-screen-title'>IamP2P Transact Game</div>
              <div className='intro-screen-description'>
                <div>
                  This little experimental game is meant to give you an example
                  of how Holochain, as a peer-to-peer protocol functions in real
                  life. You would be able to make transactions with friends in
                  your network using an imaginary currency.
                </div>
                <div>
                  If you have received a secret phrase from a friend of your,
                  select Join a Game. If you want to initiate a game an invite
                  friends, click Start a Game.
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className='sign-up-button'>
          <Button onClick={goToConverse} text={`Join a game`} />
        </div>
        <div className='sign-up-button'>
          <Button onClick={goToConverse} text={`Start a Game`} />
        </div>
      </div>
    </div>
  )
}

export default PlayIntroScreen
