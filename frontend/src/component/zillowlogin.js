import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class ZillowLogin extends Component {
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

    let isError = false;
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
      isError = true;
    }
    if (this.state.password == "") {
      this.setState({ password_error: "Enter your password" });
      isError = true;
    }
    if (this.state.url == "") {
      this.setState({ url_error: "Enter Url" });
      console.log("i am in console");
      isError = true;
    }

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    const data = {
      location_id: localStorage.getItem("locationId"),
      Platform: "Zillow",
      Token: "",
      Username: this.state.username,
      Email: this.state.username,
      Password: this.state.password,
      Connect_status: "Connect",
      Other_info: this.state.url
    };

    if (isError == false) {
      this.setState({ loading: true });
      Axios.get(
        "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz173vkfofw97_8e096&email=" +
          this.state.url +
          "&count=10&output=json"
      )
        .then(res => {
          console.log("zillow checking data", res.data);
          if (res.data.message.text == "Request successfully processed") {
            Axios.post(
              "https://dashify.biz/social-platforms/add-account",
              data,
              DjangoConfig
            )
              .then(resp => {
                console.log("zillow resp", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                alert("Invalid Zillow Email");
                console.log("zillow resp", resp.data);
                this.setState({
                  // wrong: "Invalid Zillow Email",
                  loading: false
                });
              });
          } else {
            alert("Invalid Zillow Email");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          alert("Invalid Zillow Email");
          this.setState({ loading: false });
        });
    }
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
          <img src={require("../images/zillow.png")} alt="Zillow" />
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
                <label htmlFor="url">Zillow Email</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="example@gmail.com"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.url_error}</div>
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

export default ZillowLogin;
