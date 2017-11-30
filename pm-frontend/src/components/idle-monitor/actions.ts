import { IDLESTATUS_AWAY, IDLESTATUS_INACTIVE, IDLESTATUS_EXPIRED } from './constants'
import { logout } from '../../actions/user/user.actions';
//...

export const idleStatusDelay = (idleStatus: any) => (dispatch:any, getState:any) => {
  if(idleStatus === IDLESTATUS_AWAY)
    return 60000 // User becomes away after 60 seconds inactivity
  if(idleStatus === IDLESTATUS_EXPIRED)
    return 600000 // Log them out after ten minutes after they enter the inactive status
}

export const activeStatusAction = (dispatch: any, getState: any) => alert('welcome back!')

export const idleStatusAction = (idleStatus: any) => (dispatch: any, getState: any) => {
  if(idleStatus === IDLESTATUS_AWAY)
    console.info('user is away...')
  if(idleStatus === IDLESTATUS_EXPIRED)
    dispatch(logout())
}