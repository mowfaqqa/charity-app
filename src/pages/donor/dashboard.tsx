import React from "react";
import { CardV2 } from "../../components/Card";
import { MinusCircle, PlusCircle, User } from "react-feather";
import { auth, db } from "../../lib/firebase";
import DonorLayout from "../../components/Donor/DonorLayout";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import EmptyState from "../../components/EmptyState";
import { Disclosure } from "@headlessui/react";
import Button4 from "../../components/Button";
import { useRouter } from "next/router";
import Dialog from "../../components/Dialog";
import { InputField } from "../../components/InputFields";
import { useFormik } from "formik";
import * as yup from "yup";
import { notifyError, notifySuccess } from "../../lib/notification";

const Dashboard = () => {
  const user = auth.currentUser;
  const router = useRouter();
  const [recipient, setRecipient] = React.useState<any>([]);
  const [myProfile, setMyProfile] = React.useState<any>();
  const [pickupInfo, setPickupInfo] = React.useState<any>();
  const requestPickup = async (values: any) => {
    await setDoc(doc(db, "PickUp", user?.uid!), values);
  };
  const updatePickup = async (values: any) => {
    await updateDoc(doc(db, "PickUp", user?.uid!), values);
  };
  const markRecipientAsResolved = async (id: any) => {
    await setDoc(doc(db, "USERS", id), { status: "resolved" });
  };
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
    const getPickUpInfo = async () => {
      const res = await getDocs(collection(db, "PickUp"));
      const pickUpData: any = res.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPickupInfo(pickUpData);
    };
    getPickUpInfo();
  });
  // formik for pickup
  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      email: "",
      phoneNumber: "",
      dataTime: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .label("Email Address"),
      pickupLocation: yup.string().required(),
      phoneNumber: yup.string().required(),
    }),
    onSubmit: (values) => {
      requestPickup({
        ...values,
        status: "pending",
      })
        .then(() => {
          notifySuccess("Pick up request sent successfully");
          router.push("/donor/dashboard");
          formik.resetForm();
        })
        .catch((error) => notifyError(error?.message));
    },
  });
  // formik for pickup update
  const editformik = useFormik({
    initialValues: {
      pickupLocation: "",
      email: "",
      phoneNumber: "",
      dataTime: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .label("Email Address"),
      pickupLocation: yup.string().required(),
      phoneNumber: yup.string().required(),
    }),
    onSubmit: (values) => {
      updatePickup({
        ...values,
        status: "pending",
      })
        .then(() => {
          notifySuccess("Pick up updated successfully");
          router.push("/donor/dashboard");
          formik.resetForm();
        })
        .catch((error) => notifyError(error?.message));
    },
  });
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="px-[61px]">
      <div className="flex flex-col md:flex-row md:justify-between items-center my-4">
        <h1 className="text-3xl my-8 font-bold">
          Welcome to your dashboard, {myProfile?.name}
        </h1>
        <div>
          <Button4
            variant="primary"
            className="my-3 mx-3 md:my-0 text-sm"
            onClick={() => {
              router.push("/donor/dashboard/?donation_pickup=true");
            }}
          >
            Request For Pickup
          </Button4>
          <Button4
            variant="primary"
            className="my-3 mx-3 md:my-0 text-sm bg-blue-300"
            onClick={() => {
              router.push("/donor/dashboard/?edit_pickup=true");
            }}
          >
            Update Pickup Info
          </Button4>
          <Button4
            variant="primary"
            className="text-sm"
            onClick={() => {
              router.push("/donor/dashboard/?foundation_donation=true");
            }}
          >
            Donate to the foundation
          </Button4>
        </div>
      </div>
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
          <div key={index}>
            {user.role === "recipient" && user.status === "verified" && (
              <div className="border-b border-gray-300">
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
                        <div className="flex flex-col md:flex-row justify-between items-start">
                          <p className="text-sm font-light mb-3 md:mb-0 text-gray-500">
                            {user.details}
                          </p>
                          <Button4
                            variant="primary"
                            className="text-xs md:text-sm px-6 py-1 md:py-2"
                            onClick={() =>
                              router.push(
                                "/donor/dashboard/?resolve_recipient=true"
                              )
                            }
                          >
                            Mark as Resolved
                          </Button4>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {router.query.resolve_recipient && (
                  <Dialog
                    variant="scroll"
                    open={false}
                    onClose={() => router.push("/donor/dashboard")}
                  >
                    <div className="inline-block rounded-lg px-4 pt-5 pb-4 text-center">
                      <h1 className=" mb-7 text-3xl leading-9 font-semibold text-gray-900 mx-1">
                        Are you this Recipient&apos;s issues has been Resolved ?
                      </h1>
                      <div className="flex mt-4 items-center justify-center gap-3">
                        <Button4
                          className="border border-gray-400"
                          onClick={() => router.back()}
                        >
                          Cancel
                        </Button4>
                        <Button4
                          variant="primary"
                          onClick={() => {
                            markRecipientAsResolved(user.id)
                              .then(() => {
                                notifySuccess("Recipient has been resolved");
                                router.back();
                              })
                              .catch(() =>
                                notifyError("Error marking recipient")
                              );
                          }}
                        >
                          Yes, Resolved
                        </Button4>
                      </div>
                    </div>
                  </Dialog>
                )}
              </div>
            )}
          </div>
        ))}
        {router.query.foundation_donation && (
          <Dialog
            variant="scroll"
            open={false}
            onClose={() => router.push("/donor/dashboard")}
          >
            <div className="inline-block rounded-lg px-4 pt-5 pb-4 text-center">
              <h1 className=" mb-7 text-2xl leading-9 font-semibold text-gray-900 mx-1">
                Send Your Donations to This Account Below
              </h1>
              <div>
                <span className=" mb-7 text-xl leading-9 font-semibold text-gray-900 mx-1">
                  Account Name :
                </span>
                <span className="text-xl font-normal">Charity App</span>
              </div>
              <div>
                <span className=" mb-7 text-xl leading-9 font-semibold text-gray-900 mx-1">
                  Account Number:
                </span>
                <span className="text-xl font-normal">000000000</span>
              </div>
              <div>
                <span className=" mb-7 text-xl leading-9 font-semibold text-gray-900 mx-1">
                  Bank Name :
                </span>
                <span className="text-xl font-normal">First Bank</span>
              </div>
              <div className="flex justify-center gap-3">
                <Button4
                  className="border border-gray-400 mt-4"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button4>
              </div>
            </div>
          </Dialog>
        )}
        {router.query.edit_pickup && (
          <Dialog
            variant="scroll"
            open={false}
            onClose={() => router.push("/donor/dashboard")}
          >
            <div className="inline-block rounded-lg px-4 pt-5 pb-4">
              <h1 className=" mb-7 text-2xl leading-9 font-semibold text-gray-900 mx-1">
                Update Pick Up Info
              </h1>
              <div>
                <InputField
                  required
                  id="pickupLocation"
                  type="text"
                  label="Pickup Location"
                  placeholder="Enter the address for donation pick up"
                  error={
                    !!editformik.touched.pickupLocation &&
                    !!editformik.errors.pickupLocation
                  }
                  helperText={
                    !!editformik.touched.pickupLocation &&
                    editformik.errors.pickupLocation
                  }
                  inputProps={{
                    value: editformik.values.pickupLocation,
                    onChange: editformik.handleChange("pickupLocation"),
                    onBlur: editformik.handleBlur("pickupLocation"),
                  }}
                />
                <InputField
                  required
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  // error={
                  //   !!editformik.touched.email && !!editformik.errors.email
                  // }
                  helperText={
                    !!editformik.touched.email && editformik.errors.email
                  }
                  inputProps={{
                    value: editformik.values.email,
                    onChange: editformik.handleChange("email"),
                    onBlur: editformik.handleBlur("email"),
                  }}
                />
                <InputField
                  required
                  id="phoneNumber"
                  type="text"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  error={
                    !!editformik.touched.phoneNumber &&
                    !!editformik.errors.phoneNumber
                  }
                  helperText={
                    !!editformik.touched.phoneNumber &&
                    editformik.errors.phoneNumber
                  }
                  inputProps={{
                    value: editformik.values.phoneNumber,
                    onChange: editformik.handleChange("phoneNumber"),
                    onBlur: editformik.handleBlur("phoneNumber"),
                  }}
                />
                <InputField
                  required
                  id="dataTime"
                  type="datetime-local"
                  label="Date and Time for Pick Up"
                  error={
                    !!editformik.touched.dataTime &&
                    !!editformik.errors.dataTime
                  }
                  helperText={
                    !!editformik.touched.dataTime && editformik.errors.dataTime
                  }
                  inputProps={{
                    value: editformik.values.dataTime,
                    onChange: editformik.handleChange("dataTime"),
                    onBlur: editformik.handleBlur("dataTime"),
                  }}
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <Button4
                  className="border border-gray-400 mt-4"
                  onClick={() => {
                    router.back();
                    editformik.resetForm();
                  }}
                >
                  Cancel
                </Button4>
                <Button4
                  variant="primary"
                  type="submit"
                  className="mt-4"
                  onClick={editformik.handleSubmit}
                >
                  Update Pickup
                </Button4>
              </div>
            </div>
          </Dialog>
        )}

        {router.query.donation_pickup && (
          <Dialog
            variant="scroll"
            open={false}
            onClose={() => router.push("/donor/dashboard")}
          >
            <div className="inline-block rounded-lg px-4 pt-5 pb-4">
              <h1 className=" mb-7 text-2xl leading-9 font-semibold text-gray-900 mx-1">
                Request to have your Donation Picked Up
              </h1>
              <div>
                <InputField
                  required
                  id="pickupLocation"
                  type="text"
                  label="Pickup Location"
                  placeholder="Enter the address for donation pick up"
                  error={
                    !!formik.touched.pickupLocation &&
                    !!formik.errors.pickupLocation
                  }
                  helperText={
                    !!formik.touched.pickupLocation &&
                    formik.errors.pickupLocation
                  }
                  inputProps={{
                    value: formik.values.pickupLocation,
                    onChange: formik.handleChange("pickupLocation"),
                    onBlur: formik.handleBlur("pickupLocation"),
                  }}
                />
                <InputField
                  required
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={!!formik.touched.email && formik.errors.email}
                  inputProps={{
                    value: formik.values.email,
                    onChange: formik.handleChange("email"),
                    onBlur: formik.handleBlur("email"),
                  }}
                />
                <InputField
                  required
                  id="phoneNumber"
                  type="text"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  error={
                    !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
                  }
                  helperText={
                    !!formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  inputProps={{
                    value: formik.values.phoneNumber,
                    onChange: formik.handleChange("phoneNumber"),
                    onBlur: formik.handleBlur("phoneNumber"),
                  }}
                />
                <InputField
                  required
                  id="dataTime"
                  type="datetime-local"
                  label="Date and Time for Pick Up"
                  error={!!formik.touched.dataTime && !!formik.errors.dataTime}
                  helperText={
                    !!formik.touched.dataTime && formik.errors.dataTime
                  }
                  inputProps={{
                    value: formik.values.dataTime,
                    onChange: formik.handleChange("dataTime"),
                    onBlur: formik.handleBlur("dataTime"),
                  }}
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <Button4
                  className="border border-gray-400 mt-4"
                  onClick={() => {
                    router.back();
                    formik.resetForm();
                  }}
                >
                  Cancel
                </Button4>
                <Button4
                  variant="primary"
                  type="submit"
                  className="mt-4"
                  onClick={formik?.handleSubmit}
                >
                  Send Request
                </Button4>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DonorLayout>{page}</DonorLayout>;
};
