import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../helpers';
import { Button } from '../Button';
import { ExternalLinkAlt } from '@styled-icons/fa-solid';

export interface AccountSettingsFormProps {
  onSubmit: (input: AccountSettingsFormData) => void;
  loading: boolean;
  me: Pick<
    User,
    'username' | 'email' | 'hasPaymentMethod' | 'isSubscriptionValid'
  >;
  onManageCardsClick: () => void;
}

interface AccountSettingsFormData {
  username: string;
  email: string;
}

export const AccountSettingsForm: React.FunctionComponent<AccountSettingsFormProps> = (
  props,
) => {
  const { register, handleSubmit, errors } = useForm<AccountSettingsFormData>();
  return (
    <form
      className="border p-3 rounded "
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <div className="border-bottom mb-4 pb-3">
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <div>
            <input
              ref={register({ required: true, maxLength: 60 })}
              type="text"
              className="form-control"
              id="username"
              name="username"
              defaultValue={props.me.username}
              placeholder="Enter your username..."
              disabled={props.loading}
              required
            />
            {errors.username?.type === 'maxLength' && <p>Too long</p>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <div>
            <input
              ref={register({ required: true })}
              type="email"
              className="form-control"
              defaultValue={props.me.email || ''}
              id="email"
              name="email"
              placeholder="Enter your email..."
              disabled={props.loading}
              required
            />
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="manage-payment" className="form-label fw-bold">
            Payment method
          </label>
          <div>
            <Button
              onClick={(event: Event) => {
                event.preventDefault();
                props.onManageCardsClick();
              }}
              id="manage-payment"
              text="Manage cards"
              iconLeft={<ExternalLinkAlt size={16} />}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          disabled={props.loading}
          color="success"
          text={'Update settings'}
        />
      </div>
    </form>
  );
};
