import React from 'react';
import { Circle } from '@styled-icons/fa-solid';
import classNames from 'classnames';
import { Application, HookEventsFragmentFragment } from '../../helpers';
import { Button } from '..';
import { HookEventDetails } from './HookEventDetails';
import { config } from '../../config';
import { useDebounce } from 'react-use';

interface HookEventsListProps {
  application?: Pick<Application, 'id' | 'targetUrl'>;
  hookEvents?: HookEventsFragmentFragment[];
  selectedHookEvent?: HookEventsFragmentFragment;
  onRowClick?: (hookEvent: HookEventsFragmentFragment) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSearchChange?: (searchTerms: string) => void;
}

export const HookEventsList: React.FunctionComponent<HookEventsListProps> = (
  props,
) => {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [searchTerms, setSearchTerms] = React.useState('');
  useDebounce(
    () => {
      props.onSearchChange && props.onSearchChange(searchTerms);
    },
    200,
    [searchTerms],
  );
  const { hookEvents = [] } = props;
  React.useEffect(() => {
    if (hookEvents.length) {
      setHasLoaded(true);
    }
  }, [hookEvents]);
  const appWebhookUrl = `${config.api.protocol}://${config.api.url}/webhook/${props.application?.id}`;
  if (!hookEvents.length && !searchTerms && !hasLoaded) {
    return (
      <div>
        <p>
          This application has not received any events yet. Try to send a curl
          request:
        </p>

        <p className="font-monospace bg-light border p-2">
          {'curl '}
          {'--header "Content-Type: application/json" '}
          {'--data \'{"hello":"world"}\' '}
          {appWebhookUrl}
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="border-bottom pb-3 mb-3">
        <input
          type="text"
          className="form-control"
          id="search"
          name="search"
          placeholder="Search... (e.g 'post hello')"
          autoComplete="off"
          value={searchTerms}
          onChange={({ currentTarget }) => setSearchTerms(currentTarget.value)}
          required
        />
      </div>
      <ul className="list-group list-group-flush font-monospace mb-4">
        {hookEvents.map((hookEvent, index) => {
          const createdAt = new Date(parseInt(hookEvent.createdAt, 10));
          const isSelected = hookEvent.id === props.selectedHookEvent?.id;
          return (
            <div key={hookEvent.id}>
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => props.onRowClick && props.onRowClick(hookEvent)}
                className={classNames([
                  'list-group-item list-group-item-action border-bottom-0 border-start-0 border-end-0',
                  {
                    'list-group-item-primary': isSelected,
                    'border-top-0': index === 0,
                  },
                ])}
              >
                <div className="row">
                  <div className="col">
                    <Circle
                      className={classNames([
                        'me-2',
                        {
                          'text-success':
                            !hookEvent.targetResponse?.status ||
                            hookEvent.targetResponse?.status < 300,
                          'text-danger':
                            hookEvent.targetResponse?.status &&
                            hookEvent.targetResponse?.status > 300,
                        },
                      ])}
                      size={10}
                    />
                    {hookEvent.method} - {hookEvent.targetResponse?.status}{' '}
                    {hookEvent.path}
                  </div>
                  <div className="col-md-auto">
                    {createdAt.toLocaleDateString()}{' '}
                    {createdAt.toLocaleTimeString()}
                  </div>
                </div>
              </li>
              {isSelected ? (
                <div className="mt-4 mb-4">
                  <HookEventDetails
                    application={props.application}
                    hookEvent={hookEvent}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
      {props.hasMore ? (
        <div className="text-center mb-4">
          <Button onClick={props.onLoadMore} text="Load more" />
        </div>
      ) : null}
    </div>
  );
};
