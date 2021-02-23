interface Config {
  api: {
    url: string;
    protocol: 'http' | 'https';
  };
}

export const config: Config = {
  api: {
    url: 'localhost:3001',
    protocol: 'http',
  },
};
