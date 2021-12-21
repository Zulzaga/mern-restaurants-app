import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Collections.module.css";
import Restaurant from "./Restaurant";
import { useSelector, useDispatch } from "react-redux";
import {
  addCollection,
  fetchCollections,
} from "../redux/actions/collectionTypes";

const Collections = () => {
  const { collections, loading, error } = useSelector(
    (state) => state.collections
  );
  const dispatch = useDispatch();

  const [newName, setNewName] = useState("");

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addCollection(newName));
  };

  const onChangeName = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  return (
    <div className={styles.Collections}>
      {loading ? (
        <div>Please wait. Loading the results</div>
      ) : (
        <>
          {error && (
            <div>
              Error loading the results. Please wait and try again later.
            </div>
          )}
          <h5>My collections</h5>

          {collections && collections.length ? (
            collections.map((collection) => (
              <div key={collection.name}>
                <p>{collection.name}</p>

                <div className={styles.Restaurants}>
                  {collection.restaurants && collection.restaurants.length ? (
                    collection.restaurants.map((r) => (
                      <Restaurant
                        key={r._id}
                        {...r}
                        hideButton={true}
                        collection={collection.name}
                      />
                    ))
                  ) : (
                    <div>
                      You don't have any restaurants saved under this
                      collection.
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>You currently don't have any restaurant collections.</div>
          )}

          <Form className={styles.Form} onSubmit={onSubmit}>
            <h6>Add a new collection</h6>

            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter collection name"
                onChange={onChangeName}
                required
              />
              <Form.Text className="text-muted">
                Please enter a new collection name that you don't currently
                have.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default Collections;
