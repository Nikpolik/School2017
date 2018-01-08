import { connect } from 'react-redux';

import PrivateRoute from '../../components/navigation/private-route.component';
import { State } from '../../interfaces';

const mapStateToProps = (state: State, ownProps) => {
    return({
        user: state.app.user.token,
    });
};

export default connect(mapStateToProps)(PrivateRoute);