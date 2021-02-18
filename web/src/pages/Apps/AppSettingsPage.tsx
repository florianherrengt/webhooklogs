import React from 'react';
import { AppForm, Button } from '../../components';
import { useApplicationByIdQuery } from '../../helpers';

interface AppSettingsPageProps {
  appId: string;
}

export const AppSettingsPage: React.FunctionComponent<AppSettingsPageProps> = (
  props,
) => {
  const { data, loading, error } = useApplicationByIdQuery({
    variables: { id: props.appId },
    fetchPolicy: 'cache-first',
  });
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <h1 className="navbar-text">{data?.applicationById.name}</h1>
        </div>
      </nav>
      <AppForm onSubmit={() => {}} />
    </div>
  );
};
