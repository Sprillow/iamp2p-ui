/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

const DISMISS_NOTIF = 'DISMISS_NOTIF'

/* action creator functions */

const dismissNotif = notifId => {
  return {
    type: DISMISS_NOTIF,
    payload: notifId,
  }
}

export { DISMISS_NOTIF, dismissNotif }
