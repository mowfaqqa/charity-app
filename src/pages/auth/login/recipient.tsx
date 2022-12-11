import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '../../../components/AuthLayout'
import Button from '../../../components/Button'
import { InputField } from '../../../components/InputFields'

const Recipient = () => {
  return (
    <div className='bg-green-700/70 my-10 rounded-lg py-8 px-4 mx-3'> 
    <div className='text-center'>
        <h1 className='text-4xl font-bold text-yellow-400'>Sign In as a Recipient</h1>
        <p className='text-sm text-yellow-200/70'>Dont have an account? <span><Link href="/auth/signup" passHref><span className='text-green-400'> Register</span></Link></span></p>
    </div>
    <div className='max-w-[900px] mx-auto py-8'>
        <InputField 
         required
         id="email"
         type="text"
         label="Email Address"
         placeholder="Enter your email address"
        //  error={!!formik.touched.email && !!formik.errors.email}
        //  helperText={!!formik.touched.email && formik.errors.email}
        //  inputProps={{
        //    value: formik.values.email,
        //    onChange: formik.handleChange("email"),
        //    onBlur: formik.handleBlur("email"),
        //  }}
        />
        <InputField
         required
         id="password"
         type="password"
         label="Password"
         placeholder="Enter password"
        //  error={!!formik.touched.password && !!formik.errors.password}
        //  helperText={!!formik.touched.password && formik.errors.password}
        //  inputProps={{
        //    value: formik.values.password,
        //    onChange: formik.handleChange("password"),
        //    onBlur: formik.handleBlur("password"),
        //  }}
        />
       <Button variant="primary" className="py-2 my-3" onClick={"formik.handleSubmit"}>
        Sign In
       </Button>
    </div>
    </div>
  )
}

export default Recipient

Recipient.getLayout = function getLayout(login: React.ReactElement) {
    return <AuthLayout>{login}</AuthLayout>;
  };