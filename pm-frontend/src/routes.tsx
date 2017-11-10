import { Switch, Route } from 'react-router-dom'
import * as React from 'react';

import Home from './components/pages/home.component';
import LoginContainer from './containers/login.container';

const Routes: React.StatelessComponent = () => {
    return(
        <Switch>
            <Route  exact path='/' component={Home}/>
            <Route path='/login' component={LoginContainer}/>
        </Switch>
    );
}
export default Routes;