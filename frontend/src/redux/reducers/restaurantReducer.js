import { ActionTypes } from "../constants/action-types";

const initialState = {
  restaurants: [],
  loading: false,
  error: "",
};

export const restaurantsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_RESTAURANTS_LOADING:
      return { ...state, loading: true, error: "" };
    case ActionTypes.FETCH_RESTAURANTS_SUCCESS:
      return { ...state, loading: false, restaurants: payload, error: "" };
    case ActionTypes.FETCH_RESTAURANTS_ERROR:
      return { ...state, loading: false, error: payload };
    case ActionTypes.SAVE_TO_COLLECTIONS_LOADING:
      return { ...state, loading: true, error: "" };
    case ActionTypes.SAVE_TO_COLLECTIONS_SUCCESS:
      const old = [...state.restaurants];
      const index = old.findIndex((r) => r._id === payload.id);
      old[index].collection = payload.collection;
      return { ...state, loading: false, error: "", restaurants: old };
    case ActionTypes.SAVE_TO_COLLECTIONS_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

