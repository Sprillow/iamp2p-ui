import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { connect } from 'react-redux'
import { getAdminWs, getAppWs } from '../../../hcWebsockets'
import { fetchAgentAddress } from '../../../agent-address/actions'
import { sendTrx, fetchTrxs } from '../../../trx/actions'
import { dismissNotif } from '../../../dismissed-notifs/actions'

import './PlayScreen.css'

import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'
import Avatar from '../../../components/Avatar/Avatar'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'

import Modal from '../../../components/Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
} from '../../../components/ProjectModal/ProjectModal'
import SendCCModal from '../../../components/SendCCModal/SendCCModal'
import InviteMembersModal from '../../../components/InviteMembersModal/InviteMembersModal'
import ProgressExplainer from '../../../components/ProgressExplainer/ProgressExplainer'

function WalletHistory ({ myHistory, walletBalance, agentAddress, agents }) {
  const checkBalanceAtIndex = index => {
    return myHistory.reduce((memo, trx, i) => {
      if (i >= index) {
        return memo
      }

      if (trx.from === agentAddress) {
        return memo + trx.amount
      } else if (trx.to === agentAddress) {
        return memo - trx.amount
      } else {
        return memo
      }
    }, walletBalance)
  }
  return (
    <div className='wallet-history-wrapper'>
      <div className='wallet-history-inner-wrapper'>
        <div className='wallet-history-row'>
          <div className='wallet-history-column left wallet-history-title'>
            Description
          </div>
          <div className='wallet-history-column wallet-history-title right'>
            Balance
          </div>
        </div>
        {myHistory.map((trx, index) => {
          return (
            <div className='wallet-history-row'>
              <div className='wallet-history-column left wallet-history-item'>
                {trx.from === agentAddress
                  ? 'you'
                  : agents.find(a => a.address === trx.from).handle}{' '}
                sent{' '}
                {trx.to === agentAddress
                  ? 'you'
                  : agents.find(a => a.address === trx.to).handle}{' '}
                {trx.amount} cc
              </div>
              <div className='wallet-history-column wallet-history-item right'>
                {checkBalanceAtIndex(index)}
              </div>
            </div>
          )
        })}
        <div className='wallet-history-row'>
          <div className='wallet-history-column left wallet-history-item'>
            starting balance
          </div>
          <div className='wallet-history-column wallet-history-item right'>
            100
          </div>
        </div>
      </div>
    </div>
  )
}

function FriendJoinedActivityUpdate ({ onClose, clickSend, handle }) {
  return (
    <div className='activity-update'>
      <Icon
        onClick={onClose}
        name='x.svg'
        size='medium-close'
        className='grey'
      />
      <div>
        Your friend <b>{handle}</b> has joined your network! Now you can start
        transacting Cat Credits with each other.{' '}
        <a onClick={clickSend}>Send some CC to them now.</a>{' '}
      </div>
    </div>
  )
}

function SentCCActivityUpdate ({ onClose, handle, amount }) {
  return (
    <div className='activity-update'>
      <Icon
        onClick={onClose}
        name='x.svg'
        size='medium-close'
        className='grey'
      />
      <div>
        You sent {amount} Cat Credits to your friend <b>{handle}</b>. A truly
        peer-to-peer transaction!
      </div>
    </div>
  )
}

function ReceivedCCActivityUpdate ({ onClose, handle, amount }) {
  return (
    <div className='activity-update'>
      <Icon
        onClick={onClose}
        name='x.svg'
        size='medium-close'
        className='grey'
      />
      <div>
        You received {amount} Cat Credits from your friend <b>{handle}</b>
      </div>
    </div>
  )
}

function LeaveGameModal () {
  const leaveGame = async () => {
    //get active apps from holochain
    const adminClient = await getAdminWs()
    const activeApps = await adminClient.listActiveApps()
    console.log(activeApps)
    // deactivate the active app
    await adminClient.deactivateApp({
      installed_app_id: activeApps[0],
    })
    // window.location.reload
    window.location.reload()
  }

  return (
    <>
      <ProjectModalHeading title='Leaving the Game' />
      <ProjectModalContent>
        <div className='leave-game-modal-content'>
          Leaving the game will disable access to your current profile and game.
          You can then join or start a new game. Are you sure you want to leave
          the game?
        </div>
      </ProjectModalContent>

      <ProjectModalButton text='Yes, leave the game' onClick={leaveGame} />
    </>
  )
}

