import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { tableOptions } from "./configs/config";
// import CustomTableToolbar from "./toolbar";
import PageTitle from "./pageTitle";
import { muiStyles } from "./styles";
import { routes } from "../../configs";
import { iFilterParams, iTableSources } from "../../configs/shared/types";
import { getCurrentUser } from "../../services/lsService";
import { decorateShowField } from "../../helpers/adapter";
import CustomTable from "../../components/customTable";
import CustomTableToolbar from "./toolbar";


interface iProps<T> {
  loading: boolean;
  filteredParams: iFilterParams;
  setFilteredParams: (params: iFilterParams) => void;
  handleRowClick?: (row: T) => void;
  tableSources: iTableSources<T>;
  handleRefetch?: any;
}
function UsersLayout<T extends {id: number}>({
  loading,
  filteredParams,
  setFilteredParams,
  handleRowClick,
  tableSources,
  handleRefetch
}: iProps<T>) {

  const currentUser = getCurrentUser();

  // calculate component height
  const pageHeaderRef = useRef<any>();
  const handlePageHeaderRef = useCallback((el: HTMLDivElement | null) => {
    pageHeaderRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPageHeaderHeight = useCallback(() => (pageHeaderRef.current?.clientHeight || 0), [pageHeaderRef.current?.clientHeight, loading])

  const filterRef = useRef<any>();
  const handleFilterRef = useCallback((el: HTMLDivElement | null) => {
    filterRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFilterHeight = useCallback(() => (filterRef.current?.clientHeight || 0), [filterRef.current?.clientHeight, loading])

  const footerRef = useRef<any>();
  const handleFooterRef = useCallback((el: HTMLDivElement | null) => {
    footerRef.current = el
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFooterHeight = useCallback(() => (footerRef.current?.clientHeight || 0), [footerRef.current?.clientHeight, loading])

  const memoTableOptions = useMemo(() => {
    const filteredTableFields = decorateShowField(tableOptions.fields).filter(
      (i) => !("show" in i) || i.show({currentUser})
    );
    return { ...tableOptions, fields: filteredTableFields };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const { filterFields, searchFields } = tableOptions;

  const memoFilterFields = useMemo(() => {
    const filteredFields = decorateShowField(filterFields).filter(
      (i: any) => !("show" in i) || i.show({currentUser})
    );
    return filteredFields;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  const onFilterCallback = (filterObj: {[key: string]: any}) => {
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
          (!Array.isArray(fieldValue) && fieldValue !== undefined || Array.isArray(fieldValue) && JSON.stringify(fieldValue) !== JSON.stringify(oldValue))
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

  const onSearchCallback = (value: string) => {
    let oldValue = filteredParams.params?.search?.value;
    if (oldValue === undefined) {
      oldValue = '';
    }
    if (searchFields && (oldValue !== value)) {
      const newFilter = {params: {...filteredParams.params, search: {...filteredParams.params.search, value, fields: searchFields}, skip: 0}} as iFilterParams
      if (!value) {
        delete newFilter.params.search;
      }
      setFilteredParams(newFilter);
    }
  };

  const toolbarView = (
    <CustomTableToolbar
      filteredParams={filteredParams}
      numSelected={0}
      filterFields={memoFilterFields}
      onFilterCallback={onFilterCallback}
      sizes={{xs: 12, sm: 6, md: 3, lg: 3}}
      handleFilterRef={handleFilterRef}
    />
  );

  const paddingsHeight = 25;

  return (
    <Box sx={muiStyles.root}>
      <PageTitle handlePageHeaderRef={handlePageHeaderRef} onSearchCallback={onSearchCallback} filteredParams={filteredParams} />
      <Box sx={muiStyles.tableRoot}>
        <CustomTable
          tableSources={tableSources}
          tableOptions={memoTableOptions}
          filteredParams={filteredParams}
          setFilteredParams={setFilteredParams}
          rowUniqueKey="id"
          loading={loading}
          toolbarView={toolbarView}
          isSticky
          maxHeightMinus={getPageHeaderHeight() + getFilterHeight() + (getFooterHeight() || 56) + paddingsHeight}
          handleFooterRef={handleFooterRef}
          handleRowClick={handleRowClick}
          actionColumnCallback={handleRefetch}
        />
      </Box>
    </Box>
  );
}

export default UsersLayout;
