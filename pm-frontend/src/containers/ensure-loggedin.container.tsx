import { connect } from 'react-redux';

import EnsureLoggedInComponent from '../components/navigation/ensure-loggedin.component';

import { State } from '../interfaces';

const mapStateToProps = (state: State) => {
    console.log(state);
    return({
        user: state.app.login.user
    });
}

const EnsureLoggedInContainer =  connect(mapStateToProps)(EnsureLoggedInComponent);

export default EnsureLoggedInContainer;
