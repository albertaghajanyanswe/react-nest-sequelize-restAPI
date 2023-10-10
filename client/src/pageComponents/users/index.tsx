import React, { useMemo } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useSnackbar } from 'notistack';
import { routes } from '../../../src/configs';
import { muiStyles } from './styles';
import { usersAPI } from '../../services/rtk/UsersApi';
import { getCurrentUser } from '../../services/lsService';
import { iFilterParams } from '../../configs/shared/types';
import useQueryParams from '../../hooks/common/useQueryParams';
import { adaptUsersTableData, UsersTableDataType } from '../../helpers/adapter';
import { useNavigate } from 'react-router-dom';
import UsersLayout from './UsersLayout';
import Loading from '../../components/loading';
import { useTheme } from '@mui/material/styles';

function Users() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  const currentUser = getCurrentUser();

  const pageDefaultParams = {
    params: {
      sort: { field: 'createdAt', order: "asc" },
      filter: {},
      limit: 10,
      skip: 0,
    }
  } as iFilterParams;


  const { queryParams, setFilteredParams } = useQueryParams({ pageDefaultParams });
  const { skip, limit, filter, sort, search } = queryParams.params;
  const { isActive_eq, ...restFilter} = filter;
  console.log('isActive_eq = ', isActive_eq)
  console.log('queryParams = ', queryParams)
  const { data, isLoading, refetch } = usersAPI.useGetAllUsersQuery({
    ...queryParams.params,
    filter: {
      ...restFilter,
      ...(isActive_eq && isActive_eq.length > 0 && { isActive_eq: isActive_eq[0] === 'active' ? true : false})
    }
  });

  const { data: usersList, count} = data || {rows: [], count: 0};


  // const count = useMemo(() => usersList?.length || 0, [usersList])
  const memoTableSource = useMemo(() => ({ data: adaptUsersTableData(usersList || []), count }), [usersList, count]);

  const handleOnRowClick = (row: UsersTableDataType) => {

    navigate(routes.user.path.replace(':id', `${row.id}`));
  };

  const theme = useTheme();
  const toolbarMinHeight = theme.breakpoints.up('md') ? 64 : 56;

  return currentUser ? (
    <Box component='div' sx={{ ...muiStyles.root, height: `calc(100% - ${toolbarMinHeight}px)` }}>
      <UsersLayout<UsersTableDataType>
        loading={isLoading}
        filteredParams={queryParams}
        setFilteredParams={setFilteredParams}
        handleRowClick={handleOnRowClick}
        tableSources={memoTableSource}
        handleRefetch={refetch}
      />
    </Box>
  ) : (
    <Loading />
  );
};

export default Users;