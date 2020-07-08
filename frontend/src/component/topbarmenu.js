import React, { Component } from "react";
import SelectSearch from "react-select-search";
import Axios from "axios";
import { Redirect, NavLink } from "react-router-dom";
import ViewLocations from "./location-manager";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

let location_id = localStorage.getItem("locationId");

export default class Topbarmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllLocations: [],
      changev: false,
      locationid: "",
      defa: ""
    };
    this.change = this.change.bind(this);
  }

  change(e) {
    console.log("e", e);
    console.log(this.state);
    this.setState({ changev: true, locationid: e });
    console.log(this.state);
    console.log(window.location.href);
    localStorage.setItem("locationId", e);

    console.log(window.location.href);

    window.location.assign("dashboard#/locations/" + e + "/view-location");
    window.location.reload(false);
  }

  logout = () => {
    console.log("logout");
    localStorage.removeItem("UserToken");

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/logout"
    )
      .then(res => {
        console.log("sucess");
        console.log(res);
      })
      .catch(res => {
        console.log("error in Logout");
      });
  };

  componentDidMount() {
    console.log("tool");

    const DjangoConfig1 = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };
    const data = {
      user_id: localStorage.getItem("UserId")
    };
    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-locations",
      data,
      DjangoConfig1
    )
      .then(res => {
        console.log(res);
        console.log(res.data.all_location);

        this.setState({ AllLocations: res.data.all_location });
      })
      .catch(res => {
        console.log("error in LocationManager");
      });
  }

  render() {
    var options = [];
    if (this.state.AllLocations) {
      this.state.AllLocations.map(loc => {
        if (location_id == loc.id.toString()) {
          localStorage.setItem("locationName", loc.Location_name);
        }
        options.push({ name: loc.Location_name, value: loc.id.toString() });
      });
    }

    let loc_name = localStorage.getItem("locationName");
    // var defaultSelected=(this.state.AllLocations)?this.state.AllLocations.id:0;

    console.log(options);

    // if(this.state.changev){
    //    return <Redirect to={"dashboard#/locations/"+this.state.locationid+"/view-location"} />
    // }

    return (
      <div>
        <div className="maindiv">
          <div className="navbar-custom">
            <div className="logobox">
              <img src={require("../images/logo-dashify.jpg")} />
            </div>
            <div className="box-shadow">
              <ul className="searctbox">
                <li className="menubar nav-toggle">
                  <span className="flaticon-menu"></span>
                </li>
                <li className="searchtype">
                  <SelectSearch
                    options={options}
                    name="language"
                    placeholder={loc_name}
                    search={true}
                    //  renderOption={this.changeOp}
                    value="heyy"
                    onChange={this.change}
                  />
                </li>
                <li>
                  <a
                    className="add-location last_btn"
                    href="dashboard#/add-location"
                  >
                    <i className="zmdi zmdi-plus"></i> Add Location
                  </a>
                </li>
              </ul>
              <ul className="rightmenu-top nav navbar-nav navbar-right">
                <li className="dropdown notification-list">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="flaticon-notification"></i>
                    <span className="count-not">10</span>
                  </a>

                  <div className="dropdown-menu dropdown-lg dropdown-menu-right">
                    <div className="dropdown-header noti-title">
                      <h5 className="text-overflow m-0">
                        <span className="float-right">
                          <span className="badge badge-danger float-right">
                            5
                          </span>
                        </span>
                        Notification
                      </h5>
                    </div>

                    <div className="slimscroll noti-scroll scroll-me">
                      <a href="#" className="dropdown-item notify-item">
                        <div className="notify-icon bg-success">
                          <i className="mdi mdi-comment-account-outline"></i>
                        </div>
                        <p className="notify-details">
                          Robert S. Taylor commented on Admin
                          <small className="text-muted">1 min ago</small>
                        </p>
                      </a>

                      <a href="#" className="dropdown-item notify-item">
                        <div className="notify-icon bg-primary">
                          <i className="mdi mdi-settings-outline"></i>
                        </div>
                        <p className="notify-details">
                          New settings
                          <small className="text-muted">
                            There are new settings available
                          </small>
                        </p>
                      </a>

                      <a href="#" className="dropdown-item notify-item">
                        <div className="notify-icon bg-warning">
                          <i className="mdi mdi-bell-outline"></i>
                        </div>
                        <p className="notify-details">
                          Updates
                          <small className="text-muted">
                            There are 2 new updates available
                          </small>
                        </p>
                      </a>

                      <a href="#" className="dropdown-item notify-item">
                        <div className="notify-icon">
                          <img
                            src={require("../images/avatar-4.jpg")}
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <p className="notify-details">Karen Robinson</p>
                        <p className="text-muted mb-0 user-msg">
                          <small>
                            Wow ! this admin looks good and awesome design
                          </small>
                        </p>
                      </a>

                      <a href="#" className="dropdown-item notify-item">
                        <div className="notify-icon bg-danger">
                          <i className="mdi mdi-account-plus"></i>
                        </div>
                        <p className="notify-details">
                          New user
                          <small className="text-muted">
                            You have 10 unread messages
                          </small>
                        </p>
                      </a>
                    </div>

                    <a
                      href="#"
                      className="dropdown-item text-center text-primary notify-item notify-all"
                    >
                      View all
                      <i className="fi-arrow-right"></i>
                    </a>
                  </div>
                </li>
                <li className="dropdown authorcss">
                  <div
                    className="author dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <div className="image">
                      <img src={require("../images/author.jpg")} />
                    </div>
                    <div className="authortext">
                      <h4>{localStorage.getItem("UserName")}</h4>
                      <p>Super Admin</p>
                    </div>
                  </div>

                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Profile Settings</a>
                    </li>
                    <li>
                      <a href="/">
                        <button onClick={this.logout}>Log Out</button>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <img src={require("../images/dot.jpg")} className="dotbox" />
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
