import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducers';
import { fetchUserInfoFromStorage } from './utils/localStorage';

const initialState = {
  userSignin: fetchUserInfoFromStorage() ?? {
    auth: {
      jwtToken: '',
    },
    userInfo: {},
  },
};

const reducer = userReducer;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
