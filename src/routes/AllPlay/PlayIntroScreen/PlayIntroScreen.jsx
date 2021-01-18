import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

import './PlayIntroScreen.css'

import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'
import { connect } from 'react-redux'

import { DNA_PATH, ZOME_NAME } from '../../../holochainConfig'
import { passphraseToUuid } from '../../../secrets'
import {
  createProjectMeta,
  fetchProjectMeta,
} from '../../../projects/project-meta/actions'
import Modal from '../../../components/Modal/Modal'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'
import { fetchAgentAddress } from '../../../agent-address/actions'
import { setCellId } from '../../../cells/actions'
import { getAdminWs, getAppWs } from '../../../hcWebsockets'
import ProgressExplainer from '../../../components/ProgressExplainer/ProgressExplainer'
import JoinProjectModal from '../../../components/JoinProjectModal/JoinProjectModal'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function PlayIntroScreen({ dispatch }) {
  const history = useHistory()

  const [showJoinModal, setShowJoinModal] = useState(false)
  // joining and join steps
  const [joiningGameStep, setJoiningGameStep] = useState(0)
  const [isJoiningGame, setIsJoiningGame] = useState(false)
  const [invalidJoin, setInvalidJoin] = useState(false)

  // creating and create steps
  const [creatingGameStep, setCreatingGameStep] = useState(0)
  const [isCreatingGame, setIsCreatingGame] = useState(false)
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

  const joinGame = async () => {
    setShowJoinModal(true)
  }

  const onJoin = async passphrase => {
    setShowJoinModal(false)
    setIsJoiningGame(true)
    // do the project joining
    const result = await holochainJoinGame(passphrase, setJoiningGameStep, dispatch)
    // leave 2 seconds for reading
    await sleep(2000)
    // in the case of a bad join
    setIsJoiningGame(false)
    if (!result) {
      setShowJoinModal(true)
      setInvalidJoin(true)
    } else {
      history.push('/play/create-profile')
    }
  }

  const createGame = async () => {
    setIsCreatingGame(true)
    await holochainCreateGame(setCreatingGameStep, dispatch)
    // leave 2 seconds for reading
    await sleep(2000)
    setIsCreatingGame(false)
    history.push('/play/create-profile')
  }

  if (!hasCheckedInGame) {
    return <LoadingScreen />
  }
  if (hasCheckedInGame && inGame) {
    return <Redirect to='/play' />
  }

  return (
    <>
      <div className='play-intro-screen-wrapper'>
        <div className={`content-wrapper active-screen-`}>
          <div className={`screen active-screen`}>
            <div className='intro-screen-image'>
              {/* <img src={screen.image} /> */}
            </div>
            <div className='intro-screen-text'>
              <div className='intro-screen-title'>IamP2P Transact Game</div>
              <div className='play-intro-screen-description'>
                <div>
                  This little experimental game is meant to give you an example
                  of how Holochain, as a peer-to-peer protocol functions in real
                  life. You would be able to make transactions with friends in
                  your network using an imaginary currency.
                </div>
                <br/>
                <div>
                  If you have received a secret phrase from a friend of yours,
                  select Join a Game. If you want to initiate a game an invite
                  friends, click Start a Game.
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className='play-screen-buttons-wrapper'>
          <div className='play-screen-button'>
            <Button onClick={joinGame} text={`Join a game`} />
          </div>
          <div className='play-screen-button'>
            <Button onClick={createGame} text={`Start a Game`} />
          </div>
        </div>

      </div>
      <Modal white active={isCreatingGame}>
        <CreatingGameModal step={creatingGameStep} />
      </Modal>
      <Modal white active={isJoiningGame}>
        <JoiningGameModal step={joiningGameStep} />
      </Modal>
      <JoinProjectModal
        failure={invalidJoin}
        onJoin={onJoin}
        showModal={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </>
  )
}

function CreatingGameModal({ step }) {
  return (
    <div>
      {step >= 1 && (
        <ProgressExplainer
          text='Generating a private key and a public key for you'
          done={step > 1}
        />
      )}
      {step >= 2 && (
        <ProgressExplainer
          text='Generating a secret phrase for your unique game'
          done={step > 2}
        />
      )}
      {step >= 3 && (
        <ProgressExplainer
          text='Generating a personal source chain for your data history'
          done={step > 3}
        />
      )}
      {step >= 4 && (
        <ProgressExplainer
          text='Generating a Distributed Hash Table for data sharing'
          done={step > 4}
        />
      )}
      {step >= 5 && (
        <ProgressExplainer
          text='Starting up Holochain networking services'
          done={step > 5}
        />
      )}
      {step === 6 && (
        <ProgressExplainer text='Game initiated' done={step === 6} />
      )}
    </div>
  )
}

function JoiningGameModal({ step }) {
  return (
    <div>
      {step >= 1 && (
        <ProgressExplainer
          text='Generating a private key and a public key for you'
          done={step > 1}
        />
      )}
      {step >= 2 && (
        <ProgressExplainer
          text='Generating a personal source chain for your data history'
          done={step > 2}
        />
      )}
      {step >= 3 && (
        <ProgressExplainer
          text='Joining a Distributed Hash Table for data sharing'
          done={step > 3}
        />
      )}
      {step >= 4 && (
        <ProgressExplainer
          text='Trying to join this game'
          done={step > 4}
        />
      )}
      {step === 5 && (
        <ProgressExplainer text='Game joined' done={step === 5} />
      )}
    </div>
  )
}

// since this is a big wordset, dynamically import it
// instead of including in the main bundle
async function generatePassphrase() {
  const { default: randomWord } = await import('diceware-word')
  return `${randomWord()} ${randomWord()} ${randomWord()} ${randomWord()} ${randomWord()}`
}

async function holochainCreateGame(setCreatingGameStep, dispatch) {
  // TAKE AT LEAST 2 SECONDS FOR EACH STEP

  const adminWs = await getAdminWs()
  // generate the agent keys
  setCreatingGameStep(1)
  const [agentAddress] = await Promise.all([
    adminWs.generateAgentPubKey(),
    sleep(2000),
  ])

  // generate a passphrase
  setCreatingGameStep(2)
  const [passphrase] = await Promise.all([generatePassphrase(), sleep(2000)])

  console.log(passphrase)
  // install the DNA
  const installedApp = await installProjectApp(
    agentAddress,
    passphrase,
    adminWs,
    setCreatingGameStep,
    3,
    4
  )
  const cellIdString = cellIdToString(installedApp.cell_data[0][0])
  await dispatch(setCellId(cellIdString))

  // "networking services"
  setCreatingGameStep(5)
  await Promise.all([
    sleep(2000),
    (async () => {
      const { Codec } = await import('@holo-host/cryptolib')
      await dispatch(
        createProjectMeta.create({
          cellIdString,
          payload: {
            name: 'does not matter',
            image: '',
            passphrase,
            creator_address: Codec.AgentId.encode(agentAddress),
            created_at: Date.now(),
          },
        })
      )
    })(),
  ])
  // DONE
  setCreatingGameStep(6)
}

async function installProjectApp(
  agent_key,
  passphrase,
  adminWs,
  setStep,
  firstStepNumber,
  secondStepNumber
) {
  const uuid = passphraseToUuid(passphrase)
  // add a bit of randomness so that
  // the same passphrase can be tried multiple different times
  // without conflicting
  // in order to eventually find their peers
  // note that this will leave a graveyard of deactivated apps for attempted
  // joins
  const installed_app_id = `${Math.random().toString().slice(-6)}-${uuid}`
  // INSTALL
  const [installedApp] = await Promise.all([
    (async () => {
      const i = adminWs.installApp({
        agent_key,
        installed_app_id,
        dnas: [
          {
            nick: uuid,
            path: DNA_PATH,
            properties: { uuid },
          },
        ],
      })
      // ACTIVATE
      await adminWs.activateApp({ installed_app_id })
      return i
    })(),
    (async () => {
      setStep(firstStepNumber)
      await sleep(2000)
      setStep(secondStepNumber)
      await sleep(2000)
    })(),
  ])
  return installedApp
}

// JOIN
async function holochainJoinGame(passphrase, setJoiningGameStep, dispatch) {
  // joinProject
  // join a DNA
  // then try to get the project metadata
  // if that DOESN'T work, the attempt is INVALID
  // remove the instance again immediately

  // TAKE AT LEAST 2 SECONDS FOR EACH STEP

  const adminWs = await getAdminWs()
  const appWs = await getAppWs()

  // generate the agent keys
  setJoiningGameStep(1)
  const [agentAddress] = await Promise.all([
    adminWs.generateAgentPubKey(),
    sleep(2000),
  ])

  const installedApp = await installProjectApp(
    agentAddress,
    passphrase,
    adminWs,
    setJoiningGameStep,
    2,
    3
  )
  const cellId = installedApp.cell_data[0][0]
  const cellIdString = cellIdToString(installedApp.cell_data[0][0])

  setJoiningGameStep(4)
  const [_, result] = await Promise.all([
    // 2 second minimum
    sleep(2000),
    // fetch project meta
    (async () => {
      try {
        await appWs.callZome({
          cap: null,
          cell_id: cellId,
          zome_name: ZOME_NAME,
          fn_name: 'fetch_project_meta',
          payload: null,
          provenance: agentAddress, // FIXME: this will need correcting after holochain changes this
        })
        await dispatch(setCellId(cellIdString))
        return true
      } catch (e) {
        // deactivate app, since joining failed
        await adminWs.deactivateApp({
          installed_app_id: installedApp.installed_app_id,
        })
        if (
          e.type === 'error' &&
          e.data.type === 'ribosome_error' &&
          e.data.data.includes('no project meta exists')
        ) {
          return false
        } else {
          throw e
        }
      }
    })(),
  ])
  if (!result) {
    return false // false
  }
  // DONE
  setJoiningGameStep(5)
  return true
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayIntroScreen)

// trigger a side effect...
// this will let other project members know you're here
// without 'blocking' the thread or the UX
// appWs
//   .callZome({
//     cap: null,
//     cell_id: cellId,
//     zome_name: ZOME_NAME,
//     fn_name: 'init_signal',
//     payload: null,
//     provenance: agentAddress, // FIXME: this will need correcting after holochain changes this
//   })
//   .then(() => console.log('succesfully triggered init_signal'))
//   .catch(e => console.error('failed while triggering init_signal: ', e))
