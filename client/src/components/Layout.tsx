import React, { FC } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar, { DrawerHeader } from './sidebar/index';

import NotFound from './NotFound';
import { useLocation } from 'react-router-dom';
import { routesAccess } from '../configs/roles';
import { getCurrentUser } from '../services/lsService';
import { variables } from '../configs';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentUser = getCurrentUser()?.user || {};

  const path = location.pathname.split('/')[1] as string;
  // todo
  // const allowed = !routesAccess[path as keyof typeof routesAccess] ||
  //   routesAccess[path as keyof typeof routesAccess]?.access?.includes(currentUser?.roles[0]);
  const allowed = true;
  return currentUser ? (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <CssBaseline />
      <Sidebar />
      {allowed ? <Box
        component="main"
        sx={{ flexGrow: 1, width: { xs: `calc(100% - ${variables.drawerWidth})` } }}
      >
        <DrawerHeader />
        {children}
      </Box> : <NotFound />}
    </Box>
  ) : (<>Loading ...</>);
};

export default Layout;