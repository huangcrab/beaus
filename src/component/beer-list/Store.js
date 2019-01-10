import React from "react";

export default function Store(props) {
  const address =
    " " +
    props.store.address_line_1 +
    " " +
    props.store.address_line_2 +
    ", " +
    props.store.city +
    ", " +
    props.store.postal_code;
  return (
    <div className="card pb-0 store-card">
      <div className="map" />
      <div className="card-body pb-0">
        <h4>{props.store.name}</h4>
        <p className="store-address">
          <i className="fas fa-map-marker-alt" /> :{" "}
          <a
            href={`https://www.google.com/maps/place/${address}?hl=en`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address}
          </a>
        </p>
        <p className="store-contact">
          <i className="fas fa-phone" /> :
          <a href={`tel:${props.store.telephone}`}> {props.store.telephone}</a>
          <br /> <i className="fas fa-fax" /> : {props.store.fax}
        </p>
      </div>
    </div>
  );
}
