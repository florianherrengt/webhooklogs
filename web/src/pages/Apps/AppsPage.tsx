import React, { useState } from 'react';
import { AppContainer } from '../../AppRouter';
import { AppList, Navbar } from '../../components';
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
    <div>
      <Navbar />
      <AppContainer>
        <AppList
          apps={data?.applications}
          onSearchChange={setSearchValue}
          searchValue={searchValue}
        />
      </AppContainer>
    </div>
  );
};
