import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Route, useLocation } from 'react-router-dom'
import Icon from '../../components/Icon/Icon'

import './GlossaryScreen.css'

function Protocol () {
  return (
    <ColumnOverlay term='Protocol'>
      In computing field, protocol is defined as: a computer language allowing
      computers that are connected to each other to communicate.
      <br />
      You can think of protocol as a language, with a set of rules defining how
      entities (in this context: computers) communicate. <br />
      <br />
      <b>Etymology</b>
      <br />
      <br />
      Borrowed from Middle French protocolle, protocole (“document, record”),
      from Late Latin protocollum (“the first sheet of a volume (on which
      contents and errata were written)”), from Byzantine Greek πρωτόκολλον
      (prōtókollon, “first sheet glued onto a manuscript”), from πρῶτος (prôtos,
      “first”) + κόλλα (kólla, “glue”).
    </ColumnOverlay>
  )
}

function CommunicationsProtocol () {
  return (
    <ColumnOverlay term='Communications Protocol'>
      A communication protocol is a system of rules that allow two or more
      entities of a communications system to transmit information via any kind
      of variation of a physical quantity. The protocol defines the rules,
      syntax, semantics and synchronization of communication and possible error
      recovery methods. Protocols may be implemented by hardware, software, or a
      combination of both.
      <br />
      <br />
      Communicating systems use well-defined formats for exchanging various
      messages. Each message has an exact meaning intended to elicit a response
      from a range of possible responses pre-determined for that particular
      situation. The specified behavior is typically independent of how it is to
      be implemented. Communication protocols have to be agreed upon by the
      parties involved.
      <br />
      <br />
      To reach an agreement, a protocol may be developed into a technical
      standard. A programming language describes the same for computations, so
      there is a close analogy between protocols and programming languages:
      protocols are to communication what programming languages are to
      computations. An alternate formulation states that protocols are to
      communication what algorithms are to computation.{' '}
    </ColumnOverlay>
  )
}

function InternetProtocolSuite () {
  return (
    <ColumnOverlay term='Internet Protocol Suite/Stack* Model (TCP/IP)'>
      The Internet protocol suite is the conceptual model and set of
      communications protocols used in the Internet and similar computer
      networks. It is commonly known as TCP/IP because the foundational
      protocols in the suite are the Transmission Control Protocol (TCP) and the
      Internet Protocol (IP).
      <br />
      <br />
      During its development, versions of it were known as the Department of
      Defense (DoD) model because the development of the networking method was
      funded by the United States Department of Defense through DARPA. Its
      implementation is a protocol stack.
      <br />
      <br />
      The Internet protocol suite provides end-to-end data communication
      specifying how data should be packetized, addressed, transmitted, routed,
      and received. This functionality is organized into four abstraction
      layers, which classify all related protocols according to the scope of
      networking involved.
      <br />
      <br />
      From the lowest to highest, the layers are the Network Access (or Link)
      Layer, Internet Layer, Transport Layer, and Application Layer.
      <br />
      <br />
      *Sometimes the terms Suite and Stack are used interchangeably but strictly
      speaking, the suite is the definition of the communication protocols, and
      the stack is the software implementation of them.{' '}
    </ColumnOverlay>
  )
}

function ApplicationLayer () {
  return (
    <ColumnOverlay term='Application Layer'>
      The top abstraction layer of the Internet Protocol Suite/Stack.
      <br />
      <br />
      The application layer only standardizes communication and depends upon the
      underlying transport layer protocols to establish host-to-host data
      transfer channels and manage the data exchange in a client-server or
      peer-to-peer networking model.
      <br />
      <br />
      Most known protocol examples in this layer are HTTP (Hypertext transfer
      protocol) and SMTP (Simple mail transfer protocol), and DNS (Domain Name
      System){' '}
    </ColumnOverlay>
  )
}

function TransportLayer () {
  return (
    <ColumnOverlay term='Transport Layer'>
      Second top abstraction layer of the Internet Protocol Suite/Stack.
      <br />
      <br />
      The transport layer is responsible for delivering data to the appropriate
      application process on the host computers. The protocols of this layer
      provide host-to-host communication services for applications.
      <br />
      <br />
      The most well-known transport protocol is the Transmission Control
      Protocol (TCP).{' '}
    </ColumnOverlay>
  )
}

