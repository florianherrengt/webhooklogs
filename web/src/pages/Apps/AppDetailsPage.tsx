import { Button, HookEventsList } from '../../components';
import { Cog } from '@styled-icons/fa-solid';
import React from 'react';
import { useApplicationByIdQuery } from '../../helpers';

interface AppDetailsPageProps {
  appId: string;
}

export const AppDetailsPage: React.FunctionComponent<AppDetailsPageProps> = (
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
        <div className="container-fluid p-0 border-bottom mb-3">
          <h1 className="navbar-text">{data?.applicationById.name}</h1>
          <div className="d-flex">
            <Button
              link={`/app/${props.appId}/settings`}
              outline
              color="secondary"
              iconLeft={<Cog size={16} />}
              text="Setting"
            ></Button>
          </div>
        </div>
      </nav>
      <HookEventsList />
    </div>
  );
};
