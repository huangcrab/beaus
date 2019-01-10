import React, { Component } from "react";

import Beer from "./Beer";

class Beers extends Component {
  componentDidMount() {
    this.props.value.getBeers();
  }

  render() {
    const { loading_beers, beers } = this.props.value;
    return (
      <div>
        <div className="title">Seasonal List</div>
        <div className="beer-grid">
          {loading_beers
            ? "Loading"
            : beers
                .filter(
                  ele =>
                    ele.producer_name === "Beau's All Natural Brewing" &&
                    ele.is_seasonal === true &&
                    ele.is_dead === false
                )
                .map(beer => {
                  return <Beer beer={beer} />;
                })}
        </div>
      </div>
    );
  }
}

export default Beers;