function InternetLayer () {
  return (
    <ColumnOverlay term='Internet Layer'>
      The layer between the Transport Layer and the Network Access (Link) Layer.
      Protocols in the Internet layer describe how data is sent and received
      over the Internet. The process involves packaging data into packets,
      addressing and transmitting{' '}
      <a href='https://en.wikipedia.org/wiki/Network_packet' target='_blank'>
        {' '}
        network packets
      </a>
      , and receiving incoming packets of data.
      <br />
      <br />
      The internet layer derives its name from its function facilitating
      internetworking, which is the concept of connecting multiple networks with
      each other through gateways.
      <br />
      <br />
      The most widely known protocol in this layer gives TCP/IP its last two
      letters: the{' '}
      <a href='https://en.wikipedia.org/wiki/Internet_Protocol' target='_blank'>
        Internet Protcol (IP)
      </a>
      .
      <br />
      <br />
      The internet layer does not include the protocols that fulfill the purpose
      of maintaining link states between the local nodes and that usually use
      protocols that are based on the framing of packets specific to the link
      types. Such protocols belong to the link (network access) layer.
      Internet-layer protocols use IP-based packets.
    </ColumnOverlay>
  )
}

function NetworkAccessLayer () {
  return (
    <ColumnOverlay term='Network Access (Link) Layer'>
      In computer networking, the Network Access (or link layer) is the lowest
      layer in the Internet protocol suite, the networking architecture of the
      Internet. The link layer is the group of methods and communications
      protocols confined to the link that a host is <b>physically</b> connected
      to.
      <br />
      <br />
      This layer deals with sending information between hosts on the same local
      network, and translating data from the higher layers to the physical
      layer. Unlike other layers, link layer protocols are dependent on the
      hardware being used.{' '}
    </ColumnOverlay>
  )
}

function ClientServer () {
  return (
    <ColumnOverlay term='Client-Server'>
      Client–server model is a distributed application structure that partitions
      tasks or workloads between the providers of a resource or service, called
      "servers", and service requesters, called "clients".
      <br />
      <br />
      Often clients and servers communicate over a computer network on separate
      hardware, but both client and server may reside in the same system. A
      server host runs one or more server programs, which share their resources
      with clients. A client does not share any of its resources, but it
      requests content or service from a server. Clients, therefore, initiate
      communication sessions with servers, which await incoming requests.
      Examples of computer applications that use the client-server model are
      email, network printing, and the World Wide Web.{' '}
    </ColumnOverlay>
  )
}

function PeerToPeer () {
  return (
    <ColumnOverlay term='Peer-to-Peer (P2P)'>
      Peer-to-peer (P2P) computing or networking is a distributed application
      architecture that partitions tasks or workloads between "peers". Peers are
      equally privileged, equipotent participants in the application. They are
      said to form a peer-to-peer network of nodes.
      <br />
      <br />
      Peers make a portion of their resources, such as processing power, disk
      storage or network bandwidth, directly available to other network
      participants, without the need for central coordination by servers or
      stable hosts.
      <br />
      <br />
      Peers are both suppliers ("servers") and consumers ("clients") of
      resources, in contrast to the traditional client-server model in which the
      consumption and supply of resources is divided.
      <br />
      <br />
      Emerging collaborative P2P systems are going beyond the era of peers doing
      similar things while sharing resources, and are looking for diverse peers
      that can bring in unique resources and capabilities to a virtual community
      thereby empowering it to engage in greater tasks beyond those that can be
      accomplished by individual peers, yet that are beneficial to all the
      peers.
      <br />
      <br />
      While P2P systems had previously been used in many application domains,
      the architecture was popularized by the file sharing system Napster,
      originally released in 1999. The concept has inspired new structures and
      philosophies in many areas of human interaction. In such social contexts,
      peer-to-peer as a meme refers to the egalitarian social networking that
      has emerged throughout society, enabled by Internet technologies in
      general.
    </ColumnOverlay>
  )
}

function Hybrid () {
  return (
    <ColumnOverlay term='Hybrid'>
      Hybrid models are a combination of peer-to-peer and client-server models.
      A common hybrid model is to have a central server that helps peers find
      each other. Spotify was an example of a hybrid model [until 2014]. There
      are a variety of hybrid models, all of which make trade-offs between the
      centralized functionality provided by a structured server/client network
      and the node equality afforded by the pure peer-to-peer unstructured
      networks. Currently, hybrid models have better performance than either
      pure unstructured networks or pure structured networks because certain
      functions, such as searching, do require a centralized functionality but
      benefit from the decentralized aggregation of nodes provided by
      unstructured networks.{' '}
    </ColumnOverlay>
  )
}

