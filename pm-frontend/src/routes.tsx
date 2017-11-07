import { Switch, Route } from 'react-router-dom'
import * as React from 'react';

import Home from './components/pages/Home';
import Login from './components/pages/Login';

const Routes: React.StatelessComponent = () => {
    return(
        <Switch>
            <Route  exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
        </Switch>
    );
}
export default Routes;