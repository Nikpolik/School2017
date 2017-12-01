export const ADD_NOTIFICATION  = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION  = 'REMOVE_NOTIFICATION';


export interface AddNotifAction {
    type: string,
    message: string
}

export interface RemoveNotifAction {
    type: string,
    index: number
}

export function addNotification(message: string) {
    return({
        type: ADD_NOTIFICATION,
        message
    })
}

export function removeNotification(index: number) {
    return({
        type: REMOVE_NOTIFICATION,
        index
    })
}