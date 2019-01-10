import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="header clearfix">
      <nav>
        <ul className="nav nav-pills float-right">
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
      </nav>
      <h3 className="text-muted">
        <Link to="/" className="nav-link">
          Beau's Seasonal
        </Link>
      </h3>
    </div>
  );
}
