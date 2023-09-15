import { serverClient } from '../_trpc/serverClient'
import { getServerSession } from 'next-auth'
import auth from '../../server/auth'

const App = async () => {
  const session = await getServerSession(auth)
  const users = await serverClient(session).getUsers()
  return (
    <div>
      <h3>Get Users (server side)</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

export default App
