import * as React from 'react';
import { routerActions } from 'react-router-redux';

export interface EnsuredLoggedInProps {
    dispatch: any;
    user: string;
    children: any
}


export default class EnsureLoggedInComponent extends React.Component<EnsuredLoggedInProps, {}> {
    componentDidMount() {
      const { dispatch, user } = this.props
  
      if (!user) {
        // set the current url/path for future redirection (we use a Redux action)
        // then redirect (we use a React Router method)
        dispatch(routerActions.push('/login'));
      }
    }
  
    render() {
      const user = this.props.user;
      if (user) {
        return this.props.children
      } else {
        return null
      }
    }
  }
  