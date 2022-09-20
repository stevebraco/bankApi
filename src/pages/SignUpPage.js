import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, token, userProfile } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'

// import { NavLink } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const {
    userInfo: { message, isSignUp, loading, error },
  } = userSignin

  useEffect(() => {
    if (isSignUp) {
      navigate('/')
    }
  }, [dispatch, isSignUp, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const [userName, pass, firstName, lastName] = e.target
    dispatch(
      signup({
        email: userName.value,
        password: pass.value,
        firstName: firstName.value,
        lastName: lastName.value,
      })
    )
  }

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign Up</h1>
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
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

          <button className="sign-in-button">Sign Up</button>
        </form>
      </section>
    </div>
  )
}

export default SignUp
