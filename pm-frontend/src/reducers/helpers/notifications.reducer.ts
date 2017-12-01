import * as actions from '../../actions/helpers/notifications.actions';
import { NotificationsState } from '../../interfaces';
import { Action } from 'redux';

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
            const old = state.notifications;
            const index = removeAction.index;
            console.log('-----!@!------');
            console.log(index);
            console.log(old);
            console.log(old.slice(0, index))
            console.log(old.slice(index + 1, old.length));
            return Object.assign({}, state, {
                notifications: [...old.slice(0, index), ...old.slice(index + 1, old.length)]
            });
        default:
            return state;
    }
}