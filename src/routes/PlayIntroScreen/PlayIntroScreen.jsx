import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'

import './PlayIntroScreen.css'

import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import { connect } from 'react-redux'

import { PROJECTS_DNA_PATH, PROJECTS_ZOME_NAME } from '../../holochainConfig'
import { passphraseToUuid } from '../../secrets'
import {
  createProjectMeta,
  fetchProjectMeta,
} from '../../projects/project-meta/actions'
import Modal from '../../components/Modal/Modal'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import { fetchAgentAddress } from '../../agent-address/actions'
import { getAdminWs } from '../../hcWebsockets'
import ProgressExplainer from '../../components/ProgressExplainer/ProgressExplainer'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function PlayIntroScreen({ dispatch }) {
  const history = useHistory()

  const [creatingGameStep, setCreatingGameStep] = useState(0)
  const [isCreatingGame, setIsCreatingGame] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [hasCheckedInGame, setHasCheckedInGame] = useState(false)

  // run this the first time you load this screen
  // in order to check whether the player is already participating
  // in a game
  useEffect(() => {
    getAdminWs().then(async client => {
      const dnas = await client.listDnas()
      setInGame(false)
      setHasCheckedInGame(true)
      // if (dnas.length > 0) {
      //   setInGame(true)
      // } else {
      //   setInGame(false)
      // }
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

  const createGame = async () => {
    setIsCreatingGame(true)
    await holochainCreateGame(setCreatingGameStep, dispatch)
    // leave 2 seconds for reading
    await sleep(2000)
    setIsCreatingGame(false)
    history.push('/create-profile')
  }

  if (!hasCheckedInGame) {
    return <LoadingScreen />
  }
  if (hasCheckedInGame && inGame) {
    return <Redirect to='/play' />
  }

  return (
    <>
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
                    This little experimental game is meant to give you an
                    example of how Holochain, as a peer-to-peer protocol
                    functions in real life. You would be able to make
                    transactions with friends in your network using an imaginary
                    currency.
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
            <Button onClick={createGame} text={`Start a Game`} />
          </div>
        </div>
      </div>
      <Modal white active={isCreatingGame}>
        <CreateGameModal step={creatingGameStep} />
      </Modal>
    </>
  )
}

function CreateGameModal({ step }) {
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

  // install the DNA
  const installedApp = await installProjectApp(
    agentAddress,
    passphrase,
    adminWs,
    setCreatingGameStep
  )
  const cellIdString = cellIdToString(installedApp.cell_data[0][0])

  // "networking services"
  setCreatingGameStep(5)
  await Promise.all([
    sleep(2000),
    (async () => {
      // attach app interface
      try {
        await adminWs.attachAppInterface({ port: 8888 })
      } catch (e) {
        console.error('uhoh address already in use', e)
      }
      // because we are acting optimistically,
      // because holochain is taking 18 s to respond to this first call
      // we will directly set ourselves as a member of this cell
      // await dispatch(setMember(cellIdString, { address: agentAddress }))
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
  setCreatingGameStep
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
            path: PROJECTS_DNA_PATH,
            properties: { uuid },
          },
        ],
      })
      // ACTIVATE
      await adminWs.activateApp({ installed_app_id })
      return i
    })(),
    (async () => {
      setCreatingGameStep(3)
      await sleep(2000)
      setCreatingGameStep(4)
      await sleep(2000)
    })(),
  ])
  return installedApp
}

// JOIN
async function joinProject(passphrase, dispatch) {
  // joinProject
  // join a DNA
  // then try to get the project metadata
  // if that DOESN'T work, the attempt is INVALID
  // remove the instance again immediately
  const installedApp = await installProjectApp(passphrase)
  const cellId = installedApp.cell_data[0][0]
  const cellIdString = cellIdToString(installedApp.cell_data[0][0])
  const appWs = await getAppWs()
  try {
    await appWs.callZome({
      cap: null,
      cell_id: cellId,
      zome_name: PROJECTS_ZOME_NAME,
      fn_name: 'fetch_project_meta',
      payload: null,
      provenance: getAgentPubKey(), // FIXME: this will need correcting after holochain changes this
    })
    await dispatch(joinProjectCellId(cellIdString))
    // trigger a side effect...
    // this will let other project members know you're here
    // without 'blocking' the thread or the UX
    appWs
      .callZome({
        cap: null,
        cell_id: cellId,
        zome_name: PROJECTS_ZOME_NAME,
        fn_name: 'init_signal',
        payload: null,
        provenance: getAgentPubKey(), // FIXME: this will need correcting after holochain changes this
      })
      .then(() => console.log('succesfully triggered init_signal'))
      .catch(e => console.error('failed while triggering init_signal: ', e))
    return true
  } catch (e) {
    // deactivate app
    const adminWs = await getAdminWs()
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
