import React, { useState, useEffect } from 'react'
import './JoinProjectModal.css'

import Icon from '../Icon/Icon'

import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Modal from '../Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
  ProjectModalSubHeading,
} from '../ProjectModal/ProjectModal'
import ButtonWithPendingState from '../ButtonWithPendingState/ButtonWithPendingState'

export default function JoinProjectModal({
  showModal,
  onClose,
  onJoin,
  failure
}) {
  const [projectSecret, setProjectSecret] = useState('')
  const [invalidText, setInvalidText] = useState('')

  const onSecretChange = val => {
    setInvalidText('')
    setProjectSecret(val)
    if (!val) {
      setInvalidText('')
    } else if (val.split(' ').length !== 5) {
      setInvalidText('secret must be 5 words')
    }
  }

  const onDone = () => {
    setProjectSecret('')
    onClose()
  }

  const formInvalidText = failure ? 'It did\'nt work. Make sure your secret phrase is correct and the friend who invited you has their IamP2P app open.'
   : invalidText


  return (
    <Modal
      white
      active={showModal}
      onClose={onDone}
      className='join-project-modal-wrapper'>
      <ProjectModalHeading title='Join a Game' />
      <ProjectModalContent>
        <ProjectModalContentSpacer>
          <ValidatingFormInput
            value={projectSecret}
            onChange={onSecretChange}
            invalidInput={failure || invalidText}
            errorText={formInvalidText}
            label='Game invitation secret'
            helpText='Paste in the secret phrase the game host has shared with you. Make sure the host has the app open and is online.'
          />
        </ProjectModalContentSpacer>
      </ProjectModalContent>
      <ProjectModalButton text={'Join'} onClick={() => projectSecret.length && onJoin(projectSecret)} />
    </Modal>
  )
}
