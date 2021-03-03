import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../helpers';
import { ExchangeAlt } from '@styled-icons/fa-solid';

interface NavbarProps {
  me?: Pick<User, 'username'> | null;
}

export const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand h1 text-decoration-none text-dark" to="/">
          WebhookLogs
        </Link>
        {props.me ? (
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {props.me?.username}
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
        ) : null}
      </div>
    </nav>
  );
};
