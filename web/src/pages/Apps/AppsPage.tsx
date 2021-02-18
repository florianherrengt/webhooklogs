import React, { useState } from 'react';
import { AppList } from '../../components';
import { useApplicationsQuery } from '../../helpers';

export const AppsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading, error } = useApplicationsQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }
  return (
    <AppList
      apps={data?.applications}
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    />
  );
};
