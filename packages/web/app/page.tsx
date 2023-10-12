import { getServerSession } from 'next-auth'
import auth from '../server/auth'
import Header from './header'
export const dynamic = 'force-dynamic'
const App = async () => {
  const session = await getServerSession(auth)
  return (
    <div>
      <Header />
      <h2>Unprotected Route</h2>
      <h3>User session</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default App
