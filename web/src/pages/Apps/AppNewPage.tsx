import React from 'react';
import {
  ApplicationFieldsFragmentDoc,
  useCreateApplicationMutation,
} from '../../helpers';
import { AppForm } from '../../components';
import { useHistory } from 'react-router-dom';
import { routerPath } from '../../AppRouter';
import { NavbarContainer } from '../../containers';

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
    <div>
      <NavbarContainer />

      <div className="mw-860 mt-4">
        <div className="border-bottom mb-4 pb-3">
          <h1>Create a new application</h1>
          <p>
            An application receives data, store it and proxy it to your target.
          </p>
        </div>
        <AppForm
          loading={loading}
          onSubmit={(input) =>
            createApplication({ variables: { input } }).then(() => {
              history.push(routerPath.apps);
            })
          }
        />
      </div>
    </div>
  );
};
