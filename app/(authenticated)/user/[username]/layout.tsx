import NavLink from "@/components/NavLink";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
// import "./globals.css";



const inter = Inter({ subsets: ["latin"] });


export default function Layout({
  children,
  activity,
}: Readonly<{
  children: React.ReactNode;
  activity: React.ReactNode;
}>) {

  return (
    <div> 
      <div className={`h-full`}>
        <div className=" h-full">{children}</div>
      </div>
      <div>
        <ul className="flex flex-row justify-center">
          <NavLink params={{href: '/', label: 'Home', activePathName: '/', classnames:"text-center w-32"}}/>
          <NavLink params={{href: '/', label: 'Home', activePathName: '/'}}/>
        </ul>
      </div>
      <div>
        {activity}
      </div>
    </div>
  );
}
