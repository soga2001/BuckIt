'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavLink from '../NavLink';
import { Avatar } from 'primereact/avatar';
import { Cottage, CottageOutlined, Explore, ExploreOutlined } from '@mui/icons-material';

const drawerWidth = 320;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const desktopDrawer = (
    <div className='h-full w-full' style={{display: 'grid', gridTemplateRows: 'auto 1fr auto'}}>
        {/* <div>
            <Toolbar>
                <Typography variant="h5" noWrap component="div">
                Buck<span className='font-black'>IT</span>
            </Typography>
            </Toolbar>
        </div> */}
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
                <span className="font-semibold text-2xl text-primary">Buck<span className='font-bold'>IT</span></span>
            </span>
            <span>
                {/* <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button> */}
            </span>
        </div>
        <List>
            <NavLink params={{href: '/', label: 'Home', activePathName: '/', activeIcon: <Cottage className="text-2xl"/>, icon: <CottageOutlined className="text-2xl" />}} />
            <NavLink params={{href: '/discover', label: 'Discover', activePathName: '/discover', activeIcon: <Explore className="text-2xl"/>, icon: <ExploreOutlined className="text-2xl" />}} />
        </List>
        <div className="flex flex-row w-full justify-center items-center gap-2 p-2">
            <Avatar size='large' image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            <span className="font-bold text-xl">Amy Elsner</span>
        </div>
    </div>
  );

  const mobileDrawer = (
    <div className='h-full w-full' style={{display: 'grid', gridTemplateRows: '1fr auto'}}>
        {/* <div>
            <Toolbar>
                <Typography variant="h5" noWrap component="div">
                Buck<span className='font-black'>IT</span>
            </Typography>
            </Toolbar>
        </div> */}
        <List>
            <NavLink params={{href: '/', label: 'Home', activePathName: '/', activeIcon: <Cottage className="text-2xl"/>, icon: <CottageOutlined className="text-2xl" />}} />
            <NavLink params={{href: '/discover', label: 'Discover', activePathName: '/discover', activeIcon: <Explore className="text-2xl"/>, icon: <ExploreOutlined className="text-2xl" />}} />
        </List>
        <div className="flex flex-row w-full justify-center items-center gap-2 p-2">
            <Avatar size='large' image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            <span className="font-bold text-xl">Amy Elsner</span>
        </div>
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{display: {md: 'none'}}} className='bg-[rgb(20,20,20)]'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            {/* <MenuIcon /> */}
            <Avatar size='normal' image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(20,20,20)', color: 'white'  },
          }}
        >
          {mobileDrawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(20,20,20)', color: 'white' },
          }}
          open
        >
          {desktopDrawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {/* <Toolbar /> */}
      </Box>
    </Box>
  );
}
