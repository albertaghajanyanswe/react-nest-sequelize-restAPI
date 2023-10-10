
import { DefaultTheme, Theme } from "@mui/system";

const muiStylesWithTheme = (theme?: Theme | DefaultTheme | undefined) => ({
  smallBtn: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 500,
    color: 'primary.textColor7'
  },
});
export { muiStylesWithTheme };
