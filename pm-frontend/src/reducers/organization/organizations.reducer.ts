import { OrginizationsState } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';

const initialState: OrginizationsState = {
    fetching: false,
    organizations: []
}

export function organizationsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCHING_ORGS:
            Object.assign({}, state, {
                
            });
            break;
    
        default:
            break;
    }
}
