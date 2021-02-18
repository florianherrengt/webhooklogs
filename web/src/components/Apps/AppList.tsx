import React from 'react';
import { Plus } from '@styled-icons/fa-solid';
import { ApplicationFieldsFragment } from '../../helpers';
import { Button } from '../Button';

interface AppListProps {
  searchValue?: string;
  apps?: ApplicationFieldsFragment[];
  onSearchChange?: (value: string) => void;
}

const Topbar: React.FunctionComponent<AppListProps> = (props) => (
  <div>
    <h1>Applications</h1>
    <div className="row">
      <div className="col-sm input-group ">
        <input
          onChange={(event) =>
            props.onSearchChange && props.onSearchChange(event.target.value)
          }
          type="text"
          className="form-control"
          id="validationCustom01"
          value={props.searchValue}
          placeholder="Search applications..."
        />
      </div>
      <div className="col-md-auto">
        <Button iconLeft={<Plus size="16" />} link="/app/new" text="New" />
      </div>
    </div>
  </div>
);

export const AppList: React.FunctionComponent<AppListProps> = (props) => {
  return (
    <div>
      <Topbar {...props} />
      <ul className="list-group list-group-flush">
        {props.apps
          ?.filter((app) =>
            props.searchValue ? app.name.includes(props.searchValue) : true,
          )
          .map((app) => (
            <li
              style={{ paddingTop: 24, paddingBottom: 24 }}
              className="list-group-item"
            >
              <h6>
                <a href={`/app/${app.id}`}>{app.name}</a>
              </h6>
              <p>{app.targetUrl}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
