import React from "react";
import { Consumer } from "../../context/MainContext";
import BeerInfo from "./BeerInfo";

export default function BeerInfoContextWrap(props) {
  return (
    <Consumer>
      {value => {
        return <BeerInfo value={value} id={props.match.params.id} />;
      }}
    </Consumer>
  );
}
