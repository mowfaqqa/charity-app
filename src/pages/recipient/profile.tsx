import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { notifyError, notifySuccess } from "../../lib/notification";
import { InputField, TextareaField } from "../../components/InputFields";
import Button from "../../components/Button";
import DonorLayout from "../../components/Donor/DonorLayout";
import AppLayout from "../../components/AppLayout";

const Profile = () => {
  const user = auth.currentUser;
  // const profileRef = doc(db, "USERS", user?.uid!, )
  const updateProfile = async (values: any) => {
    await updateDoc(doc(db, "USERS", user?.uid!), values);
    await updateDoc(doc(db, "USERS", user?.uid!, "profile", "data"), values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      address: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      phoneNumber: ""
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .label("Email Address"),
      name: yup.string().required().label("Name"),
      accountName: yup.string().required().label("Account Name"),
      accountNumber: yup.string().required().label("Account Number"),
      phoneNumber: yup.string().required().label("Phone Number"),
      address: yup.string().required().label("Address"),
      bankName: yup.string().required().label("Bank Name"),
      password: yup
        .string()
        .label("Password")
        .min(8)
        .max(32)
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      updateProfile({
        ...values,
      })
        .then(() => notifySuccess("Updated Profile Successfully"))
        .catch(() =>
          notifyError("An error occured while updating profile details")
        );
    },
  });
  // formik for password update
  // const passwordFormik = useFormik({
  //     initialValues : {
  //         password : '',
  //     },
  //     validationSchema : yup.object({
  //         password: yup
  //         .string()
  //         .label("Password")
  //         .min(8)
  //         .max(32)
  //         .required()
  //         .matches(
  //           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //           "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //         ),
  //     }),
  //     onSubmit: (values) => {
  //         updatePassword(values).then(() => notifySuccess('Updated Password Successfully')).catch(() => notifyError("Ann error occured while changing password"))
  //     }
  // })
  return (
    <div>
      <h1 className="text-center text-base font-semibold lg:text-3xl my-3">
        User Profile
      </h1>
      <div className="max-w-5xl mx-auto">
        <h2 className="my-3 font-medium text-xl">Edit Account Details</h2>
        <div>
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
          id="name"
          type="text"
          label="Name"
          placeholder="Enter full name"
          error={!!formik.touched.name && !!formik.errors.name}
          helperText={!!formik.touched.name && formik.errors.name}
          inputProps={{
            value: formik.values.name,
            onChange: formik.handleChange("name"),
            onBlur: formik.handleBlur("name"),
          }}
        />
        <InputField
          required
          id="phoneNumber"
          type="text"
          label="Phone Number"
          placeholder="e.g 08012453647"
          error={!!formik.touched.phoneNumber && !!formik.errors.phoneNumber}
          helperText={!!formik.touched.phoneNumber && formik.errors.phoneNumber}
          inputProps={{
            value: formik.values.phoneNumber,
            onChange: formik.handleChange("phoneNumber"),
            onBlur: formik.handleBlur("phoneNumber"),
          }}
        />
        <InputField
          required
          id="accountName"
          type="text"
          label="Account Name"
          placeholder="Enter Account Name"
          error={!!formik.touched.accountName && !!formik.errors.accountName}
          helperText={!!formik.touched.accountName && formik.errors.accountName}
          inputProps={{
            value: formik.values.accountName,
            onChange: formik.handleChange("accountName"),
            onBlur: formik.handleBlur("accountName"),
          }}
        />
        <InputField
          required
          id="accountNumber"
          type="text"
          label="Account Number"
          placeholder="Enter Account name"
          error={
            !!formik.touched.accountNumber && !!formik.errors.accountNumber
          }
          helperText={
            !!formik.touched.accountNumber && formik.errors.accountNumber
          }
          inputProps={{
            value: formik.values.accountNumber,
            onChange: formik.handleChange("accountNumber"),
            onBlur: formik.handleBlur("accountNumber"),
          }}
        />
        <InputField
          required
          id="bankName"
          type="text"
          label="Bank Name"
          placeholder="Enter bank name"
          error={!!formik.touched.bankName && !!formik.errors.bankName}
          helperText={!!formik.touched.bankName && formik.errors.bankName}
          inputProps={{
            value: formik.values.bankName,
            onChange: formik.handleChange("bankName"),
            onBlur: formik.handleBlur("bankName"),
          }}
        />
        <TextareaField
          required
          id="address"
          type="address"
          label="Address"
          placeholder="Enter a detailed Address"
          error={!!formik.touched.address && !!formik.errors.address}
          helperText={!!formik.touched.address && formik.errors.address}
          inputProps={{
            value: formik.values.address,
            onChange: formik.handleChange("address"),
            onBlur: formik.handleBlur("address"),
          }}
        />
          <div>
            <Button
              className=" mx-auto block py-2 my-5 bg-green-500 text-white hover:bg-green-800"
              onClick={formik.handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </div>
        {/* <div>
                    <h3 className='my-3 font-medium text-lg'>Change Password</h3>
                <InputField
                    placeholder='Password'
                    label='Change Password'
                    id='password'
                    type='password'
                    error={!!passwordFormik.touched.password && !!passwordFormik.errors.password}
                    helperText={!!passwordFormik.touched.password && passwordFormik.errors.password}
                    inputProps={{
                      value: passwordFormik.values.password,
                      onChange: passwordFormik.handleChange("password"),
                      onBlur: passwordFormik.handleBlur("password"),
                    }}
                />
                 <div>
                <Button className=" mx-auto block py-2 my-5 bg-orange-300 text-white hover:bg-orange-800" onClick={passwordFormik.handleSubmit}>Save Changes</Button>
            </div>
            </div> */}
      </div>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(login: React.ReactElement) {
  return <AppLayout>{login}</AppLayout>;
};
