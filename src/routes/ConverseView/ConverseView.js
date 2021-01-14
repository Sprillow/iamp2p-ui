import React, { useState, useEffect, useRef } from "react";
import { cellIdToString } from "connoropolous-hc-redux-middleware/build/main/lib/actionCreator";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./ConverseView.css";
import Icon from "../../components/Icon/Icon";
import DashboardEmptyState from "../../components/DashboardEmptyState/DashboardEmptyState";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import JoinProjectModal from "../../components/JoinProjectModal/JoinProjectModal";
import InviteMembersModal from "../../components/InviteMembersModal/InviteMembersModal";
// import new modals here

import { PROJECTS_DNA_PATH, PROJECTS_ZOME_NAME } from "../../holochainConfig";
import { passphraseToUuid } from "../../secrets";
import { getAdminWs, getAppWs, getAgentPubKey } from "../../hcWebsockets";
import { fetchEntryPoints } from "../../projects/entry-points/actions";
import { fetchMembers, setMember } from "../../projects/members/actions";
import {
  createProjectMeta,
  fetchProjectMeta
} from "../../projects/project-meta/actions";
import selectEntryPoints from "../../projects/entry-points/select";

import { joinProjectCellId } from "../../cells/actions";

const softwareMessages = {
  // first interactions
  s1: `Let me introduce myself. 
  I’m IamP2P, a software built on a peer-to-peer internet protocol called Holochain.  
  I am a “self-conscious” software. 
  It means I am built to explain and reveal what I am built on, 
  instead of concealing my infrastructure.`,
  // second interactions
  s2: 'a protocol is...',
  s3: 'an internet protocol is...',
  s4: 'peer to peer is...',
  s5: 'I can do for you...',
  s6: 'I am so very different because...',
  s7: 'Sure, here is an example',
  // third interactions
  s8: "This is a third response"
};

const humanMessages = {
  // s1 responses
  h1: "What is a protocol?",
  h2: "What is an internet protocol?",
  h3: `What do you mean by ‘peer-to-peer’?`,
  h4: "What can you do for me?",
  h5: `So how are you different from, let’s say other apps or websites I’ve used before (you kind of look normal)?`,
  h6: "Can you show me an example of how you function?",
  // s2 responses
  h7: "This is a secondary response"
};

// human options, for a given software message
const optionMap = {
  s1: ["h1", "h2", "h3", "h4", "h5", "h6"],
  s2: ["h7"]
};

// the dedicated answer from the software to a given human message
const replyMap = {
  // secondary interactions
  h1: 's2',
  h2: 's3',
  h3: 's4',
  h4: 's5',
  h5: 's6',
  h6: 's7',
  // third interactions
  h7: 's8'
}

