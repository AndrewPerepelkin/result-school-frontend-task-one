import {createSlice} from '@reduxjs/toolkit';
import commentService from '../services/commentService';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (store) => {
      store.isLoading = true;
    },
    commentsReceived: (store, action) => {
      store.entities = action.payload;
      store.isLoading = false;
    },
    commentsRequestFailed: (store, action) => {
      store.error = action.payload;
      store.isLoading = false;
    }
  }
});

const {reducer: commentsReducer, actions} = commentsSlice;
const {commentsRequested, commentsReceived, commentsRequestFailed} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const {content} = await commentService.get(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
