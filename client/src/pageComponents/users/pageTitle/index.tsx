import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { iFilterParams } from '../../../configs/shared/types';
import { muiStyles } from './styles';
import CustomSearch from '../../../components/customSearch';
import { useTranslation } from 'react-i18next';

function PageTitle({
  handlePageHeaderRef,
  onSearchCallback,
  filteredParams,
}: {
  handlePageHeaderRef: any,
  onSearchCallback?: ((searchValue: string) => void) | null,
  filteredParams?: iFilterParams,
}) {

  const { t } = useTranslation();
  const searchValue = filteredParams?.params?.search?.value || '';

  const [searchOpened, setSearchOpened] = useState(!!searchValue);

  return (
    <Box component='div' sx={muiStyles.root} ref={handlePageHeaderRef}>
      {!searchOpened && <Box component='div' sx={muiStyles.leftRoot}>
        <Typography sx={muiStyles.title} variant='h1'> {t('pages.users')} </Typography>
      </Box>}
      <>
        {onSearchCallback && typeof onSearchCallback === 'function' && <CustomSearch
          onSearchCallback={onSearchCallback}
          searchValue={searchValue}
          placeholder={t('common.search')}
          searchOpened={searchOpened}
          setSearchOpened={setSearchOpened}
        />}
      </>
    </Box>
  );
};

export default PageTitle;
