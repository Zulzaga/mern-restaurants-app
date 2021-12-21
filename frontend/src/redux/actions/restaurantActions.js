import { ActionTypes } from "../constants/action-types";
import axios from "axios";

export const fetchRestaurants = (name, date) => async (dispatch) => {
  dispatch({
    type: ActionTypes.FETCH_RESTAURANTS_LOADING,
  });

  try {
    const params = { name, datetime: date };
    const response = await axios.get(
      "https://glacial-hollows-88951.herokuapp.com/api/restaurants",
      {
        params,
      }
    );
    const restaurants = response.data;

    const response_2 = await axios.get(
      "https://glacial-hollows-88951.herokuapp.com/api/users/61c00e3dfde8b8dd7b70c316/collections"
    );
    const collections = response_2.data;

    for (let i = 0; i < collections.length; i++) {
      for (let j = 0; j < collections[i].restaurants.length; j++) {
        const rest = restaurants.findIndex(
          (r) => r._id === collections[i].restaurants[j]._id
        );

        if (restaurants[rest]) {
          restaurants[rest].collection = collections[i].name;
        }
      }
    }

    dispatch({
      type: ActionTypes.FETCH_RESTAURANTS_SUCCESS,
      payload: restaurants,
    });
  } catch (e) {
    dispatch({
      type: ActionTypes.FETCH_RESTAURANTS_ERROR,
      payload: e,
    });
  }
};

export const addRestaurantToCollections =
  (collection, id) => async (dispatch) => {
    dispatch({
      type: ActionTypes.SAVE_TO_COLLECTIONS_LOADING,
    });

    try {
      await axios.post(
        "https://glacial-hollows-88951.herokuapp.com/api/users/61c00e3dfde8b8dd7b70c316/collections/" +
          collection,
        {
          id,
        }
      );

      dispatch({
        type: ActionTypes.SAVE_TO_COLLECTIONS_SUCCESS,
        payload: {
          id,
          collection,
        },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_TO_COLLECTIONS_ERROR,
        payload: e,
      });
    }
  };

