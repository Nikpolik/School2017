import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import NavBar from '../components/navigation/navbar.component';
import { State } from '../interfaces';

const mpaStateToProps = (state: State) => {
    return({
        path:  state.router.location.pathname
    });
};

const mapActionsToprops = (dispatch: any) => {
    return({
        push: (path) => dispatch(routerActions.push(path));
    });
}



