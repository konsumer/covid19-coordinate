import React from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { useRoutes } from 'hookrouter'

import firebaseConfig from '../firebase.json'
import Header from './Header'
import PageHome from './pages/PageHome'
import PageNotFound from './pages/PageNotFound'
import PageVolunteers from './pages/PageVolunteers'

const routes = {
  '/': PageHome,
  '/volunteers': PageVolunteers
}

export default () => {
  const page = useRoutes(routes) || <PageNotFound />
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Header />
      <main style={{ padding: 20 }}>{page}</main>
    </FirebaseAppProvider>
  )
}
