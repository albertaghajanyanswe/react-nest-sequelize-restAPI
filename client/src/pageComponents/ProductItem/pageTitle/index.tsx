import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { iFilterParams } from '../../../configs/shared/types';
import { muiStyles } from './styles';
import CustomSearch from '../../../components/customSearch';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/customButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../configs';
import { ReactComponent as AddSvg} from '../../../assets/16/plus.svg';

function PageTitle({
  handlePageHeaderRef,
  onSearchCallback,
  filteredParams,
}: {
  handlePageHeaderRef?: any,
  onSearchCallback?: ((searchValue: string) => void) | null,
  filteredParams?: iFilterParams,
}) {

  const { t } = useTranslation();
  const searchValue = filteredParams?.params?.search?.value || '';
  const navigate = useNavigate();
  const [searchOpened, setSearchOpened] = useState(!!searchValue);

  const handleCreateProduct = () => {
    navigate(routes.productCreate.path);
  }

  return (
    <Box component='div' sx={muiStyles.root} ref={handlePageHeaderRef}>
      {!searchOpened && <Box component='div' sx={muiStyles.leftRoot}>
        <Typography sx={muiStyles.title} variant='h1'> {t('pages.products')} </Typography>
      </Box>}
      {onSearchCallback && typeof onSearchCallback === 'function' && <CustomSearch
        onSearchCallback={onSearchCallback}
        searchValue={searchValue}
        placeholder={t('common.search')}
        searchOpened={searchOpened}
        setSearchOpened={setSearchOpened}
      />}
      <CustomButton
        label={t('actions.createProduct')}
        sx={{ p: '8px 24px', fontSize: '14px', fontWeight: 500 }}
        onClick={handleCreateProduct}
        variant='outlined'
        btnType='secondary'
        startIcon={<AddSvg />}

      />
    </Box>
  );
};

export default PageTitle;
