import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import './ProfileCreatedPage.css'

import Button from '../../../components/Button/Button'

import InviteMembersModal from '../../../components/InviteMembersModal/InviteMembersModal'

function ProfileCreatedPage ({ dispatch, passphrase }) {
  const history = useHistory()
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)

  return (
    <>
      <div className='play-intro-screen-wrapper'>
        <div className={`content-wrapper active-screen-`}>
          <div className={`screen active-screen`}>
            <div className='intro-screen-image'>
              {/* <img src={screen.image} /> */}
            </div>
            <div className='intro-screen-text'>
              <div className='intro-screen-title'>
                Perfect!
                <br /> You’re given 100 Cat Credits in your IamP2P wallet. For
                free :)
              </div>
              <div className='play-intro-screen-description'>
                <div>
                  Cat Credit is an imaginary currency. If I were to draw it, it
                  looks like this
                </div>
                <br />
                <div>Now let's invite friends to join you in the game.</div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className='play-screen-buttons-wrapper'>
          <div className='play-screen-button'>
            <Button
              onClick={() => setShowInviteMembersModal(true)}
              text={`Invite Friends`}
            />
          </div>
          <div className='play-screen-button'>
            <Button
              onClick={() => history.push('/play')}
              text={`My CC Wallet`}
            />
          </div>
        </div>
        <InviteMembersModal
          passphrase={passphrase}
          showModal={showInviteMembersModal}
          onClose={() => setShowInviteMembersModal(false)}
        />
      </div>
    </>
  )
}

function mapStateToProps (state) {
  const cellIdString = state.cells
  const projectMeta = state.projects.projectMeta[cellIdString]
  let passphrase
  if (projectMeta) {
    passphrase = projectMeta.passphrase
  }
  return {
    passphrase,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreatedPage)
