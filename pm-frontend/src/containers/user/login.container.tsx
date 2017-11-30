import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { login } from '../../actions/user/user.actions';
import Login from '../../components/pages/user/login.component';
import { State } from '../../interfaces';

const mapStateToProps = (state: State) => {
    return {
        user: state.app.user.token,
        failedLogin: state.app.user.failedLogin,
        startedLogin: state.app.user.startedLogin
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string, password: string) => {dispatch(login(username, password))},
        goToRegister: () => {dispatch(routerActions.push('/register'))}
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer