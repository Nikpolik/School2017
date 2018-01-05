import { OrganizationState } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';

const initialState: OrganizationState = {
    fetching: false,
    owner: [],
    admin: [],
    member: []
}

export function organizationsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCHING_ORGS:
            const fetching = action.fetching;
            return Object.assign({}, state, {
                fetching
            });
        case actions.SET_ORGANIZATIONS:
            const setAction = action as actions.setOrgsAction;
            return Object.assign({}, state, {
               [setAction.role]: setAction.organizations  
            });
        default:
            return state
    }
}
