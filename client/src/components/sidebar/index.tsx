import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
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
import { stylesWithTheme } from './styles';
import { links } from './config';
import { getCurrentUser, logOut } from '../../services/lsService';
import { stringAvatar } from '../../helpers/helper';
import { ReactComponent as ArrowLeftBtn } from '../../assets/arrow-left-btn.svg';
// import { ReactComponent as LogoutSvg } from '../../assets/16/logout.svg';
// import { ReactComponent as SidebarLogo } from '../../assets/sidebar/sidebar-logo.svg';
import { sidebarSlice } from '../../store/reducers/SidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reactQuery/redux';
import CustomMenuItem from '../customMenuItem';
import { routes, variables } from '../../configs';
import CustomDrawerHeader from './CustomDrawerHeader';
import CustomDrawer from './CustomDrawer';
import CustomAppBar from './CustomAppBar';
// import { routes } from '../../configs';

function SideBar() {
  const { t } = useTranslation();
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);

  const [open, setOpen] = React.useState(true);

  const { setActiveLink } = sidebarSlice.actions;
  const dispatch = useAppDispatch();
  const { activeLink } = useAppSelector(state => state.sidebarReducer);

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

  console.log('activeLink = ', activeLink)

  const handleClickLogo = () => {
    console.log("Clicked Logo");
  }

  const currentUser = getCurrentUser()?.user || {};

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
          (item?.roles?.includes(currentUser?.roles[0].value) || true) &&
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
                  primary={item.title}
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
  ), [links, handleClick]);

  const handleLogout = () => {
    logOut();
    navigate(routes.login.path)
  }

  console.log('currentUser ', currentUser)
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
                <Avatar src={currentUser.image}>{currentUser.firstName.charAt(0) || 'G'}{currentUser.lastName.charAt(0) || 'G'}</Avatar>
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
              <Avatar {...stringAvatar(`${currentUser?.firstName || 'Guest'} ${currentUser?.lastName || 'Guest'}`, open ? 72 : 36, open ? 72 : 36)} src={currentUser?.image} />
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
