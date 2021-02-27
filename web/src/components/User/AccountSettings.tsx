import React from 'react';
import { NavbarContainer } from '../../containers';
import {
  AccountSettingsForm,
  AccountSettingsFormProps,
} from '../AccountSettings';

interface AccountSettingsProps extends AccountSettingsFormProps {}

export const AccountSettings: React.FunctionComponent<AccountSettingsProps> = (
  props,
) => {
  return (
    <div>
      <NavbarContainer />
      <div className="container mt-4">
        <div className="border-bottom mb-4 pb-3">
          <h1>Account setting</h1>
          <p>Manage your account and payment methods.</p>
        </div>
        <div>
          <AccountSettingsForm {...props} />
        </div>
      </div>
    </div>
  );
};
