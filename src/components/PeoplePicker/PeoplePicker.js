import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './PeoplePicker.css'

import Icon from '../Icon/Icon'
import PickerTemplate from '../PickerTemplate/PickerTemplate'
import {
  createGoalMember,
  archiveGoalMember,
} from '../../projects/goal-members/actions'
import Avatar from '../Avatar/Avatar'
import moment from 'moment'

function PeoplePicker ({ people, address, setAddress, onClose }) {
  return (
    <PickerTemplate
      className='people-picker'
      // heading='Recipient'
      onClose={onClose}>
      <ul className='people-picker-people'>
        {people.map((person, index) => {
          const onClick = () => {
            // do something
            setAddress(person.address)
          }
          const isSelected = person.address === address
          return (
            <li
              key={index}
              className={isSelected ? 'member' : ''}
              onClick={onClick}>
              <Avatar
                handle={person.handle}
                avatar_url={person.avatar_url}
                medium
              />
              <div className='person-nameANDhandle'>
                <span className='person-name'>{person.handle}</span>
              </div>
              {!isSelected && (
                <Icon
                  name='radio-button.svg'
                  size='small'
                  className='light-grey radio-button'
                />
              )}
              {isSelected && (
                <Icon
                  name='radio-button-checked.svg'
                  size='small'
                  className='purple radio-button'
                />
              )}
            </li>
          )
        })}
      </ul>
    </PickerTemplate>
  )
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePicker)
