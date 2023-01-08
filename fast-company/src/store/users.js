import {createSlice} from '@reduxjs/toolkit';
import userService from '../services/userService';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    usersRequested: (store) => {
      store.isLoading = true;
    },
    usersReceived: (store, action) => {
      store.entities = action.payload;
      store.isLoading = false;
    },
    usersRequestFailed: (store, action) => {
      store.error = action.payload;
      store.isLoading = false;
    }
  }
});

const {reducer: usersReducer, actions} = usersSlice;
const {usersRequested, usersReceived, usersRequestFailed} = actions;

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

export default usersReducer;
