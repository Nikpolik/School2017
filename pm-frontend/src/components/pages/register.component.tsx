import * as React from 'react';
import { Form, Checkbox, Button, Message, Grid } from 'semantic-ui-react';

export interface RegisterProps {
  user: any;
  register: (username: string, password: string) => void;
  startedLogin: boolean;
  failedLogin: boolean;
}

const style = {
  position: 'absolute',
  top: '35%',
  left: '40%',
  transform: 'scale(2) zoom: 0.5 translateX(-50%) translateY(-50%)'
}

export default class Login extends React.Component<RegisterProps,{}> {
  
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;  

  callRegister(e: Event) {
    this.props.register(this.username.value, this.password.value);
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
          <label>Confirm Password</label>
          <input type={"password"} ref={confirmPassword => this.confirmPassword = confirmPassword}placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button submit="true" onClick={this.callRegister.bind(this)}>Submit</Button>
        <Button>Login</Button>
      </Form>
    </Grid>);
    return(content);
  }
}
