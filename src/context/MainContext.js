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
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    key:
      "MDo4MGMwOTk4MC0xMDRhLTExZTktYmEzNi0zMzQ4ODcyMDk4NGI6VmtodmM0cEFISnpLbk9vY3RrSXpRMk5nQ3pUdThVOHB0UEFT",
    beer: {},
    beers: [],
    stores: [],
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
      fetch(`https://lcboapi.com/stores?product_id=${id}`, {
        method: "GET",
        headers: headers
      })
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
      fetch(`https://lcboapi.com/products?per_page=50&q=beau's+beer`, {
        method: "GET",
        headers: headers
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.result);
          if (data.pager.total_pages > 1) {
            const all_beers = [];
            all_beers.push(...data.result);
            const promiseChain = [];

            for (let i = 2; i <= data.pager.total_pages; i++) {
              promiseChain.push(
                fetch(
                  `https://lcboapi.com/products?per_page=50&q=beau's+beer&page=${i}`,
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
