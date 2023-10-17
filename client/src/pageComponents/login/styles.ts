import { Theme } from "@mui/system";
// import loginBg from '../../assets/login-1.jpg';

const stylesWithTheme = (theme: Theme) => ({
  layout: {
    width: '100%',
    display: 'flex',
    // backgroundImage: `url(${loginBg})`
  },
  container: {
    margin: 'auto',
    // marginTop: '7%',
    width: 'auto',
    borderRadius: '4px',
    textAlign: 'center',
    [theme.breakpoints.up(350)]: {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: '1px 2px 10px 0px #3a4e9975',
    },
    [theme.breakpoints.down(450)]: {
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
      color: theme.palette.primary.btnMainHover,
    }
  },
  submit: {
    height: 50,
  },
});

export {stylesWithTheme};