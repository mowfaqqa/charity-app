import React from 'react'
import AppLayout from '../../components/AppLayout';
import { CardV2 } from '../../components/Card';
import { User } from 'react-feather';

const Dashboard = () => {
  return (
    <div className='px-[61px]'>
        <h1 className='text-3xl my-8 font-bold'>Welcome to your dashboard</h1>
        <div className='grid grid-cols-2 gap-10'>
            <CardV2 className="shadow-md border border-green-200 py-3 px-3 flex-col">
                <h1 className='text-2xl flex items-center font-semibold'> <User className='mx-2' size={23}/> Total Donor</h1>
                <p className='text-4xl px-3 text-gray-500 font-semibold'>40</p>
            </CardV2>
            <CardV2 className="shadow-md border border-green-200 py-3 px-3 flex-col">
                <h1 className='text-2xl flex items-center font-semibold'><User className='mx-2' size={23}/> Total Recipient </h1>
                <p className='text-4xl mx-3 text-gray-500 font-semibold'>100</p>
            </CardV2>

        </div>
            <div className='my-3'>
                <h3 className='font-semibold text-lg py-4'>Recipient Details</h3>
                <div className='grid gap-4 grid-cols-6 border border-gray-200 py-3 px-2 rounded font-medium'>
                    <span>Name</span>
                    <span >Account Number</span>
                    <span>Bank Name</span>
                    <span className='col-span-2'>Address</span>
                    <span>Phone Number</span>
                </div>
                <CardV2 className="grid gap-6 grid-cols-6 px-3 border-b border-gray-300 rounded-none text-sm">
                    <span>Sani Yau</span>
                    <span >1111110045</span>
                    <span>First Bank</span>
                    <span className='col-span-2'>Hotoro</span>
                    <span>0902345678</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-6 px-3 border-b border-gray-300 rounded-none text-sm">
                    <span>Adam Hassan</span>
                    <span >3457890324</span>
                    <span>Kuda Bank</span>
                    <span className='col-span-2'>Hotoro</span>
                    <span>0902345678</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-6 px-3 border-b border-gray-300 rounded-none text-sm">
                    <span>Hassan Alkali</span>
                    <span >6578495689</span>
                    <span>UBA</span>
                    <span className='col-span-2'>Hotoro</span>
                    <span>0902345678</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-6 px-3 border-b border-gray-300 rounded-none text-sm">
                    <span>Jamilu Tahir</span>
                    <span >0987656754</span>
                    <span>Access Bank</span>
                    <span className='col-span-2'>Hotoro</span>
                    <span>0902345678</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-6 px-3 border-b border-gray-300 rounded-none text-sm">
                    <span>Dan Ladi Abdullahi</span>
                    <span >1342567843</span>
                    <span>First Bank</span>
                    <span className='col-span-2'>Hotoro</span>
                    <span>0902345678</span>
                </CardV2>
            </div>
    </div>
  )
}

export default Dashboard

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
  };