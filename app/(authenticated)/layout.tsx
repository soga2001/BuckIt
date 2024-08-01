import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
import Link from 'next/link'

import { useSelector } from "react-redux";
import { authReducer, authSlice } from '@/lib/features/authSlice';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';


import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Navbar from '@/components/navbar/Navbar';

import { createClient } from '@/utils/supabase/supabaseServer'
import { UserMetaData } from "../assets/interface/users";
import { use } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuckIT",
  description: "A bucket list social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const verifyAuth = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    if (!user) {
      return false
    }

    authSlice.actions.setAuthState(true)
    const tempUser = user as unknown
    authSlice.actions.setUser(tempUser as UserMetaData)
    return true
  }

  verifyAuth()

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <Navbar />
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
