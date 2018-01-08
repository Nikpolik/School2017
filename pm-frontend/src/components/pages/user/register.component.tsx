import * as React from 'react';
import { Form, Checkbox, Message, Grid, Header } from 'semantic-ui-react';

const gearIcon = require('../../../images/gear-check.png'); 

export interface RegisterProps {
  register: (username: string, password: string, confirmPassword: string) => void;
  startedRegister: boolean;
  errorFields: {[name: string] : string};
  failedRegister: false;
  goToLogin: any; 
  reason: string;
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
      <img src={gearIcon} alt="" style={imageStyle}/>
      <Grid.Row></Grid.Row>
      <Grid.Row>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Header>Welcome to Project Easy</Header>
          <p>Register bellow or go to <a href="#" onClick={(event) => {event.preventDefault(); this.props.goToLogin()}}>login</a> if you have an account</p>
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
          <Form.Button submit="true" onClick={this.callRegister.bind(this)}>Submit</Form.Button>
        </Form>
      </Grid.Row>
    </Grid>);
    return(content);
  }
}
