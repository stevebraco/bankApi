import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUserInfo } from '../actions/userAction';

const UserPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: { firstName, lastName, loading, error, message },
    auth: { jwtToken },
  } = userSignin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate('/');
    }
  });

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSumit = (e) => {
    e.preventDefault();
    const [firstname, lastname] = e.target;

    if (firstname.value && lastname.value) {
      dispatch(
        editUserInfo({ firstName: firstname.value, lastName: lastname.value }),
      );
    }

    setIsEdit(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="main bg-dark">
      <div className="header">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        {isEdit ? (
          <form onSubmit={handleSumit}>
            <h1>Welcome back</h1>
            <div className="input-edit">
              <input type="text" defaultValue={firstName} />
              <input type="text" defaultValue={lastName} />
            </div>
            <div className="button-wrapper-edit">
              <button type="submit" className="edit-button">
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="edit-button"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {`${firstName} ${lastName}!`}
            </h1>
            <button type="button" className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="button" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="button" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button type="button" className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
