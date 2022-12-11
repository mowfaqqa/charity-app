import Head from 'next/head'
import { Smile } from 'react-feather'
import About from '../components/About'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Charity App</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <div className="h-[100vh] overflow-x-hidden bg-[url('/images/children.jpg')] bg-center bg-cover bg-no-repeat text-gray-100">
      <Header />
        <section className='flex justify-center items-center h-[70vh]'>
          <Container>
            <h1 className='text-green-500 font-bold text-5xl  justify-center items-center'> <span>A platform for making or recieving  <span className="text-yellow-300">charity
            donations
            </span> for the needy </span>
            </h1>
            <p className='text-medium text-yellow-500'>Charity is an act of a soft heart so make a donation and put a smile on someone&apos;s face or you can be a recipient of this generosity if you need a helping hand in the community your secret is safe with us</p>
          </Container>
        </section>
      </div>
        <About />
      <Footer />
    </>
  )
}
