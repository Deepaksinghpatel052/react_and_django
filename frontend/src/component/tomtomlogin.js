import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class TomtomLogin extends Component {
  state = {
    businessName: "",
    city: "",
    state: "",
    country: "",
    username: "",
    password: "",
    log: false,
    isUrl: false,
    isId: false,
    username_error: "",
    password_error: "",
    city_error: "",
    state_error: "",
    country_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();

    let isError = false;
    this.setState({
      username_error: "",
      password_error: "",
      businessName_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      wrong: ""
    });

    if (this.state.username == "") {
      this.setState({
        username_error: "Enter your Email"
      });
      isError = true;
    }
    if (this.state.password == "") {
      this.setState({ password_error: "Enter your password" });
      isError = true;
    }
    if (this.state.businessName == "") {
      this.setState({ businessName_error: "Enter your business name" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.city == "") {
      this.setState({ city_error: "Enter your city" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.state == "") {
      this.setState({ state_error: "Enter your state" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.country == "") {
      this.setState({ country_error: "Enter your country" });
      console.log("i am in console");
      isError = true;
    }

    const tomtom_data = {
      Username: this.state.username,
      password: this.state.password
    };

    if (isError == false) {
      this.setState({ loading: true });
      const search_address =
        this.state.businessName +
        "," +
        this.state.city +
        "," +
        this.state.state +
        "," +
        this.state.country;
      Axios.get(
        "https://api.tomtom.com/search/2/search/" +
          search_address +
          ".json?key=BVtLuLXu3StRT6YXupe4H9cbtugU3i10"
      )
        .then(async res => {
          console.log("tomtom response data", res.data);

          // let filtered_tomtom_data = [];
          // for (let i = 0; i < res.data.results.length; i++) {
          //   if (res.data.results[i].poi.name) {
          //     filtered_tomtom_data = [
          //       ...filtered_tomtom_data,
          //       res.data.results[i]
          //     ];
          //   }
          // }
          // if (filtered_tomtom_data.length == 0) {
          //   alert("No result found");
          //   this.setState({ loading: false, isId: false });
          // } else {
          //   this.setState({ loading: false, isId: true });
          //   await localStorage.setItem(
          //     "tomtom_locations",
          //     JSON.stringify(filtered_tomtom_data)
          //   );
          //   await localStorage.setItem(
          //     "tomtom_data",
          //     JSON.stringify(tomtom_data)
          //   );
          // }

          if (res.data.results.length >= 1) {
            await localStorage.setItem(
              "tomtom_locations",
              JSON.stringify(res.data)
            );
            await localStorage.setItem(
              "tomtom_data",
              JSON.stringify(tomtom_data)
            );
            this.setState({ isId: true, loading: false });
          } else {
            alert("No result found");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          alert("Invalid combination of address and Business name");
          this.setState({ loading: false });
        });
    }
  };

  render() {
    if (this.state.isId) {
      return <Redirect to={"/dashboard#/tomtom-related-location"} />;
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/tomtom.png")} alt="Tomtom" />
        </div>
        <div className="login_form">
          <form onSubmit={this.onSubmit}>
            <fieldset className="login_fieldset">
              <legend>Login</legend>
              {this.state.loading ? (
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  // timeout={3000} //3 secs
                />
              ) : (
                <div style={{ color: "red" }}>{this.state.wrong}</div>
              )}
              <p>
                <label htmlFor="url">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={this.state.businessName}
                  placeholder="Javed Habib Saloon"
                  onChange={e =>
                    this.setState({ businessName: e.target.value })
                  }
                />
                <div style={{ color: "red" }}>
                  {this.state.businessName_error}
                </div>
              </p>
              <p>
                <label htmlFor="url">City</label>
                <input
                  type="text"
                  id="city"
                  value={this.state.city}
                  placeholder="Gwalior"
                  onChange={e => this.setState({ city: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.city_error}</div>
              </p>
              <p>
                <label htmlFor="url">State</label>
                <input
                  type="text"
                  id="state"
                  value={this.state.state}
                  placeholder="Madhya Pradesh"
                  onChange={e => this.setState({ state: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.state_error}</div>
              </p>
              <p>
                <label htmlFor="url">Country</label>
                <input
                  type="text"
                  id="country"
                  value={this.state.country}
                  placeholder="India"
                  onChange={e => this.setState({ country: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.country_error}</div>
              </p>

              <p>
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.password_error}</div>
              </p>
              <p>
                {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
                <button type="submit">Login</button>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default TomtomLogin;
