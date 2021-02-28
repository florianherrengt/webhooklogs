import React from 'react';
import { routerPath } from '../AppRouter';
import { Alert } from '../components';
import { useGetPaymentDetailsQuery } from '../helpers';

interface PaymentCheckerContainerProps {}

export const PaymentCheckerContainer: React.FunctionComponent<PaymentCheckerContainerProps> = (
  props,
) => {
  const { data, loading, error } = useGetPaymentDetailsQuery();
  if (loading) {
    return null;
  }
  if (error || !data?.me) {
    return (
      <Alert
        text={`Error fetching payment information. Please contact support with this error: ${JSON.stringify(
          { error, data },
        )}.`}
        color="danger"
      />
    );
  }
  if (!data.me.hasPaymentMethod) {
    return (
      <Alert
        text="Add a payment method in your settings"
        btnProps={{ text: 'Settings', link: routerPath.accountSettings }}
      />
    );
  }
  if (!data.me.isSubscriptionValid) {
    return (
      <Alert
        text="Oops... There is an issue with your subscription. Check your payment details."
        color="danger"
        btnProps={{ text: 'Settings', link: routerPath.accountSettings }}
      />
    );
  }
  return null;
};
