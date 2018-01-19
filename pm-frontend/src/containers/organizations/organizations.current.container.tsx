import { connect } from 'react-redux';
import { State } from '../../interfaces';
import * as actions from '../../actions/organizations/organizations.current.actions';
import OrgCurrent from '../../components/pages/organizations/current/organizations.current.component';

const mapStateToProps = (state: State) => ({
    ...state.app.current,
});

const mapDispatchToProps = (dispatch) => ({
    loadInfo: (userList: string[], role: string) => dispatch(actions.getUsersInfo(userList, role))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgCurrent);