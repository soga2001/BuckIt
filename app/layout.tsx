import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import Link from 'next/link'


// import './styles/global.module.scss'

// import "primereact/resources/themes/lara-light-cyan/theme.css";


import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Navbar from '@/components/navbar/Navbar';

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
