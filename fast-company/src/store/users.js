import {createAction, createSlice} from '@reduxjs/toolkit';
import authService from '../services/authService';
import localStorageService from '../services/localStorageService';
import userService from '../services/userService';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    }
  }
});

const {reducer: usersReducer, actions} = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/userCreateFailed');

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const {content} = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (error) {
    dispatch(userCreateFailed(error.message));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const {content} = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const signUp =
  ({email, password, ...rest}) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({email, password});
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({userId: data.localId}));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const login =
  ({payload, redirect}) =>
  async (dispatch) => {
    dispatch(authRequested());
    const {email, password} = payload;
    try {
      const data = await authService.login({email, password});
      dispatch(authRequestSuccess({userId: data.localId}));
      localStorageService.setTokens(data);
      history.push(redirect);
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export default usersReducer;
