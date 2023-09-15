'use client'
import { trpc } from '../_trpc/client'
import { useSession } from 'next-auth/react'

const App = () => {
  const session = useSession()
  const users = trpc.getUsers.useQuery().data
  return (
    <div>
      <h3>Get Users (client side)</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

export default App
