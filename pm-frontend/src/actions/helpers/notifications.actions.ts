export const ADD_NOTIFICATION  = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION  = 'REMOVE_NOTIFICATION';


export interface AddNotifAction {
    type: string,
    message: string,
    notificationType: string    
}

export interface RemoveNotifAction {
    type: string,
    id: number
}

export function addNotification(message: string, notificationType: string) {
    return({
        type: ADD_NOTIFICATION,
        message,
        notificationType
    });
}

export function removeNotification(id: string) {
    return({
        type: REMOVE_NOTIFICATION,
        id
    })
}

export function notify(message: string, type: string) {
    return((dispatch) => {
        dispatch(addNotification(message, type));
    })
}