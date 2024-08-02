'use client'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import Link from "next/link";
import variables from '@/styles/variables.module.scss'

import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';

export default function NavLink({params}: {params: {href: string, label: string, activePathName: string, activeIcon?: React.ReactNode, icon?: React.ReactNode, classnames?: string}}) {
    const pathname = usePathname()
    const { href, label, activePathName, activeIcon, icon, classnames } = params

    // console.log(pathname.match(activePathName))

    // const active = pathname === activePathName ? variables['active'] : ''
    const segment = useSelectedLayoutSegment();
    console.log(segment)

    return (
      <Link href={href} className={`${variables['nav-link']} ${classnames} ${pathname === activePathName ? variables['active'] : ''}`}>
        <ListItem className={`${variables['nav-item']}`} disablePadding>
          <ListItemButton className={`${variables['nav-button']}`}>
            <ListItemIcon className={`${variables['nav-icon']}`}>
              {pathname === activePathName ? activeIcon : icon}
            </ListItemIcon>
              {label}
          </ListItemButton>
        </ListItem>
      </Link>
      
    )
}