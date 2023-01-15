import React from 'react'
import { AuthLayout } from '../../../components/AuthLayout'
import Button from '../../../components/Button'
import { InputField, TextareaField } from '../../../components/InputFields'
import { app, database, db } from '../../../lib/firebase';
import { ref, set } from 'firebase/database';
import { notifySuccess, notifyError } from '../../../lib/notification'
import * as yup from "yup";
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../lib/context/authContext';

const Signup = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues : {
      name: "",
      email: "",
      password: "",
      role: "",
      address: "",
    },
    validationSchema : yup.object({
      email: yup.string().email().required("Email is required").label("Email Address"),
      name: yup.string().required().label("Name"),
      address: yup.string().required().label("Address"),
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
    const password = values.password
    const name = values.name
    signUp(email, password)
  .then((userCredential : any) => {
    // Signed in 
    const user = userCredential?.user;
    set(ref(database, 'users/' + user.uid), {
      name : name,
      email : email
    })
    setDoc(doc(db, "USERS", user.uid), {
      values
    })
    notifySuccess("Sign up successful")
    router.push('/dashboard');
  })
  .catch((error : any) => {
    const errorMessage = error?.message;
    notifyError(errorMessage)
  });
  }
})
  return (
    <div className='bg-green-700/70 my-10 rounded-lg py-8 px-4 mx-3'> 
    <div className='text-center'>
        <h1 className='text-4xl font-bold text-yellow-400'>Register</h1>
        {/* <p className='text-sm text-yellow-200'>have an account? <span><Link href="/auth/signup" passHref><span className='text-green-400'> Login</span></Link></span></p> */}
    </div>
    <div className='max-w-[1200px] mx-auto py-8'>
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
        <div className="relative my-5 text-green-400">
          <p className='text-green-400 text-base'>Role</p>
            <label htmlFor="role" className="mr-8 text-sm">
              <input
                className="mr-2"
                type="radio"
                name="role"
                value="recipient"
                onChange={formik?.handleChange}
              />
              Recipient
            </label>
            <label htmlFor="role" className='text-sm'>
              <input
                className="mr-2"
                type="radio"
                name="role"
                value="donor"
                onChange={formik?.handleChange}
              />
              Donor
            </label>
          </div>
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
       <Button variant="primary" type="submit" className="py-2 my-3" onClick={formik.handleSubmit}>
        Sign Up
       </Button>
    </div>
    </div>
  )
}

export default Signup

Signup.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
  };