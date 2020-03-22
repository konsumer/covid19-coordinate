import React from 'react'
import { Schema, Form, FormGroup, ControlLabel, FormControl, Message } from 'rsuite'

const model = Schema.Model({
  email: Schema.Types.StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: Schema.Types.StringType()
    .isRequired('This field is required.')
})

const FormLogin = ({ onChange, values, errors, setErrors }) => (
  <Form model={model} fluid onChange={onChange} formValue={values} onCheck={setErrors} formError={errors} checkTrigger='change'>
    {!!errors.ALL && (
      <Message style={{ marginBottom: 10 }} title='Could Not Login' type='error' description={errors.ALL} />
    )}
    <FormGroup className={errors.email ? 'has-error' : ''}>
      <ControlLabel>Email</ControlLabel>
      <FormControl name='email' type='email' required errorMessage={errors.email} />
    </FormGroup>
    <FormGroup className={errors.email ? 'has-error' : ''}>
      <ControlLabel>Password</ControlLabel>
      <FormControl name='password' type='password' required errorMessage={errors.password} />
    </FormGroup>
  </Form>
)

export default FormLogin
