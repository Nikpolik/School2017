import * as React from 'react';
import { routerActions } from 'react-router-redux';
import { Redirect, Route } from 'react-router-dom';

export interface PublicRouteProps {
  exact: any;
  path: string;
  redirectPath: string;
  user: string;
  component: any;
}


//Public route is used for loggin and register routes that should only be accesible when the user is not logged
export default class PublicRoute extends React.Component<PublicRouteProps, {}> {
  render() {
    const {exact, path, redirectPath, user, component} = this.props;
    return(
      <Route exact={exact} path={path} render={(props) => {
        if(user === '') {
          return <this.props.component {...props}/>
        } else {
          console.log('Get out of here!');
          return <Redirect to={redirectPath}/>
        }
      }}/>
    );
  }
}