import React from 'react';
import { Circle } from '@styled-icons/fa-solid';

export const HookEventsList: React.FunctionComponent = () => {
  return (
    <div>
      <ul className="list-group list-group-flush font-monospace">
        <li className="list-group-item  list-group-item-action">An item</li>
        <li className="list-group-item  list-group-item-action">
          <div className="row">
            <div className="col">
              <Circle className="me-2 text-success" size={10} />
              POST - /
            </div>
            <div className="col-md-auto">01/20/2000s </div>
          </div>
        </li>
        <li className="list-group-item  list-group-item-action">
          A third item
        </li>
        <li className="list-group-item  list-group-item-action">
          A fourth item
        </li>
        <li className="list-group-item  list-group-item-action">
          And a fifth one
        </li>
      </ul>
    </div>
  );
};
