import {createSlice} from '@reduxjs/toolkit';
import qualityService from '../services/qualityService';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (store) => {
      store.isLoading = true;
    },
    qualitiesReceived: (store, action) => {
      store.entities = action.payload;
      store.isLoading = false;
    },
    qualitiesRequestFailed: (store, action) => {
      store.error = action.payload;
      store.isLoading = false;
    }
  }
});

const {reducer: qualitiesReducer, actions} = qualitiesSlice;
const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = actions;

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested());
  try {
    const {content} = await qualityService.get();
    dispatch(qualitiesReceived(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
};

export default qualitiesReducer;
