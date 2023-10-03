// todo: add and using all variables from theme
import { Theme } from "@mui/system";

const stylesWithTheme = (theme: Theme) => ({
  container: {
    margin: 'auto',
    marginTop: '7%',
    width: 'auto',
    borderRadius: '4px',
    textAlign: 'center',
    [theme.breakpoints.up(450)]: {
      width: 'auto',
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: '1px 2px 10px 0px #3a4e9975',
    },
    [theme.breakpoints.up(550)]: {
      width: 480,
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: '1px 2px 10px 0px #3a4e9975',
    },
    [theme.breakpoints.down(550)]: {
      boxShadow: 'none'
    },
  },
  description: {
    fontWeight: 400,
    fontSize: 16,
    marginTop: '20px',
  },
  link: {
    fontWeight: '600',
    textDecoration: 'unset',
    alignSelf: 'center',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.blue4,
    }
  },
  submit: {
    height: 50,
  },
});

export {stylesWithTheme};