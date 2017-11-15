import { connect } from 'react-redux';

import EnsureLoggedInComponent from '../components/navigation/ensure-loggedin.component';

import { State } from '../interfaces';

const mapStateToProps = (state: State) => {
    return({
        user: state.app.user.token
    });
}

const EnsureLoggedInContainer =  connect(mapStateToProps)(EnsureLoggedInComponent);

export default EnsureLoggedInContainer;
