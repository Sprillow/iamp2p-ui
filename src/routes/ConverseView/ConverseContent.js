// human options, for a given software message
// this is a pick-and-choose-from kind of list
const optionMap = {
  s1: ['h1', 'h2', 'h3', 'h4', 'h5'],
  s2: ['h7', 'h2'],
  s4: ['h9'],
  s5: ['h17', 'h18', 'h19', 'h20'],
  s6: ['h7', 'h6'],
  s8: ['h6'],
  s17: ['h15'],
  s18: ['h27'],
  s19: ['h6', 'h13'],
  s20: ['h10'],
  s21: ['h22', 'h23', 'h24', 'h25'],

  s28: ['h23', 'h24', 'h5', 'h25'],

  s33: ['h22', 'h24', 'h5', 'h25'],

  s34: ['h5', 'h22', 'h23'],
  s37: ['h27'],
  s38: ['h28', 'h29'],
}

// the dedicated list of answers from the software to a given human message
// these are linear lists, the messages reply in the order they are listed
const replyMap = {
  // secondary interactions
  h1: ['s2'],
  h2: ['s5'],
  h3: ['s3', 's4'],
  h4: ['s6'],
  h5: ['s7', 's8'],
  h6: ['s37'],
  h7: ['s3', 's4'],
  h9: ['s14', 's15', 's16', 's17'],
  h10: ['s21'],
  h13: ['s20'],
  h15: ['s21'],
  h17: ['s9', 's10', 's11', 's12', 's13', 's14', 's15', 's16', 's17'],
  h18: ['s14', 's15', 's16', 's17'],
  h19: ['s18'],
  h20: ['s19'],
  h22: ['s22', 's23', 's24', 's25', 's26', 's27', 's28'],
  h23: ['s29', 's30', 's31', 's32', 's33'],
  h24: ['s34'],
  h25: ['s35', 's36'],
  h26: ['', ''],
  h27: ['s38'],
  h28: ['s3', 's4'],
  h29: ['s39'],
}

