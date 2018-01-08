import { OrganizationsState } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';

const initialState: OrganizationsState = {
    fetching: false,
    owner: [],
    member: [],
    admin: []
}

export default function OrganizationsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCHING_ORGS:
            const fetchAction = action as actions.FetchAction;
            return Object.assign({}, state, {
                fetching: fetchAction.fetching
            });
        case actions.SET_ORGANIZATIONS:
            const setAction = action as actions.SetOrgsAction; 
            return Object.assign({}, state, {
                [setAction.role]: setAction.organizations
            });
        default:
            return state;
    }
}
