import React, { use } from "react";
import { AuthLayout } from "../../../components/AuthLayout";
import Button from "../../../components/Button";
import {
  InputField,
  SelectField,
  TextareaField,
} from "../../../components/InputFields";
import { app, database, db } from "../../../lib/firebase";
import { ref, set } from "firebase/database";
import { notifySuccess, notifyError } from "../../../lib/notification";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../lib/context/authContext";

const DonorSignup = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "donor",
      password: "",
      address: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .label("Email Address"),
      name: yup
        .string()
        .required()
        .label("Name")
        .matches(/^[a-zA-Z]+$/, " name must not include numbers"),
      address: yup.string().required().label("Address"),
      password: yup
        .string()
        .matches(/^[0-9]+$/, "password must numbers")
        .label("Password")
        .required("Password must be a number"),
      confirmPassword: yup
        .string()
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
    }),
    onSubmit: (values) => {
      const email = values.email;
      const password = values.password;
      const name = values.name;
      signUp(email, password)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential?.user;
          set(ref(database, "users/" + user.uid), {
            name: name,
            email: email,
          });
          setDoc(doc(db, "USERS", user.uid), {
            ...values,
          });
          setDoc(doc(db, "USERS", user.uid, "profile", "data"), {
            ...values,
          });
          notifySuccess("Sign up as Donor successful");
          values.role === "donor"
            ? router.push("/donor/dashboard")
            : router.push("/recipient/dashboard");
        })
        .catch((error: any) => {
          const errorMessage = error?.message;
          notifyError(errorMessage);
        });
    },
  });
  return (
    <div className="bg-green-700/70 my-10 rounded-lg py-8 px-4 mx-3">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          Register as Donor
        </h1>
        {/* <p className='text-sm text-yellow-200'>have an account? <span><Link href="/auth/signup" passHref><span className='text-green-400'> Login</span></Link></span></p> */}
      </div>
      <div className="max-w-[1200px] mx-auto py-8">
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
        <InputField
          required
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={!!formik.touched.password && formik.errors.password}
          inputProps={{
            value: formik.values.password,
            onChange: formik.handleChange("password"),
            onBlur: formik.handleBlur("password"),
          }}
        />
        <InputField
          required
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Enter password"
          error={
            !!formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          helperText={
            !!formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          inputProps={{
            value: formik.values.confirmPassword,
            onChange: formik.handleChange("confirmPassword"),
            onBlur: formik.handleBlur("confirmPassword"),
          }}
        />
        <Button
          variant="primary"
          type="submit"
          className="py-2 my-3"
          onClick={formik.handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default DonorSignup;

DonorSignup.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
