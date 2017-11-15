import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import { register } from '../actions/register.actions';
import Register from '../components/pages/register.component';
import { State } from '../interfaces';

const mapStateToProps = (state: State) => {
    return {
        startedRegister: state.app.register.startedRegister,
        fields: state.app.register.fields
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: (username: string, password: string, confirmPassword: string): void => {dispatch(register(username, password, confirmPassword))},
        goToLogin: () => {dispatch(routerActions.push('/login'))}         
    }
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterContainer
