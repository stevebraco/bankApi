import {
  USER_TOKEN_LOADING,
  USER_TOKEN_ERROR,
  USER_TOKEN_SUCCESS,
  USER_PROFILE_LOADING,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
  USER_SIGNOUT,
  USER_EDIT_LOADING,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
  USER_SIGNUP_LOADING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
} from '../constants/userConstants';

const userReducer = (state, action) => {
  const { userSignin } = state;

  switch (action.type) {
    case USER_TOKEN_LOADING:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          auth: { ...userSignin.auth, loading: true },
        },
      };
    case USER_TOKEN_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          auth: {
            loading: false,
            jwtToken: action.payload.token,
            remember: action.payload.remember,
          },
        },
      };

    case USER_TOKEN_ERROR:
      return {
        ...state,
        userSignin: {
          auth: { ...userSignin, loading: false, error: action.payload },
        },
      };

    case USER_PROFILE_LOADING:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            loading: true,
          },
        },
      };

    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...action.payload.body,
            message: action.payload.message,
          },
        },
      };
    }
    case USER_PROFILE_ERROR:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            loading: false,
            error: action.payload,
          },
        },
      };

    case USER_SIGNOUT:
      return {
        ...state,
        userSignin: {
          auth: {},
          userInfo: {},
        },
      };

    case USER_EDIT_LOADING:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            loading: true,
          },
        },
      };

    case USER_EDIT_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            loading: false,
            firstName: action.payload.body.firstName,
            lastName: action.payload.body.lastName,
            message: action.payload.message,
          },
        },
      };

    case USER_EDIT_ERROR:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            loading: false,
            error: action.payload,
          },
        },
      };

    case USER_SIGNUP_LOADING:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            loading: true,
          },
        },
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            isSignUp: true,
            message: action.payload,
          },
        },
      };

    case USER_SIGNUP_ERROR:
      return {
        ...state,
        userSignin: {
          ...userSignin,
          userInfo: {
            ...userSignin.userInfo,
            loading: false,
            error: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
