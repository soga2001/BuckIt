'use client'

import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';

import { 
    Cottage, CottageOutlined,
    Login, LoginOutlined,
    Explore, ExploreOutlined
} from '@mui/icons-material';

import { authReducer, authSlice } from '@/lib/features/authSlice';


import NavLink from '../NavLink';
import { useSelector } from 'react-redux';


export default function Navbar() {

    // get state from authSlice
//   const authState = useSelector((state: any) => state.auth.authState)

    // const [auth, setAuth] = React.useState(authState);   


    const startContent = (
        <React.Fragment>
            {/* <span>
                Buck<span className='font-black'>IT</span>
            </span> */}
                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                    <span className="inline-flex align-items-center gap-2">
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="..."
                                fill="var(--primary-color)"
                            />
                            <path
                                d="..."
                                fill="var(--text-color)"
                            />
                        </svg>
                        <span className="font-semibold text-2xl text-primary">Your Logo</span>
                    </span>
                    <span>
                        {/* <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button> */}
                    </span>
                </div>
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex flex-cols  align-items-center gap-3">
            <NavLink params={{href: '/', label: 'Home', activePathName: '/', activeIcon: <Cottage className="text-2xl"/>, icon: <CottageOutlined className="text-2xl" />}} />
            <NavLink params={{href: '/discover', label: 'Discover', activePathName: '/discover', activeIcon: <Explore className="text-2xl"/>, icon: <ExploreOutlined className="text-2xl" />}} />
        </div>
    );

    const endContent = (
        <React.Fragment>
            {/* {auth ? <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-bluegray-50">Amy Elsner</span>
            </div> : <NavLink params={{href: '/login', label: 'Login', activePathName: '/login', activeIcon: <Login className='text-2xl' />, icon: <LoginOutlined className="text-2xl" />}} />} */}
            <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-bluegray-50">Amy Elsner</span>
            </div>
        </React.Fragment>
    );

    return (
        <div className='sticky top-0 z-50 backdrop-blur-lg bg-black/30'>
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-transparent py-2 px-4 rounded-none"/>
        </div>
    );
}
        