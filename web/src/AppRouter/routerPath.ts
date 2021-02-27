export const routerPath = {
  auth: '/auth',
  authCallback: (provider: string) => `auth/${provider}/callback`,
  apps: '/apps',
  newApp: '/apps/new',
  appDetails: (id: string) => `/app/${id}`,
  appSettings: (id: string) => `/app/${id}/settings`,
  accountSettings: '/settings',
};
