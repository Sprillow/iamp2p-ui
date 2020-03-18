import React, { useState, useEffect } from 'react'
import './InviteMembersModal.css'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Modal from '../Modal/Modal'
import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
  ProjectModalSubHeading,
} from '../ProjectModal/ProjectModal'

export default function InviteMembersModal({ showModal, onClose }) {
  const reset = () => {
    setProjectSecret('')
    setValidatingSecret(false)
  }

  const onDone = () => {
    onClose()
  }

  const [projectSecret, setProjectSecret] = useState(
    'pickle cat cowboy vodka copper'
  )

  return (
    <Modal
      white
      active={showModal}
      onClose={onClose}
      className='join-project-modal-wrapper'>
      <ProjectModalHeading title='Invite members to project' />
      <ProjectModalContent>
        <ProjectModalContentSpacer>
          <div className='project-secret-row'>
            <ValidatingFormInput
              value={projectSecret}
              label='Project invitation secret'
              helpText='Share this secret phrase with people you want to invite to this project'
            />
            <div>
              <Icon name='image/refresh.png' />
              reset
            </div>
            <div>
              <Icon name='copy.svg' />
              copy
            </div>
          </div>
        </ProjectModalContentSpacer>
      </ProjectModalContent>
      <ProjectModalButton text='Done' onClick={onDone} />
    </Modal>
  )
}
