import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
// import "./globals.css";



const inter = Inter({ subsets: ["latin"] });


export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <div className={`h-screen `}>

        <div className=" h-full min-[700px]:col-span-2 min-[1000px]:col-span-1">{children}</div>
      </div>
    </div>
  );
}
