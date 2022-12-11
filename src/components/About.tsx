import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { BarChart, CreditCard, DollarSign, FastForward, Lock, PenTool, Users, Smile } from 'react-feather';

const About = () => {
  const router = useRouter()
  return (
    <div className="">
    <div>
      <div className='max-w-7xl mx-auto px-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center py-4'>
        <div className='my-4 mx-4'>
            <Image src="/images/kids.jpg" width={400} height={200} alt="bitcoin" />
        </div>
        <div className='col-span-2 px-5'>
        <h2 className='text-center text-4xl font-bold text-green-400 py-2 flex items-center justify-center'><Smile size={35}/><span>About</span><span className='text-green-400'> Charity<span className='text-yellow-400'>App</span></span></h2>
            <p className='text-gray-500 py-4 text-justify '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita deserunt fugiat voluptatum cum reiciendis ratione facilis voluptate hic accusamus facere id, provident sunt quas quam repellat vel ab, saepe nulla alias sed quo quia earum nam temporibus. Culpa dignissimos maiores, hic tempora blanditiis labore ab.</p>
            <button
            className="bg-green-400 py-1 px-3 rounded-md text-white"
            onClick={() => router.push("/about")}
            >Read More</button>
            </div>
        </div>
        </div>
        <div className="bg-[url('/assets/cryptochart.jpg')] bg-cover bg-no-repeat my-4 py-4">
          <div className='max-w-7xl mx-auto px-5 text-yellow-600'>
        <h2 className='text-center text-4xl font-semibold text-yellow-600 py-2 flex items-center justify-center'>Why Choose Us?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-5'>
          <div className='rounded-lg shadow-md p-6 flex flex-col justify-center items-center border border-gray-300'>
            <FastForward size={40}/>
            <h4 className='text-center text-green-600 text-xl font-medium '>Safe And Secure</h4>
            <p className='text-yellow-500 text-justify'>Get your payment instantly as you request for it. There is no fee for Withdrawal of hourly interests.</p>
          </div>
          <div className='rounded-lg shadow-md p-6 flex flex-col justify-center items-center border border-gray-300'>
          <Users size={40}/>
            <h4 className='text-center text-green-600 text-xl font-medium'>Confidentiality</h4>
            <p className='text-yellow-500 text-justify'>An account is instantly created for you with us in real time as you register with us</p>
          </div>
          <div className='rounded-lg shadow-md p-6 flex flex-col justify-center items-center border border-gray-300'>
            <Lock size={40} />
            <h4 className='text-center text-green-600 text-xl font-medium'>No Third Party</h4>
            <p className='text-yellow-500 text-justify'>Your funds are very safe and secure with us as we use a top notch encrypted and trusted protection against fraudsters.</p>
          </div>
         
          <div className='rounded-lg shadow-md p-6 flex flex-col justify-center items-center border border-gray-300'>
            <BarChart size={40} />
            <h4 className='text-center text-green-600 text-xl font-medium'>Detailed Statistics</h4>
            <p className='text-yellow-500 text-justify'>We provide a detailed graphical statistics of how your transactions are being carried out.</p>
          </div>
          <div className='rounded-lg shadow-md p-6 flex flex-col justify-center items-center border border-gray-300'>
            <CreditCard size={40} />
            <h4 className='text-center text-green-600 text-xl font-medium'>Customer Support</h4>
            <p className='text-yellow-500 text-justify'>Our customer service is great having professionals that are dedicated and accessible anytime you require any form of assistance.</p>
          </div>
        </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default About