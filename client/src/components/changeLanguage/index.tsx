// ExampleComponent.tsx
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

function ChangeLanguage() {
  const { t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const isEN = i18n.language === 'en';
  const isRU = i18n.language === 'ru';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <Typography sx={{ minWidth: '224px', mr: 2, textAlign: 'start', fontWeight: 500 }}>{t('common.changeLang')}</Typography>

      <ButtonGroup
        disableElevation
        variant="outlined"
      >
        <Button sx={{ fontWeight: 400, backgroundColor: isEN ? 'primary.main' : 'white', color: isEN ? 'white' : 'inherit', '&:hover': { color: 'white', backgroundColor: 'primary.btnMainHover' } }} onClick={() => changeLanguage('en')}>{t('lang.en')}</Button>
        <Button sx={{ fontWeight: 400, backgroundColor: isRU ? 'primary.main' : 'white', color: isRU ? 'white' : 'inherit', '&:hover': { color: 'white', backgroundColor: 'primary.btnMainHover' } }} onClick={() => changeLanguage('ru')}>{t('lang.ru')}</Button>
      </ButtonGroup>
    </Box>
  );
}

export default ChangeLanguage;