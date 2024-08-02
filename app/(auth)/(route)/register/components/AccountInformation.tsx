import variables from '@/styles/variables.module.scss'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { InputText } from 'primereact/inputtext';
import Google from '@mui/icons-material/Google';
import Apple from '@mui/icons-material/Apple';
import { Mention, MentionSearchEvent } from 'primereact/mention';

import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import Dob from './dob';

import '../../globals.css';
        


import {AlternateEmail, Person, LocationCity, Phone, Link, LocationOn } from '@mui/icons-material';
import { UserMetaData } from '@/app/assets/interface/users';
import { searchUsers } from '../actions';
import { useEffect } from 'react';

type AccountInformationProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDob: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleMaskChange?: (e: InputMaskChangeEvent) => void,
    searchUsers: (e: MentionSearchEvent) => void,
    users: UserMetaData[] | UserMetaData[] | undefined
    data: {
        fullname: string;
        username: string;
        bio: string;
        location: string;
        website: string;
        phone: string;
        avatar_url: string;
        year: string;
        month: string;
        day: string;
    }
}



export default function AccountInformation(props: AccountInformationProps) {
    const { handleChange, handleDob, handleMaskChange, searchUsers, users, data } = props

    const changeDOB = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleDob(e);

    }

    const itemTemplate = (user: UserMetaData) => {
        const src = user?.avatar_url ? user.avatar_url : ''

        return (
            <div className="flex flex-rows gap-2 items-center">
                <div >
                    <img className='rounded-full w-12 h-12' alt={user.fullname} src={src} />
                </div>
                <div className='flex flex-col '>
                    <span className="font-black text-white">
                        {user.fullname}
                    </span>
                    <small className='text-white' style={{ fontSize: '.75rem' }}>@{user.username}</small>
                </div>
                
            </div>
        );
    }

    return (
        <div>
            <form className='flex flex-col gap-2'>
                <h1 className="text-3xl font-bold text-center">Account Information</h1>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="fullname">Full Name:</label>
                    <div className={`${variables['inputGroup']}`}>
                        <AlternateEmail className={`${variables['iconStart']}`} />
                        <InputText defaultValue={data.fullname} onChange={handleChange} className={`${variables['input']}`} placeholder='Enter your full name' id="fullname" name="fullname" type="text" required />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="username">Username:</label>
                    <div className={`${variables['inputGroup']}`}>
                        <Person className={`${variables['iconStart']}`} />
                        <InputText defaultValue={data.username} onChange={handleChange} className={`${variables['input']}`} placeholder='Enter a username' id="username" name="username" type="text" required />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="phoneNumber">Phone Number:</label>
                    <div className={`${variables['inputGroup']}`}>
                        <Phone className={`${variables['iconStart']}`} />
                        {/* <InputText onChange={handleChange} className={`${variables['input']}`} placeholder='Enter your email' id="email" name="email" type="email" required /> */}
                        <InputMask onChange={handleMaskChange} className={`${variables['input']}`} name='phone' id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>
                    </div>
                </div>
                <div>
                    <Dob data={{day: data.day, month: data.month, year: data.year}} dobChange={changeDOB} />
                </div>
                <hr className='my-3'/>
                <div className=''>
                    <p className="text-md text-gray-400">The below fields are optional and you can sign up without filling them in.</p>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="bio">Bio:</label>
                    <div className={`${variables['inputGroup']}`}>
                        <Mention id="bio" name="bio" defaultValue={data.bio} maxLength={120} className={`${variables['mention']} bg-black w-full`} onChange={handleChange} suggestions={users} onSearch={searchUsers} field="username" 
                            placeholder="Enter @ to mention people" rows={3} itemTemplate={itemTemplate} />
                    </div>
                </div>
                
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="location">Location:</label>
                
                    <div className={`${variables['inputGroup']}`}>
                        <LocationOn className={`${variables['iconStart']}`} />
                        <InputText onChange={handleChange} className={`${variables['input']}`} placeholder='Enter your location' id="email" name="email" type="email" required />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xl" htmlFor="website">Website:</label>

                    <div className={`${variables['inputGroup']}`}>
                        <Link className={`${variables['iconStart']}`} />
                        <InputText defaultValue={data.website} onChange={handleChange} className={`${variables['input']}`} placeholder='Enter a website' id="website" name="website" type="website" required />
                    </div>
                </div>
                
                
            </form>
        </div>
    )
}