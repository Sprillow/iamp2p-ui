import React from 'react'
import './ButtonWithPendingState.css'

import Icon from '../Icon/Icon'

export default function ButtonWithPendingState ({
  pending,
  pendingText,
  actionText,
}) {
  return pending ? (
    <div className='pending-iamp2p'>{pendingText}</div>
  ) : (
    actionText
  )
}
