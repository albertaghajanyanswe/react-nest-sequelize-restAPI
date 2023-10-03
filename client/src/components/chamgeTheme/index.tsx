import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CustomThemeContext } from "../../configs/themes/CustomThemeProvider";

function ChangeTheme() {
  const { t } = useTranslation();
  const theme = useTheme();

  const { setTheme } = useContext(CustomThemeContext);


  const handleChangeTheme = (themeVal: 'light' | 'dark') => {
    setTheme(themeVal);
  }

  return (
    <div>
      <h1>{t('pages.changeTheme')}</h1>
      <button onClick={() => handleChangeTheme('light')}>{t('pages.light')}</button>
      <button onClick={() => handleChangeTheme('dark')}>{t('pages.dark')}</button>
      <Box sx={{ backgroundColor: theme.palette.primary.main }}>AAAA</Box>
    </div>
  );
}

export default ChangeTheme;

