import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/output.css'
import Provider from '@/store/redux-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'nems - Home',
  description: 'nullchemy employee management system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ToastContainer hideProgressBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
