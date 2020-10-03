import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class AppleLogin extends Component {
  state = {
    id: "",
    username: "",
    password: "",
    log: false,
    isId: false,
    username_error: "",
    password_error: "",
    id_error: "",
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
      id_error: "",
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
    if (this.state.id == "") {
      this.setState({ id_error: "Enter Url" });
      console.log("i am in console");
    }
    this.setState({ loading: true });

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    // const appleId = this.state.id.split("/")[6].slice(2);
    // localStorage.setItem("appleId", appleId);

    const data = {
      location_id: localStorage.getItem("locationId"),
      Platform: "Apple",
      Token: "",
      Username: this.state.username,
      Email: "",
      Password: this.state.password,
      Connect_status: "Connect",
      Other_info: "{'URL':" + this.state.id + ",'data':''}"
    };

    if (this.state.id.split("/")[6]) {
      Axios.get(
        "https://itunes.apple.com/in/rss/customerreviews/id=" +
          this.state.id.split("/")[6].slice(2) +
          "/sortBy=mostRecent/json"
      )
        .then(res => {
          if (res.data.feed.entry) {
            Axios.post(
              "https://dashify.biz/social-platforms/add-account",
              data,
              DjangoConfig
            )
              .then(resp => {
                console.log("apple response", resp);
                this.setState({ isId: true, loading: false });
              })
              .catch(resp => {
                console.log("apple response", resp);
                alert("Invalid username or password");
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
        .catch(resp => {
          alert("Invalid username or password");
          this.setState({ loading: false });
        });
    } else {
      alert("Invalid username or password");
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.isId) {
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
          <img src={require("../images/apple.png")} alt="" />
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
                <label htmlFor="url">Apple Listing Url</label>
                <input
                  type="text"
                  id="id"
                  value={this.state.id}
                  placeholder="https://apps.apple.com/us/app/tiktok-make-your-day/id835599320"
                  onChange={e => this.setState({ id: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.id_error}</div>
              </p>

              <p>
                <label htmlFor="username">Apple Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Apple Password</label>
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

export default AppleLogin;
