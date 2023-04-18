import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import LoginModal from '@/components/Modals/LoginModal'
import RegisterModal from '@/components/Modals/RegisterModal'
import { Toaster } from "@/components/ui/Toaster"
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Toaster />
        <LoginModal />
        <RegisterModal />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
