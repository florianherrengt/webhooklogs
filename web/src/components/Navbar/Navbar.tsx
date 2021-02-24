import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AppRouter';
import { User } from '../../helpers';

interface NavbarProps {
  me?: User | null;
}

export const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const auth = useAuth();
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <span className="navbar-brand h1">Hookhub</span>
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {auth.user?.username}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                className="dropdown-item"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
