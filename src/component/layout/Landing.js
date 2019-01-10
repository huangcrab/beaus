import React from "react";
import { Link } from "react-router-dom";
export default function LandingTest() {
  return (
    <div className="jumbotron">
      <h1 className="display-3 mb-5">Beau's Seasonal:</h1>
      <p className="lead">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
        consequatur ipsum enim ratione quam soluta quaerat distinctio sapiente
        nihil. Odit est itaque ipsa non laudantium enim excepturi hic aliquam
        illo?
      </p>
      <p>
        <Link
          to="/beaus-seasonal"
          className="btn btn-lg brown text-white"
          role="button"
        >
          Start here
        </Link>
      </p>
    </div>
  );
}
