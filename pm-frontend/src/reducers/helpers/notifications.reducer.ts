import * as actions from '../../actions/helpers/notifications.actions';
import { NotificationsState } from '../../interfaces';
import { Action } from 'redux';

const initialState: NotificationsState = {
    currentId: 0,
    notifications : {}
}

export default function NotificationsReducer(state = initialState, action: Action) {
    let id;
    switch(action.type) {
        case actions.ADD_NOTIFICATION:
            const addAction = action as actions.AddNotifAction;
            const notifications = state.notifications;
            id = state.currentId.toString();
            const notification = {message: addAction.message, type: addAction.notificationType};
            const newState = {...state, currentId: ++id};
            // id - 1 is just to start counting from 0
            newState.notifications[id - 1] = notification;
            return newState;         
        case actions.REMOVE_NOTIFICATION:
            let removeAction = action as actions.RemoveNotifAction;
            id = removeAction.id;
            return Object.keys(state).reduce((obj, key) => {
                if (key !== id) {
                  return { ...obj, [key]: state[key] }
                }
                return obj
            }, {}) 
        default:
            return state;
    }
}