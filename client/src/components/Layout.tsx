import React, { FC } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './sidebar/index';

import NotFound from './NotFound';
import { useLocation } from 'react-router-dom';
import { routesAccess } from '../configs/roles';
import { getCurrentUser } from '../services/lsService';
import { variables } from '../configs';
import CustomDrawerHeader from './sidebar/CustomDrawerHeader';
import Loading from './loading';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentUser = getCurrentUser()?.user || {};

  const path = location.pathname.split('/')[1] as string;
  const allowed = !routesAccess[path as keyof typeof routesAccess] ||
    routesAccess[path as keyof typeof routesAccess]?.access?.includes(currentUser?.roles[0].value);

  return currentUser ? (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { xs: `calc(100% - ${variables.drawerWidth})` } }}
      >
        <CustomDrawerHeader />
        {allowed ? children : <NotFound />}
      </Box>
    </Box>
  ) : (<Loading />);
};

export default Layout;