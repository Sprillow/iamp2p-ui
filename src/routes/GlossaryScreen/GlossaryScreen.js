import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

function Protocol () {
  return <>I am a protocol definition</>
}

export default function GlossaryScreen ({ match }) {
  return (
    <>
      <div className='glossary-screen-wrapper'>
        <div className='glossary-column'>
          Protocol
          <Route path={`${match.path}/protocol`} component={Protocol} />
        </div>
        <div>Communications Protocol</div>
        <div>Internet Protocol Suite/Stack* Model (TCP/IP)</div>
        <div>Application Layer</div>
        <div>Client-Server</div>
        <div>Distributed Hash Table</div>
      </div>
    </>
  )
}
