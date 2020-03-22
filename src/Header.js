import React, { useState, Suspense } from 'react'
import { useUser, useAuth } from 'reactfire'
import { Nav, Navbar, Modal, Button, Divider } from 'rsuite'
import { A } from 'hookrouter'

import logo from './images/logo.svg'
import ButtonLoginGithub from './ButtonLoginGithub'
import FormLogin from './FormLogin'

const Header = () => {
  const user = useUser()
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const onCancel = () => setOpen(false)

  const onOk = async () => {
    setErrors({ ...errors, ALL: undefined })
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      setOpen(false)
    } catch (e) {
      setErrors({ ...errors, ALL: e.message })
    }
  }

  const onGithubError = e => {
    console.error(e)
    setErrors({ ...errors, ALL: e.message })
  }

  return (
    <Navbar appearance='inverse' componentClass='header'>
      <Navbar.Header style={{ padding: 12, paddingLeft: 20, fontSize: 20 }}>
        <A href='/'>
          <img src={logo} alt='' height={30} /> Firebase Starter
        </A>
      </Navbar.Header>

      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item componentClass={A} href='/about'>About</Nav.Item>
          {!!user && (<Nav.Item onClick={() => auth.signOut()}>Logout</Nav.Item>)}
          {!user && (<Nav.Item onClick={() => setOpen(true)}>Login</Nav.Item>)}
        </Nav>
      </Navbar.Body>

      <Modal show={open} onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLogin onChange={setValues} values={values} errors={errors} setErrors={setErrors} />
          <Divider>OR</Divider>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonLoginGithub onError={onGithubError} onComplete={() => setOpen(false)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel} appearance='subtle'>
              Cancel
          </Button>
          <Button onClick={onOk} appearance='primary'>
              Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}

export default () => (<Suspense fallback='Loading user...'><Header /></Suspense>)
