import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken, userProfile } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const {
    auth: { loading: loadingAuth, error: errorAuth, jwtToken },
    userInfo: { message, error },
  } = userSignin;

  useEffect(() => {
    if (jwtToken) {
      dispatch(userProfile(jwtToken));
      navigate('/');
    }
  }, [navigate, jwtToken, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [userName, pass, remember] = e.target;
    dispatch(
      fetchToken({
        email: userName.value,
        password: pass.value,
        remember: remember.checked,
      }),
    );
    console.dir(e.target);
  };

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        {loadingAuth && <p>loading...</p>}
        {errorAuth && <p>{errorAuth}</p>}
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="pass" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignInPage;