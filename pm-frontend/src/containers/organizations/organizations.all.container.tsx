import { connect } from 'react-redux';

import { State } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';
import { getCurrentOrg } from '../../actions/organizations/organizations.current.actions';

import OrgsView from '../../components/pages/organizations/organizations.all.component';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state: State) => {
    return ({
        admin: state.app.organizations.admin,
        member: state.app.organizations.member,
        owner: state.app.organizations.owner,
        fetching: state.app.organizations.fetching
    });
}

const mapDispatchToProps = (dispatch) => ({
    getOrgs: (role: string) => dispatch(actions.getOrgs(role)),
    createOrg: (name: string, description: string) => dispatch(actions.createOrg(name, description)),
    gotToCurrent: (id: string) => {
        dispatch(getCurrentOrg(id));
        dispatch(routerActions.push('/current'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgsView);