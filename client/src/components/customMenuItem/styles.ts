import { Theme } from "@mui/system";

export const stylesWithTheme = (theme: Theme) => ({
  menuItem: {
    color: 'primary.grey4',
    maxHeight: 'inherit',
    fontWeight: 400
  },
  listItem: {
    display: 'flex',
    alignItems: 'center'
  },
  listItemIcon: {
    minWidth: '40px'
  },
  linkActive: {
    color: theme.palette.primary.main,
  },
  listItemText: {
    '& > span:first-child': {
      fontWeight: '400',
      fontSize: '14px'
    }
  }
})