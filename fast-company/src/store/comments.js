import {createAction, createSlice} from '@reduxjs/toolkit';
import commentService from '../services/commentService';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentAdded: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentCreateFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});

const {reducer: commentsReducer, actions} = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentAdded,
  commentCreateFailed
} = actions;

const commentCreateRequested = createAction('comments/commentCreateRequested');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const {content} = await commentService.get(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const {content} = await commentService.create(payload);
    dispatch(commentAdded(content));
  } catch (error) {
    dispatch(commentCreateFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
