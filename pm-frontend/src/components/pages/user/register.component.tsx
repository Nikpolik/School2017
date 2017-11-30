import * as React from 'react';
import { Form, Checkbox, Button, Message, Grid, Header } from 'semantic-ui-react';

export interface RegisterProps {
  register: (username: string, password: string, confirmPassword: string) => void;
  startedRegister: boolean;
  errorFields: {[name: string] : string};
  failedRegister: false;
  goToLogin: any; 
}

const style = {
  position: 'absolute',
  top: '35%',
  left: '35%',
  transform: 'scale(2) zoom: 0.5 translateX(-50%) translateY(-50%)'
}

export default class Register extends React.Component<RegisterProps,{}> {
  
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;  

  callRegister(e: Event) {
    this.props.register(this.username.value, this.password.value, this.confirmPassword.value);
  }

  Error(props: {fieldName: string, errorFields: any}) {
    if(props.errorFields[props.fieldName]) {
      return(
        <Message
          visible
          error
          header='Error'
          content={props.errorFields[props.fieldName]}
        />
      );
    }
    return null;
  }

  render() {
    let content = (
    <Grid style={style}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Header>Welcome to Project Easy</Header>
        <p>Register bellow or press the login button if you have an account</p>
        <Form.Field>
          <label>Username</label>
          <input ref={(username => this.username = username)} placeholder='Username' />
          <this.Error fieldName={'username'} errorFields={this.props.errorFields}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type={"password"} ref={password => this.password = password}placeholder='Password' />
          <this.Error fieldName={'password'} errorFields={this.props.errorFields}/>
          </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input type={"password"} ref={confirmPassword => this.confirmPassword = confirmPassword}placeholder='Password' />
          <this.Error fieldName={'confirmPassword'} errorFields={this.props.errorFields}/>
          </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button onClick={this.props.goToLogin}>Login</Button>
        <Button submit="true" onClick={this.callRegister.bind(this)}>Submit</Button>
      </Form>
    </Grid>);
    return(content);
  }
}
