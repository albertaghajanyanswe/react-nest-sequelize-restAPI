import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../configs';
import { useTranslation } from 'react-i18next';
import { iCreateProduct } from '../../configs/shared/types';
import { requiredErrMsg } from '../../helpers/formHelper';
import { getMessage } from '../../helpers/helper';
import { useModal } from '../../hooks/common/useModal';
import SystemMessage from '../../components/systemMessage';
import CustomButton from '../../components/customButton';
import StepHOC from '../../components/form/FormHOC';
import { DEFAULT_VALUES_CREATE_PRODUCT } from '../../configs/shared/defaultValues';
import { stylesWithTheme } from './styles';
import { productsAPI } from '../../services/rtk/ProductsApi';
import { getCurrentUser } from '../../services/lsService';
import { globalMuiStylesWithTheme } from '../../globalMuiStyles';
import SETTINGS from '../../settings';
import Loading from '../../components/loading';
import { useTheme } from '@mui/system';
import PageTitle from '../../components/pageTitle';

const FormHOC = StepHOC<iCreateProduct>()(
  ["name", "description", "otherInfo", "price", "currency", "province", "city", "address", "categoryId", "intendedFor", "productState"]
);

const Form = FormHOC.Form

const ProductItemPage = () => {
  const theme = useTheme();
  const muiStyles = stylesWithTheme(theme);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const currentUser = getCurrentUser()?.user;

  const params = useParams();
  const productId = params.id;
  const { data: productData, isLoading: isGetLoading } = productsAPI.useGetProductQuery({ id: productId }, { skip: !productId });
  const { data: categoriesData } = productsAPI.useGetAllCategoriesQuery({});

  const initialData = {
    name: productData?.name || '',
    description: productData?.description || '',
    otherInfo: productData?.otherInfo || '',
    price: productData?.price || '',
    currency: productData?.currency || '',
    province: productData?.province || '',
    city: productData?.city || '',
    address: productData?.address || '',
    categoryId: productData?.categoryId || undefined,
    intendedFor: productData?.intendedFor || undefined,
    productState: productData?.productState || undefined
  }

  // console.log('productData = ', productData)
  // console.log('categoriesData =  ', categoriesData)
  // console.log('initialData =  ', initialData)

  const methods = useForm<iCreateProduct>({
    defaultValues: ({ ...DEFAULT_VALUES_CREATE_PRODUCT, ...initialData }),
    mode: 'onChange'
  });

  const isDirty = methods.formState.isDirty;
  const hasError = Object.keys(methods.formState.errors).length > 0;

  const handleCancel = () => {
    originalValue.current = initialData;
    methods.reset({ ...DEFAULT_VALUES_CREATE_PRODUCT, ...initialData }, {
      keepErrors: false,
      keepDirty: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const [createProduct, { error: createError }] = productsAPI.useCreateProductMutation();
  const [updateProduct, { error: updateError, isError: updateIsError }] = productsAPI.useUpdateProductMutation();


  const handleSave = async () => {
    try {
      setDisableSubmit(true)
      const data = { ...methods.getValues() };
      methods.reset({ ...methods.getValues() }, {
        keepErrors: true,
        keepDirty: false,
      })
      if (productId) {
        await updateProduct({ ...data, productId: (productId as unknown as number) }).unwrap();
      } else {
        await createProduct({ ...data }).unwrap();
        navigate(routes.products.path);
      }
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
    } catch (error: any) {
      console.log(' 111 theme = ', theme)
      console.log('error - ', error)
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    } finally {
      setDisableSubmit(false)
    }
  }

  const originalValue = useRef(currentUser || DEFAULT_VALUES_CREATE_PRODUCT);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (currentUser && originalValue.current != initialData) {
      originalValue.current = initialData;
      methods.reset({ ...DEFAULT_VALUES_CREATE_PRODUCT, ...initialData }, {
        keepErrors: true,
        keepDirty: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData, methods.reset]);

  const { isOpen, openModal, closeModal } = useModal(false);

  // const { mutateAsync: mutateDeleteAccount, isLoading } = useDeleteAccount();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // await mutateDeleteAccount({});
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success' });
      navigate(routes.login.path);
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    } finally {
      closeModal();
    }
  }

  if (isGetLoading) {
    return <Loading />
  }

  return (
    <Box>
      <PageTitle title={productId ? productData?.name : t('productItem.createNewProduct')} withBack />
      <Box sx={{ p: '0 40px 40px 40px' }}>

        <FormProvider {...methods}>
          <form noValidate>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.name')) }}
                  name="name"
                  placeholder={t('products.name')}
                  label={t('products.name')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.name')}
                  borderRadius={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.SelectField
                  rules={{ required: requiredErrMsg(t('products.intendedFor')) }}
                  name="intendedFor"
                  placeholder={t('products.intendedFor')}
                  title={t('products.intendedFor')}
                  sx={{ ...globalMuiStylesWithTheme(theme).selectField }}
                  sxContainer={{ mt: 0 }}
                  options={SETTINGS.intendedForList}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.SelectField
                  rules={{ required: requiredErrMsg(t('products.productState')) }}
                  name="productState"
                  placeholder={t('products.productState')}
                  title={t('products.productState')}
                  sx={{ ...globalMuiStylesWithTheme(theme).selectField }}
                  sxContainer={{ mt: 0 }}
                  options={SETTINGS.productStateList}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.description')) }}
                  name="description"
                  placeholder={t('products.description')}
                  label={t('products.description')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.description')}
                  borderRadius={8}
                  multiline
                  rows={4.5}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.price')) }}
                  name="price"
                  placeholder={t('products.price')}
                  label={t('products.price')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.price')}
                  borderRadius={8}
                  pattern='^\d{0,3}$'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.SelectField
                  rules={{ required: requiredErrMsg(t('products.currency')) }}
                  name="currency"
                  placeholder={t('products.currency')}
                  title={t('products.currency')}
                  sx={{ ...globalMuiStylesWithTheme(theme).selectField }}
                  sxContainer={{ mt: 0 }}
                  options={SETTINGS.currencyList}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.province')) }}
                  name="province"
                  placeholder={t('products.province')}
                  label={t('products.province')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.province')}
                  borderRadius={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.city')) }}
                  name="city"
                  placeholder={t('products.city')}
                  label={t('products.city')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.city')}
                  borderRadius={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.address')) }}
                  name="address"
                  placeholder={t('products.address')}
                  label={t('products.address')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.address')}
                  borderRadius={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.SelectField
                  rules={{ required: requiredErrMsg(t('products.categoryId')) }}
                  name="categoryId"
                  placeholder={t('products.categoryId')}
                  title={t('products.categoryId')}
                  sx={{ ...globalMuiStylesWithTheme(theme).selectField }}
                  sxContainer={{ mt: 0 }}
                  options={categoriesData?.data?.map((item: any) => ({ label: item.name || '-', value: item.id }))}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Form.TextField
                  rules={{ required: requiredErrMsg(t('products.otherInfo')) }}
                  name="otherInfo"
                  placeholder={t('products.otherInfo')}
                  label={t('products.otherInfo')}
                  sxContainer={{ mt: 0 }}
                  title={t('products.otherInfo')}
                  borderRadius={8}
                  multiline={true}
                  rows={3.5}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4 }} spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  label={t('actions.cancel')}
                  btnType='secondary'
                  onClick={handleCancel}
                  sx={{ minWidth: '100%' }}
                  disabled={disableSubmit || !isDirty}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  label={productId ? t('actions.update') : t('actions.submit')}
                  variant='contained'
                  btnType='primary'
                  onClick={handleSave}
                  sx={{ minWidth: '100%' }}
                  // sx={{ minWidth: '120px', mt: { xs: 3, sm: 0 } }}
                  disabled={disableSubmit || !isDirty || hasError}
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Box>

    </Box>
  )
};

export default ProductItemPage;