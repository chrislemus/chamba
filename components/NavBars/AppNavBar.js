import { useRef } from 'react';

import MouseClickWrapper from '../MouseClickWrapper';
import { userLogout } from '../../actions/userActions';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

export default function AppNavBar({ isDrawerOpen, setIsDrawerOpen }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const avatarMenu = useRef();

  const router = useRouter();
  const handleLogout = () => {
    dispatch(userLogout());
    router.push('/login');
  };

  const displayAvatarMenu = () => {
    if (!avatarMenu?.current?.classList?.contains('is-active')) {
      avatarMenu.current.classList.add('is-active');
    }
  };
  const hideAvatarMenu = () => {
    avatarMenu?.current?.classList?.remove('is-active');
  };

  return (
    <div position="static" className="app-navbar">
      <div className="app-navbar-left is-hidden-desktop">
        <span
          role="button"
          className="navbar-burger ml-0"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div className="app-navbar-brand">
        <p className="navbar-item has-text-centered has-text-weight-bold">
          Service Field CRM
        </p>
      </div>
      <div className="app-navbar-right">
        <MouseClickWrapper
          onClicked={displayAvatarMenu}
          onClickedOut={hideAvatarMenu}
        >
          <div ref={avatarMenu} className="dropdown is-right">
            <div className="dropdown-trigger ">
              <button
                className="app-navbar-avatar-menu-button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <p className="has-text-white has-text-centered has-text-weight-bold">
                  {user?.fullName &&
                    user.fullName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                      .toUpperCase()}
                </p>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <span className="dropdown-item has-text-weight-semibold">
                  {user.fullName}
                </span>

                <hr className="dropdown-divider" />
                <span
                  className="dropdown-item is-clickable"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        </MouseClickWrapper>
      </div>
    </div>
  );
}
