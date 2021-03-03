import React from 'react';
import { Github } from '@styled-icons/fa-brands';

import { Button } from '../Button';
import { config } from '../../config';

export const Login = () => {
  return (
    <div className="container-sm">
      <h2 className="text-center mb-4 mt-4">Welcome to WebhookLogs</h2>
      <div className="card p-3 w-50 mx-auto">
        <Button
          style={{ width: 280, margin: 'auto' }}
          external
          link={`${config.api.protocol}://${config.api.url}/auth/github`}
          iconLeft={<Github size={15} />}
          color="dark"
          outline
          text="Sign in with Github"
        />
      </div>
    </div>
  );
};
