import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class HereRelatedLocation extends Component {
  state = {
    loading: false,
    isUrl: false
  };

  onSubmit = data => e => {
    e.preventDefault();
    this.setState({ loading: true });

    let here_data = JSON.parse(localStorage.getItem("here_data"));

    const data2 = {
      location_id: localStorage.getItem("locationId"),
      Platform: "Here",
      Token: "",
      Username: data.title,
      Email: here_data.Username,
      Password: here_data.password,
      Connect_status: "Connect",
      Other_info: data.href
    };

    if (data.href) {
      Axios.post(
        "https://dashify.biz/social-platforms/add-account",
        data2,
        DjangoConfig
      )
        .then(resp => {
          console.log("Here register response", resp.data);
          this.setState({ isUrl: true, loading: false });
        })
        .catch(resp => {
          alert("Something went wrong");
          console.log("Here error response", resp.data);
          this.setState({ loading: false });
        });
    } else {
      alert("Something went wrong");
    }
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/locations/" + localStorage.getItem("locationId") + "/view-listing"
          }
        />
      );
    }

    let all_locations = JSON.parse(localStorage.getItem("here_locations"));

    console.log("here location", all_locations);
    console.log("here location items", all_locations.results.items);

    const allLocations = all_locations.results.items.map((l, i) => {
      return (
        <form onSubmit={this.onSubmit(l)}>
          <div className="listdata" key={l.id}>
            <div className="row d-flex">
              <div className="col-md-3">
                <div className="authordata ">
                  <div className="authordatatext">
                    <h3>{l.title}</h3>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center phonenumber">
                  {l.alternativeNames
                    ? l.alternativeNames.map(data => <h4>{data.name}</h4>)
                    : "-"}
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center address">
                  <h4>{l.category.title}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="action">
                  <button type="submit">connect</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    });

    return (
      <div>
        <div className="rightside_title">
          <div className="foursquer-logo">
            <img src={require("../images/here.png")} alt="Here" />
          </div>
          <h1>Here related results</h1>
        </div>
        <div className="tablediv">
          <div className="border-bottom">
            <div className="dataview nametop">
              <div className="titledivb">
                <div className="row">
                  <div className="col-md-3">
                    <div className="company-name text-left">Title</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">
                      Alternative names
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Category</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {all_locations.results.items.length == 0 ? (
            <h4>No related result</h4>
          ) : (
            <div>{allLocations}</div>
          )}
        </div>
      </div>
    );
  }
}

export default HereRelatedLocation;
