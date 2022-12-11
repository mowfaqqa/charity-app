import React from 'react'
import { AuthLayout } from '../../../components/AuthLayout'
import Button from '../../../components/Button'
import { InputField, TextareaField } from '../../../components/InputFields'

const Signup = () => {
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
         id="name"
         type="text"
         label="Name"
         placeholder="Enter full name"
        //  error={!!formik.touched.password && !!formik.errors.password}
        //  helperText={!!formik.touched.password && formik.errors.password}
        //  inputProps={{
        //    value: formik.values.password,
        //    onChange: formik.handleChange("password"),
        //    onBlur: formik.handleBlur("password"),
        //  }}
        />
        <div className="relative my-5 text-green-400">
          <p className='text-green-400 text-base'>Role</p>
            <label htmlFor="role" className="mr-8 text-sm">
              <input
                className="mr-2"
                type="radio"
                name="role"
                value="recipient"
                // onChange={'formik?.handleChange'}
              />
              Recipient
            </label>
            <label htmlFor="role" className='text-sm'>
              <input
                className="mr-2"
                type="radio"
                name="role"
                value="donor"
                // onChange={'formik?.handleChange'}
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
        //  error={!!formik.touched.password && !!formik.errors.password}
        //  helperText={!!formik.touched.password && formik.errors.password}
        //  inputProps={{
        //    value: formik.values.password,
        //    onChange: formik.handleChange("password"),
        //    onBlur: formik.handleBlur("password"),
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
        Sign Up
       </Button>
    </div>
    </div>
  )
}

export default Signup

Signup.getLayout = function getLayout(login: React.ReactElement) {
    return <AuthLayout>{login}</AuthLayout>;
  };