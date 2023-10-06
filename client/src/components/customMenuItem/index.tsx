import React from 'react';
import { useTheme } from '@mui/system';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { stylesWithTheme } from './styles';


interface IProps {
  text: string,
  children?: any,
  onClick?: () => void,
  disableItem?: boolean,
  isLinkActive?: boolean
};

const CustomMenuItem = (props: IProps) => {
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);

  const {text, children, onClick, disableItem, isLinkActive} = props;

  // Used ref to solve <Function components cannot be given refs> warning
  return (
    <MenuItem disabled={disableItem} onClick={onClick} sx={muiStyles.menuItem}>
      <Box sx={muiStyles.listItem}>
        {children &&
          <ListItemIcon sx={{...muiStyles.listItemIcon, ...(isLinkActive ? muiStyles.linkActive : {}) }}>
            {children}
          </ListItemIcon>
        }
        <ListItemText sx={{...muiStyles.listItemText, ...(isLinkActive ? muiStyles.linkActive : {}) }} primary={text} />
      </Box>
    </MenuItem>
  );
}

export default CustomMenuItem;