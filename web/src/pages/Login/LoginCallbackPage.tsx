import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';
import { routerPath } from '../../AppRouter';

export const LoginCallbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const history = useHistory();
  const {
    params: { provider },
  } = useRouteMatch<{ provider: string }>();

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        const { data, status } = await axios.get(
          `${config.api.protocol}://${config.api.url}/auth/${provider}/callback${location.search}`,
        );
        if (status !== 200) {
          setError(`Something went wrong. Status: ${status}`);
        }
        if (!data.token) {
          setError(`Something went wrong. No token returned: ${data}`);
        }
        window.localStorage.setItem('token', data.token);
        window.location.replace(routerPath.apps);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchToken();
  }, [location.search, provider, history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div />;
};
