import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppForm } from '../../components';
import { NavbarContainer } from '../../containers';
import {
  useApplicationByIdQuery,
  useUpdateApplicationByIdMutation,
  useDeleteApplicationByIdMutation,
  ApplicationsDocument,
  ApplicationsQuery,
} from '../../helpers';

interface AppSettingsPageProps {}

export const AppSettingsPage: React.FunctionComponent<AppSettingsPageProps> = (
  props,
) => {
  const history = useHistory();
  const { id: appId } = useParams<{ id: string }>();
  const applicationByIdResults = useApplicationByIdQuery({
    variables: { id: appId },
    fetchPolicy: 'cache-first',
  });
  const [
    updateApplicationById,
    updateApplicationByIdResults,
  ] = useUpdateApplicationByIdMutation();

  const [
    deleteApplicationById,
    deleteApplicationByIdResults,
  ] = useDeleteApplicationByIdMutation({
    update(cache, { errors }) {
      if (errors) return;
      const { applications } = cache.readQuery({
        query: ApplicationsDocument,
      }) as ApplicationsQuery;

      const newApplications = applications.filter(({ id }) => id !== appId);

      cache.modify({
        fields: {
          applications() {
            return newApplications;
          },
        },
      });
    },
  });

  const loading =
    applicationByIdResults.loading ||
    updateApplicationByIdResults.loading ||
    deleteApplicationByIdResults.loading;
  const error =
    applicationByIdResults.error ||
    updateApplicationByIdResults.error ||
    deleteApplicationByIdResults.error;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <NavbarContainer />
      <div className="container">
        <nav className="navbar">
          <div className="container-fluid p-0">
            <h1 className="navbar-text">Settings</h1>
          </div>
        </nav>
        <AppForm
          application={applicationByIdResults.data?.applicationById}
          loading={loading}
          onSubmit={async (input) => {
            await updateApplicationById({
              variables: { input: { ...input, id: appId } },
            });
            history.push(`/app/${appId}`);
          }}
          onDelete={() =>
            deleteApplicationById({ variables: { id: appId } }).then(() => {
              history.push(`/apps`);
            })
          }
        />
      </div>
    </div>
  );
};
