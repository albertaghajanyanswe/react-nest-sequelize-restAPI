import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { matchIsValidTel } from 'mui-tel-input';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../configs';
import { useTranslation } from 'react-i18next';
import { iAccountDetails, UserRole } from '../../configs/shared/types';
import { requiredErrMsg } from '../../helpers/formHelper';
import { getMessage } from '../../helpers/helper';
import { useModal } from '../../hooks/common/useModal';
import { usersAPI } from '../../services/rtk/UsersApi';
import SystemMessage from '../../components/systemMessage';
import CustomButton from '../../components/customButton';
import CustomModal from '../../components/modal/CustomModal';
import ChangeTheme from '../../components/changeTheme';
import ChangeLanguage from '../../components/changeLanguage';
import StepHOC from '../../components/form/FormHOC';
import FormFileInput from '../../components/form/imageInput';
import { DEFAULT_VALUES_PROFILE } from '../../configs/shared/defaultValues';
import { stylesWithTheme } from './styles';

const FormHOC = StepHOC<iAccountDetails>()(
  ["image", "firstName", "lastName", "email", "phone", "nickName"]
);

const Form = FormHOC.Form

const SettingsPage = () => {
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { data: currentUser } = usersAPI.useGetCurrentUserQuery({});

  const currentUserInitialData = {
    image: currentUser?.image || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    nickName: currentUser?.nickName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  }

  const methods = useForm<iAccountDetails>({
    defaultValues: ({ ...DEFAULT_VALUES_PROFILE, ...currentUserInitialData }),
    mode: 'onChange'
  });

  const isDirty = methods.formState.isDirty;
  const hasError = Object.keys(methods.formState.errors).length > 0;

  const handleCancel = () => {
    originalValue.current = currentUserInitialData;
    methods.reset({ ...DEFAULT_VALUES_PROFILE, ...currentUserInitialData }, {
      keepErrors: false,
      keepDirty: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const [ updateUser ] = usersAPI.useUpdateUserMutation();

  const handleSave = async () => {
    try {
      setDisableSubmit(true)
      const data = { ...methods.getValues() };
      const {nickName, email, ...rest} = data;
      methods.reset({ ...methods.getValues() }, {
        keepErrors: true,
        keepDirty: false,
      })

      await updateUser({ ...rest, userId: currentUser?.id as number });
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error?.response?.data || error.message), { variant: 'error' });
    } finally {
      setDisableSubmit(false)
    }
  }

  const validatePhone = (value: string) => !value || matchIsValidTel(value) ? true : t('errors.invalidPhone');

  const originalValue = useRef(currentUser || DEFAULT_VALUES_PROFILE);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (currentUser && originalValue.current != currentUserInitialData) {
      originalValue.current = currentUserInitialData;
      methods.reset({ ...DEFAULT_VALUES_PROFILE, ...currentUserInitialData }, {
        keepErrors: true,
        keepDirty: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, methods.reset]);

  const {isOpen, openModal, closeModal} = useModal(false);

  // const { mutateAsync: mutateDeleteAccount, isLoading } = useDeleteAccount();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // await mutateDeleteAccount({});
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success' });
      navigate(routes.login.path);
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error?.response?.errors[0]?.message || error?.response?.data || error.message), { variant: 'error' });
    } finally {
      closeModal();
    }
  }

  return (
    <Box sx={{ p: '64px'}}>
      <FormProvider {...methods}>
        <form noValidate>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <FormFileInput
                name='image'
                label={t('profile.yourPhoto')}
                setDisableSave={setDisableSubmit}
                rootSx={{ borderRadius: '24px' }}
                btnType='secondary'
                labelSx={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}
                description={t('profile.photoDesc')}
                sx={{ mt: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.TextField
                rules={{ required: requiredErrMsg(t('users.firstName')) }}
                name="firstName"
                placeholder={t('users.firstName')}
                label={t('users.firstName')}
                sxContainer={{ mt: 0 }}
                title={t('users.firstName')}
                borderRadius={8}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.TextField
                rules={{ required: requiredErrMsg(t('users.lastName')) }}
                name="lastName"
                placeholder={t('users.lastName')}
                label={t('users.lastName')}
                sxContainer={{ mt: 0 }}
                title={t('users.lastName')}
                borderRadius={8}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Form.TextField
                rules={{ required: requiredErrMsg(t('users.phone')), validate: validatePhone }}
                name="phone"
                placeholder={t('users.phone')}
                label={t('users.phone')}
                sxContainer={{ mt: 0 }}
                title={t('users.phone')}
                borderRadius={8}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Form.TextField
                name="nickName"
                placeholder={t('users.nickName')}
                label={t('users.nickName')}
                sxContainer={{ mt: 0 }}
                title={t('users.nickName')}
                borderRadius={8}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Form.TextField
                name="email"
                placeholder={t('users.email')}
                label={t('users.email')}
                sxContainer={{ mt: 0 }}
                title={t('users.email')}
                borderRadius={8}
                disabled
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row'},  mt: 5 }}>
            <CustomButton
              label={t('actions.cancel')}
              btnType='secondary'
              onClick={handleCancel}
              sx={{ minWidth: '120px' }}
              disabled={disableSubmit || !isDirty}
            />
            <CustomButton
              label={t('actions.save')}
              variant='contained'
              btnType='primary'
              onClick={handleSave}
              sx={{ minWidth: '120px', mt: {xs: 3, sm: 0} }}
              disabled={disableSubmit || !isDirty || hasError}
            />
          </Box>
        </form>
      </FormProvider>
      {(currentUser?.roles[0].value === UserRole.Guest) &&
        <Box sx={muiStyles.deleteAccountBlock}>
          <Box sx={{ mr: 2 }}>
            <Typography sx={{ ...muiStyles.textBold, mb: 1 }}>{t('profile.deleteAccount')}</Typography>
            <Typography sx={{ ...muiStyles.textNormal }}>{t('profile.deleteAccountDesc_1')}</Typography>
            <Box component='span' sx={muiStyles.textNormal}>
              {t('profile.deleteAccountDesc_2_1')}
              <Typography sx={{ color: 'primary.red5' }} component='span'>{t('profile.deleteAccountDesc_2_2')}</Typography>
              {t('profile.deleteAccountDesc_2_3')}
            </Box>
          </Box>
          <Box>
            <CustomButton
              label={t('profile.deleteThisAccount')}
              btnType='secondary'
              onClick={openModal}
              sx={muiStyles.deleteBtn}
              disabled={disableSubmit}
            />
            {isOpen && <CustomModal
              open={isOpen}
              handleClose={closeModal}
              withFooterAction={false}
              withCloseButton={false}
              withDividers={false}
              sxTitleRoot={muiStyles.modalTitleRoot}
              sxTitle={muiStyles.modalTitle}
              sx={muiStyles.modalRoot}
              closeBtnStyle='secondary'
            >
              <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
                  <Typography sx={{ ...muiStyles.modalTitleTxt, textAlign: 'center' }}>{t('profile.deleteModal.deleteAccount')}</Typography>
                </Box>
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomButton
                      label={t('profile.deleteModal.remove')}
                      btnType='primary'
                      sx={muiStyles.removeBtn}
                      onClick={handleDelete}
                      // disabled={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomButton
                      label={t('profile.deleteModal.cancel')}
                      btnType='secondary'
                      sx={muiStyles.cancelBtn}
                      onClick={closeModal}
                    />
                  </Grid>
                </Grid>
              </Box>

            </CustomModal>}
          </Box>
        </Box>}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mt: 6  }}>
            <ChangeTheme />
            <Box sx={{ mt: 2 }} />
            <ChangeLanguage />
          </Box>
    </Box>
  )
};

export default SettingsPage;