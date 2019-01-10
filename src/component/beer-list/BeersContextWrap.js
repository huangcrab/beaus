import React from "react";
import { Consumer } from "../../context/MainContext";
import Beers from "./Beers";

export default function BeersContextWrap() {
  return (
    <Consumer>
      {value => {
        return <Beers value={value} />;
      }}
    </Consumer>
  );
}