function DistributedHashTable () {
  return (
    <ColumnOverlay term='Distributed Hash Table (DHT)'>
      A distributed hash table (DHT) is a distributed system that provides a
      data lookup service similar to a hash table based on{' '}
      <a
        href='https://en.wikipedia.org/wiki/Attribute%E2%80%93value_pair'
        target='_blank'>
        key-value pairs
      </a>{' '}
      . Key-value pairs are stored in a DHT, and any participating{' '}
      <a href='https://en.wikipedia.org/wiki/Node_(networking)' target='_blank'>
        node
      </a>{' '}
      can efficiently retrieve the value associated with a given key. The main
      advantage of a DHT is that nodes can be added or removed with minimum work
      around re-distributing keys. <b>Keys</b> are unique identifiers which map
      to particular <b>values</b>, which in turn can be anything from addresses,
      to documents, to arbitrary data.
      <br />
      <br />
      Responsibility for maintaining the mapping from keys to values is
      distributed among the nodes, in such a way that a change in the set of
      participants causes a minimal amount of disruption. This allows a DHT to
      scale to extremely large numbers of nodes and to handle continual node
      arrivals, departures, and failures.
      <br />
      <br />
      DHTs characteristically emphasize the following properties:
      <br />- Autonomy and decentralization: the nodes collectively form the
      system without any central coordination.
      <br />
      - Fault tolerance: the system should be reliable (in some sense) even with
      nodes continuously joining, leaving, and failing.
      <br />- Scalability: the system should function efficiently even with
      thousands or millions of nodes.{' '}
    </ColumnOverlay>
  )
}

function SourceChain () {
  return (
    <ColumnOverlay term='Source Chain'>
      Each peer in a{' '}
      <a href='https://wiki.p2pfoundation.net/Holochain' target='_blank'>
        Holochain
      </a>{' '}
      network creates and stores their own data in a journal called a source
      chain. Each journal entry is cryptographically signed by its author and is
      immutable once written.
      <br />
      <br />
      In ohter words, source chain is a decentralized ledger-- a chronological
      journal of every piece of data the user has created. Only the user has the
      authority to write to it; it lives on their device and each entry must be
      signed by their <NavLink to='/glossary/private-key'>private key</NavLink>.
      This journal is called a source chain because every piece of data in a
      Holochain app starts its life here.{' '}
    </ColumnOverlay>
  )
}

function Cryptography () {
  return (
    <ColumnOverlay term='Cryptography'>
      Cryptography, or cryptology (from Ancient Greek: κρυπτός, romanized:
      kryptós "hidden, secret"; and γράφειν graphein, "to write", or -λογία
      -logia, "study", respectively), is the practice and study of techniques
      for secure communication in the presence of third parties called
      adversaries. More generally, cryptography is about constructing and
      analyzing protocols that prevent third parties or the public from reading
      private messages; various aspects in information security such as data
      confidentiality, data integrity, authentication, and non-repudiation are
      central to modern cryptography.
      <br />
      <br />
      Modern cryptography exists at the intersection of the disciplines of
      mathematics, computer science, electrical engineering, communication
      science, and physics. Applications of cryptography include electronic
      commerce, chip-based payment cards, digital currencies, computer
      passwords, and military communications. Cryptography prior to the modern
      age was effectively synonymous with encryption, converting information
      from a readable state to unintelligible nonsense.
      <br />
      <br />
      Modern cryptography is heavily based on mathematical theory and computer
      science practice; cryptographic algorithms are designed around
      computational hardness assumptions, making such algorithms hard to break
      in actual practice by any adversary. While it is theoretically possible to
      break into a well-designed such system, it is infeasible in actual
      practice to do so. Such schemes, if well designed, are therefore termed
      "computationally secure".{' '}
    </ColumnOverlay>
  )
}

function PublicKeyCryptography () {
  return (
    <ColumnOverlay term='Public Key Cryptography'>
      Public-key cryptography, or asymmetric cryptography, is a cryptographic
      system which uses pairs of keys: public keys (which may be known to
      others), and private keys (which may never be known by any except the
      owner). The generation of such key pairs depends on cryptographic
      algorithms which are based on mathematical problems termed one-way
      functions. Effective security requires keeping the private key private;
      the public key can be openly distributed without compromising security.
      <br />
      <br />
      In such a system, any person can encrypt a message using the intended
      receiver's public key, but that encrypted message can only be decrypted
      with the receiver's private key.{' '}
    </ColumnOverlay>
  )
}

