import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import Restaurant from "./Restaurant";
import styles from "./Restaurants.module.css";
import {
  addRestaurantToCollections,
  fetchRestaurants,
} from "../redux/actions/restaurantActions";
import { fetchCollections } from "../redux/actions/collectionTypes";

const Restaurants = () => {
  const { restaurants, loading } = useSelector((state) => state.restaurants);
  const { collections } = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [collection, setCollection] = useState("");

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const onClickSave = (restaurant) => {
    setShowModal(true);
    dispatch(fetchCollections());
    setModalData(restaurant);
  };

  const onChangeDate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const onHide = () => {
    setShowModal(false);
  };

  const onChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addRestaurantToCollections(collection, modalData._id));
    setShowModal(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(fetchRestaurants(name, date));
  };

  const onChangeCollection = (e) => {
    e.preventDefault();
    setCollection(e.target.value);
  };

  return (
    <div className={styles.RestaurantsContainer}>
      {loading ? (
        <div>Please wait. Loading the results.</div>
      ) : (
        <>
          <h3 className={styles.Title}>Restaurants</h3>

          <div className={styles.Filters}>
            <div>
              Name: <input type="text" value={name} onChange={onChangeName} />
            </div>

            <div>
              Open on:{" "}
              <input
                type="datetime-local"
                value={date}
                onChange={onChangeDate}
              />
            </div>
            <Button onClick={onSearch}>Search</Button>
          </div>

          <div>
            {restaurants && restaurants.length && (
              <div>Found {restaurants.length} results.</div>
            )}
          </div>

          <div className={styles.Restaurants}>
            {restaurants &&
              restaurants.map((restaurant) => (
                <Restaurant
                  key={restaurant._id}
                  {...restaurant}
                  hideButton={restaurant.collection}
                  onSave={() => onClickSave(restaurant)}
                />
              ))}
          </div>

          <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.Modal}
          >
            <Modal.Header className={styles.Modal}>
              <Modal.Title
                id="contained-modal-title-vcenter"
                className={styles.Modal}
              >
                Save Restaurant to My Collections
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.Modal}>
              <Restaurant {...modalData} hideButton={true} />

              <div>
                <span>Save restaurant to </span>

                <select onChange={onChangeCollection}>
                  <option value=""></option>
                  {collections.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <span> Collection</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onSubmit}>Save</Button>
              <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Restaurants;
