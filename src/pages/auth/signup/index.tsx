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

const SignUp = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      address: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      phoneNumber: "",
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
          notifySuccess("Sign up successful");
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
          Join Our Platform
        </h1>
      </div>
      <div className="max-w-[1200px] mx-auto py-8 text-center">
        <p className="text-yellow-400 text-base font-medium">
          Register as either a donor to and donate to the need or a recipient
          who is in need of assistance
        </p>
        <div className="">
        <Button
          variant="primary"
          type="submit"
          className="py-2 m-3"
          onClick={() => router.push("/auth/signup/donor")}
          >
          Sign Up as Donor
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="py-2 m-3"
          onClick={() => router.push("/auth/signup/recipient")}
          >
          Sign Up as Recipient
        </Button>
            </div>
      </div>
    </div>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
