import { Switch, Route } from 'react-router-dom'
import * as React from 'react';

import Home from './components/pages/home.component';
import LoginContainer from './containers/user/login.container';
import Register from './containers/user/register.container';
import EnsureLoggedInContainer from './containers/navigation/ensure-loggedin.container';
import EnsureLoggedOutContainer from './containers/navigation/ensure-loggedout.container';

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