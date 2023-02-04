import React from "react";
import { CardV2 } from "../../components/Card";
import { MinusCircle, PlusCircle, User } from "react-feather";
import { auth, db } from "../../lib/firebase";
import DonorLayout from "../../components/Donor/DonorLayout";
import { collection, getDocs } from "firebase/firestore";
import EmptyState from "../../components/EmptyState";
import { Disclosure } from "@headlessui/react";

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
      const res = await getDocs(collection(db, "USERS", user?.uid!, "profile"));
      const profileData: any = res.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMyProfile(profileData[0]);
    };
    getMyProfileInfo();
  });

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="px-[61px]">
      <h1 className="text-3xl my-8 font-bold">
        Welcome to your dashboard, {myProfile?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CardV2 className="shadow-md border border-green-200 py-3 px-3 grid grid-cols-1">
          <p className="text-4xl mx-3 text-gray-500 font-semibold">
            {myProfile?.role}
          </p>
        </CardV2>
        <CardV2 className="shadow-md border border-green-200 py-3 px-3 grid grid-cols-1">
          <p className="text-xl mx-3 text-gray-800 font-semibold">
            {myProfile?.email}
          </p>
        </CardV2>
      </div>
      <div className="my-3">
        <h3 className="font-semibold text-lg py-4">Recipient Details</h3>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-6 border border-gray-200 py-3 px-2 rounded font-medium">
          <span>Name</span>
          <span>Account Number</span>
          <span>Bank Name</span>
          <span className="md:col-span-2">Address</span>
          <span>Phone Number</span>
        </div>

        {recipient!.map((user: any, index: number) => (
          <>
            {user.role === "recipient" && user.status === "verified" && (
              <div key={index} className="border-b border-gray-300">
                <CardV2 className="grid gap-6 grid-cols-3 md:grid-cols-6 px-3  my-2 md:my-0  rounded-none text-sm">
                  <span>{user.name}</span>
                  <span>{user.accountNumber}</span>
                  <span>{user.bankName}</span>
                  <span className="md:col-span-2">{user.address}</span>
                  <span>{user.phoneNumber}</span>
                </CardV2>
                <Disclosure as="div" className="px-3 my-3">
                  {({ open }) => (
                    <>
                      <dt className="text-sm">
                        <Disclosure.Button className="text-left w-full flex justify-between items-center text-gray-400">
                          <span className="text-black text-base font-bold">
                            See details
                          </span>
                          <span className=" flex items-center">
                            {open ? (
                              <MinusCircle
                                className={classNames(
                                  "-rotate-180",
                                  "h-6 w-6 transform text-black font-light"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusCircle
                                className={classNames(
                                  "rotate-0",
                                  "h-6 w-6 transform text-black font-light"
                                )}
                                aria-hidden="true"
                              />
                            )}{" "}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-sm font-light text-gray-500">
                          {user.details}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
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
