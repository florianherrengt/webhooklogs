import React from 'react';
import { useHistory } from 'react-router-dom';
import { routerPath } from '../../AppRouter';
import { AccountSettings } from '../../components/User/AccountSettings';
import {
  useMeQuery,
  useGetUserAccountSettingsQuery,
  useGetPaymentDetailsQuery,
  useUpdateAccountSettingsMutation,
  useGetUserStripeCustomerPortalLinkLazyQuery,
} from '../../helpers';

export const SettingsPage: React.FunctionComponent = () => {
  const history = useHistory();
  const getUserAccountSettingsResults = useGetUserAccountSettingsQuery();

  const [
    getUserStripeCustomerPortalLink,
    getUserStripeCustomerPortalLinkResults,
  ] = useGetUserStripeCustomerPortalLinkLazyQuery();

  const [
    updateAccountSettings,
    updateAccountSettingsResults,
  ] = useUpdateAccountSettingsMutation();

  if (
    getUserStripeCustomerPortalLinkResults.data?.me?.stripeCustomerPortalLink
  ) {
    window.open(
      getUserStripeCustomerPortalLinkResults.data.me.stripeCustomerPortalLink,
    );
  }

  const loading = getUserAccountSettingsResults.loading;
  const error =
    getUserAccountSettingsResults.error ||
    getUserStripeCustomerPortalLinkResults.error ||
    updateAccountSettingsResults.error;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... Something went wrong. {error.message}</div>;
  }
  if (!getUserAccountSettingsResults.data?.me) {
    return (
      <div>
        Oops... Something when wrong. Please report this error with the
        following data:{' '}
        {JSON.stringify({
          getUserAccountSettingsResults,
        })}
      </div>
    );
  }
  return (
    <AccountSettings
      loading={loading || updateAccountSettingsResults.loading}
      onSubmit={async (input) => {
        await updateAccountSettings({ variables: { input } });
        history.push(routerPath.apps);
      }}
      me={getUserAccountSettingsResults.data.me}
      onManageCardsClick={() => getUserStripeCustomerPortalLink()}
    />
  );
};