import { Button, HookEventsList, Loading } from '../../components';
import { Cog } from '@styled-icons/fa-solid';
import React, { useState } from 'react';
import {
  HookEventsFragmentFragment,
  useApplicationByIdQuery,
  useHookEventsQuery,
  useNewHookEventSubscription,
  HookEventsFragmentFragmentDoc,
  HookEventsQuery,
} from '../../helpers';
import { HookEventDetails } from '../../components/HookEvents/HookEventDetails';
import { NavbarContainer } from '../../containers';
import { useParams } from 'react-router-dom';
import { config } from '../../config';

interface AppDetailsPageProps {}

export const AppDetailsPage: React.FunctionComponent<AppDetailsPageProps> = (
  props,
) => {
  const { id: appId } = useParams<{ id: string }>();

  const newHookEventSubscriptionResults = useNewHookEventSubscription({
    variables: { applicationId: appId },
    onSubscriptionData({ subscriptionData, client }) {
      client.cache.modify({
        fields: {
          hookEvents(
            existingHookevents: HookEventsQuery['hookEvents'],
          ): HookEventsQuery['hookEvents'] {
            const newHookeventRef = client.cache.writeFragment({
              data: subscriptionData.data?.newHookEvent,
              fragment: HookEventsFragmentFragmentDoc,
            }) as any;

            return {
              ...existingHookevents,
              items: [newHookeventRef, ...existingHookevents.items],
            };
          },
        },
      });
    },
  });
  const applicationByIdResults = useApplicationByIdQuery({
    variables: { id: appId },
    fetchPolicy: 'cache-first',
  });
  const hookEventsResults = useHookEventsQuery({
    variables: {
      where: { applicationId: { eq: appId } },
      cursor: { limit: 100 },
    },
    fetchPolicy: 'network-only',
  });

  const [selectedHookEvent, setSelectedHookEvent] = useState<
    HookEventsFragmentFragment | undefined
  >();
  const loading = applicationByIdResults.loading || hookEventsResults.loading;
  const error =
    applicationByIdResults.error ||
    hookEventsResults.error ||
    newHookEventSubscriptionResults.error;

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const hookEvents = hookEventsResults.data?.hookEvents.items || [];
  // const appWebhookUrl = `${config.api.protocol}://${config.api.url}/webhook/${applicationByIdResults.data?.applicationById?.id}`;
  return (
    <div>
      <NavbarContainer />
      <div className="container-xxl mt-4">
        <nav className="navbar border-bottom mb-3">
          <div className="container-fluid p-0">
            <h1 className="navbar-text">
              {applicationByIdResults.data?.applicationById.name}
            </h1>
            <div className="d-flex">
              <Button
                link={`/app/${appId}/settings`}
                outline
                color="secondary"
                iconLeft={<Cog size={16} />}
                text="Setting"
              ></Button>
            </div>
          </div>
        </nav>

        <HookEventsList
          application={applicationByIdResults.data?.applicationById}
          hookEvents={hookEvents}
          selectedHookEvent={selectedHookEvent}
          onRowClick={(clickHookevent) =>
            setSelectedHookEvent(
              clickHookevent === selectedHookEvent ? undefined : clickHookevent,
            )
          }
          hasMore={hookEventsResults.data?.hookEvents.hasMore}
          onLoadMore={() =>
            hookEventsResults?.fetchMore({
              variables: {
                cursor: {
                  after: hookEvents[hookEvents.length - 1].id,
                  limit: 100,
                },
              },
              updateQuery(previousResult, { fetchMoreResult }) {
                const newItems = fetchMoreResult?.hookEvents.items || [];
                return {
                  ...previousResult,
                  hookEvents: {
                    ...previousResult.hookEvents,
                    hasMore: fetchMoreResult?.hookEvents.hasMore || false,
                    items: [...previousResult.hookEvents.items, ...newItems],
                  },
                };
              },
            })
          }
        />
      </div>
    </div>
  );
};
