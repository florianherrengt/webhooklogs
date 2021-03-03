interface Config {
  api: {
    url: string;
    protocol: 'http' | 'https';
  };
  ws: {
    url: string;
    protocol: 'ws' | 'wss';
  };
}

const protocol =
  (process.env.REACT_APP_API_PROTOCOL as Config['api']['protocol']) || 'http';

if (!['http', 'https'].includes(protocol)) {
  throw new Error(`invalid protocol ${protocol}`);
}

const wsProtocol =
  (process.env.REACT_APP_WS_PROTOCOL as Config['ws']['protocol']) || 'ws';

if (!['ws', 'wss'].includes(wsProtocol)) {
  throw new Error(`invalid protocol ${wsProtocol}`);
}

export const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL || 'localhost:3001/api',
    protocol,
  },
  ws: {
    url: process.env.REACT_APP_API_URL || 'localhost:3001/api',
    protocol: wsProtocol,
  },
};
