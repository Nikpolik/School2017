import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import { register } from '../../actions/user/register.actions';
import Register from '../../components/pages/user/register.component';
import { State } from '../../interfaces';

const mapStateToProps = (state: State) => {
    return {
        startedRegister: state.app.register.startedRegister,
        errorFields: state.app.register.errorFields,
        reason: state.app.register.reason
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: (username: string, password: string, confirmPassword: string): void => {dispatch(register(username, password, confirmPassword))},
        goToLogin: () => {dispatch(routerActions.push('/login'))}         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
