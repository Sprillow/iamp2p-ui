import React from 'react'
import PropTypes from 'prop-types'
import './Avatar.css'
import { pickColorForString } from '../../styles'

function Avatar ({
  handle,
  avatar_url,
  highlighted,
  small,
  medium,
  mediumLarge,
  large,
  clickable,
  onClick,
}) {
  let classes = []
  if (highlighted) classes.push('highlighted')
  if (small) classes.push('small')
  else if (medium) classes.push('medium')
  else if (mediumLarge) classes.push('medium-large')
  else if (large) classes.push('large')
  if (clickable) classes.push('clickable')

  if (!avatar_url) {
    const backgroundInitialsAvatar = pickColorForString(handle)

    //const backgroundInitialsAvatar = initialsAvatarcolors[0]
    const style = {
      backgroundColor: backgroundInitialsAvatar,
    }
    classes.push('initials-avatar')
    return (
      <div className={classes.join(' ')} onClick={onClick} style={style}>
        {handle[0].toUpperCase()}
      </div>
    )
  }

  classes.push('avatar')
  return (
    <img src={avatar_url} className={classes.join(' ')} onClick={onClick} />
  )
}

export default Avatar
