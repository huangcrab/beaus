import React, { Component } from "react";
import { Consumer } from "../../context/MainContext";

import Store from "./Store";

class BeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stores: [],
      error: {}
    };
  }
  componentDidMount() {
    this.props.value.getStores(this.props.id);
  }

  onStoreClick = (getStores, id) => {
    getStores(id);
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { beer, loading_stores, getStores, stores } = value;

          return (
            <React.Fragment>
              <div className="card beer-info">
                <div className="row">
                  <div className="col-md-6">
                    <div className="beer-image ">
                      {beer.image_url ? (
                        <img
                          className="beer-image"
                          src={beer.image_url}
                          alt={beer.name}
                        />
                      ) : (
                        <img
                          className="beer-image-holder"
                          src="/assets/tall.jpg"
                          alt={beer.name}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body beer-info-text">
                      <strong className="mb-2 text-m-brown">
                        {beer.origin}
                      </strong>
                      <h3 className="mb-3 text-brown">{beer.name}</h3>
                      <div className="mb-1 text-muted">{beer.style}</div>

                      <p className="card-text mb-10">
                        {beer.tasting_note}
                        <br />
                        <br />
                        {beer.serving_suggestion}
                        <br />
                        <br />
                        <span className="font-weight-bold">
                          CAD: {beer.price_in_cents * 0.01}
                        </span>
                        <br />
                        <br />
                        <span className="text-muted">
                          {beer.tags
                            ? beer.tags.split(" ").map(tag => "#" + tag)
                            : null}
                        </span>
                      </p>
                      <div className="button-wrap">
                        <div
                          className="button text-brown"
                          data-target=".store-modal"
                          data-toggle="modal"
                        >
                          Check In-Store Availablity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade store-modal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="LargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    .
                    <div className="stores-grid">
                      {stores.map(store => {
                        return <Store key={store.id} store={store} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default BeerInfo;
