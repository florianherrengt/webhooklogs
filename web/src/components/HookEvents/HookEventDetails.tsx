import React from 'react';
import { HookEvent, HookEventsFragmentFragment } from '../../helpers';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

interface HookEventDetailsProps {
  hookEvent?: HookEventsFragmentFragment;
}

const PayloadDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  const Container = styled.div`
    overflow: scroll;
  `;
  return (
    <Container>
      {props.hookEvent?.targetResponse?.data ? (
        <ReactJson
          name={false}
          displayDataTypes={false}
          src={JSON.parse(props.hookEvent?.targetResponse?.data)}
        />
      ) : null}
    </Container>
  );
};

export const HookEventDetails: React.FunctionComponent<HookEventDetailsProps> = (
  props,
) => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#payload">
            Payload
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#headers">
            Headers
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#response">
            Response
          </a>
        </li>
      </ul>
      <PayloadDetails {...props} />
    </div>
  );
};
