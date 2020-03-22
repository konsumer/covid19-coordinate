import React from 'react'
import { useAuth } from 'reactfire'
import { Button, Icon } from 'rsuite'
import firebase from 'firebase/app'

const ButtonLoginGithub = ({ onComplete = () => {}, onError = console.error }) => {
  const auth = useAuth()

  const onClickInner = () => {
    const provider = new firebase.auth.GithubAuthProvider()
    auth.signInWithPopup(provider)
      .then(onComplete)
      .catch(onError)
  }

  return (
    <Button onClick={onClickInner} appearance='primary'><Icon icon='github' /> Login with Github</Button>
  )
}

export default ButtonLoginGithub
