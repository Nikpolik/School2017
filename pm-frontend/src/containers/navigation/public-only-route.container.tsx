import { connect } from 'react-redux';

import PublicRoute from '../../components/navigation/public-only-route.component';
import { State } from '../../interfaces';

const mapStateToProps = (state: State, ownProps) => {
    return({
        user: state.app.user.token
    });
};

export default connect(mapStateToProps)(PublicRoute);