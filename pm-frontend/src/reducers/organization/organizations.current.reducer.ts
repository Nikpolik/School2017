import { OrganizationsCurrentState } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.current.actions';
import { userInfo } from 'os';

const initialState: OrganizationsCurrentState = {
    fetching: false,
    _id: null,
    name: null,
    owner: null,
    description: null,
    projects: [],
    members: [],
    admins: [],
    gotInfo: {
        admins: false,
        members: false
    },
    permissions: 0
}

export default function OrganizationsCurrentReducer(state = initialState, action) {
    switch(action.type) {
        case actions.FETCHING_SINGLE_ORG:
            const fetchAction = action as actions.FetchSingleAction
            return {
                ...state,
                fetching: fetchAction.fetching
            }
        case actions.SET_CURRENT_ORG:
            const setAction = action as actions.SetSingleOrgAction;
            return {
                ...setAction.organization,
                fetching: false,
                gotInfo: {
                    members: false,
                    admins: false
                }
            }
        case actions.SET_USER_INFO:
            const userInfoAction = action as actions.SetUserInfo;
            return {
                ...state,
                [userInfoAction.role]: userInfoAction.infoList,
                gotInfo: {
                    ...state.gotInfo,
                    [userInfoAction.role]: true
                }
            }
        default:
            return state;
    }
}