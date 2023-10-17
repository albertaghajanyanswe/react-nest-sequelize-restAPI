import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { DEFAULT_VALUES_LOGIN } from '../../configs/shared/defaultValues';
import { usersAPI } from '../../services/rtk/UsersApi';
import { getMessage } from "../../helpers/helper";
import { lsConstants } from '../../constants/constants';
import { routes } from '../../configs';
import { iLogin } from '../../configs/shared/types';
import SystemMessage from '../../components/systemMessage';
import LoginForm from './components/LoginForm';
import { stylesWithTheme } from "./styles";

const LoginPage = () => {

  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const styles = stylesWithTheme(theme);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES_LOGIN,
    mode: 'onChange'
  });

  const { handleSubmit } = methods;

  const [postLogin] = usersAPI.usePostLoginMutation();

  const handleSubmitLogin = useCallback(() => handleSubmit(async (data) => {
    try {
      const res = await postLogin(data as iLogin).unwrap();
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
    // <Box sx={styles.layout}>
      <Box sx={styles.container} p={4}>
        <FormProvider {...methods}>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="h5">{t('login.title')}</Typography>
              </Grid>
              <LoginForm handleSubmit={handleSubmitLogin} />
              <Grid item xs={12}>
                <Typography component={Link} sx={styles.link} to={routes.loginGuest.path}> {t('login.signInGuest')}</Typography>
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
    // </Box>
  );
};

export default LoginPage;