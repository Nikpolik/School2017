import * as React from 'react';

import { Form, Checkbox, Button, Loader, Message } from 'semantic-ui-react';
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

export default class Login extends React.Component<LoginProps,{}> {
  
  username: HTMLInputElement;
  password: HTMLInputElement;

  callLogin(e: Event) {
    this.props.login(this.username.value, this.password.value);
  }

  render() {
    console.log(this.props.startedLogin);
    let content = (<Form onSubmit={(e) => e.preventDefault()}>
      {this.props.failedLogin && 
             <Message
             negative
             visible={true}
             header='Login failed'
             content='Username or Password incorrect'
           />
      }
      <Form.Field>
        <label>Username</label>
        <input ref={(username => this.username = username)} placeholder='Username' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input ref={password => this.password = password}placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button submit="true" onClick={this.callLogin.bind(this)}>Submit</Button>
      <Button onClick={() => increase()}>Go back</Button>
    </Form>);
    if(this.props.startedLogin) {
      console.log('here');
      content = <Loader active/>;
    }
    return(content);
  }
}
