import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import NavBar from '../components/navigation/navbar.component';
import { State } from '../interfaces';

const mapStateToProps = (state: State) => {
    return({
        path:  state.router.location.pathname
    });
};

const mapActionsToprops = (dispatch: any) => {
    return({
        push: (path: string) => dispatch(routerActions.push(path))
    });
}

const NavBarContainer = connect(mapStateToProps, mapActionsToprops)(NavBar);
export default NavBarContainer;