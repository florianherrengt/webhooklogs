import React, { useState } from 'react';
import { HookEvent, HookEventsFragmentFragment } from '../../helpers';
import ReactJson from 'react-json-view';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

interface HookEventDetailsProps {
  hookEvent?: HookEventsFragmentFragment;
}

const PayloadDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  return (
    <div className="p-1 overflow-scroll">
      {props.hookEvent?.targetResponse?.data ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          enableClipboard={false}
          src={JSON.parse(props.hookEvent?.body)}
        />
      ) : null}
    </div>
  );
};

const HeadersDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  return (
    <div className="p-1 overflow-scroll">
      {props.hookEvent?.targetResponse?.headers ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          enableClipboard={false}
          src={JSON.parse(props.hookEvent?.headers)}
        />
      ) : null}
    </div>
  );
};

const ResponseDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  return (
    <div className="p-1 overflow-scroll">
      {props.hookEvent?.targetResponse?.headers ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          enableClipboard={false}
          src={JSON.parse(props.hookEvent?.targetResponse?.data)}
        />
      ) : null}
    </div>
  );
};

enum Tab {
  Payload = 'payload',
  Headers = 'headers',
  Response = 'response',
}

const getTab = (history: ReturnType<typeof useHistory>): Tab => {
  const hash = history.location.hash.slice(1);
  if (hash === Tab.Payload) {
    return Tab.Payload;
  }
  if (hash === Tab.Headers) {
    return Tab.Headers;
  }
  if (hash === Tab.Response) {
    return Tab.Response;
  }
  return Tab.Payload;
};

export const HookEventDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  const history = useHistory();
  const selectedTab = getTab(history);

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={classNames([
              'nav-link',
              { active: selectedTab === Tab.Payload },
            ])}
            aria-current="page"
            href="#payload"
          >
            Payload
          </a>
        </li>
        <li className="nav-item">
          <a
            className={classNames([
              'nav-link',
              { active: selectedTab === Tab.Headers },
            ])}
            href="#headers"
          >
            Headers
          </a>
        </li>
        <li className="nav-item">
          <a
            className={classNames([
              'nav-link',
              { active: selectedTab === Tab.Response },
            ])}
            href="#response"
          >
            Response
          </a>
        </li>
      </ul>
      {selectedTab === Tab.Payload ? <PayloadDetails {...props} /> : null}
      {selectedTab === Tab.Headers ? <HeadersDetails {...props} /> : null}
      {selectedTab === Tab.Response ? <ResponseDetails {...props} /> : null}
    </div>
  );
};