function PlayScreen ({
  cellIdString,
  agents,
  agentAddress,
  walletBalance,
  trxHistory,
  myHistory,
  dispatch,
  passphrase,
  dismissedNotifs,
}) {
  // refers to router / browser history
  const history = useHistory()

  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)
  const [showSendCCModal, setShowSendCCModal] = useState(false)
  const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)

  const [sendingCCStep, setSendingCCStep] = useState(0)
  const [isSendingCC, setIsSendingCC] = useState(false)

  const [activityHistory, setActivityHistory] = useState([])

  useEffect(() => {
    if (cellIdString) {
      dispatch(
        fetchTrxs.create({
          cellIdString,
          payload: null,
        })
      )
    }
  }, [cellIdString])

  const generateActivityHistory = () => {
    const agentActivity = agents
      .filter(a => a.address !== agentAddress)
      .map(a => ({ type: 'friend-joined', agent: a, time: a.created_at }))
    const trxActivity = myHistory.map(trx => {
      return {
        type: trx.from === agentAddress ? 'sent-cc' : 'received-cc',
        trx,
        time: trx.created_at,
      }
    })
    const mergedActivity = agentActivity
      .concat(trxActivity)
      .sort((a, b) => (a.time > b.time ? -1 : 1))
    return mergedActivity
  }

  useEffect(() => {
    setActivityHistory(generateActivityHistory())
  }, [JSON.stringify(agents), agentAddress])
  useEffect(() => {
    setActivityHistory(generateActivityHistory())
  }, [JSON.stringify(myHistory), agentAddress])

  const [showWalletHistory, setShowWalletHistory] = useState(false)

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

  const sendCC = async (amount, toAddress) => {
    setShowSendCCModal(false)
    setIsSendingCC(true)
    setSendingCCStep(1)
    await dispatch(
      sendTrx.create({
        cellIdString,
        payload: {
          from: agentAddress,
          to: toAddress,
          created_at: Date.now(),
          amount: parseInt(amount),
        },
      })
    )
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    setSendingCCStep(2)
    await sleep(1000)
    setSendingCCStep(3)
    await sleep(1000)
    setSendingCCStep(4)
    await sleep(1000)
    setSendingCCStep(5)
    await sleep(5000)
    setIsSendingCC(false)
    setSendingCCStep(0)
  }

  return (
    <>
      <div className='play-screen-header'>
        <div className='your-network-send-button-wrapper'>
          <div className='your-network-wrapper'>
            <div className='your-network-title'>Your Network</div>
            {agents.length === 1 && (
              <div className='your-network-wrapper-note'>
                Currently no one is in your network.{' '}
                <a onClick={() => setShowInviteMembersModal(true)}>
                  Invite a friend
                </a>
                .
              </div>
            )}
            {agents.length > 1 && (
              <div className='your-network-avatars'>
                {agents
                  .filter(p => p.address !== agentAddress)
                  .map((p, index) => {
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
          <div
            className='header-send-button-wrapper'
            onClick={() => setShowSendCCModal(true)}>
            Send Cat Credits
          </div>
        </div>
        <div className='your-wallet-wrapper'>
          <div className='your-wallet-title-balance'>
            <div className='your-wallet-title'>Your Wallet Balance</div>
            <div className='your-wallet-balance'>
              {walletBalance} Cat Credits
            </div>
          </div>
          <div
            className={`your-wallet-history ${
              showWalletHistory ? 'active' : ''
            }`}
            onClick={() => setShowWalletHistory(!showWalletHistory)}>
            Wallet History
          </div>
        </div>
      </div>

      <div className='play-screen-content-wrapper'>
        {showWalletHistory && (
          <WalletHistory
            myHistory={myHistory}
            walletBalance={walletBalance}
            agentAddress={agentAddress}
            agents={agents}
          />
        )}
        <div className='play-screen-content'>
          {activityHistory.map(activity => {
            // render a different activity item
            // based on the activity "type"
            if (dismissedNotifs.includes(activity.time)) {
              return <div key={activity.time}></div>
            }

            // friend joined
            if (activity.type === 'friend-joined') {
              return (
                <FriendJoinedActivityUpdate
                  key={activity.time}
                  clickSend={() => setShowSendCCModal(true)}
                  handle={
                    agents.find(a => a.address === activity.agent.address)
                      .handle
                  }
                  onClose={() => dispatch(dismissNotif(activity.time))}
                />
              )
            }
            // sent CC
            else if (activity.type === 'sent-cc') {
              return (
                <SentCCActivityUpdate
                  key={activity.time}
                  handle={
                    agents.find(a => a.address === activity.trx.to).handle
                  }
                  amount={activity.trx.amount}
                  onClose={() => dispatch(dismissNotif(activity.time))}
                />
              )
            }
            // received CC
            else if (activity.type === 'received-cc') {
              return (
                <ReceivedCCActivityUpdate
                  key={activity.time}
                  amount={activity.trx.amount}
                  handle={
                    agents.find(a => a.address === activity.trx.from).handle
                  }
                  onClose={() => dispatch(dismissNotif(activity.time))}
                />
              )
            }
            // unknown activity type
            else {
              return <>No acivity history yet.</>
            }
          })}
        </div>
      </div>
      <SendCCModal
        walletBalance={walletBalance}
        people={agents.filter(a => a.address !== agentAddress)}
        showModal={showSendCCModal}
        onClose={() => setShowSendCCModal(false)}
        onSend={sendCC}
      />
      <Modal white active={isSendingCC}>
        <SendingCCModal step={sendingCCStep} />
      </Modal>
      <InviteMembersModal
        passphrase={passphrase}
        showModal={showInviteMembersModal}
        onClose={() => setShowInviteMembersModal(false)}
      />
      <Modal
        white
        active={showLeaveGameModal}
        onClose={() => setShowLeaveGameModal(false)}>
        <LeaveGameModal />
      </Modal>
      {agents.length === 1 && (
        <div
          className='leave-game-button'
          onClick={() => setShowLeaveGameModal(true)}>
          Leave the game
        </div>
      )}
    </>
  )
}

function SendingCCModal ({ step }) {
  return (
    <div>
      {step >= 1 && (
        <ProgressExplainer
          text='Signing your transaction with your private keys'
          done={step > 1}
        />
      )}
      {step >= 2 && (
        <ProgressExplainer
          text='Writing your transaction to your source chain'
          done={step > 2}
        />
      )}
      {step >= 3 && (
        <ProgressExplainer
          text='Sharing your transaction to the Distributed Hash Table'
          done={step > 3}
        />
      )}
      {step >= 4 && (
        <ProgressExplainer
          text='Announcing the transaction to the recipient'
          done={step > 4}
        />
      )}
      {step === 5 && (
        <ProgressExplainer text='Transaction sent' done={step === 5} />
      )}
    </div>
  )
}

function mapStateToProps (state) {
  const { agentAddress } = state
  const trxHistory = Object.values(state.trx)
  const startingBalance = 100
  const myHistory = trxHistory
    .filter(trx => trx.from === agentAddress || trx.to === agentAddress)
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  const walletBalance = myHistory.reduce((memo, trx) => {
    if (trx.from === agentAddress) {
      return memo - trx.amount
    } else if (trx.to === agentAddress) {
      return memo + trx.amount
    } else {
      return memo
    }
  }, startingBalance)

  const cellIdString = state.cells
  const projectMeta = state.projects.projectMeta[cellIdString]
  let passphrase
  if (projectMeta) {
    passphrase = projectMeta.passphrase
  }

  const { dismissedNotifs } = state.ui

  return {
    passphrase,
    trxHistory,
    myHistory,
    cellIdString: state.cells,
    agentAddress,
    agents: Object.values(state.agents),
    walletBalance,
    dismissedNotifs,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
