import React from "react";
import { Link } from "react-router-dom";
export default function LandingTest() {
  return (
    <div className="jumbotron">
      <h1 className="display-3 mb-5">Beau's Seasonal:</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            className="landing-logo"
            src={require("../../assets/logo.png")}
            alt="Beau's"
          />
        </div>
        <div className="col-md-6">
          <p className="lead text-left">
            Since 2006 Beau’s Brewing Co. has been brewing interesting, tasty
            beers like our Lug Tread Lagered Ale using the best ingredients &
            local spring water. Our family takes pride in creating unique,
            wonderful and certified organic craft beer, conceived with honest
            consideration for the environment and our local communities, and
            delivered with a true sense of friendly relationship.
          </p>
        </div>
      </div>

      <p>
        <Link
          to="/beaus-seasonal"
          className="btn btn-lg brown text-white"
          role="button"
        >
          Check Our Seasonal's
        </Link>
      </p>
    </div>
  );
}
