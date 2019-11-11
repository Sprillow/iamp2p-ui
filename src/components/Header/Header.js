import React from 'react'
import GuideBook from '../GuideBook/GuideBook'
import './Header.css'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon'
export default class Header extends React.Component {

  constructor(props) {

    super(props)
    this.clickAvatar = this.clickAvatar.bind(this)
    this.clickBook = this.clickBook.bind(this)
    this.clickStatus = this.clickStatus.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.clickProfile = this.clickProfile.bind(this)
    this.clickSearch = this.clickSearch.bind(this)
    this.hover = this.hover.bind(this)
    this.handleStatusEnter = this.handleStatusEnter.bind(this)
    this.handleStatusLeave = this.handleStatusLeave.bind(this)
    this.state = {
      isGuideOpen: false,
      online: {},
      isStatusHover: false,
      isStatusOpen: false,
      lista: {},
      avatar: false,
      listaProfile: {}
    }
  }

  componentDidMount() {
    this.changeStatus("green")
    this.setState({
      lista: [
        { color: "green", img: "checkmark-circle.svg", title: "Online" },
        { color: "yellow", img: "user-status-away.svg", title: "Away" },
        { color: "gray", img: "user-status-offline.svg", title: "Offline" },

      ],
      avatar: false,
      listaProfile: [{ title: "Profile Settings", click: this.clickProfile }, { title: "Preferences", click: null }]
    })
  }

  clickProfile(e) {
    this.props.setShowProfileEditForm(true)
    this.setState({ isProfileOpen: false, isStatusOpen: false, isGuideOpen: false })
  }
  clickAvatar(e) {
    this.setState({ isProfileOpen: !this.state.isProfileOpen, isStatusOpen: false, isGuideOpen: false })
  }
  hover(bool) {
    this.setState({ avatar: bool })
  }
  clickStatus(e) {
    this.setState({ isStatusOpen: !this.state.isStatusOpen, isGuideOpen: false, isProfileOpen: false })

  }
  clickSearch(e) {

  }
  changeStatus(status) {
    switch (status) {
      case "green": this.setState({ online: { color: "green", img: "checkmark-circle.svg" } });
        break;
      case "yellow": this.setState({ online: { color: "yellow", img: "user-status-away.svg" } });
        break;
      case "gray": this.setState({ online: { color: "gray", img: "user-status-offline.svg" } });
        break;
      default: console.error("no definido");
        break;

    }
    this.setState({ isProfileOpen: false, isStatusOpen: false, isGuideOpen: false })
  }

  clickBook(e) {
    this.setState({ isGuideOpen: !this.state.isGuideOpen, isStatusOpen: false, isProfileOpen: false })
  }

  handleStatusEnter() {
    this.setState({ isStatusHover: true })
  }

  handleStatusLeave() {
    this.setState({ isStatusHover: false })
  }


  render() {
    return (
      <>
        <div className="header">
          <div className="top-left-panel">
            <div className="logo" >
              <Icon name="acorn-logo.svg" className="logo" />
              <p className="logo-name">acorn</p>
            </div>
            <div className="current-canvas">
              <Icon name="map.svg" className="header-view-mode" />
              <p className="canvas-name">H-BE SoA</p>
            </div>
          </div>
          <div className="top-right-panel">
            {/* <Icon name="search-line.svg" onClick={this.clickSearch}/> */}
            <Icon name="guidebook.svg" onClick={this.clickBook} className="header" />
            <div className={this.state.online.color}>
              <div className="avatar_container" onMouseEnter={e => {
                this.hover(true)
              }} onMouseOut={e => {
                this.hover(false)
              }}><Avatar avatar_url={this.props.whoami.entry.avatar_url} highlighted={this.state.avatar} clickable onClick={this.clickAvatar} /></div>

              <span onMouseEnter={this.handleStatusEnter} onMouseLeave={this.handleStatusLeave}>
                {!this.state.isStatusOpen && !this.state.isStatusHover && <Icon name={this.state.online.img} onClick={this.clickStatus} className="user-status" />}
                {(this.state.isStatusOpen || this.state.isStatusHover) && <Icon name="user-status-hover.svg" onClick={this.clickStatus} className="user-status" />}
              </span>
            </div>
          </div>

        </div>
        {this.state.isGuideOpen && <div className="instructions_wrapper">
          <GuideBook />
        </div>}
        {this.state.isProfileOpen && <div className="profile-wrapper">
          {Object.keys(this.state.listaProfile).map(key =>
            <ListProfile key={key} title={this.state.listaProfile[key].title} click={this.state.listaProfile[key].click} />
          )}
        </div>}
        {this.state.isStatusOpen && <div className="user-status-wrapper">
          {Object.keys(this.state.lista).map(key =>
            <ListStatus key={key} img={this.state.lista[key].img} color={this.state.lista[key].color} title={this.state.lista[key].title} changeStatus={this.changeStatus} />
          )}
        </div>}

      </>
    )
  }
}
const ListStatus = (props) => {
  return (
    <button className={props.color + " btn"} onClick={color => {
      props.changeStatus(props.color)
    }}><Icon name={props.img} className="user-status" /><p>{props.title}</p></button>
  )
}
const ListProfile = (props) => {
  return (
    <button onClick={props.click}><p>{props.title}</p></button>
  )
}