import React from 'react'
import './LoadingScreen.css'

function LoadingScreen () {
  return (
    <div className='loading_screen_wrapper'>
      <div className='loading_screen'>
        {/* <img src='img/acorn-logo.svg' /> */}
        <div>Loading Holochain...</div>
      </div>
    </div>
  )
}

export default LoadingScreen
