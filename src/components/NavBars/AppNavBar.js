import { useRef } from 'react';

import MouseClickWrapper from '../MouseClickWrapper';
import { userLogout } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

export default function AppNavBar({ isDrawerOpen, setIsDrawerOpen }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const avatarMenu = useRef();
  console.log(user, 'main');

  const history = useHistory();
  const handleLogout = () => {
    dispatch(userLogout());
    history.go('/login');
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
          class="navbar-burger ml-0"
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
          <div ref={avatarMenu} class="dropdown is-right">
            <div class="dropdown-trigger ">
              <button
                class="app-navbar-avatar-menu-button"
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
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <span class="dropdown-item has-text-weight-semibold">
                  {user.fullName}
                </span>

                <hr class="dropdown-divider" />
                <span class="dropdown-item is-clickable" onClick={handleLogout}>
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
