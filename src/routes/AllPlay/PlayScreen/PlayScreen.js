import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

import './PlayScreen.css'

import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'
import { connect } from 'react-redux'

import Avatar from '../../../components/Avatar/Avatar'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'
import { fetchAgentAddress } from '../../../agent-address/actions'
import { getAdminWs, getAppWs } from '../../../hcWebsockets'

function PlayScreen ({ agents, agentAddress, fetchAgentAddress }) {
  const history = useHistory()
  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)

  // run this the first time you load this screen
  // in order to check whether the player is already participating
  // in a game
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

  if (!hasCheckedInGame) {
    return <LoadingScreen />
  }
  if (hasCheckedInGame && !inGame) {
    return <Redirect to='/play/intro' />
  }

  return (
    <>
      <div className='play-screen-header'>
        <div className='your-network-send-button-wrapper'>
          <div className='your-network-wrapper'>
            <div className='your-network-title'>Your Network</div>
            {agents.length === 0 && (
              <div className='your-network-wrapper-note'>
                Currently no one is in your network. <a>Invite a friend</a>.
              </div>
            )}
            {agents.length > 0 && (
              <div className='your-network-avatars'>
                {agents.map((p, index) => {
                  return (
                    <Avatar
                      key={p.address}
                      handle={p.handle}
                      avatar_url={p.avatar_url}
                      small
                      clickable={false}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div className='header-send-button-wrapper'>Send Cat Credits</div>
        </div>
        <div className='your-wallet-wrapper'>
          <div className='your-wallet-title-balance'>
            <div className='your-wallet-title'>Your Wallet Balance</div>
            <div className='your-wallet-balance'>100 Cat Credits</div>
          </div>
          <div className='your-wallet-history'>Wallet History</div>
        </div>
      </div>
      <div className='play-screen-content'>
        <div className='activity-update'>
          <div>
            Your friend [….] has joined your network! Now you can start
            transacting Cat Credits with each other.{' '}
            <a>Send some CC to them now.</a>{' '}
          </div>
        </div>
        <div className='send-cat-credits-wrapper'>
          <div className='send-cat-credits-wrapper'>
            <div className='send-cat-credits-title'>Send Cat Credits</div>
            <div className='send-cat-credits-input'>
              <label>Amount</label>
              <input value={'amount'} />
            </div>
            <div className='send-cat-credits-input'>
              <label>Recipient</label>
              <input value={'recipient'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    agentAddress: state.agentAddress,
    agents: Object.values(state.agents),
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
