import { connect } from 'react-redux';

import EnsureLoggedOutComponent from '../../components/navigation/ensure-loggedout.component';

import { State } from '../../interfaces';

const mapStateToProps = (state: State) => {
    return({
        user: state.app.user.token
    });
}

const EnsureLoggedOutContainer =  connect(mapStateToProps)(EnsureLoggedOutComponent);

export default EnsureLoggedOutContainer;
