import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Provider from '@/app/_trpc/Provider'
import AuthProvider from './authProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SST Template v2',
  description: 'SST Template v2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`h-full ${inter.className}`}>
        <AuthProvider>
          <Provider>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  )
}
