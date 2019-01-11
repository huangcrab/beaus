import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

import Store from "./Store";

class BeerInfo extends Component {
  state = {
    longitude: "",
    latitude: "",
    location: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  onInputChange = e => {
    this.props.value.dispatch({
      type: "SET_LOCATION",
      payload: e.target.value
    });
  };
  onStoreClick = () => {
    this.props.value.getStores(this.props.id);
  };
  onShowMapClick = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        this.props.value.location
      }&key=AIzaSyAI6yDH5gaOYwcbJorZZ3SNbCXF7IoczZ0`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.results.length !== 0) {
          this.setState({
            latitude: data.results[0].geometry.location.lat
          });
          this.setState({
            longitude: data.results[0].geometry.location.lng
          });
        } else {
        }
      });
  };

  onGetLocationClick = getAddress => {
    let startPos;
    const geoSuccess = position => {
      startPos = position;

      this.setState({ latitude: startPos.coords.latitude });
      this.setState({ longitude: startPos.coords.longitude });
      getAddress(startPos.coords.latitude + "," + startPos.coords.longitude);
    };
    const geoError = error => {
      console.log("Error occurred. Error code: " + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };

  render() {
    const {
      beer,
      getAddress,
      loading_stores,
      stores,
      location
    } = this.props.value;

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
              <div className="beer-info-text p-2">
                <strong className="mb-2 text-m-brown">{beer.origin}</strong>
                <h3 className="mb-3 text-brown">{beer.name}</h3>
                <div className="mb-1 text-muted">{beer.style}</div>

                <p className="mb-10">
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
                    onClick={this.onStoreClick}
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

        <div className="modal fade store-modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Product available in following {stores.length} locations
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button
                      onClick={this.onGetLocationClick.bind(this, getAddress)}
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-map-marker-alt" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="form-control"
                    value={location}
                    onChange={this.onInputChange.bind(this)}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={this.onShowMapClick}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {this.state.latitude !== "" ? (
                <div className="map-wrapper">
                  <Map
                    google={this.props.google}
                    zoom={11}
                    center={{
                      lat: this.state.latitude,
                      lng: this.state.longitude
                    }}
                  >
                    <Marker
                      onClick={this.onMarkerClick}
                      title={"Your Location"}
                      position={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                      }}
                      name={"Your Location"}
                    />
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>

                    {stores !== []
                      ? stores.map(store => {
                          const address =
                            " " +
                            store.address_line_1 +
                            " " +
                            store.address_line_2 +
                            ", " +
                            store.city +
                            ", " +
                            store.postal_code;
                          return (
                            <Marker
                              key={store.id}
                              onClick={this.onMarkerClick}
                              title={store.name}
                              position={{
                                lat: store.latitude,
                                lng: store.longitude
                              }}
                              name={store.name}
                              address={address}
                            />
                          );
                        })
                      : "loading"}
                    {stores !== []
                      ? stores.map(store => {
                          return (
                            <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}
                              onClose={this.onClose}
                              key={store.id}
                            >
                              <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                                <a
                                  href={`https://www.google.com/maps/place/${
                                    this.state.selectedPlace.address
                                  }?hl=en`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {this.state.selectedPlace.address}
                                </a>
                              </div>
                            </InfoWindow>
                          );
                        })
                      : null}
                  </Map>
                </div>
              ) : null}

              <div className="stores-grid">
                {loading_stores
                  ? "loading"
                  : stores.map(store => {
                      return <Store key={store.id} store={store} />;
                    })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAI6yDH5gaOYwcbJorZZ3SNbCXF7IoczZ0"
})(BeerInfo);
