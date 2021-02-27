import React from 'react';
import { Circle } from '@styled-icons/fa-solid';
import classNames from 'classnames';
import { HookEventsFragmentFragment } from '../../helpers';

interface HookEventsListProps {
  hookEvents?: HookEventsFragmentFragment[];
  newHookEvents?: HookEventsFragmentFragment[];
  selectedHookEvent?: HookEventsFragmentFragment;
  onRowClick?: (hookEvent: HookEventsFragmentFragment) => void;
}

export const HookEventsList: React.FunctionComponent<HookEventsListProps> = (
  props,
) => {
  const { hookEvents = [] } = props;

  return (
    <div>
      <ul className="list-group list-group-flush font-monospace">
        {hookEvents.map((hookEvent) => {
          const createdAt = new Date(parseInt(hookEvent.createdAt, 10));
          return (
            <li
              style={{ cursor: 'pointer' }}
              key={hookEvent.id}
              onClick={() => props.onRowClick && props.onRowClick(hookEvent)}
              className={classNames([
                'list-group-item list-group-item-action',
                {
                  'list-group-item-primary':
                    hookEvent.id === props.selectedHookEvent?.id,
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
          );
        })}
      </ul>
    </div>
  );
};
