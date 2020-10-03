import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class CitySearchLogin extends Component {
  state = {
    url: "",
    username: "",
    password: "",
    log: false,
    isUrl: false,
    username_error: "",
    password_error: "",
    url_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();
    //  this.setState({log:false})
    // this.props.login(this.state.username, this.state.password);
    // return <Redirect to="/locationdetails" />

    this.setState({
      username_error: "",
      password_error: "",
      url_error: "",
      wrong: ""
    });

    if (this.state.username == "") {
      this.setState({
        username_error: "Enter your Email"
      });
    }
    if (this.state.password == "") {
      this.setState({ password_error: "Enter your password" });
    }
    if (this.state.url == "") {
      this.setState({ url_error: "Enter Url" });
      console.log("i am in console");
    }
    this.setState({ loading: true });

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    const citysearchUrl = this.state.url.split("/")[4];
    localStorage.setItem("citysearchUrl", citysearchUrl);

    const data = {
      location_id: localStorage.getItem("locationId"),
      Platform: "Citysearch",
      Token: "",
      Username: this.state.username,
      Email: "",
      Password: this.state.password,
      Connect_status: "Connect",
      Other_info: "{'URL':" + this.state.url + ",'data':''}"
    };

    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
        this.state.url.split("/")[4] +
        "&publisher=test"
    )
      .then(res => {
        if (res.data) {
          Axios.post(
            "https://dashify.biz/social-platforms/add-account",
            data,
            DjangoConfig
          )
            .then(resp => {
              console.log("citysearch resp", resp);
              this.setState({ isUrl: true, loading: false });
            })
            .catch(resp => {
              alert("Invalid username or password");
              console.log("citysearch resp", resp);
              this.setState({
                wrong: "Invalid or Not authorised",
                loading: false
              });
            });
        } else {
          alert("Invalid username or password");
          this.setState({ loading: false });
        }
      })
      .catch(res => {
        alert("Invalid username or password");
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/dashboard#/locations/" +
            localStorage.getItem("locationId") +
            "/view-listing"
          }
        />
      );
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/citysearch.jpg")} alt="citysearch" />
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
                <label htmlFor="url">Citysearch Listing Url</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="http://www.citysearch.com/profile/656716190/midland_tx/rogers_ford_sales_inc.html"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Citysearch Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Citysearch Password</label>
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

export default CitySearchLogin;
