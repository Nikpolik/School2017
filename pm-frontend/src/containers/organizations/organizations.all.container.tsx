import { connect } from 'react-redux';

import { State } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.actions';
import OrgsView from '../../components/pages/organizations/organizations.all.component';

const mapStateToProps = (state: State) => {
    return ({
        admin: state.app.organizations.admin,
        member: state.app.organizations.member,
        owner: state.app.organizations.owner,
        fetching: state.app.organizations.fetching
    });
}

const mapDispatchToProps = (dispatch) => ({
    getOrgs: (role: string) => dispatch(actions.getOrgs(role))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgsView);