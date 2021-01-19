import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import './ProfileEditForm.css'
import Button from '../Button/Button'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import ButtonWithPendingState from '../ButtonWithPendingState/ButtonWithPendingState'

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function ProfileEditForm ({
  pending,
  pendingText,
  onSubmit,
  agentAddress,
  whoami,
  titleText,
  subText,
  submitText,
}) {
  const [isValidUserName, setIsValidUserName] = useState(true)
  const [errorUsername, setErrorUsername] = useState('')
  const [isValidAvatarUrl, setIsValidAvatarUrl] = useState(true)

  const [handle, setHandle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const innerOnSubmit = () => {
    if (isValidUserName) {
      onSubmit({
        created_at: Date.now(),
        avatar_url: avatarUrl,
        address: agentAddress,
        handle,
      })
    }
  }

  useEffect(() => {
    if (whoami) {
      setHandle(whoami.handle)
      setAvatarUrl(whoami.avatar_url)
    }
  }, [whoami])
  const userNames = useSelector(state =>
    Object.values(state.agents).map(agent => agent.handle)
  )
  if (whoami && handle != whoami.handle && userNames.includes(handle)) {
    if (isValidUserName) {
      setErrorUsername('Username is already in use.')

      setIsValidUserName(false)
    }
  } else if (!/^[A-Za-z0-9_]+$/i.test(handle)) {
    if (isValidUserName) {
      setErrorUsername('Username is not valid.')

      setIsValidUserName(false)
    }
  } else {
    if (!isValidUserName) {
      setErrorUsername('')

      setIsValidUserName(true)
    }
  }

  if (!urlRegex.test(avatarUrl)) {
    if (isValidAvatarUrl) {
      setIsValidAvatarUrl(false)
    }
  } else {
    if (!isValidAvatarUrl) {
      setIsValidAvatarUrl(true)
    }
  }

  const usernameHelp =
    'Choose something unique and easy for your friends to use and recall. Avoid space and @.'
  const avatarShow = avatarUrl || 'img/avatar_placeholder.png'

  const avatarHelp = 'Optional but nice to have.'

  const publicKeyHelp = `You don't need to memorize this, unless your friends can't recognize you by your PeerName 😜`

  const actionButton = (
    <ButtonWithPendingState
      pending={pending}
      pendingText={pendingText}
      actionText={submitText}
    />
  )

  return (
    <div className='profile_edit_form'>
      <div className='profile_edit_form_title'>
        <h1>{titleText}</h1>
        <h4>{subText}</h4>
      </div>
      <form onSubmit={innerOnSubmit}>
        <div className='row'>
          <ValidatingFormInput
            value={handle}
            onChange={setHandle}
            label='PeerName'
            helpText={usernameHelp}
            invalidInput={handle.length > 0 && !isValidUserName}
            validInput={handle.length > 0 && isValidUserName}
            errorText={
              handle.length > 0 && !isValidUserName ? errorUsername : ''
            }
            placeholder='frodobaggins'
            withAtSymbol
          />
        </div>
        <div className='row'>
          <ValidatingFormInput
            value={avatarUrl}
            onChange={setAvatarUrl}
            label='Avatar Image URL (optional but nice to have)'
            placeholder='Paste in your avatar image URL here'
            invalidInput={avatarUrl.length > 0 && !isValidAvatarUrl}
            validInput={avatarUrl.length > 0 && isValidAvatarUrl}
            errorText={
              avatarUrl.length > 0 && !isValidAvatarUrl
                ? 'Invalid url. Make sure the url address is complete and valid.'
                : ''
            }
          />
          <div className='profile_edit_form_avatar'>
            <Avatar avatar_url={avatarShow} large />
          </div>
        </div>
        <div className='row'>
          <ValidatingFormInput
            value={agentAddress}
            readOnly
            label='This is your public key (unique address)'
            helpText={publicKeyHelp}
          />
        </div>
      </form>
      <div className='create-profile-button'>
        <Button
          onClick={() => !pending && innerOnSubmit()}
          text={actionButton}
        />
      </div>
    </div>
  )
}

export default ProfileEditForm
