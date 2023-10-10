import React from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import { muiStyles } from './styles';
import { iFilterDatePickerField, iFilterParams, iFilterSelectField, iFilterTextField } from '../../../configs/shared/types';
import CustomFilter from '../../../components/customFilter';
import { useTranslation } from 'react-i18next';


interface iProps {
  filteredParams: iFilterParams;
  numSelected: any;
  filterFields: readonly (iFilterTextField | iFilterSelectField | iFilterDatePickerField)[];
  onFilterCallback: ((filterObj: {[key: string]: any}) => void) | null;
  sizes?: {xs?: number, sm?: number, md?: number, lg?: number};
  handleFilterRef: any;
}

function CustomTableToolbar({
  filteredParams,
  numSelected,
  filterFields = [],
  onFilterCallback = null,
  sizes,
  handleFilterRef
}: iProps) {

  const { t } = useTranslation();
  return (
    <>
      <Toolbar sx={muiStyles.root} ref={handleFilterRef}>
        <Box sx={muiStyles.filters}>
          <CustomFilter
            onFilterCallback={onFilterCallback}
            filterFields={filterFields}
            filteredParams={filteredParams}
            sizes={sizes}
          />
        </Box>
        <Box sx={muiStyles.actions}>
          {numSelected > 0 &&
            <Typography sx={muiStyles.headerText}>
              {`${numSelected} ${t('table.itemSelected')}`}
            </Typography>}
        </Box>
      </Toolbar>
    </>
  );
};

export default CustomTableToolbar;