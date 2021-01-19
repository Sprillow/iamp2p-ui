import React, { useState } from 'react'
import './SendCCModal.css'

import Modal from '../Modal/Modal'
import ValidatingFormInput from '../ValidatingFormInput/ValidatingFormInput'

import {
  ProjectModalButton,
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
} from '../ProjectModal/ProjectModal'

import ProjectSecret from '../ProjectSecret/ProjectSecret'
import PeoplePicker from '../PeoplePicker/PeoplePicker'

export default function InviteMembersModal ({
  showModal,
  onClose,
  people,
  onSend,
  walletBalance,
}) {
  const [amount, setAmount] = useState('')
  const [toAddress, setToAddress] = useState(null)

  const amountCantParse = amount.length > 0 && isNaN(parseInt(amount))
  const amountMoreThanWallet =
    amount.length > 0 && parseInt(amount) > walletBalance
  const amountLessThanZero = amount.length > 0 && parseInt(amount) <= 0

  const innerOnSend = () => {
    if (
      !amountCantParse &&
      !amountMoreThanWallet &&
      !amountLessThanZero &&
      toAddress
    ) {
      onSend(amount, toAddress)
      setAmount('')
      setToAddress(null)
    }
  }

  return (
    <Modal
      white
      active={showModal}
      onClose={onClose}
      className='send-cc-modal-wrapper'>
      <ProjectModalHeading title='Send Cat Credits' />
      <ProjectModalContent>
        <ProjectModalContentSpacer>
          <div className='send-cat-credits-wrapper'>
            <div className='send-cat-credits-wrapper'>
              {/* Amount */}
              <ValidatingFormInput
                value={amount}
                onChange={setAmount}
                placeholder={'20.00'}
                invalidInput={
                  amountCantParse || amountMoreThanWallet || amountLessThanZero
                }
                validInput={
                  amount.length > 0 &&
                  !amountCantParse &&
                  !amountMoreThanWallet &&
                  !amountLessThanZero
                }
                errorText={
                  amountCantParse
                    ? 'Must be a number'
                    : amountMoreThanWallet
                    ? 'Must be less than what is in your wallet'
                    : amountLessThanZero
                    ? 'Must be greater than zero (0)'
                    : ''
                }
                label='Amount'
                helpText={`Type in any value more than 0 and up to your wallet balance (${walletBalance})`}
              />
              {/* Recipient */}
              <div className='send-cat-credits-input'>
                <label>Recipient</label>
                <div className='help-text'>
                  Select a recipient from your network.
                </div>
                <PeoplePicker
                  people={people}
                  address={toAddress}
                  setAddress={setToAddress}
                />
                {/* <input value={'recipient'} /> */}
              </div>
            </div>
          </div>
          {/* <ProjectSecret passphrase={passphrase} /> */}
        </ProjectModalContentSpacer>
      </ProjectModalContent>
      <ProjectModalButton text='Send' onClick={innerOnSend} />
    </Modal>
  )
}
