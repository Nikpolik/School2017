import { connect } from 'react-redux';

import { login } from '../actions/login.actions';
import Login from '../components/pages/login.component';

const mapStateToProps = (state: any) => {
    return {
        user: state.app.user,
        failedLogin: state.app.failedLogin,
        startedLogin: state.app.startedLogin
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string, password: string) => {dispatch(login(username, password))}
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer