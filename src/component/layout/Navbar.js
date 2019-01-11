import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="nav-brand">
          <h3 className="text-muted">
            <Link to="/" className="nav-link">
              Beau's Seasonal
            </Link>
          </h3>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/beaus-seasonal" className="nav-link">
                Seasonal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </React.Fragment>
  );
}
