import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { matchIsValidTel } from 'mui-tel-input';
import { useLocation } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { isEmail, requiredErrMsg } from '../../../helpers/formHelper';
import { iRegistration } from '../../../configs/shared/types';
import CustomButton from '../../../components/customButton';
import StepHOC from '../../../components/FormHOC';


interface iProps {
  handleSubmit: () => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FormHOC = StepHOC<iRegistration>()(
  ["firstName", "lastName", "email", "password", "nickName", "phone", "switchGuestAccount"]
);

const Form = FormHOC.Form

const RegistrationForm = FormHOC<iProps>(({ handleSubmit }) => {
  const { t } = useTranslation();
  const validateEmail = (value: string) => isEmail(value) ? true : t('errors.incorrectEmail');
  // const validatePhone = (value: string) => matchIsValidTel(value) ? true : t('errors.invalidPhone');
  const location = useLocation();
  const asGuest = location.pathname.includes('/guest');
  const { watch } = useFormContext();
  const switchGuestAccountValue = watch('switchGuestAccount');

  return (
    <>
      {!asGuest && <Grid item xs={12} sm={12}>
        <Form.SwitchField
          rules={{}}
          name="switchGuestAccount"
          label={t('register.switchGuestAccount')}
        />
      </Grid>}
      {!asGuest && <Grid item xs={12} sm={6}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.firstName')) }}
          name="firstName"
          placeholder={t('register.firstName')}
          label={t('register.firstName')}
          sxContainer={{ mt: 0 }}
          title={t('register.firstName')}
          helperTooltip={t('register.firstName')}
          borderRadius={8}
        />
      </Grid>}
      {!asGuest && <Grid item xs={12} sm={6}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.lastName')) }}
          name="lastName"
          placeholder={t('register.lastName')}
          label={t('register.lastName')}
          sxContainer={{ mt: 0 }}
          title={t('register.lastName')}
          helperTooltip={t('register.lastName')}
          borderRadius={8}
        />
      </Grid>}
      {!asGuest && <Grid item xs={12} sm={6}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.email')), validate: validateEmail }}
          name="email"
          placeholder={t('register.email')}
          label={t('register.email')}
          sxContainer={{ mt: 0 }}
          title={t('register.email')}
          helperTooltip={t('register.email')}
          borderRadius={8}
        />
      </Grid>}
      {asGuest && <Grid item xs={12} sm={12}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.nickName')) }}
          name="nickName"
          placeholder={t(`register.nickName`)}
          label={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          sxContainer={{ mt: 0 }}
          title={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          helperTooltip={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          borderRadius={8}
        />
      </Grid>}
      <Grid item xs={12} sm={asGuest ? 12 : 6}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.password')) }}
          name="password"
          placeholder={t(`register.password`)}
          label={switchGuestAccountValue ? t(`register.guestPassword`) : t(`register.password`)}
          sxContainer={{ mt: 0 }}
          title={switchGuestAccountValue ? t(`register.guestPassword`) : t(`register.password`)}
          helperTooltip={switchGuestAccountValue ? t(`register.guestPassword`) : t(`register.password`)}
          borderRadius={8}
          withEyeIcon
          eyeIconSize={16}
          type='password'
        />
      </Grid>
      {!asGuest && <Grid item xs={12} sm={12}>
        <Form.TextField
          rules={{ required: requiredErrMsg(t('register.nickName')) }}
          name="nickName"
          placeholder={t(`register.nickName`)}
          label={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          sxContainer={{ mt: 0 }}
          title={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          helperTooltip={switchGuestAccountValue ? t(`register.guestNickName`) : t(`register.nickName`)}
          borderRadius={8}
        />
      </Grid>}
      {!asGuest && <Grid item xs={12} sm={12}>
        <Form.PhoneField
          // rules={{ required: requiredErrMsg(t('register.phone')), validate: validatePhone }}
          rules={{}}
          name="phone"
          placeholder={t('register.phone')}
          title={t('register.phone')}
          sxContainer={{ mt: 0 }}
        />
      </Grid>}
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
          <CustomButton
            label={t('actions.submit')}
            btnType='primary'
            sx={{ width: '100%', p: '8px 12px', fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}
            onClick={handleSubmit()}
          />
        </Box>
      </Grid>
    </>
  );
});

export default RegistrationForm;
