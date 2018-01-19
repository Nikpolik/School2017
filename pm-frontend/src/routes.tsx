import { Switch, Route } from 'react-router-dom'
import * as React from 'react';

import LoginContainer from './containers/user/login.container';
import Register from './containers/user/register.container';
import PublicRoute from './containers/navigation/public-only-route.container'
import PrivateRoute from './containers/navigation/private-route.container'
import OrgsView from './containers/organizations/organizations.all.container';
import OrgsCurrent from './containers/organizations/organizations.current.container';
import Landing from './components/pages/static/landing.component';

const Routes: React.StatelessComponent = () => {
    return(
        <Switch>
            <PublicRoute redirectPath={'/'} path='/login' component={LoginContainer}/>
            <PublicRoute redirectPath={'/'} path='/register' component={Register}/>
            <PrivateRoute redirectPath={'/login'} exact path='/' component={OrgsView}/>       
            <PrivateRoute redirectPath={'/login'} exact path='/current' component={OrgsCurrent}/>      
        </Switch>
    );
}
export default Routes;