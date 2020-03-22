import React from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { useRoutes } from 'hookrouter'
import { Content, Container } from 'rsuite'

// TODO: pull this, from server?
import firebaseConfig from '../config.json'
import Header from './Header'
import PageHome from './pages/PageHome'
import PageNotFound from './pages/PageNotFound'
import PageAbout from './pages/PageAbout'

const routes = {
  '/': PageHome,
  '/about': PageAbout
}

export default () => {
  const page = useRoutes(routes) || <PageNotFound />
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Container>
        <Header />
        <Content>{page}</Content>
      </Container>
    </FirebaseAppProvider>
  )
}
