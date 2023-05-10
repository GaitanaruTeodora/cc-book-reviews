import Image from 'next/image'
import { Inter } from 'next/font/google'
import BookPage from '@/js/components/BookPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <BookPage/>
  )
}
