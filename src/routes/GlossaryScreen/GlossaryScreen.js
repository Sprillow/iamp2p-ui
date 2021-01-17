import React, { useEffect, useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Icon from '../../components/Icon/Icon'

import './GlossaryScreen.css'

function Protocol () {
  return (
    <ColumnOverlay term='Protocol'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function CommunicationsProtocol () {
  return (
    <ColumnOverlay term='Communications Protocol'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function InternetProtocolSuite () {
  return (
    <ColumnOverlay term='Internet Protocol Suite/Stack* Model (TCP/IP)'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function ApplicationLayer () {
  return (
    <ColumnOverlay term='Application Layer'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function TransportLayer () {
  return (
    <ColumnOverlay term='Transport Layer'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function InternetLayer () {
  return (
    <ColumnOverlay term='Internet Layer'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function NetworkAccessLayer () {
  return (
    <ColumnOverlay term='Network Access Layer'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function ClientServer () {
  return (
    <ColumnOverlay term='Client-Server'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function PeerToPeer () {
  return (
    <ColumnOverlay term='Peer-to-Peer (P2P)'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function Hybrid () {
  return (
    <ColumnOverlay term='Hybrid'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function DistributedHashTable () {
  return (
    <ColumnOverlay term='Distributed Hash Table (DHT)'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function Cryptography () {
  return (
    <ColumnOverlay term='Cryptography'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function PublicKeyCryptography () {
  return (
    <ColumnOverlay term='Public Key Cryptography'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function PrivateKey () {
  return (
    <ColumnOverlay term='Private Key'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate. So Think
      language, with a set of rules defining how to entities communicate.{' '}
    </ColumnOverlay>
  )
}

function ColumnOverlay ({ term, children }) {
  return (
    <div className='column-overlay'>
      <div className='column-overlay-close-button'>
        <NavLink to={`/glossary`}>
          {' '}
          <Icon name='x.svg' size='large-close' className='' />
        </NavLink>
      </div>
      <div className='column-overlay-term'>{term}</div>
      <div className='column-overlay-description'>{children}</div>
    </div>
  )
}

export default function GlossaryScreen ({ match }) {
  return (
    <>
      <div className='glossary-screen-wrapper'>
        <div className='glossary-screen-inner-wrapper'>
          <div className='glossary-column'>
            <Route path={`${match.path}/protocol`} component={Protocol} />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/protocol`}>Protocol</NavLink>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/communications-protocol`}
              component={CommunicationsProtocol}
            />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/communications-protocol`}>
                Communications Protocol
              </NavLink>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/internet-protocol-suite`}
              component={InternetProtocolSuite}
            />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/internet-protocol-suite`}>
                Internet Protocol Suite/Stack* Model (TCP/IP)
              </NavLink>
            </div>
          </div>
          <div className='glossary-column'>
            {/* Application Layer */}
            <div className='glossary-row'>
              <Route
                path={`${match.path}/application-layer`}
                component={ApplicationLayer}
              />
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/application-layer`}>
                  Application Layer
                </NavLink>
              </div>
            </div>
            {/* Transport Layer */}
            <div className='glossary-row'>
              <Route
                path={`${match.path}/transport-layer`}
                component={TransportLayer}
              />
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/transport-layer`}>
                  Transport Layer
                </NavLink>
              </div>
            </div>
            {/* Internet Layer */}
            <div className='glossary-row'>
              <Route
                path={`${match.path}/Internet-layer`}
                component={InternetLayer}
              />
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/Internet-layer`}>
                  Internet Layer
                </NavLink>
              </div>
            </div>
            {/* Network Access Layer */}
            <div className='glossary-row'>
              <Route
                path={`${match.path}/network-access-layer`}
                component={NetworkAccessLayer}
              />
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/network-access-layer`}>
                  Network Access Layer
                </NavLink>
              </div>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/client-server`}
              component={ClientServer}
            />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/client-server`}>
                Client-Server
              </NavLink>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/distributed-hash-table`}
              component={DistributedHashTable}
            />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/distributed-hash-table`}>
                Distributed Hash Table
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
