import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../actions/userAction';
import Error from '../components/Error';
import Loading from '../components/Loading';

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: { message, loading, error },
  } = userSignin;

  const handleSubmit = (e) => {
    e.preventDefault();
    const [userName, pass, firstName, lastName] = e.target;

    if (userName.value && pass.value && firstName.value && lastName.value) {
      dispatch(
        signup({
          email: userName.value,
          password: pass.value,
          firstName: firstName.value,
          lastName: lastName.value,
        }),
      );
      navigate('/');
    }
  };

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign Up</h1>
        {loading && <Loading />}
        {error && <Error error={error} />}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input type="firstName" id="firstName" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input type="lastName" id="lastName" />
          </div>

          <button type="submit" className="sign-in-button">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
