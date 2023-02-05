import React from 'react'
import AppLayout from '../../components/AppLayout';
import { CardV2 } from '../../components/Card';
import { User } from 'react-feather';
import { auth, db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const user = auth.currentUser
  const [myProfile, setMyProfile] = React.useState<any>();
  React.useEffect(() => {
    const getMyProfileInfo = async () => {
        const res = await getDocs(collection(db, "USERS", user?.uid!, "profile"))
        const profileData: any = res.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
        })) 
        setMyProfile(profileData[0])
    }
    getMyProfileInfo()
  });
  
  return (
    <div className='px-[61px]'>
        <h1 className='text-3xl my-8 font-bold'>Welcome to your dashboard, {myProfile?.name}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <CardV2 className="shadow-md border border-green-200 py-3 px-3 flex-col">
                <h1 className='text-2xl flex items-center font-semibold'> <User className='mx-2' size={23}/> {myProfile?.role}</h1>
            </CardV2>
            <CardV2 className="shadow-md border border-green-200 py-3 px-3 flex-col">
                {myProfile?.status === "pending" ? (
                    <h1 className='text-2xl flex text-yellow-500 items-center font-semibold'> Status : {myProfile?.status}</h1>
                ) : (
                    <h1 className='text-2xl text-green-500 flex items-center font-semibold'> Status : {myProfile?.status}</h1> 
                )}
            </CardV2>
        </div>
                <h3 className='font-semibold text-lg py-4'>Recipient Details</h3>
            <div className='my-3 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Email</span>
                    <span >{myProfile?.email}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Address</span>
                    <span >{myProfile?.address}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Account Name</span>
                    <span >{myProfile?.accountName}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Phone Number</span>
                    <span >{myProfile?.phoneNumber}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Account Number</span>
                    <span >{myProfile?.accountNumber}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Bank Name</span>
                    <span >{myProfile?.bankName}</span>
                </CardV2>
                <CardV2 className="grid gap-6 grid-cols-1 px-3 border border-gray-300 rounded-md text-sm">
                    <span className='text-xl font-semibold'>Type Of Support</span>
                    <span >{myProfile?.typeOfSupport}</span>
                </CardV2>
            </div>
    </div>
  )
}

export default Dashboard

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
  };