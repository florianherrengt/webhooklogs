import React, { useState } from 'react';
import { AppList } from '../../components';
import { useApplicationsQuery } from '../../helpers';

export const AppsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading, error } = useApplicationsQuery();
  return (
    <AppList
      apps={data?.applications}
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    />
  );
};
