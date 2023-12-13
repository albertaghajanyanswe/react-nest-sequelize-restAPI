import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../../components/customButton';
import StepHOC from '../../../components/form/FormHOC';
import { isEmail, requiredErrMsg } from '../../../helpers/formHelper';
import { iLogin } from '../../../configs/shared/types';


interface iProps {
  handleSubmit: () => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FormHOC = StepHOC<iLogin & { nickName: string }>()(
  ["email", "password", "nickName"]
);

const Form = FormHOC.Form

const LoginForm = FormHOC<iProps>(({ handleSubmit }) => {
  const { t } = useTranslation();
  const validateEmail = (value: string) => isEmail(value) ? true : t('errors.incorrectEmail');
  const location = useLocation();
  const asGuest = location.pathname.includes('/guest');
  return (
    <>
      <Grid item xs={12} sm={12}>
        {asGuest ?
          <Form.TextField
            rules={{ required: requiredErrMsg(t('login.nickName')) }}
            name="nickName"
            placeholder={t('login.nickName')}
            label={t('login.nickName')}
            sxContainer={{ mt: 0 }}
            title={t('login.nickName')}
            helperTooltip={t('login.nickName')}
            borderRadius={8}
          /> :
          <Form.TextField
            rules={{ required: requiredErrMsg(t('login.email')), validate: validateEmail }}
            name="email"
            placeholder={t('login.email')}
            label={t('login.email')}
            sxContainer={{ mt: 0 }}
            title={t('login.email')}
            helperTooltip={t('login.email')}
            borderRadius={8}
          />
        }
      </Grid>
      <Grid item xs={12} sm={12}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('login.password')) }}
          name="password"
          placeholder={t('login.password')}
          label={t('login.password')}
          sxContainer={{ mt: 0 }}
          title={t('login.password')}
          helperTooltip={t('login.password')}
          borderRadius={8}
          withEyeIcon
          eyeIconSize={16}
          type='password'
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
          <CustomButton
            label={t('actions.submit')}
            sx={{ width: '100%', p: '8px 12px', fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}
            onClick={handleSubmit()}
            variant='outlined'
            name='login-submit'
          />
        </Box>
      </Grid>
    </>
  );
});

export default LoginForm;
