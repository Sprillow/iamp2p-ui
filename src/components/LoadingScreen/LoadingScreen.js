import React from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  return (
    <div className='loading_screen_wrapper'>
      <div className='loading_screen'>
        <img src='img/iamp2p-logo.svg' />
        <div>collecting your iamp2ps...</div>
      </div>
    </div>
  )
}

export default LoadingScreen
