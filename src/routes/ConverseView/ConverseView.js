import React, { useState, useEffect, useRef } from 'react'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Graph from 'react-graph-vis'

import './ConverseView.css'
import Icon from '../../components/Icon/Icon'
import DashboardEmptyState from '../../components/DashboardEmptyState/DashboardEmptyState'

import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import JoinProjectModal from '../../components/JoinProjectModal/JoinProjectModal'
import InviteMembersModal from '../../components/InviteMembersModal/InviteMembersModal'
// import new modals here

import { PROJECTS_DNA_PATH, ZOME_NAME } from '../../holochainConfig'
import { passphraseToUuid } from '../../secrets'
import { getAdminWs, getAppWs, getAgentPubKey } from '../../hcWebsockets'
import { fetchEntryPoints } from '../../projects/entry-points/actions'
import { fetchMembers, setMember } from '../../projects/members/actions'
import {
  createProjectMeta,
  fetchProjectMeta,
} from '../../projects/project-meta/actions'
import selectEntryPoints from '../../projects/entry-points/select'

import {
  softwareMessages,
  humanMessages,
  replyMap,
  optionMap,
} from './ConverseContent'

// yellow is software
const graphSmessages = Object.keys(softwareMessages).map(sId => ({
  id: sId,
  label: sId,
  title: softwareMessages[sId],
  color: sId === 's1' ? 'lightblue' : 'yellow',
}))
// green is human
const graphHmessages = Object.keys(humanMessages).map(hId => ({
  id: hId,
  label: hId,
  title: humanMessages[hId],
  color: '#2a905c',
}))
const optionEdges = Object.keys(optionMap).reduce((memo, sId) => {
  const list = optionMap[sId].map(hId => ({
    from: sId,
    to: hId,
  }))
  return memo.concat(list)
}, [])
const softwareResponseEdges = Object.keys(replyMap).reduce((memo, hId) => {
  const list = replyMap[hId].map((sId, index) => {
    if (index === 0) {
      return {
        from: hId,
        to: sId,
      }
    } else {
      return {
        from: replyMap[hId][index - 1],
        to: sId,
      }
    }
  })
  return memo.concat(list)
}, [])
const nodes = graphSmessages.concat(graphHmessages)
const edges = optionEdges.concat(softwareResponseEdges)
// set end nodes to pink
nodes.forEach(n => {
  const fromEdge = edges.find(e => e.from === n.id)
  if (!fromEdge) {
    n.color = 'pink'
  }
})
const graph = {
  nodes,
  edges,
}

