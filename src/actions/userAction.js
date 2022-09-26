import axios from 'axios';
import {
  USER_EDIT_ERROR,
  USER_EDIT_LOADING,
  USER_EDIT_SUCCESS,
  USER_PROFILE_ERROR,
  USER_PROFILE_LOADING,
  USER_PROFILE_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_ERROR,
  USER_SIGNUP_LOADING,
  USER_SIGNUP_SUCCESS,
  USER_TOKEN_ERROR,
  USER_TOKEN_LOADING,
  USER_TOKEN_SUCCESS,
} from '../constants/userConstants';
import {
  removeUserInfoFromStorage,
  saveUserInfoFromStorage,
} from '../utils/localStorage';

export const fetchToken = (formData) => async (dispatch) => {
  dispatch({
    type: USER_TOKEN_LOADING,
  });

  try {
    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      formData,
    );

    dispatch({
      type: USER_TOKEN_SUCCESS,
      payload: { token: data.body.token, remember: formData.remember },
    });
  } catch (error) {
    dispatch({ type: USER_TOKEN_ERROR, payload: error.message });
  }
};

export const userProfile = (token) => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_LOADING });
  try {
    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    const {
      userSignin: { auth },
    } = getState();

    if (auth.remember) {
      saveUserInfoFromStorage(data.body, auth.jwtToken);
    }
  } catch (error) {
    dispatch({ type: USER_PROFILE_ERROR, payload: error.message });
  }
};

export const signout = () => async (dispatch) => {
  removeUserInfoFromStorage();
  dispatch({ type: USER_SIGNOUT });
};

export const editUserInfo = (formData) => async (dispatch, getState) => {
  dispatch({ type: USER_EDIT_LOADING });
  try {
    const {
      auth: { jwtToken },
    } = getState().userSignin;

    const { data } = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
    saveUserInfoFromStorage(data.body, jwtToken);
  } catch (error) {
    dispatch({ type: USER_EDIT_ERROR, payload: error.message });
  }
};

export const signup = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_LOADING });

  try {
    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/signup',
      formData,
    );
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_ERROR, payload: error.message });
  }
};
