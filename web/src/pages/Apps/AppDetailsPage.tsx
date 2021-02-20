import { Button, HookEventsList } from '../../components';
import { Cog } from '@styled-icons/fa-solid';
import React, { useState } from 'react';
import {
  HookEventsFragmentFragment,
  useApplicationByIdQuery,
  useHookEventsQuery,
} from '../../helpers';
import { HookEventDetails } from '../../components/HookEvents/HookEventDetails';

interface AppDetailsPageProps {
  appId: string;
}

export const AppDetailsPage: React.FunctionComponent<AppDetailsPageProps> = (
  props,
) => {
  const applicationByIdResults = useApplicationByIdQuery({
    variables: { id: props.appId },
    fetchPolicy: 'cache-first',
  });
  const hookEventsResults = useHookEventsQuery({
    variables: { where: { applicationId: { eq: props.appId } } },
    fetchPolicy: 'network-only',
  });
  const [selectedHookEvent, setSelectedHookEvent] = useState<
    HookEventsFragmentFragment | undefined
  >();
  const loading = applicationByIdResults.loading || hookEventsResults.loading;
  const error = applicationByIdResults.error || hookEventsResults.error;

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
          <h1 className="navbar-text">
            {applicationByIdResults.data?.applicationById.name}
          </h1>
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
      <div className="row">
        <div className="col-6">
          <HookEventsList
            hookEvents={hookEventsResults.data?.hookEvents.items}
            selectedHookEvent={
              selectedHookEvent || hookEventsResults.data?.hookEvents.items[0]
            }
            onRowClick={setSelectedHookEvent}
          />
        </div>
        <div className="col-6 border-start">
          <HookEventDetails
            hookEvent={
              selectedHookEvent || hookEventsResults.data?.hookEvents.items[0]
            }
          />
        </div>
      </div>
    </div>
  );
};
