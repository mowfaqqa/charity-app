import React from "react";
import { CardV2 } from "../../components/Card";
import { User } from "react-feather";
import { auth, db } from "../../lib/firebase";
import DonorLayout from "../../components/Donor/DonorLayout";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const user = auth.currentUser;
  const [recipient, setRecipient] = React.useState<any>([]);
  const [myProfile, setMyProfile] = React.useState<any>();
  React.useEffect(() => {
    const getRecipientData = async () => {
      const response = await getDocs(collection(db, "USERS"));
      const data: any = response.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipient(data);
    };
    getRecipientData();
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
    <div className="px-[61px]">
      <h1 className="text-3xl my-8 font-bold">Welcome to your dashboard, {myProfile?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CardV2 className="shadow-md border border-green-200 py-3 px-3 grid grid-cols-1">
          <p className="text-4xl mx-3 text-gray-500 font-semibold">{myProfile?.role}</p>
        </CardV2>
      </div>
      <div className="my-3">
        <h3 className="font-semibold text-lg py-4">Recipient Details</h3>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-6 border border-gray-200 py-3 px-2 rounded font-medium">
          <span>Name</span>
          <span>Account Number</span>
          <span>Bank Name</span>
          <span className="col-span-2">Address</span>
          <span>Phone Number</span>
        </div>
        
        {recipient!.map((user: any, index: number) => (
            <>
            {user.role === "recipient" && (
          <CardV2
            key={index}
            className="grid gap-6 grid-cols-3 md:grid-cols-6 px-3 border-b my-2 md:my-0 border-gray-300 rounded-none text-sm"
            >
            <span>{user.name}</span>
            <span>{user.accountNumber}</span>
            <span>{user.bankName}</span>
            <span className="md:col-span-2">{user.address}</span>
            <span>{user.phoneNumber}</span>
          </CardV2>
            )}
              </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DonorLayout>{page}</DonorLayout>;
};
