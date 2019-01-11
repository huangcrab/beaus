import React, { Component } from "react";

const Context = React.createContext();
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BEER":
      return {
        ...state,
        beer: action.payload
      };
    case "LOAD_BEERS":
      return {
        ...state,
        beers: action.payload
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    key:
      "MDo4ZWFkMmNjMC0xNTcyLTExZTktYWYyMi0wYjMwNzQ3M2ZiOTI6clNYV3F6UmFJWTFzRVdsaHdNOWV6enphZ092QkNyRmFLdXBD",
    key2: "AIzaSyAI6yDH5gaOYwcbJorZZ3SNbCXF7IoczZ0",
    beer: {},
    beers: [],
    stores: [],
    nearbyStores: [],
    location: "",
    location_lat: "",
    location_long: "",
    error: {},
    loading_stores: false,
    loading_beers: false,
    dispatch: action => {
      this.setState(state => Reducer(state, action));
    },

    getStores: id => {
      this.setState({ loading_stores: true });
      const headers = new Headers();
      headers.set("Authorization", `Token ${this.state.key}`);
      fetch(
        `https://lcboapi.com/stores?product_id=${id}&access_key=${
          this.state.key
        }`,
        {
          method: "GET",
          headers: headers
        }
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ stores: data.result });
          this.setState({ loading_stores: false });
        })
        .catch(err => this.setState({ error: err }));
    },

    getBeers: () => {
      this.setState({ loading_beers: true });
      const headers = new Headers();
      headers.set("Authorization", `Token ${this.state.key}`);
      fetch(
        `https://lcboapi.com/products?per_page=50&q=beau's+beer&access_key=${
          this.state.key
        }`,
        {
          method: "GET",
          headers: headers
        }
      )
        .then(res => res.json())
        .then(data => {
          if (data.pager.total_pages > 1) {
            const all_beers = [];
            all_beers.push(...data.result);
            const promiseChain = [];

            for (let i = 2; i <= data.pager.total_pages; i++) {
              promiseChain.push(
                fetch(
                  `https://lcboapi.com/products?per_page=50&q=beau's+beer&page=${i}&access_key=${
                    this.state.key
                  }`,
                  {
                    method: "GET",
                    headers: headers
                  }
                )
                  .then(res => res.json())
                  .then(data => data.result)
              );
            }
            Promise.all(promiseChain)
              .then(datas => {
                datas.forEach(ele => all_beers.push(...ele));
                this.setState({ beers: all_beers });
                this.setState({ loading_beers: false });
              })
              .catch(err => this.setState({ error: err }));
          } else {
            this.setState({ beers: data.result });
            this.setState({ loading_beers: false });
          }
        })
        .catch(err => this.setState({ error: err }));
    },

    getAddress: latlong => {
      if (latlong !== "") {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlong}&key=${
            this.state.key2
          }`
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ location: data.results[0].formatted_address });
          });
      }
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