function ConverseView() {
  const [messages, setMessages] = useState([{ type: "software", id: "s1" }]);

  const lastMessage = messages[messages.length - 1]
  let optionIds = []
  // if the last message sent is from the software
  // then pick the set of appropriate response options,
  // IF its determined that options exist (in the optionMap)
  if (lastMessage.type === 'software') {
    // if there's no defined options for this message
    // then just leave it as the empty array
    optionIds = optionMap[lastMessage.id] || [];
  }

  // capture a reference to the messageHistory div
  // so that we can control its scrolling
  const messageHistoryRef = useRef();

  return (
    <div className="converse-view-wrapper">
      {/* Answer Options */}
      <div className="options-wrapper">
        <div className="select-one">Select one:</div>
        {/* This won't render any options if the list of options is */}
        {/* 0 long (no options) */}
        {optionIds.map((optionId, index) => {
          // pretty much everything interesting happens in response
          // to a user clicking on an interaction option
          // which is why this function is so big
          const onClickOption = () => {
            // add the response to the list of messages that
            // have been communicated
            const newMessages = messages.concat([{ type: "human", id: optionId }])
            setMessages(newMessages);
            // scroll to the bottom, to make sure you can see the new message
            setImmediate(() => {
              messageHistoryRef.current.scrollTop =
                messageHistoryRef.current.scrollTopMax;
            });
            // determine what the software should reply
            const softwareMessageDelay = 500 // milliseconds
            setTimeout(() => {
              const idOfReply = replyMap[optionId]
              setMessages(newMessages.concat([{ type: "software", id: idOfReply }]));
            }, softwareMessageDelay)
          };

          // the render for an option bubble
          return (
            <div key={index} className="chat-bubble-wrapper option">
              <div className="option-bubble" onClick={onClickOption}>
                {humanMessages[optionId]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Iterate over all the messages, rendering each one */}
      {/* Use the message.type property as a classname */}
      {/* Should be either 'software' or 'human' */}
      <div className="message-history" ref={messageHistoryRef}>
        {messages.map((message, index) => {
          return (
            <div key={index} className={`chat-bubble-wrapper ${message.type}`}>
              <div className="chat-bubble">
                {message.type === "software" && softwareMessages[message.id]}
                {message.type === "human" && humanMessages[message.id]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-change-buttons">
        <div className="chat-undo-button">Undo</div>
        <div className="chat-back-button">Refresh</div>
      </div>
    </div>
  );
}

async function installProjectApp(passphrase) {
  const uuid = passphraseToUuid(passphrase);
  // add a bit of randomness so that
  // the same passphrase can be tried multiple different times
  // without conflicting
  // in order to eventually find their peers
  // note that this will leave a graveyard of deactivated apps for attempted
  // joins
  const installed_app_id = `${Math.random()
    .toString()
    .slice(-6)}-${uuid}`;
  const adminWs = await getAdminWs();
  const agent_key = getAgentPubKey();
  if (!agent_key) {
    throw new Error(
      "Cannot install a new project because no AgentPubKey is known locally"
    );
  }
  // INSTALL
  const installedApp = await adminWs.installApp({
    agent_key,
    installed_app_id,
    dnas: [
      {
        nick: uuid,
        path: PROJECTS_DNA_PATH,
        properties: { uuid }
      }
    ]
  });
  // ACTIVATE
  await adminWs.activateApp({ installed_app_id });
  return installedApp;
}

async function createProject(passphrase, projectMeta, agentAddress, dispatch) {
  const installedApp = await installProjectApp(passphrase);
  const cellIdString = cellIdToString(installedApp.cell_data[0][0]);
  // because we are acting optimistically,
  // because holochain is taking 18 s to respond to this first call
  // we will directly set ourselves as a member of this cell
  await dispatch(setMember(cellIdString, { address: agentAddress }));
  const b1 = Date.now();
  await dispatch(
    createProjectMeta.create({ cellIdString, payload: projectMeta })
  );
  const b2 = Date.now();
  console.log("duration in MS over createProjectMeta ", b2 - b1);
}

async function joinProject(passphrase, dispatch) {
  // joinProject
  // join a DNA
  // then try to get the project metadata
  // if that DOESN'T work, the attempt is INVALID
  // remove the instance again immediately
  const installedApp = await installProjectApp(passphrase);
  const cellId = installedApp.cell_data[0][0];
  const cellIdString = cellIdToString(installedApp.cell_data[0][0]);
  const appWs = await getAppWs();
  try {
    await appWs.callZome({
      cap: null,
      cell_id: cellId,
      zome_name: PROJECTS_ZOME_NAME,
      fn_name: "fetch_project_meta",
      payload: null,
      provenance: getAgentPubKey() // FIXME: this will need correcting after holochain changes this
    });
    await dispatch(joinProjectCellId(cellIdString));
    // trigger a side effect...
    // this will let other project members know you're here
    // without 'blocking' the thread or the UX
    appWs
      .callZome({
        cap: null,
        cell_id: cellId,
        zome_name: PROJECTS_ZOME_NAME,
        fn_name: "init_signal",
        payload: null,
        provenance: getAgentPubKey() // FIXME: this will need correcting after holochain changes this
      })
      .then(() => console.log("succesfully triggered init_signal"))
      .catch(e => console.error("failed while triggering init_signal: ", e));
    return true;
  } catch (e) {
    // deactivate app
    const adminWs = await getAdminWs();
    await adminWs.deactivateApp({
      installed_app_id: installedApp.installed_app_id
    });
    if (
      e.type === "error" &&
      e.data.type === "ribosome_error" &&
      e.data.data.includes("no project meta exists")
    ) {
      return false;
    } else {
      throw e;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEntryPoints: cellIdString => {
      return dispatch(fetchEntryPoints.create({ cellIdString, payload: null }));
    },
    fetchMembers: cellIdString => {
      return dispatch(fetchMembers.create({ cellIdString, payload: null }));
    },
    fetchProjectMeta: cellIdString => {
      return dispatch(fetchProjectMeta.create({ cellIdString, payload: null }));
    },
    createProject: async (agentAddress, project, passphrase) => {
      // matches the createProjectMeta fn and type signature
      const projectMeta = {
        ...project, // name and image
        passphrase,
        creator_address: agentAddress,
        created_at: Date.now()
      };
      await createProject(passphrase, projectMeta, agentAddress, dispatch);
    },
    joinProject: passphrase => joinProject(passphrase, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    agentAddress: state.agentAddress,
    cells: state.cells.projects,
    projects: Object.keys(state.projects.projectMeta).map(cellId => {
      const project = state.projects.projectMeta[cellId];
      const members = state.projects.members[cellId] || {};
      const memberProfiles = Object.keys(members).map(
        agentAddress => state.agents[agentAddress]
      );
      const entryPoints = selectEntryPoints(state, cellId);
      return {
        ...project,
        cellId,
        members: memberProfiles,
        entryPoints
      };
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConverseView);
