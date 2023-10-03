import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import { getMessage } from "../../helpers/helper";
import { stylesWithTheme } from "./styles";
import { routes } from '../../configs';
import { useTheme } from '@mui/system';
import { FormProvider, useForm } from 'react-hook-form';
import SystemMessage from '../../components/systemMessage';
import { useSnackbar } from 'notistack';
import RegistrationForm from './components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import { usersAPI } from '../../services/rtk/UsersApi';
import { iRegistrationGuest } from '../../configs/shared/types';
import { DEFAULT_VALUES_REGISTRATION } from '../../configs/shared/defaultValues';
import CustomButton from '../../components/customButton';
import {ReactComponent as ArrowLeft} from '../../assets/arrow-left.svg';


const RegistrationGuestPage = () => {

  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const styles = stylesWithTheme(theme);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES_REGISTRATION,
    mode: 'onChange'
  });

  const { handleSubmit } = methods;

  const [registerGuest] = usersAPI.useRegisterGuestMutation();

  const handleSubmitLogin = useCallback(() => handleSubmit(async (data) => {
    try {
      await registerGuest(data as iRegistrationGuest).unwrap();
      // toast.success(getMessage('', 'success'));
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
      navigate(routes.login.path)
    } catch (error: any) {
      console.log('error = ', error)
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
              <Typography color="primary" variant="h5">{t('register.title')}</Typography>
            </Grid>
            <RegistrationForm handleSubmit={handleSubmitLogin} />
            <Grid item xs={12}>
              <CustomButton
                href={routes.login.path}
                label={t('login.title')}
                btnType='secondary'
                sx={{ width: '100%', p: '8px 12px', fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}
                startIcon={<ArrowLeft />}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default RegistrationGuestPage;