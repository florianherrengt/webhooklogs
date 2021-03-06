import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Application, User } from '../../helpers';
import { config } from '../../config';

interface FormData {
  name: string;
  targetUrl?: string;
}

interface AppFormProps {
  application?: Pick<Application, 'id' | 'name' | 'targetUrl'>;
  user?: Pick<User, 'apiKey'>;
  loading?: boolean;
  onSubmit: (data: FormData) => void;
  onDelete?: () => void;
}

const DangerZone: React.FunctionComponent<AppFormProps> = (props) => (
  <div>
    <h6 className="mt-3 mb-3">Danger Zone</h6>
    <div className="border border-danger p-3 rounded">
      <Button
        onClick={() =>
          window.confirm('Are you sure?') && props.onDelete && props.onDelete()
        }
        disabled={props.loading}
        color="danger"
        text="Delete application"
      />
    </div>
  </div>
);

export const AppForm = (props: AppFormProps) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const appWebhookUrl = `${config.api.protocol}://${config.api.url}/webhook/${props.application?.id}`;
  return (
    <div>
      <form
        className="border p-3 rounded"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <div className="border-bottom mb-4 pb-3">
          {props.application ? (
            <div className="mb-3">
              <label htmlFor="endpoint" className="form-label">
                <b>Endpoint</b>
              </label>
              <div id="endpoint">{appWebhookUrl}</div>
            </div>
          ) : null}

          {props.application ? (
            <div className="mb-3">
              <label htmlFor="download-btn" className="form-label">
                <b>Replay requests on localhost</b>
              </label>
              <div>
                <p>Download the client and replay your request to localhost.</p>
                <p className="font-monospace">
                  ./wsClient --id {props.application.id} --api-key{' '}
                  {props.user?.apiKey} --target http://localhost:3002
                </p>
              </div>
              <div>
                <Button
                  link="https://minio.specian.co.uk/webhooklogs-ws-client/wsClient"
                  id="download-btn"
                  text="Download"
                  external
                ></Button>
              </div>
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <b>Name</b>
            </label>
            <div>
              <input
                ref={register({ required: true, maxLength: 60 })}
                type="text"
                className="form-control"
                id="name"
                name="name"
                defaultValue={props.application?.name}
                placeholder="Enter application name..."
                disabled={props.loading}
                required
              />
              {errors.name?.type === 'maxLength' && <p>Too long</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="targetUrl" className="form-label">
              <b>Target (optional)</b>
            </label>
            <div>
              <input
                ref={register({ required: false })}
                type="url"
                className="form-control"
                defaultValue={props.application?.targetUrl || ''}
                id="targetUrl"
                name="targetUrl"
                placeholder="https://your-api-endpoint.com"
                disabled={props.loading}
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            disabled={props.loading}
            color="success"
            text={
              props.application ? 'Update application' : 'Create application'
            }
          />
        </div>
      </form>
      {props.application ? <DangerZone {...props} /> : null}
    </div>
  );
};
