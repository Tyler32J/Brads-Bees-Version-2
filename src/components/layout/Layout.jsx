import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MessageBanner from './MessageBanner'
import MobileContactBar from './MobileContactBar'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <MessageBanner />
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  )
}
