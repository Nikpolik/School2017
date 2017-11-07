import * as React from 'react';

import { Form, Checkbox, Button } from 'semantic-ui-react';
import { store } from '../../index';
import { routerActions } from 'react-router-redux';

import { login } from '../../api/user';
function increase() {
  store.dispatch(routerActions.push('/'))
}
const Login = () => (
    <Form>
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
      <Button type='submit' onClick={() => login('test', 'test')}>Submit</Button>
      <Button onClick={() => increase()}>Go back</Button>
    </Form>
  )
  
  export default Login;