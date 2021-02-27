import React from 'react';
import { useAuth } from '../AppRouter';
import { Navbar } from '../components';

export const NavbarContainer: React.FunctionComponent = (props) => {
  const auth = useAuth();
  return <Navbar me={auth.user} />;
};
