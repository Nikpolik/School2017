import { IDLESTATUS_AWAY, IDLESTATUS_INACTIVE, IDLESTATUS_EXPIRED } from './constants'
import { logout } from '../../actions/user/user.actions';
import * as notificationsActions from '../../actions/helpers/notifications.actions';
//...

export const idleStatusDelay = (idleStatus: any) => (dispatch:any, getState:any) => {
  if(idleStatus === IDLESTATUS_AWAY)
    return 1000 * 60 * 5 // milliseconds * seconds * minutes
  if(idleStatus === IDLESTATUS_EXPIRED)
    return 1000 * 60 * 20 // milliseconds * seconds * minutes
}

export const activeStatusAction = (dispatch: any, getState: any) => dispatch(notificationsActions.notify('Welcome back!', "positive"));   


export const idleStatusAction = (idleStatus: any) => (dispatch: any, getState: any) => {
  
  if(idleStatus === IDLESTATUS_AWAY) {
    dispatch(notificationsActions.notify('You are away now', "negative"));   
  }

  if(idleStatus === IDLESTATUS_EXPIRED) {
    dispatch(notificationsActions.notify('You are away for too long login you out', "negative"));   
    dispatch(logout())
  }

}