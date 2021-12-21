import { ActionTypes } from "../constants/action-types";

const initialState = {
  collections: [],
  loading: false,
};

export const collectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_COLLECTIONS_LOADING:
      return { ...state, loading: true, error: "" };
    case ActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return { ...state, loading: false, error: "", collections: payload };
    case ActionTypes.FETCH_COLLECTIONS_ERROR:
      return { ...state, loading: false, error: payload };
    case ActionTypes.ADD_COLLECTION_LOADING:
      return { ...state, loading: true, error: "" };
    case ActionTypes.ADD_COLLECTION_SUCCESS:
      return { ...state, loading: false, error: "", collections: payload };
    case ActionTypes.ADD_COLLECTION_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
