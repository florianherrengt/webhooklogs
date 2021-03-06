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
  useUpdateHookEventSubscription,
} from '../../helpers';
import { NavbarContainer } from '../../containers';
import { useParams } from 'react-router-dom';

interface AppDetailsPageProps {}

export const AppDetailsPage: React.FunctionComponent<AppDetailsPageProps> = (
  props,
) => {
  const { id: applicationId } = useParams<{ id: string }>();

  const newHookEventSubscriptionResults = useNewHookEventSubscription({
    variables: { applicationId },
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
  useUpdateHookEventSubscription({
    variables: { applicationId },
    onSubscriptionData({ subscriptionData, client }) {
      client.cache.modify({
        fields: {
          hookEvents(
            existingHookevents: HookEventsQuery['hookEvents'],
          ): HookEventsQuery['hookEvents'] {
            const newHookeventRef = client.cache.writeFragment({
              data: subscriptionData.data?.updateHookEvent,
              fragment: HookEventsFragmentFragmentDoc,
            }) as any;
            if (
              !subscriptionData.data ||
              !subscriptionData.data.updateHookEvent?.id
            ) {
              return existingHookevents;
            }
            return {
              ...existingHookevents,
              items: [
                newHookeventRef,
                ...existingHookevents.items.filter(
                  (item) =>
                    item.id !== subscriptionData.data?.updateHookEvent?.id,
                ),
              ],
            };
          },
        },
      });
    },
  });
  const applicationByIdResults = useApplicationByIdQuery({
    variables: { id: applicationId },
    fetchPolicy: 'cache-first',
  });
  const hookEventsResults = useHookEventsQuery({
    variables: {
      where: { applicationId: { eq: applicationId } },
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
                link={`/app/${applicationId}/settings`}
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
          onSearchChange={(searchTerms) => {
            setSelectedHookEvent(undefined);
            hookEventsResults.refetch({
              where: { applicationId: { eq: applicationId } },
              cursor: { limit: 100 },
              searchTerms,
            });
          }}
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
