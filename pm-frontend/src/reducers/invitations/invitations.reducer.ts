import { InvitationsState  } from '../../interfaces';
import * as actions from '../../actions/invitations/invitations.actions';

const initialState: InvitationsState = {
    fetching: false,
    invitations: []
}

export default function invitationsReducer(state = initialState, action): InvitationsState {
    switch(action.type) {
        case actions.FETCHING_INVS:
            const fetchAction = action as actions.FetchAction;
            return {
                ...state,
                fetching: fetchAction.fetching
            }
        case actions.SET_INVITATIONS:
            const setAction = action as actions.SetInvsAction;
            return {
                ...state,
                invitations: setAction.invitations
            }
        default:
            return state
    }
}