const softwareMessages = {
  // first interactions
  s1: `Let me introduce myself. I’m IamP2P, a software built on a peer-to-peer protocol and application architecture called Holochain. I am a “self-conscious” software. It means I am built to explain and reveal what I am built on, instead of concealing my infrastructure. `,
  // second interactions

  s2: `In computing field, protocol is defined as: a computer language allowing computers that are connected to each other to communicate. 
  So think language, with a set of rules defining how to entities communicate. `,

  s3: `My characteristics and affordances are different from other internet protocols, like the “client-server” model, which is what probably you’ve mostly used before.`,

  s4: `Peer-to-peer (P2P) computing or networking is a distributed application 
  architecture that partitions tasks or workloads between peers. Peers are equally privileged, equipotent participants in the application. 
  They are said to form a peer-to-peer network of nodes.`,

  s5: `Let me ask you first, how much do you know about the Internet Protocol Suite/Stack layers aka “the Internet”?`,

  s6: `I'm built to show you how I function as a software built on a p2p protocol, and explain a bit about peer-to-peer technology. 
  You can chat with me, look at some key terms in Glossary or play an experimental transaction game that's built on me.`,

  s7: `Of course. Since I’m built on a communication protocol, I’m meant to show off 
  my affordances in the context of connecting with a “peer”, aka another human being or machine.`,

  s8: `Invite someone you know to do a little experimental transaction game with you here in IamP2P.`,

  //
  s9: `The Internet Protocol Suite is a set of communications protocols, and specifies how data should be packetized, addressed, transmitted, routed, and received. 
  This functionality is organized in 4 layers.`,

  s10: `Think of it like a building that has a foundation, first floor, second floor, etc. stacked on top of each other.`,

  s11: `The top layer is the “application layer”. It interacts with software applications (like me!) to implement a communicating component.`,

  s12: `One of the most common application layer protocols you’ve probably used is HTTP (and HTTPS). That’s how you access web browsers, for example Blackwood gallery’s website. That’s probably how you’ve found me ;)`,

  s13: `Peer-to-peer protocols are other kinds of possible protocols in application layer. They provide a different kind of networking than the application layer protocols your’ve seen or used.`,

  s14: `Most likely all the websites you know are “hosted” on a centralized data server,
   which follows a “client-server” model.`,

  s15: `Same with GoogleDrive, DropBox, iCloud, and many other things which you probably have been using to store your data other than in your hard drive (they call themselves "cloud"). Most web content, search engines, cloud computing applications and even common tools like FTP and rsync are all based on client-server model.`,

  s16: `In contrast, in peer-to-peer model a person or computer is both supplier (server) and consumer (client) compared to divided-ness of consumption of supply of resources in client-server model. 
   A distributed application architecture partitions tasks or workloads between peers.`,

  s17: `If I’d draw client-server and peer-to-peer conceptual frameworks each, they would be something like this:`,

  s18: `Then try the glossary and play options on the app to get a better understating of how I function. To start a game click on Play on top left menu. `,

  s19: `You don't need my help then 😜 
  Let's play a little experimental transaction game that's built on this app to see for yourself how I function on Holochain.`,

  // third interactions

  s20: `Alright. In peer-to-peer model a person or compute is both supplier (server) and consumer (client) compared to divided-ness of consumption of supply of resources in client-server model. Its a distributed application architecture that partitions tasks or workloads between peers.`,

  s21: `This distinction can have important implications-- including social and political. 
  Plus it creates specific applications for each model: peer-to-peer (P2P), client-server, 
  or a hybrid of the two--  weighing-in efficiency, security, privacy, etc. What would you like to know more about?`,

  s22: `- Responsibility, liability (who is “user” and who is the “provider”)`,
  s23: `- Privacy and anonymity `,
  s24: `energy consumption: less compared to centralized data transfer models`,
  s25: `Economics: client-server more expensive to implement`,
  s26: `- Convenience (responsibility, potential maintenance, basic digital literacy)`,
  s27: `- Piracy (copyright)`,
  s28: `- scalability `,

  s29: `Think when there is no “central” server serving “clients” in a network, 
  instead lots are “peers” acting as servers and clients for each other at the same time, 
  this shifts the way information is shared, moderated, the rules, and more importantly, 
  the power dynamics, between the server and receiver. Think about these implications: `,

  s30: `- network neutrality`,
  s31: `- content moderation (gatekeeper relationship, server defines the rules “protocols”) `,
  s32: `- relationship between “server” and “client”. Think of server as the landlord and the rest (clients) as renters.`,
  s33: `- resilience: hard to take down vs “switch on and off” effects of centralized models`,

  //

  s34: `Many things, from digital currency exchange, to file sharing, directory-syncying, anonymity networks, peer-to-peer streaming servers, peer-to-peer networking, peer-to-peer search engine, distributed publishing, to name a few. `,

  s35: `Well, my makers haven’t built any more question-answering capacity in me yet. If you’ve become interested in learning more about P2P, maybe here is a good place to start. https://en.wikibooks.org/wiki/The_World_of_Peer-to-Peer_(P2P)/What_is_Peer-to-Peer_(P2P)`,
  s36: `Don’t forget to try out the transaction game built on me. Start a game, invite friends and play!`,

  s37: `On the top right corner of the window, find the button “Start a Game”. Click on that and follow the instructions to create a profile and send an invitation to a friend. `,

  s38: `Great. Are you intereted in learning about peer-to-peer protocols?`,

  s39: `All good. Just press "Undo" if you change your mind.`,
}

const humanMessages = {
  // s1 responses
  h1: 'What is a protocol?',
  h2: `So how are you different from, let’s say other apps or websites I’ve used before (you kind of look normal)?`,
  h3: `What do you mean by ‘peer-to-peer’?`,
  h4: 'What can you do for me?',
  h5: 'Can you show me an example of how you function?',
  // s2 responses
  h6: `Sounds good. How can I start the game and invite someone?`,

  h7: `I see. So what does a "peer-to-peer" protocol mean?`,

  h9: `Can you explain a bit about this "client-server" model, and how you're different from that model?`,

  // s3 responses

  h10: `What does this distinction between “client-server” model and “peer-to-peer” model entail? `,
  // s4 responses
  h13: `Yeah, but I haven’t dealt with Peer-to-peer protocols before. `,
  // s5 responses
  h15: `Ok, I think I’m getting it a bit more now. What are implications of this type of networking architecture in P2P? `,

  // s6 responses
  h17: `Nothing. Start from scratch.`,
  h18: `A bit. Like I know that things like GoogleDrive or Dropbox are based on cloud model, and I have used BitTorrent before to download things. `,
  h19: `I have researched a good amount about P2P, but I’m no techie. `,
  h20: `I am a technologist, and have dealt with protocols a bunch.`,
  // s7 responses

  h22: `What are the social implications?`,
  h23: `What are the political implications?`,
  h24: `What are some of the applications?`,
  h25: `Something else.`,

  h26: `How the "client-server" and "peer-to-peer" networking models are different?`,
  h27: `Got it. `,

  h28: `Yes. What is a "peer-to-peer" protocol?`,
  h29: `No, thanks.`,
}

export { softwareMessages, humanMessages, replyMap, optionMap }
