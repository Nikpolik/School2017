import * as actions from '../../actions/helpers/notifications.actions';
import { NotificationsState } from '../../interfaces';
import { Action } from 'redux';

const VISIBLE_NUMBER = 4;

const initialState: NotificationsState = {
    notifications: []
}

export default function NotificationsReducer(state = initialState, action: Action) {
    switch(action.type) {
        case actions.ADD_NOTIFICATION:
            let addAction = action as actions.AddNotifAction;
            return Object.assign({}, state, {
                notifications: [...state.notifications, addAction.message]
            });
            
        case actions.REMOVE_NOTIFICATION:
            let removeAction = action as actions.RemoveNotifAction;
            return Object.assign({}, state, {
                notifications: state.notifications.slice(removeAction.index, removeAction.index)
            });
        default:
            return state;
    }
}