import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class HereLogin extends Component {
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

    this.setState({
      username_error: "",
      password_error: "",
      id_error: "",
      wrong: ""
    });

    let isError = false;

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
    if (this.state.id == "") {
      this.setState({ id_error: "Enter Url" });
      console.log("i am in console");
      isError = true;
    }

    // const DjangoConfig = {
    //   headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    // };

    // const data = {
    //   location_id: localStorage.getItem("locationId"),
    //   Platform: "Here",
    //   Token: "",
    //   Username: this.state.username,
    //   Email: "",
    //   Password: this.state.password,
    //   Connect_status: "Connect",
    //   Other_info: "{'URL':" + this.state.id + ",'data':''}"
    // };
    let link = this.state.id;

    let lat = "";
    let long = "";
    let place_name = link.split("/")[6];
    let valid_place_name = false;

    if (isError == false) {
      if (place_name && place_name.search("--") == 0 && link.split("map=")) {
        place_name = place_name.split("--")[0];
        lat = link.split("map=")[1].split(",")[0];
        long = link.split("map=")[1].split(",")[1];
        valid_place_name = true;
      } else if (
        place_name &&
        place_name.split(":").length >= 1 &&
        link.split("map=")
      ) {
        place_name = place_name.split(":")[0];
        lat = link.split("map=")[1].split(",")[0];
        long = link.split("map=")[1].split(",")[1];
        valid_place_name = true;
      } else {
        alert(
          "Please put url in this form => https://wego.here.com/india/mumbai/hotel/taj-mahal-tower,-mumbai--356te7g9-4ff5b2b3f342414b81436cb645af1ac3?x=ep&map=18.9224,72.8335,15,normal "
        );
      }
    }

    const here_data = {
      Username: this.state.username,
      password: this.state.password
    };

    if (isError == false && valid_place_name && lat && long) {
      this.setState({ loading: true });
      Axios.get(
        "https://places.ls.hereapi.com/places/v1/discover/search?at=" +
          lat +
          "," +
          long +
          "&q=" +
          place_name +
          "&apiKey=qdYpiTMRBJqz58-3G0Uw7tahDhpVYz12fk9C8gyBBdw"
      )
        .then(async resp => {
          console.log("Here response", resp.data);
          await localStorage.setItem(
            "here_locations",
            JSON.stringify(resp.data)
          );
          await localStorage.setItem("here_data", JSON.stringify(here_data));

          this.setState({ isId: true, loading: false });
        })
        .catch(resp => {
          console.log("Here error", resp.data);
          alert(
            "Please put url in this form => https://wego.here.com/india/mumbai/hotel/taj-mahal-tower,-mumbai--356te7g9-4ff5b2b3f342414b81436cb645af1ac3?x=ep&map=18.9224,72.8335,15,normal "
          );
          this.setState({
            // wrong: "Invalid or Not authorised",
            loading: false
          });
        });
    }
    // else {
    //     this.setState({
    //       wrong: "Invalid or Not authorised",
    //       loading: false
    //     });
    // }
  };

  render() {
    if (this.state.isId) {
      return <Redirect to={"/dashboard#/here-related-location"} />;
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/here.png")} alt="Here" />
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
                <label htmlFor="url">Here Listing Url</label>
                <input
                  type="text"
                  id="id"
                  value={this.state.id}
                  placeholder="https://wego.here.com/india/mumbai/hotel/taj-mahal-tower,-mumbai--356te7g9-4ff5b2b3f342414b81436cb645af1ac3?x=ep&map=18.9224,72.8335,15,normal"
                  onChange={e => this.setState({ id: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.id_error}</div>
              </p>

              <p>
                <label htmlFor="username">Here Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div style={{ color: "red" }}>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Here Password</label>
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

export default HereLogin;
