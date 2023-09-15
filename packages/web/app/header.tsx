'use client'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Header = () => {
  const session = useSession()
  return (
    <div className='flex justify-between flex-1'>
      <div className='flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/app'>App</Link>
        <Link
          href='#'
          onClick={() => signIn(undefined, { callbackUrl: '/app' })}
        >
          Sign In
        </Link>
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      </div>
      <div>{session.data?.user?.name}</div>
    </div>
  )
}

export default Header
