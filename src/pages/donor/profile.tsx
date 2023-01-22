import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { notifyError, notifySuccess } from "../../lib/notification";
import { InputField, TextareaField } from "../../components/InputFields";
import Button from "../../components/Button";
import DonorLayout from "../../components/Donor/DonorLayout";

const Profile = () => {
  const user = auth.currentUser;
  const updateProfile = async (values: any) => {
    await updateDoc(doc(db, "USERS", user?.uid!), values);
    await updateDoc(doc(db, "USERS", user?.uid!, "profile", "data"), values);
  };
  // formik for profile update
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      address: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .label("Email Address"),
      name: yup.string().required().label("Name"),
      address: yup.string().required().label("Address"),
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
  return <DonorLayout>{login}</DonorLayout>;
};
