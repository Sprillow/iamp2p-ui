import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createWhoami } from '../../../who-am-i/actions'
import ProfileEditForm from '../../../components/ProfileEditForm/ProfileEditForm'
import './CreateProfilePage.css'

function CreateProfilePage ({ cellIdString, agentAddress, dispatch }) {
  const titleText = 'First off, create an IamP2P profile.'
  const subText =
    'It\'s important to have a profile in a trust-based network so another human being you want to communicate or network with has an idea who is who (if more than 2 people exist in that network). Computers can identify each other without this step, but it\'s difficult for humans to do so (unless you\'re cool with memorizing a 39 character list of random numbers and letters to identity your friend Alex).'
  const pendingText = 'Setting you up...'
  const submitText = 'Create Profile'
  const canClose = false
  const [pending, setPending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const innerOnSubmit = async profile => {
    setPending(true)
    await dispatch(
      createWhoami.create({
        payload: profile,
        cellIdString,
      })
    )
    setPending(false)
    setSubmitted(true)
  }

  return submitted ? (
    <Redirect to='/play/profile-created' />
  ) : (
    <ProfileEditForm
      onSubmit={innerOnSubmit}
      whoami={null}
      {...{
        canClose,
        titleText,
        subText,
        pending,
        pendingText,
        submitText,
        agentAddress,
      }}
    />
  )
}

function mapStateToProps (state) {
  return {
    agentAddress: state.agentAddress,
    cellIdString: state.cells,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)
