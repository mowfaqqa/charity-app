import Head from 'next/head';
import React from 'react'
import { Header } from './Header';

interface AppProps {
    children: React.ReactNode;
}
export const AuthLayout = ({ children }: AppProps): JSX.Element => {
  return (
    <>
    <Head>
      <title>ApexTrader</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="ApexTrader - An all inclusive cryptocurrency platform"
      />
      <meta
        name="keywords"
        content="Apextrader, Crypto, Cypto Currency, Bitcoin, Trade"
      />
      <meta name="author" content="ApexTrader" />
      <link rel="icon" type="image/png" href="/icons/favicon.png"></link>
    </Head> 
    <div className="h-[100vh] bg-[url('/images/showcase.jpg')] bg-cover bg-no-repeat overflow-x-hidden">
        <Header />
        <div className='max-w-5xl mx-auto'>
            {children}
        </div>
    </div>
    </>
  )
}