function ConverseView () {
  // will show a typing indicator on the computer side
  // if set to true
  const [softwareIsTyping, setSoftwareIsTyping] = useState(true)
  const [messages, setMessages] = useState([])

  // this callback will only be called once
  // when this component loads
  useEffect(() => {
    sendMessageFromSoftware(
      setSoftwareIsTyping,
      [],
      setMessages,
      scroll,
      's1', // the ID of the message to send from the software
      2000 // delay
    )
  }, [])

  const lastMessage = messages[messages.length - 1]
  let optionIds = []
  // if the last message sent is from the software
  // then pick the set of appropriate response options,
  // IF its determined that options exist (in the optionMap)
  if (lastMessage && lastMessage.type === 'software') {
    // if there's no defined options for this message
    // then just leave it as the empty array
    optionIds = optionMap[lastMessage.id] || []
  }

  // capture a reference to the messageHistory div
  // so that we can control its scrolling
  const messageHistoryRef = useRef()

  const [optionsHeight, setOptionsHeight] = useState(0)
  const receiveOptionsWrapperDiv = optionsWrapper => {
    if (optionsWrapper) {
      setOptionsHeight(optionsWrapper.clientHeight)
    } else {
      setOptionsHeight(0)
    }
  }

  // adjust the scrolling of the messagesHistory div,
  // whenever the options overlay height changes
  useEffect(() => {
    scroll()
  }, [optionsHeight])

  function scroll () {
    if (messageHistoryRef.current) {
      setImmediate(() => {
        messageHistoryRef.current.scrollTo({
          top: messageHistoryRef.current.scrollHeight,
          behavior: 'smooth',
        })
      })
    }
  }

  return (
    <div className='converse-view-wrapper'>
      {/* <div className='graph-helper-overlay'>
        <Graph graph={graph} />
      </div> */}
      {/* Answer Options */}
      {/* This won't render any options if the list of options is */}
      {/* 0 long (no options) */}
      {optionIds.length > 0 && (
        <div className='options-wrapper' ref={receiveOptionsWrapperDiv}>
          <div className='select-one'>Select one:</div>
          {optionIds.map((optionId, index) => {
            // pretty much everything interesting happens in response
            // to a user clicking on an interaction option
            // which is why this function is so big
            const onClickOption = async () => {
              // add the response to the list of messages that
              // have been communicated
              let newMessages = messages.concat([
                { type: 'human', id: optionId },
              ])
              setMessages(newMessages)
              // scroll their message
              scroll()
              // determine what the software should reply
              const replyIds = replyMap[optionId]
              if (replyIds) {
                // iterate through the replies, creating timers
                // that will send those messages
                replyIds.reduce(async (previousPromise, replyId, index) => {
                  await previousPromise
                  return sendMessageFromSoftware(
                    setSoftwareIsTyping,
                    // this will always be the right list of previous messages
                    // such that overriding it will still produce the right
                    // NEW list
                    newMessages.concat(
                      replyIds
                        .map(replyId => ({ type: 'software', id: replyId }))
                        .slice(0, index)
                    ),
                    setMessages,
                    scroll,
                    replyId
                  )
                }, Promise.resolve())
                // softwareMessageDelay * (index + 1)
              }
            }

            // the render for an option bubble
            return (
              <div key={index} className='chat-bubble-wrapper option'>
                <div className='option-bubble' onClick={onClickOption}>
                  {/* <b style={{ color: 'purple' }}>{optionId}</b>&nbsp; */}
                  {humanMessages[optionId]}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Iterate over all the messages, rendering each one */}
      {/* Use the message.type property as a classname */}
      {/* Should be either 'software' or 'human' */}
      <div className='message-history' ref={messageHistoryRef}>
        {messages.map((message, index) => {
          return (
            <div key={index} className={`chat-bubble-wrapper ${message.type}`}>
              <div className='chat-bubble'>
                {/* <b style={{ color: 'purple' }}>{message.id}</b>&nbsp; */}
                {message.type === 'software' && softwareMessages[message.id]}
                {message.type === 'human' && humanMessages[message.id]}
              </div>
            </div>
          )
        })}
        {softwareIsTyping && (
          <div className='software-is-typing'>
            <div className='loading'>
              <div className='dot one'></div>
              <div className='dot two'></div>
              <div className='dot three'></div>
            </div>
          </div>
        )}
        {/* space this div appropriately so that none of the content is */}
        {/* hidden behind the options overlay that is positioned absolutely */}
        {/* in front of it */}
        {/* 20px is how far up off the bottom of the screen the overlay is */}
        <div style={{ height: optionsHeight + 20 }} />
      </div>

      <div className='chat-change-buttons'>
        <div className='chat-undo-button'>Undo</div>
        <div className='chat-back-button'>Refresh</div>
      </div>
    </div>
  )
}

async function sendMessageFromSoftware (
  setSoftwareIsTyping,
  messages,
  setMessages,
  scroll,
  replyId,
  delay = 1000
) {
  await new Promise(resolve => {
    // show the typing indicator
    setSoftwareIsTyping(true)
    // set the timeout
    setTimeout(() => {
      // send the message
      // by adding it to the list of messages
      setMessages(messages.concat([{ type: 'software', id: replyId }]))
      // hide the typing indicator
      setSoftwareIsTyping(false)
      scroll()
      // resolve the promise, and the whole function
      resolve()
    }, delay)
  })
}

export default ConverseView
