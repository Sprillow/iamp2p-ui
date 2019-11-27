import React, { useState } from 'react'
import {
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createWhoami } from '../../who-am-i/actions'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import './CreateProfilePage.css'

function CreateProfilePage({ agentAddress, createWhoami }) {
  const titleText = 'First, let\'s set up your profile on Acorn.'
  const subText = 'You\'ll be able to edit them later in your Profile Settings.'
  const submitText = 'Ready to Start'
  const canClose = false
  const [submitted, setSubmitted] = useState(false)

  const innerOnSubmit = async (profile) => {
    await createWhoami(profile)
    setSubmitted(true)
  }

  return submitted ? <Redirect to="/board/map" /> : <div className="create_profile_page">
    <div className="profile_create_wrapper">
      <ProfileEditForm
        onSubmit={innerOnSubmit}
        whoami={null}
        {...{ canClose, titleText, subText, submitText, agentAddress }} />
    </div>
    <div className="create_profile_splash_image" />
  </div>
}

CreateProfilePage.propTypes = {
  agentAddress: PropTypes.string,
  createWhoami: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    createWhoami: (profile) => {
      return dispatch(createWhoami.create({ profile }))
    }
  }
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)