import { Switch, Route } from 'react-router-dom'
import * as React from 'react';

import Home from './components/pages/home.component';
import LoginContainer from './containers/login.container';
import EnsureLoggedInContainer from './containers/ensure-loggedin.container';
import EnsureLoggedOutContainer from './containers/ensure-loggedout.container';

import Register from './containers/register.container';

const Routes: React.StatelessComponent = () => {
    return(
        <Switch>
            <Route  exact path='/' component={Home}/>
            <EnsureLoggedOutContainer>
                <Route path='/login' component={LoginContainer}/>
                <Route path='/register' component={Register}/>
            </EnsureLoggedOutContainer>
            <EnsureLoggedInContainer>
                <Route  exact path='/secret' component={Home}/>
            </EnsureLoggedInContainer>
        </Switch>
    );
}
export default Routes;