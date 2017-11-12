import * as React from 'react';

import { Form, Checkbox, Button, Loader, Message, Grid } from 'semantic-ui-react';
import { store } from '../../index';
import { routerActions } from 'react-router-redux';

export interface LoginProps {
  user: any;
  login: (username: string, password: string) => void;
  startedLogin: boolean;
  failedLogin: boolean;
}

function increase() {
  store.dispatch(routerActions.push('/'))
}

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)'
}

export default class Login extends React.Component<LoginProps,{}> {
  
  username: HTMLInputElement;
  password: HTMLInputElement;

  callLogin(e: Event) {
    this.props.login(this.username.value, this.password.value);
  }

  render() {
    console.log(this.props.startedLogin);
    let content = (
    <Grid style={style}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Field>
          <label>Username</label>
          <input ref={(username => this.username = username)} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type={"password"} ref={password => this.password = password}placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button submit="true" onClick={this.callLogin.bind(this)}>Submit</Button>
        <Button onClick={() => increase()}>Register</Button>
      </Form>
    </Grid>);
    if(this.props.startedLogin) {
      console.log('here');
      content = <Loader active/>;
    }
    return(content);
  }
}
