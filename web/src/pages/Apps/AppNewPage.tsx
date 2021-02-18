import React from 'react';
import {
  ApplicationFieldsFragmentDoc,
  useCreateApplicationMutation,
} from '../../helpers';
import { AppForm } from '../../components';
import { useHistory } from 'react-router-dom';

export const AppNewPage = () => {
  const [createApplication, { loading, error }] = useCreateApplicationMutation({
    update(cache, { data }) {
      if (!data?.createApplication) return;
      cache.modify({
        fields: {
          applications(existingApplications = []) {
            const newApplicationRef = cache.writeFragment({
              data: data?.createApplication,
              fragment: ApplicationFieldsFragmentDoc,
            });
            return [...existingApplications, newApplicationRef];
          },
        },
      });
    },
  });
  const history = useHistory();
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <AppForm
      loading={loading}
      onSubmit={(input) =>
        createApplication({ variables: { input } }).then(() => {
          history.push('/apps');
        })
      }
    />
  );
};
