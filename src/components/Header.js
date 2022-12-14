import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../actions/userAction';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo, auth } = userSignin;

  const handleSignout = () => {
    setIsOpen(false);
    dispatch(signout());
  };

  const handleIcon = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-icon" onClick={handleIcon}>
        <i className="fa fa-bars" />
      </div>
      <div className={isOpen ? 'main-nav-link main-nav-open' : 'main-nav-link'}>
        {auth?.jwtToken && userInfo?.firstName ? (
          <>
            <NavLink
              to="/profile"
              className="main-nav-item"
              onClick={handleCloseMenu}
            >
              <i className="fa fa-user-circle" />
              {userInfo?.firstName}
            </NavLink>
            <NavLink to="/" onClick={handleSignout} className="main-nav-item">
              <i className="fa fa-sign-out" />
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/signin"
              className="main-nav-item"
              onClick={handleCloseMenu}
            >
              <i className="fa fa-user-circle" />
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="main-nav-item"
              onClick={handleCloseMenu}
            >
              <i className="fa fa-user-circle" />
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
