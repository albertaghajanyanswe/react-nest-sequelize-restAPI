import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { routes, variables } from '../../configs';
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
import NotFound from '../../components/NotFound';

const FormHOC = StepHOC<iCreateProduct>()(
  ["name", "description", "otherInfo", "price", "currency", "province", "city", "address", "categoryId", "intendedFor", "productState"]
);

const Form = FormHOC.Form

const ProductItemPage = () => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const methods = useForm<iCreateProduct>({
    defaultValues: ({ ...DEFAULT_VALUES_CREATE_PRODUCT, ...initialData }),
    mode: 'onChange'
  });

  const pageHeaderRef = useRef<any>();
  const handlePageHeaderRef = useCallback((el: HTMLDivElement | null) => {
    pageHeaderRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPageHeaderHeight = useCallback(() => (pageHeaderRef.current?.clientHeight || 0), [pageHeaderRef.current?.clientHeight, isGetLoading])

  const footerRef = useRef<any>();
  const handleFooterRef = useCallback((el: HTMLDivElement | null) => {
    footerRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFooterHeight = useCallback(() => (footerRef.current?.clientHeight || 0), [footerRef.current?.clientHeight, isGetLoading])


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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createProduct, { error: createError }] = productsAPI.useCreateProductMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateProduct, { error: updateError, isError: updateIsError }] = productsAPI.useUpdateProductMutation();

  const { handleSubmit } = methods;

  const handleSave = useCallback(() => handleSubmit(async (data: any) => {
    try {
      setDisableSubmit(true)
      methods.reset(data, { keepErrors: true, keepDirty: false });
      if (productId) {
        await updateProduct({ ...data, productId: (productId as unknown as number) }).unwrap();
      } else {
        await createProduct({ ...data }).unwrap();
        navigate(routes.products.path);
      }
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    } finally {
      setDisableSubmit(false)
    }
  }), [])

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, openModal, closeModal } = useModal(false);

  // const { mutateAsync: mutateDeleteAccount, isLoading } = useDeleteAccount();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (productId && !isGetLoading && !productData) {
    return <NotFound />
  }

  return (
    <Box>
      <Box sx={{ position: 'fixed', width: `calc(100% - ${variables.drawerWidth})`, backgroundColor: 'white', zIndex: 1, boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px' }}>
        <PageTitle handlePageHeaderRef={handlePageHeaderRef} title={productData?.name ? productData?.name : t('productItem.createNewProduct')} withBack />
      </Box>
      <Box sx={{ p: '0 40px 40px 40px', position: 'absolute', mt: `${getPageHeaderHeight()}px` }}>

        <FormProvider {...methods}>
          <form noValidate>
            <Grid container spacing={3} sx={{ mt: 0, mb: `${getFooterHeight()}px` }}>
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
          </form>
        </FormProvider>
      </Box>
      <Box ref={handleFooterRef} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, position: 'fixed', bottom: 0, p: '24px 40px', width: `calc(100% - 0px - ${variables.drawerWidth})`, backgroundColor: 'white', zIndex: 1, boxShadow: 'rgba(33, 35, 38, 0.1) 0px -12px 10px -12px' }}>
        <CustomButton
          label={t('actions.cancel')}
          btnType='secondary'
          onClick={handleCancel}
          sx={{ width: { xs: '100%', sm: '50%' }, margin: { xs: '0 0 24px 0', sm: '0 24px 0 0' } }}
          disabled={disableSubmit || !isDirty}
        />
        <CustomButton
          label={productId ? t('actions.update') : t('actions.submit')}
          variant='contained'
          btnType='primary'
          onClick={handleSave()}
          sx={{ width: { xs: '100%', sm: '50%' } }}
          disabled={disableSubmit || !isDirty || hasError}
        />
      </Box>
    </Box>
  )
};

export default ProductItemPage;