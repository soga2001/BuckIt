// 'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import variables from '@/styles/variables.module.scss'

export default function NavLink({params}: {params: {href: string, label: string, activePathName: string, activeIcon?: React.ReactNode, icon: React.ReactNode, classnames?: string}}) {
    const pathname = usePathname()
    const { href, label, activePathName, activeIcon, icon, classnames } = params

    // console.log(pathname.match(activePathName))

    const active = pathname === activePathName ? variables['active'] : ''

    return (
        <Link
            className={`${variables['nav-link']} ${classnames} ${pathname === activePathName ? variables['active'] : ''}`}
            href={href}
          >
            {active ? activeIcon : icon}
            {label}
          </Link>
    )
}