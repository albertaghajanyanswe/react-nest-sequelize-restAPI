import React, { useMemo } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../services/lsService';
import { stringAvatar } from '../../helpers/helper';
import { links } from './config';
import { routes, variables } from '../../configs';
import { UserRole } from '../../configs/shared/types';
import { sidebarSlice } from '../../store/reducers/SidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reactQuery/redux';
import CustomMenuItem from '../customMenuItem';
import CustomDrawerHeader from './CustomDrawerHeader';
import CustomDrawer from './CustomDrawer';
import CustomAppBar from './CustomAppBar';
import fileService from '../../services/fileService';
import { usersAPI } from '../../services/rtk/UsersApi';
import { stylesWithTheme } from './styles';

export const ArrowLeftBtn = ({ color, ...props }: { color?: any, props?: any }) => {
  const theme = useTheme();
  return (
    <svg {...props} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
      <path d="M21.6663 16.9997H12.333M12.333 16.9997L16.9997 21.6663M12.333 16.9997L16.9997 12.333" stroke={color || (theme as Theme)?.palette?.primary?.main} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="1" width="32" height="32" rx="16" stroke={color || (theme as Theme)?.palette?.primary?.borderColor1} strokeWidth="1.25" />
    </svg>
  )
};


function SideBar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);

  const [open, setOpen] = React.useState(true);

  const { setActiveLink } = sidebarSlice.actions;
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { activeLink } = useAppSelector(state => state.sidebarReducer);
  // console.log('activeLink = ', activeLink)

  const navigate = useNavigate();
  const location = useLocation();
  const isLinkActive = (link: string) => location.pathname === link;

  const openSideBar = () => {
    setOpen(true);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const handleClick = (link: string) => {
    dispatch(setActiveLink(link))
    navigate(link);
  }

  const handleClickLogo = () => {
    console.log("Clicked Logo");
  }

  const {data: currentUser} = usersAPI.useGetCurrentUserQuery({});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerList = useMemo(() => (
    <Box component="div" sx={{ backgroundColor: 'primary.main', mt: 5 }}>
      <List sx={{ background: 'inherit', p: 0 }}>
        {links.map((item) => item.type === 'divider' ? (
          <Box key={item.id} sx={{ p: '8px 12px' }}><Divider sx={muiStyles.divider} /></Box>
        ) : (
          // todo
          (item?.roles?.includes(currentUser?.roles[0].value as UserRole)) &&
          <ListItem sx={{ ...muiStyles.listItem, ...(isLinkActive(item.link) && muiStyles.listItemActive), ...(item?.disabled && { pointerEvents: 'none' }) }} key={item.id} disablePadding onClick={() => handleClick(item.link)} disabled={item?.disabled}>
            <ListItemButton
              disableRipple
              sx={{
                ...muiStyles.listItemBtn,
                ...(isLinkActive(item.link) && muiStyles.listItemBtnActive),
                justifyContent: open ? 'initial' : 'center',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : '0',
                  ...(isLinkActive(item.link) && item.id !== 'departments' && muiStyles.activeLinkIcon),
                  justifyContent: 'center',
                }}
              >
                <item.icon />
              </ListItemIcon>
              {open && <ListItemText
                primary={t(item.title)}
                sx={{
                  ...muiStyles.linkText,
                  ...(isLinkActive(item.link) && muiStyles.activeLinkTitle),
                  opacity: open ? 1 : 0
                }}
              />}
            </ListItemButton>
          </ListItem>
        )
        )}
      </List>
    </Box>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [links, handleClick, i18n.languages]);

  const handleLogout = () => {
    logOut();
    navigate(routes.login.path)
  }

  const isGuest = currentUser?.roles[0]?.value === 'GUEST';

  const appBarContent = useMemo(() => {
    return (
      <Toolbar sx={{ backgroundColor: 'white', color: theme.palette.primary.main }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openSideBar}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" />
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {isGuest ? (
                <Box sx={{ mr: 1 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500 }} noWrap>GUEST</Typography>
                  <Typography sx={{ fontSize: '12px' }} noWrap>{currentUser?.nickName}</Typography>
                </Box>
              ) : (
                <Box sx={{ mr: 1 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500 }} noWrap>{currentUser?.firstName} {currentUser?.lastName}</Typography>
                  <Typography sx={{ fontSize: '12px' }} noWrap>{currentUser?.email}</Typography>
                </Box>
              )}
            </Box>
            <Tooltip title={currentUser?.email} >
              <IconButton name='menu' onClick={handleClickMenu}>
                <Avatar src={fileService.getFileUrl(currentUser?.image)}>{currentUser?.firstName.charAt(0) || 'G'}{currentUser?.lastName.charAt(0) || 'G'}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              elevation={0}
              anchorEl={anchorEl}
              keepMounted
              open={menuOpened}
              onClose={handleClose}
              PaperProps={{ sx: { ...muiStyles.paper, maxHeight: variables.menuItemHeightValue * 4 } }}
            >
              <CustomMenuItem text={t('pages.logout')} onClick={handleLogout}>
                <LogoutIcon style={{ fontSize: '14px', color: theme.palette.primary.textColor1 }} />
              </CustomMenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, handleLogout, menuOpened, open]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={open}>
        {appBarContent}
      </CustomAppBar>
      <CustomDrawer open={open}>
        <CustomDrawerHeader>
          <IconButton onClick={closeSideBar}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ArrowLeftBtn />}
          </IconButton>
        </CustomDrawerHeader>
        <Divider />

        <Box>
          <Box onClick={handleClickLogo} sx={{ p: open ? '24px 46px' : '24px 6px', alignSelf: 'center', cursor: 'pointer', textAlign: 'center' }} >
            {/* <SidebarLogo /> */}
          </Box>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="div">
              <Avatar {...stringAvatar(`${currentUser?.firstName || 'Guest'} ${currentUser?.lastName || 'Guest'}`, open ? 72 : 36, open ? 72 : 36)} src={fileService.getFileUrl(currentUser?.image)} />
            </Box>
            {open && <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              <Typography sx={muiStyles.welcomeUser}>{t('sidebar.welcome')}</Typography>
              <Typography sx={muiStyles.userName}>{currentUser?.firstName} {currentUser?.lastName}</Typography>
            </Box>}
          </Box>
          {drawerList}
        </Box>
      </CustomDrawer>
    </Box>
  );
}

export default SideBar;