function PrivateKey () {
  return (
    <ColumnOverlay term='Private Key'>
      A private key is a tiny bit of code that is paired with a public key to
      set off algorithms for text encryption and decryption. It is created as
      part of public key cryptography during asymmetric-key encryption and used
      to decrypt and transform a message to a readable format. Public and
      private keys are paired for secure communication, such as email. A private
      key is also known as a secret key.
      <br />
      <br />
      In short, sending encrypted messages requires that the sender use the
      recipient's public key and its own private key for encryption of the
      digital certificate. Thus, the recipient uses its own private key for
      message decryption, whereas the sender's public key is used for digital
      certificate decryption.
      <br />
      <br />
      One should never share their private key with anyone.{' '}
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
  const scrollableRef = useRef()
  const location = useLocation()

  // do fancy side scrolling with mousewheel
  // but only if there's no panel open
  useEffect(() => {
    const f = e => {
      if (scrollableRef.current) {
        scrollableRef.current.scrollLeft += e.deltaY
      }
    }
    if (location.pathname === '/glossary') {
      document.addEventListener('wheel', f)
    }
    return () => {
      document.removeEventListener('wheel', f)
    }
  }, [location.pathname])

  return (
    <>
      <div className='glossary-screen-wrapper' ref={scrollableRef}>
        <div className='glossary-screen-scroll-right'>
          Scroll right to see more
        </div>
        <div className='glossary-screen-inner-wrapper'>
          <div className='glossary-column'>
            <Route path={`${match.path}/protocol`} component={Protocol} />
            <Route
              path={`${match.path}/cryptography`}
              component={Cryptography}
            />
            {/* Protocol */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/protocol`}>Protocol</NavLink>
              </div>
            </div>

            {/* Cryptography */}
            <div className='glossary-row cryptography'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/cryptography`}>
                  Cryptography
                </NavLink>
              </div>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/communications-protocol`}
              component={CommunicationsProtocol}
            />
            <Route
              path={`${match.path}/public-key`}
              component={PublicKeyCryptography}
            />
            <Route path={`${match.path}/private-key`} component={PrivateKey} />
            <div className='glossary-column-inner-wrapper'>
              <NavLink to={`${match.path}/communications-protocol`}>
                Communications Protocol
              </NavLink>
            </div>

            {/* Public Key Cryptography */}
            <div className='glossary-row cryptography'>
              <div className='glossary-column-inner-wrapper'>
                <div className='glossary-inner-row top'>
                  <NavLink to={`${match.path}/public-key`}>
                    Public Key Cryptography
                  </NavLink>
                </div>
                <div className='glossary-inner-row'>
                  <NavLink to={`${match.path}/private-key`}>
                    Private Key
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Private Key */}
            {/* <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/private-key`}>Private Key</NavLink>
              </div>
            </div> */}
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
            <Route
              path={`${match.path}/application-layer`}
              component={ApplicationLayer}
            />
            <Route
              path={`${match.path}/transport-layer`}
              component={TransportLayer}
            />
            <Route
              path={`${match.path}/Internet-layer`}
              component={InternetLayer}
            />
            <Route
              path={`${match.path}/network-access-layer`}
              component={NetworkAccessLayer}
            />
            {/* Application Layer */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/application-layer`}>
                  Application Layer
                </NavLink>
              </div>
            </div>
            {/* Transport Layer */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/transport-layer`}>
                  Transport Layer
                </NavLink>
              </div>
            </div>
            {/* Internet Layer */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/Internet-layer`}>
                  Internet Layer
                </NavLink>
              </div>
            </div>
            {/* Network Access Layer */}
            <div className='glossary-row'>
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
            <Route path={`${match.path}/peer-to-peer`} component={PeerToPeer} />
            <Route path={`${match.path}/hybrid`} component={Hybrid} />
            {/* Client-Server */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/client-server`}>
                  Client-Server
                </NavLink>
              </div>
            </div>
            {/* P2P */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/peer-to-peer`}>
                  Peer-to-Peer (P2P)
                </NavLink>
              </div>
            </div>
            {/* Hybrid */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/hybrid`}>Hybrid</NavLink>
              </div>
            </div>
          </div>
          <div className='glossary-column'>
            <Route
              path={`${match.path}/distributed-hash-table`}
              component={DistributedHashTable}
            />
            <Route
              path={`${match.path}/source-chain`}
              component={SourceChain}
            />
            {/* DHT */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/distributed-hash-table`}>
                  Distributed Hash Table
                </NavLink>
              </div>
            </div>
            {/* Source Chain */}
            <div className='glossary-row'>
              <div className='glossary-column-inner-wrapper'>
                <NavLink to={`${match.path}/source-chain`}>
                  Source Chain
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
