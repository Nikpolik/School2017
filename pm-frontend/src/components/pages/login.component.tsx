import * as React from 'react';

import { Form, Checkbox, Button, Loader } from 'semantic-ui-react';
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

export default class Login extends React.Component<LoginProps, {}> {
  render() {
    console.log(this.props.startedLogin);
    let content = (<Form>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit' onClick={() => this.props.login('test', 'test')}>Submit</Button>
      <Button onClick={() => increase()}>Go back</Button>
    </Form>);
    if(this.props.startedLogin) {
      console.log('here');
      content = <Loader active/>;
    }
    return(content);
  }
}
