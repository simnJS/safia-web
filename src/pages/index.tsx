import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Landing from '@/components/Landing'
import Banner from '@/components/Banner'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
        <Header />
        <Landing />
        <Banner />
        <Features />
        <Footer />
    </div>
  )
}
