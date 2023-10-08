import Image from 'next/image'
import PaystackHookExample from './pay'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <PaystackHookExample />
    </main>
  )
}
