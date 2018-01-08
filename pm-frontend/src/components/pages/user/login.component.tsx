import * as React from 'react';

import { Form, Checkbox, Button, Loader, Message, Grid, Header, Image } from 'semantic-ui-react';
import { routerActions } from 'react-router-redux';

const gearIcon = require('../../../images/gear-check.png'); 

export interface LoginProps {
  user: any;
  login: (username: string, password: string) => void;
  startedLogin: boolean;
  failedLogin: boolean;
  goToRegister: any;
}

const style = {
  position: 'absolute',
  top: '10%',
  left: '40%',
  transform: 'scale(2) zoom: 0.5 translateX(-50%) translateY(-50%)'
}

const imageStyle: React.CSSProperties = {
  width:'25%',
  height: '25%'
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
    console.log('rendering');
    let content = (
    <Grid style={style}>
      <img src={gearIcon} alt="" style={imageStyle}/>
      <Grid.Row></Grid.Row>
      <Grid.Row>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Header>Welcome to Project Easy</Header>
          <p>Login bellow or got <a href="#" onClick={(event) => {event.preventDefault(); this.props.goToRegister()}}>register</a> to create a new account</p>
          <Form.Field>
            <label>Username</label>
            <input ref={(username => this.username = username)} placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type={"password"} ref={password => this.password = password}placeholder='Password' />
          </Form.Field>
          <this.Error failedLogin={this.props.failedLogin}/>
          <Form.Field>
            <Button submit="true" onClick={this.callLogin.bind(this)}>Submit</Button>
          </Form.Field>
        </Form>
      </Grid.Row>
    </Grid>);
    if(this.props.startedLogin) {
      content = <Loader active/>;
    }
    return(content);
  }
}
