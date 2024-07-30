// 'use client'

import React, { FunctionComponent, InputHTMLAttributes, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

import styles from './styles.module.scss'
import '../../globals.css';

import { SubmitOTP } from './actions';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    events: any;
    props: any;
}

export default function VerifyAccount(props: {email: string}) {
    const [token, setTokens] = useState<string>('');

    const otpChange = () => {
        SubmitOTP(token, props.email)
    }

    return (
        <form action={otpChange} className="card flex flex-row justify-center">
            <div className="flex flex-col gap-3 my-10 items-center">
                <p className="font-bold text-4xl mb-2">Authenticate Your Account</p>
                <p className="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
                <InputOtp name='otp' length={6} value={token} onChange={(e) => setTokens(e.value)} integerOnly/>
                
                {/* <InputOtp name='otp' length={6} integerOnly/> */}

                <div className={` flex w-full justify-between mt-5 item-stretch justify-items-stretch`}>
                    <Button  label="Resend Code" link className="p-0 button"></Button>
                    <Button type="submit" label="Submit Code"></Button>
                </div>
            </div>
        </form>
    );
}