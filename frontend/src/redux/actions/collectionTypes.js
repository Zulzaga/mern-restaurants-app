import { ActionTypes } from "../constants/action-types";
import axios from "axios";

export const fetchCollections = () => async (dispatch) => {
  dispatch({ type: ActionTypes.FETCH_COLLECTIONS_LOADING });
  try {
    const response = await axios.get(
      "https://glacial-hollows-88951.herokuapp.com/api/users/61c00e3dfde8b8dd7b70c316/collections"
    );

    dispatch({
      type: ActionTypes.FETCH_COLLECTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ActionTypes.FETCH_COLLECTIONS_ERROR,
      payload: e,
    });
  }
};

export const addCollection = (name) => async (dispatch) => {
  dispatch({ type: ActionTypes.ADD_COLLECTION_LOADING });

  try {
    const response = await axios.post(
      "https://glacial-hollows-88951.herokuapp.com/api/users/61c00e3dfde8b8dd7b70c316/collections",
      {
        name,
      }
    );

    dispatch({
      type: ActionTypes.ADD_COLLECTION_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ActionTypes.ADD_COLLECTION_ERROR,
      payload: e,
    });
  }
};

