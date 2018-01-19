import { OrganizationsState } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';
import { Organization } from '../../interfaces';

const initialState: OrganizationsState = {
    fetching: false,
    owner: [],
    member: [],
    admin: [],
}

export default function OrganizationsReducer(state: OrganizationsState = initialState, action) {
    switch (action.type) {
        case actions.FETCHING_ORGS:
            const fetchAction = action as actions.FetchAction;
            return {
                ...state,
                fetching: fetchAction.fetching
            }
        case actions.SET_ORGANIZATIONS:
            const setAction = action as actions.SetOrgsAction; 
            return {
                ...state,
                fetching: false,
                [setAction.role]: setAction.organizations
            };
        case actions.APPEND_SINGLE_ORG:
            const appendAction = action as actions.AppendOrgAction;
            return {
                ...state,
                [action.role]: [...state[action.role], appendAction.organization]
            }
        default:
            return state;
    }
}
