'use client'
import { InputText } from 'primereact/inputtext'
import { login } from './actions'

import variables from '@/styles/variables.module.scss'
import './login.scss'


import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useState } from 'react';
import { Message } from 'primereact/message';
import CancelIcon from '@mui/icons-material/Cancel';

export default function LoginPage() {

  const [error, setError] = useState<string | null>(null);

  async function signIn(form: FormData) {
    const {message, status, code} = await login(form);

    if (status === 400) {
      setError(message);
    } else {
      setError(message);
    }
  }

  return (
    <form className='form flex flex-col gap-3 items-center xl:w-10/12 2xl:w-9/12'>
      <h1 className='w-full text-3xl sm:text-4xl md:text-4xl font-medium'>Sign in to Buck<span className='font-black'>IT</span></h1>
      <div className='flex flex-col w-full'>
        <label htmlFor="email">Email:</label>
        <div className={`${variables['inputGroup']}`}>
          <EmailIcon className={`${variables['iconStart']}`} />
          <InputText className={`${variables['input']}`} placeholder='Enter your email' id="email" name="email" type="email" required />
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor="email">Password:</label>
        <div className={`${variables['inputGroup']}`}>
          <PasswordIcon className={`${variables['iconStart']}`} />
          <InputText className={`${variables['input']}`} placeholder='Enter your password' id="password"  name="password" type="password" required />
        </div>
      </div>
      <div className='flex w-full !justify-end'>
        <a href='/auth/login/forgot-password'>Forgot password?</a>
      </div>
      {error ? <div className='bg-red-200 px-5 py-3 rounded'>
        {/* <Message style={{fontWeight: 900 }} className='bg-red-200 font-black' severity="error" text={error} /> */}
        <span className='flex flex-rows gap-3 items-center'>
          <span>
            <CancelIcon className='icon-start text-red-500'  />
          </span>
          <span className='text-red-500 font-black'>{error}</span>
        </span>
      </div> : null}
      <button className='w-full max-w-60 mx-5 font-black' formAction={signIn}>Sign in</button>
      <div className="separator my-5">
        <hr className="line"/>
        <span className='note'>Or</span>
        <hr className="line"/>
      </div>
      <div className='w-full grid min-[1100px]:grid-cols-2 gap-3 place-items-center'>
        <div>
          <button className='flex justify-center items-center socials w-full mx-5 font-black' formAction={login}>
            <GoogleIcon fontSize='small' />
            Sign in with Google
            </button>
        </div>
        <div>
          <button className='flex justify-center items-center socials w-full mx-5 font-black' formAction={login}>
            <AppleIcon fontSize='small' />
            Sign in with Apple
            </button>
        </div>        
      </div>
      <div className='mt-4 w-full flex justify-center '>
        <p className="signup">Don't have an account? 
          <a rel="noopener noreferrer" href="#" className="">   Sign up</a>
        </p>
      </div>
      
    </form>
  )
}