import React from "react";
import styles from "./Restaurant.module.css";
import { Button } from "react-bootstrap";

const Restaurant = ({
  name,
  displayValue,
  openHours,
  onSave,
  hideButton,
  collection,
}) => {
  return (
    <div className={styles.Restaurant}>
      <h4>{name}</h4>
      <div>
        <h6>Open Hours:</h6>
        <div>{displayValue}</div>
      </div>

      {!hideButton && !collection && (
        <Button onClick={() => onSave({ name, openHours, onSave })}>
          Save
        </Button>
      )}

      {collection && (
        <div className={styles.CollectionInfo}>
          <p>Saved to {collection} collection.</p>
          <a href="/collections">See Collections</a>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
