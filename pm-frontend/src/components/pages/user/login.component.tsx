import * as React from 'react';

import { Form, Checkbox, Button, Loader, Message, Grid, Header } from 'semantic-ui-react';
import { routerActions } from 'react-router-redux';

export interface LoginProps {
  user: any;
  login: (username: string, password: string) => void;
  startedLogin: boolean;
  failedLogin: boolean;
  goToRegister: any;
}

const style = {
  position: 'absolute',
  top: '35%',
  left: '35%',
  transform: 'scale(2) zoom: 0.5 translateX(-50%) translateY(-50%)'
}

export default class Login extends React.Component<LoginProps,{}> {
  
  username: HTMLInputElement;
  password: HTMLInputElement;

  callLogin(e: Event) {
    this.props.login(this.username.value, this.password.value);
  }

  Error(props: {failedLogin: boolean}) {
    if(props.failedLogin) {
      return(
        <Message
          visible
          error
          header='Error'
          content="Username or Password is wrong"
        />
      );
    }
    return null;
  }
  
  render() {
    console.log(this.props.startedLogin);
    let content = (
    <Grid style={style}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Header>Welcome to Project Easy</Header>
        <p>Login bellow or press the register button to create a new account</p>
        <Form.Field>
          <label>Username</label>
          <input ref={(username => this.username = username)} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type={"password"} ref={password => this.password = password}placeholder='Password' />
        </Form.Field>
        <this.Error failedLogin={this.props.failedLogin}/>
        <Button onClick={this.props.goToRegister}>Register</Button>
        <Button submit="true" onClick={this.callLogin.bind(this)}>Submit</Button>
      </Form>
    </Grid>);
    if(this.props.startedLogin) {
      console.log('here');
      content = <Loader active/>;
    }
    return(content);
  }
}
