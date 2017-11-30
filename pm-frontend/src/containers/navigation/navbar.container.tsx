import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import NavBar from '../../components/navigation/navbar.component';
import { State } from '../../interfaces';
import { logout } from '../../actions/user/user.actions';

const mapStateToProps = (state: State) => {
    return({
        path:  state.router.location.pathname,
        name: state.app.user.name
    });
};

const mapActionsToProps = (dispatch: any) => {
    return({
        push: (path: string) => dispatch(routerActions.push(path)),
        logout: () => dispatch(logout())
    });
}

const NavBarContainer = connect(mapStateToProps, mapActionsToProps)(NavBar);
export default NavBarContainer;