import Provider from '@/app/_trpc/Provider'
import AuthProvider from './authProvider'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import '../styles/globals.css'

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
    <html lang="en">
      <body className={`h-full ${inter.className}`}>
        <AuthProvider>
          <Provider>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  )
}
