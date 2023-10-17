import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from "./styles";
import { DEFAULT_VALUES_LOGIN_GUEST } from '../../configs/shared/defaultValues';
import { routes } from '../../configs';
import { iLoginGuest } from '../../configs/shared/types';
import { lsConstants } from '../../constants/constants';
import { getMessage } from "../../helpers/helper";
import { usersAPI } from '../../services/rtk/UsersApi';
import SystemMessage from '../../components/systemMessage';
import LoginForm from './components/LoginForm';


const LoginGuestPage = () => {

  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const styles = stylesWithTheme(theme);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES_LOGIN_GUEST,
    mode: 'onChange'
  });

  const { handleSubmit } = methods;

  const [postLoginGuest] = usersAPI.usePostLoginGuestMutation();

  const handleSubmitLogin = useCallback(() => handleSubmit(async (data) => {
    try {
      const res = await postLoginGuest(data as iLoginGuest).unwrap();
      localStorage.setItem(lsConstants.CURRENT_USER, JSON.stringify(res));
      // toast.success(getMessage('', 'success'));
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
      navigate(routes.home.path)
    } catch (error: any) {
      // toast.error('error');
      SystemMessage(enqueueSnackbar, getMessage(error?.response?.data || error.message || error?.data), { variant: 'error', theme });
    }
    return true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <Box sx={styles.container} p={4}>
      <FormProvider {...methods}>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">{t('login.title')}</Typography>
            </Grid>
            <LoginForm handleSubmit={handleSubmitLogin} />
            <Grid item xs={12}>
              <Typography component={Link} sx={styles.link} to={routes.login.path}> {t('login.signIn')}</Typography>
            </Grid>
            <Grid item xs={12}>
              {t('login.createAccount')}
              <Typography component={Link} sx={styles.link} to={routes.registration.path}> {t('login.register')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component={Link} sx={styles.link} to={routes.registrationGuest.path}> {t('login.registerGuest')}</Typography>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoginGuestPage;