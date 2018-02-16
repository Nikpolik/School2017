import { connect } from 'react-redux';
import Invitations from '../../components/pages/invitations/invitations.component';

import { State } from '../../interfaces';
import { getInvitations, accept } from '../../actions/invitations/invitations.actions';

const mapStateToProps = (state: State) => {
    return {
        ...state.app.invitations
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInvitations: () => dispatch(getInvitations()),
    accept: (id: string) => dispatch(accept(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitations);