import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { iFilterParams, iTableSources } from "../../configs/shared/types";
import PageTitle from "./pageTitle";
import { muiStylesWithTheme } from "./styles";
import { decorateShowField, ProductsDataType } from '../../helpers/adapter';
import ProductItemCard from "./card/Card";
import { options } from "./configs/config";
import CustomTableToolbar from "./toolbar";
import { getCurrentUser } from "../../services/lsService";
import CustomPagination from "./customPagination";
import { productsAPI } from "../../services/rtk/ProductsApi";
import SystemMessage from "../../components/systemMessage";
import { getMessage } from "../../helpers/helper";
import { useSnackbar } from "notistack";
import EmptyState from "../../components/emptyState/EmptyState";

interface iProps<T> {
  loading: boolean;
  filteredParams: iFilterParams;
  setFilteredParams: (params: iFilterParams) => void;
  handleRowClick?: (row: T) => void;
  tableSources: iTableSources<T>;
  handleRefetch?: any;
}
function ProductsLayout<T>({
  loading,
  filteredParams,
  setFilteredParams,
  handleRowClick,
  tableSources,
  handleRefetch
}: iProps<T>) {

  const { t } = useTranslation();
  const theme = useTheme();
  const muiStyles = muiStylesWithTheme(theme);
  const currentUser = getCurrentUser()?.user;

  const pageHeaderRef = useRef<any>();
  const handlePageHeaderRef = useCallback((el: HTMLDivElement | null) => {
    pageHeaderRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars
  const getPageHeaderHeight = useCallback(() => (pageHeaderRef.current?.clientHeight || 0), [pageHeaderRef.current?.clientHeight, loading])

  const filterRef = useRef<any>();
  const handleFilterRef = useCallback((el: HTMLDivElement | null) => {
    filterRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars
  const getFilterHeight = useCallback(() => (filterRef.current?.clientHeight || 0), [filterRef.current?.clientHeight, loading])

  const footerRef = useRef<any>();
  const handleFooterRef = useCallback((el: HTMLDivElement | null) => {
    footerRef.current = el
  }, []);
  // eslint-disable-next-line
  const getFooterHeight = useCallback(() => (footerRef.current?.clientHeight || 0), [footerRef.current?.clientHeight, loading])

  const { filterFields, searchFields, rowsPerPageOptions } = options;

  const onSearchCallback = (value: string) => {
    let oldValue = filteredParams.params?.search?.value;
    if (oldValue === undefined) {
      oldValue = '';
    }
    if (searchFields && (oldValue !== value)) {
      const newFilter = { params: { ...filteredParams.params, search: { ...filteredParams.params.search, value, fields: searchFields }, skip: 0 } } as iFilterParams
      if (!value) {
        delete newFilter.params.search;
      }
      setFilteredParams(newFilter);
    }
  };

  const memoFilterFields = useMemo(() => {
    const filteredFields = decorateShowField(filterFields).filter(
      (i: any) => !("show" in i) || i.show({ currentUser })
    );
    return filteredFields;
    // eslint-disable-next-line
  }, [currentUser]);


  const onFilterCallback = (filterObj: { [key: string]: any }) => {
    if (filterObj && !Array.isArray(filterObj)) {
      const fieldKeyList = Object.keys(filterObj);
      let newFilter: any = {};
      fieldKeyList.forEach((i) => {
        const fieldValue = filterObj[i];
        let oldValue = filteredParams.params?.filter?.[i];
        if (oldValue === undefined) {
          oldValue = "";
        }
        if (
          memoFilterFields &&
          oldValue !== fieldValue &&
          ((!Array.isArray(fieldValue) && fieldValue !== undefined) || (Array.isArray(fieldValue) && JSON.stringify(fieldValue) !== JSON.stringify(oldValue)))
        ) {
          newFilter = {
            ...newFilter,
            params: {
              ...filteredParams.params,
              ...newFilter.params,
              filter: {
                ...filteredParams.params.filter,
                ...newFilter?.params?.filter,
                [i]: fieldValue,
              },
              skip: 0,
            },
          };
        }
      });
      if (Object.keys(newFilter).length) {
        setFilteredParams(newFilter);
      }
    }
  };

  const toolbarView = (
    <CustomTableToolbar
      filteredParams={filteredParams}
      numSelected={0}
      filterFields={memoFilterFields}
      onFilterCallback={onFilterCallback}
      sizes={{ xs: 12, sm: 6, md: 6, lg: 4 }}
      handleFilterRef={handleFilterRef}
    />
  );

  const { count } = tableSources;

  const [addToFavorite] = productsAPI.useAddToFavoriteMutation();
  const [deleteFromFavorite] = productsAPI.useDeleteFromFavoriteMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleFavorite = async (e: React.MouseEvent<HTMLElement>, details: ProductsDataType) => {
    try {
      e.stopPropagation();
      await addToFavorite({ productId: `${details.id}` });
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    }
  }
  const handleDeleteFavorite = async (e: React.MouseEvent<HTMLElement>, details: ProductsDataType) => {
    try {
      e.stopPropagation();
      const res = details?.favoriteProducts?.find(i => i.storedProductId === details.id);
      if (res) {
        await deleteFromFavorite({ id: `${res.id}` });
        SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success', theme });
      } else {
        SystemMessage(enqueueSnackbar, getMessage('Something went wrong'), { variant: 'warning', theme });
      }
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    }
  }
  const calculateIsFavorite = (product: ProductsDataType) => {
    const res = product?.favoriteProducts?.find(i => i.storedProductId === product.id);
    return !!res;
  }

  return (
    <Box sx={muiStyles.root}>
      <PageTitle handlePageHeaderRef={handlePageHeaderRef} onSearchCallback={onSearchCallback} filteredParams={filteredParams} />
      <Box sx={muiStyles.tableRoot}>
        {tableSources.data.length === 0 ? <EmptyState title={t('products.emptyTitle')} desc={t('products.emptyDesc')} /> :
          <>
            {toolbarView && toolbarView}
            <Grid container spacing={3}>
              {(tableSources.data as ProductsDataType[]).map((product) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={product.id}>
                  <ProductItemCard<ProductsDataType>
                    details={product}
                    handleFavorite={calculateIsFavorite(product) ? handleDeleteFavorite : handleFavorite}
                    isFavorite={calculateIsFavorite(product)}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 6 }}>
              <CustomPagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={count}
                filteredParams={filteredParams}
                setFilteredParams={setFilteredParams}
                handleFooterRef={handleFooterRef}
              />
            </Box>
          </>
        }
      </Box>
    </Box>
  )
}

export default ProductsLayout;