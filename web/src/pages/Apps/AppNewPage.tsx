import React from 'react';
import { useCreateApplicationMutation } from '../../helpers';
import { AppNew } from '../../components';
import { useHistory } from 'react-router-dom';

export const AppNewPage = () => {
  const [createApplication, { loading }] = useCreateApplicationMutation();
  const history = useHistory();
  return (
    <AppNew
      loading={loading}
      onSubmit={(input) =>
        createApplication({ variables: { input } }).then(() => {
          history.push('/apps');
        })
      }
    />
  );
};
