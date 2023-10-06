import * as React from 'react';
import { useTheme, Theme, CSSObject } from '@mui/material/styles';
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
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import { routes } from '../../configs';
// import { routes } from '../../configs';

const drawerWidth = 240;
const ITEM_HEIGHT = 40;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box component='div' sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    }}>
      {children}
    </Box>
  )
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  children?: React.ReactNode
}

const CustomAppBar = ({ open, children }: AppBarProps) => {
  const theme = useTheme();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      {children}
    </MuiAppBar>
  );
};

interface IDrawerProps extends DrawerProps {
  open?: boolean;
  children?: React.ReactNode
}

const CustomDrawer = ({ open, children }: IDrawerProps) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
        '& > .MuiPaper-root': {
          backgroundColor: theme.palette.primary.main
        }
      }}
    >
      {children}
    </MuiDrawer>
  );
};

export default function SideBar() {
  const { t } = useTranslation();
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);

  const [open, setOpen] = React.useState(true);

  const { clickedSideBarLink } = sidebarSlice.actions;
  const dispatch = useAppDispatch();
  const { activeLink } = useAppSelector(state => state.sidebarReducer);

  const navigate = useNavigate();
  const location = useLocation();
  const isLinkActive = (link: string) => location.pathname === link;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (link: string) => {
    dispatch(clickedSideBarLink(link))
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

  const drawerList = (
    <Box component="div" sx={{ backgroundColor: 'primary.main', mt: 5 }}>
      <List sx={{ background: 'inherit', p: 0 }}>
        {links.map((item) => item.type === 'divider' ? (
          <Box key={item.id} sx={{ p: '8px 12px' }}><Divider sx={muiStyles.divider} /></Box>
        ) : (
          // item?.roles?.includes(currentUser?.__typename as UserType) (
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
  );

  const handleLogout = () => {
    logOut();
    navigate(routes.login.path)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: 'white', color: theme.palette.primary.main }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
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
                <Typography sx={{ fontSize: '16px', fontWeight: 500 }} noWrap>{currentUser?.firstName} {currentUser?.lastName}</Typography>
                <Typography sx={{ fontSize: '12px' }} noWrap>{currentUser?.email}</Typography>
              </Box>
              <Tooltip title={currentUser?.email} >
                <IconButton name='menu' onClick={handleClickMenu}>
                  <Avatar src={currentUser.image}>{currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}</Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                elevation={0}
                anchorEl={anchorEl}
                keepMounted
                open={menuOpened}
                onClose={handleClose}
                PaperProps={{ sx: { ...muiStyles.paper, maxHeight: ITEM_HEIGHT * 4 } }}
              >
                <CustomMenuItem text={t('pages.logout')} onClick={handleLogout}>
                  <LogoutIcon style={{ fontSize: '14px', color: theme.palette.primary.grey4 }} />
                </CustomMenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ArrowLeftBtn />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Box>
          <Box onClick={handleClickLogo} sx={{ p: open ? '24px 46px' : '24px 6px', alignSelf: 'center', cursor: 'pointer', textAlign: 'center' }} >
            {/* <SidebarLogo /> */}
          </Box>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="div">
              {/* <Avatar {...stringAvatar(`${getPersonalInfo()?.firstName} ${getPersonalInfo()?.lastName}`, 72, 72)} src={getFileUrl(getPersonalInfo()?.avatarImage)} /> */}
              <Avatar {...stringAvatar(`${currentUser?.firstName} ${currentUser?.lastName}`, open ? 72 : 36, open ? 72 : 36)} src={currentUser?.image} />
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
