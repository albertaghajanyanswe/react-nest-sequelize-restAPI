import React, { useCallback, useState } from 'react';
import qs from 'qs';
import { iFilterParams, iSort } from '../../configs/shared/types';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useQueryParams = ({ pageDefaultParams }: { pageDefaultParams?: iFilterParams }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tableFilter, setTableFilter] = useState(pageDefaultParams ? { params: pageDefaultParams } :
    {
      params: {
        params: {
          sort: { field: "id", order: "asc" },
          filter: {},
          limit: 10,
          skip: 0,
          search: {}
        }
      },
    }
  );

  const pageParams = qs.parse(location && location.search.split('?')[1], { ignoreQueryPrefix: true, arrayLimit: Infinity });

  const queryParams = {
    params: {
      sort: (pageParams?.sort || tableFilter.params.params.sort) as unknown as iSort,
      filter: pageParams?.filter || tableFilter.params.params.filter,
      limit: Number(pageParams?.limit) || tableFilter.params.params.limit,
      skip: Number(pageParams?.skip) || tableFilter.params.params.skip,
      search: pageParams?.search || tableFilter.params.params.search,
    }
  } as iFilterParams;

  const replacePath = (newQuery: any) => {
    const search = qs.stringify({ ...newQuery }, { skipNulls: true });
    navigate(location.pathname);
    setSearchParams(search);
  };

  const setFilteredParams = useCallback(
    (newParams: iFilterParams) => {
      replacePath(newParams.params);
      setTableFilter((prev: any) => ({ ...prev, params: newParams }));
    },
    []
  );

  return { queryParams, setFilteredParams }
};

export default useQueryParams;