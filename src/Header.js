import React, { useState, Suspense } from 'react'
import { useUser, useAuth } from 'reactfire'
import { Nav, Navbar, Modal, Button } from 'rsuite'
import { A } from 'hookrouter'

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

  console.log(auth)

  const onGithubLogin = async () => {
    const provider = new auth.GithubAuthProvider()
    const { user, token } = auth.signInWithPopup(provider)
    console.log({ user, token })
  }

  return (
    <Navbar appearance='inverse' componentClass='header'>
      <Modal show={open} onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLogin onChange={setValues} values={values} errors={errors} setErrors={setErrors} />
          <hr />
          OR
          <Button onClick={onGithubLogin}>Login with Github</Button>
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

      <Navbar.Header style={{ padding: 12, paddingLeft: 20, fontSize: 20 }}>
        <A href='/'>Covid-19 Cordinate</A>
      </Navbar.Header>

      <Navbar.Body>
        <Nav pullRight>
          <A href='/volunteers'><Nav.Item>Volunteers</Nav.Item></A>
          {!!user && (<Nav.Item onClick={() => auth.signOut()}>Logout</Nav.Item>)}
          {!user && (<Nav.Item onClick={() => setOpen(true)}>Login</Nav.Item>)}
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export default () => (<Suspense fallback='Loading user...'><Header /></Suspense>)
