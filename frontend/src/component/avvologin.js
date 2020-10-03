import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class AvvoLogin extends Component {
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
    // code: "",
    // access_token: ""
  };

  // componentDidMount = () => {
  //   // console.log("avvo props", this.props);
  //   this.setState({
  //     code: this.props.location.search.split("?code=")[1],
  //     acces_token: this.props.location.hash.split("#access_token=")[1]
  //   });
  // };

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
      this.setState({ url_error: "Enter Avvo's Lawyer Id" });
      console.log("i am in console");
      isError = true;
    }

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    if (isError == false) {
      this.setState({ loading: true });
      const AvvoConfig = {
        headers: {
          Authorization:
            "Bearer " + this.props.location.hash.split("#access_token=")[1]
        }
      };
      Axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
          this.state.url,
        AvvoConfig
      )
        .then(res => {
          console.log("Avvo checking data", res.data);
          if (res.data.lawyers.length != 0) {
            let resp_data = res.data.lawyers[0];
            const data = {
              location_id: localStorage.getItem("locationId"),
              Platform: "Avvo",
              Token: this.props.location.hash.split("#access_token=")[1],
              Username: resp_data.firstname + " " + resp_data.lastname,
              Email: this.state.username,
              Password: this.state.password,
              Connect_status: "Connect",
              Other_info: this.state.url
            };

            Axios.post(
              "https://dashify.biz/social-platforms/add-account",
              data,
              DjangoConfig
            )
              .then(resp => {
                console.log("Avvo resp", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                alert("Invalid Avvo's Lawyer Id");
                console.log("Avvo resp", resp.data);
                this.setState({
                  // wrong: "Invalid Avvo's Lawyer Id",
                  loading: false
                });
              });
          } else {
            alert("Invalid Avvo's Lawyer Id");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          alert("Invalid Avvo's Lawyer Id");
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
          <img src={require("../images/avvo.png")} alt="Avvo" />
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
                <label htmlFor="url">Avvo's Lawyer Id</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="1441968"
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

export default AvvoLogin;
