import { getServerSession } from 'next-auth'
import auth from '../../server/auth'
import Header from '../header'
import Server from './server'
import Client from './client'

const App = async () => {
  const session = await getServerSession(auth)
  return (
    <div>
      <Header />
      <h2>Protected Route</h2>
      <h3>User session</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Server />
      <Client />
    </div>
  )
}

export default App
