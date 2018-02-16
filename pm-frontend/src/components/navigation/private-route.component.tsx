import * as React from 'react';
import { routerActions } from 'react-router-redux';
import { Redirect, Route } from 'react-router-dom';

export interface PrivateRouteProps {
  exact: any,
  path: string,
  redirectPath: string,
  user: string,
  component: any,
  rest: any
}


//Public route is used for protected routes that should only be accesible when the user is logged in
export default class PrivateRoute extends React.Component<PrivateRouteProps, {}> {
  render() {
    const {exact, path, redirectPath, user, component, ...rest} = this.props;
    return(
      <Route exact={exact} path={path} render={(props) => {
        if(user !== '') {
          return <this.props.component {...props}/>
        } else {
          console.log('Get out of here!');
          return <Redirect to={redirectPath}/>
        }
      }}/>
    );
  }
}