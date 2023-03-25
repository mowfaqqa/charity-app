import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '../../../components/AuthLayout'
import Button from '../../../components/Button'
import { InputField } from '../../../components/InputFields'
import { useRouter } from 'next/router'
import { useAuth } from '../../../lib/context/authContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { notifyError, notifySuccess } from '../../../lib/notification'
import { database } from '../../../lib/firebase'
import { ref, update } from 'firebase/database'

const Donor = () => {
  const router = useRouter()
  const { logIn } = useAuth();
  const formik = useFormik({
    initialValues : {
      email: "",
      password: ""
    },
    validationSchema : yup.object({
      email: yup.string().email().required("Email is required").label("Email Address"),
      password: yup
        .number()
        .label("Password")
        .required("Password must be a number")
      ,
  }),
  onSubmit: (values) => {
    const email = values.email;
    const password = values.password
    logIn(email, password,)
  .then((userCredential : any) => {
    // Signed in 
    const user = userCredential.user;
    notifySuccess('User is logged in successfully')
    router.push('/donor/dashboard');
    const dt = new Date()
    update(ref(database, 'users/' + user.uid), {
      last_login : dt
    })

    // ...
  })
  .catch((error : any) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    notifyError(errorMessage)
    // ..
  });
  }
})
  return (
    <div className='bg-green-700/70 my-10 rounded-lg py-8 px-4 mx-3'> 
    <div className='text-center'>
        <h1 className='text-4xl font-bold text-yellow-400'>Sign In as a Donor</h1>
        <p className='text-sm text-yellow-200'>Dont have an account? <span><Link href="/auth/signup" passHref><span className='text-green-400'> Register</span></Link></span></p>
    </div>
    <div className='max-w-[1200px] mx-auto py-8'>
        <InputField 
         required
         id="email"
         type="text"
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
       <Button type="submit" variant="primary" className="py-2 my-3" onClick={formik.handleSubmit}>
        Sign In
       </Button>
    </div>
    </div>
  )
}

export default Donor

Donor.getLayout = function getLayout(login: React.ReactElement) {
    return <AuthLayout>{login}</AuthLayout>;
  };