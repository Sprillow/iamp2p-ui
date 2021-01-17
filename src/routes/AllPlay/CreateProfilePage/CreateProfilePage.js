import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createWhoami } from '../../../who-am-i/actions'
import ProfileEditForm from '../../../components/ProfileEditForm/ProfileEditForm'
import './CreateProfilePage.css'

function CreateProfilePage({ agentAddress, createWhoami }) {
  const titleText = "First off, create an IamP2P profile."
  const subText = "It’s important to have a profile in a trust-based network so another human being you want to communicate or network with has an idea who is who (if more than 2 people exist in that network). Computers can identify each other without this step, but it’s difficult for humans to do so (unless you’re cool with memorizing a 39 character list of random numbers and letters to identity your friend Alex)."
  const pendingText = 'Setting you up...'
  const submitText = 'Create Profile'
  const canClose = false
  const [pending, setPending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const innerOnSubmit = async profile => {
    setPending(true)
    await createWhoami(profile)
    setPending(false)
    setSubmitted(true)
  }

  return submitted ? (
    <Redirect to='/' />
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

CreateProfilePage.propTypes = {
  agentAddress: PropTypes.string,
  createWhoami: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress,
    profileCellIdString: state.cells.profiles,
  }
}

function mergeProps(stateProps, dispatchProps, _ownProps) {
  const { agentAddress, profileCellIdString } = stateProps
  const { dispatch } = dispatchProps
  return {
    agentAddress,
    createWhoami: profile => {
      return dispatch(
        createWhoami.create({
          payload: profile,
          cellIdString: profileCellIdString,
        })
      )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateProfilePage)
