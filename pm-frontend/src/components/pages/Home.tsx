import * as React from 'react';
import { Button } from 'semantic-ui-react'
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';

import { routerActions, } from 'react-router-redux';

import { store } from '../../index';

export default class Home extends React.Component<{dispatch: Dispatch<any>}, {}> {
  
  increase() {
    store.dispatch(routerActions.push('/login'))
  }

  render() {
    return(
      <div>
        <button onClick={() => this.increase()}>Go to Login</button>
      </div>
    );}
}