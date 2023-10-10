import React, { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { muiStyles } from './styles';
import { useTranslation } from 'react-i18next';

interface iProps {
  sx?: any;
  size?: number;
}

const Loading: FC<iProps> = ({ sx, size = 50 }) => {
  const { t } = useTranslation();

  return (
    <Box component="div" sx={{...muiStyles.root, ...sx}}>
      <CircularProgress size={size}/>
      <Typography variant="h1" sx={muiStyles.title}> {t('common.loading')} </Typography>
      {/* <Typography variant="h2" sx={muiStyles.description}> {M.get('common.loadingDescription')} </Typography> */}
    </Box>
  );
}

export default Loading;