import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';

interface FormData {
  name: string;
  targetUrl: string;
}

interface AppNewProps {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export const AppNew = (props: AppNewProps) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  return (
    <div>
      <div className="border-bottom mb-4 pb-3">
        <h1>Create a new application</h1>
        <p>
          An application receives data, store it and proxy it to your target.
        </p>
      </div>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="border-bottom mb-4 pb-3">
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-1 col-form-label">
              <b>Name</b>
            </label>
            <div className="col-sm-11">
              <input
                ref={register({ required: true, maxLength: 60 })}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter application name..."
                disabled={props.loading}
                required
              />
              {errors.name?.type === 'maxLength' && <p>Too long</p>}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="targetUrl" className="col-sm-1 col-form-label">
              <b>Target</b>
            </label>
            <div className="col-sm-11">
              <input
                ref={register({ required: true })}
                type="url"
                className="form-control"
                id="targetUrl"
                name="targetUrl"
                placeholder="https://your-api-endpoint.com"
                disabled={props.loading}
                required
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            disabled={props.loading}
            type="success"
            text="Create application"
          />
        </div>
      </form>
    </div>
  );
};
