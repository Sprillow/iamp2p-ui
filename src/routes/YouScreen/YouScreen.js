import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateWhoami } from '../../who-am-i/actions'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'

import Button from '../../components/Button/Button'

import Avatar from '../../components/Avatar/Avatar'
import ValidatingFormInput from '../../components/ValidatingFormInput/ValidatingFormInput'
import ButtonWithPendingState from '../../components/ButtonWithPendingState/ButtonWithPendingState'

import './YouScreen.css'

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function ViewProfilePage ({ whoami, cellIdString, agentAddress, dispatch }) {
  const titleText = 'Your profile on IamP2P'
  const subText = ''
  const [pending, setPending] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isValidAvatarUrl, setIsValidAvatarUrl] = useState(true)

  const handle = whoami ? whoami.entry.handle : ''
  useEffect(() => {
    if (whoami) {
      setAvatarUrl(whoami.entry.avatar_url)
    }
  }, [whoami])

  const usernameHelp = `Your unique name on IamP2P so your peers can find you and connect with you. It can't be changed for security reasons.`

  const publicKeyHelp = `You don't need to memorize this, unless your friends can't recognize you by your PeerName 😜`

  const avatarShow = avatarUrl || 'img/avatar_placeholder.png'

  const actionButton = (
    <ButtonWithPendingState
      pending={pending}
      pendingText='Validating...'
      actionText='Update Avatar'
    />
  )

  const innerOnSubmit = async () => {
    setPending(true)
    await dispatch(
      updateWhoami.create({
        payload: {
          address: whoami.address,
          entry: {
            created_at: whoami.entry.created_at,
            handle: whoami.entry.handle,
            address: whoami.entry.address,
            avatar_url: avatarUrl,
          },
        },
        cellIdString,
      })
    )
    setPending(false)
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

  return (
    <div className='you-screen-wrapper'>
      <div className='profile_edit_form you-screen'>
        <div className='profile_edit_form_title'>
          <h1>{titleText}</h1>
          <h4>{subText}</h4>
        </div>
        <form onSubmit={innerOnSubmit}>
          <div className='row'>
            <ValidatingFormInput
              value={handle}
              onChange={() => {}}
              label='PeerName'
              helpText={usernameHelp}
              withAtSymbol
              readOnly
            />
          </div>

          <div className='row'>
            <ValidatingFormInput
              value={agentAddress}
              readOnly
              label='Your Public Key (unique address)'
              helpText={publicKeyHelp}
            />
          </div>
          <div className='divider-line' />
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
        </form>
        <div className='create-profile-button'>
          <Button
            onClick={() => !pending && innerOnSubmit()}
            text={actionButton}
          />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    agentAddress: state.agentAddress,
    cellIdString: state.cells,
    whoami: state.whoami,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage)
