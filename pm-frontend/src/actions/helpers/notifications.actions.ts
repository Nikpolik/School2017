import { State } from '../../interfaces';
import { setTimeout } from 'timers';

export const ADD_NOTIFICATION  = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION  = 'REMOVE_NOTIFICATION';


export interface AddNotifAction {
    type: string,
    message: string,
    notificationType: string
}

export interface RemoveNotifAction {
    type: string,
    id: string
}

export function addNotification(message: string, notificationType: string): AddNotifAction {
        return({
        type: ADD_NOTIFICATION,
        message,
        notificationType
    })
}

export function removeNotification(id: string): RemoveNotifAction {
    return({
        type: REMOVE_NOTIFICATION,
        id
    })
}

export function notify(message: string, type: string) {
    return((dispatch) => {
        dispatch(addNotification(message, type));
        setTimeout(() => {
            //dispatch(removeNotification(currentId));
        }, 1000)
    })
}