import React from 'react';
import classNames from 'classnames';
import ReactJson from 'react-json-view';
import { useHistory } from 'react-router-dom';
import { Application, HookEventsFragmentFragment } from '../../helpers';

interface HookEventDetailsProps {
  application?: Pick<Application, 'targetUrl'>;
  hookEvent?: HookEventsFragmentFragment;
}

const PayloadDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  return (
    <div className="p-1 overflow-scroll">
      {props.hookEvent ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          enableClipboard={false}
          src={JSON.parse(props.hookEvent.body)}
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
      {props.hookEvent ? (
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
      {props.hookEvent?.targetResponse?.data ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          enableClipboard={false}
          src={JSON.parse(props.hookEvent?.targetResponse?.data)}
        />
      ) : (
        <div>
          {!props.application?.targetUrl
            ? 'No target URL set for this application. You can change this in the settings.'
            : 'No response'}
        </div>
      )}
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
