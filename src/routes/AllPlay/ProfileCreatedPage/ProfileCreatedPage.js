import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './ProfileCreatedPage.css'

import InviteMembersModal from '../../../components/InviteMembersModal/InviteMembersModal'

function ProfileCreatedPage () {
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(null)

  return (
    <>
        <div>
          Perfect, you’re given 100 Cat Credits in your IamP2P wallet. For free
          :){' '}
        </div>
        <div>
          Cat Credit is an imaginary currency. If I were to draw it, it looks
          like this{' '}
        </div>
        <div>Now let's invite freind to join you in the game</div>
        <div onClick={() => setShowInviteMembersModal(true)}>
          Invite Friends
        </div>
        <div>My CC Wallet</div>
        <InviteMembersModal
          passphrase={'cat dog chicken hen'}
          showModal={showInviteMembersModal}
          onClose={() => setShowInviteMembersModal(false)}
        />
        </>
  )
}

export default ProfileCreatedPage
