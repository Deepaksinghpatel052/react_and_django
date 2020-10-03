import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class GoogleConnectedAccounts extends Component {
  state = {
    loading: false,
    isUrl: false,

    all_pages: []
  };

  componentDidMount = () => {
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.props.location.state.Token }
    };

    Axios.get(
      "https://mybusiness.googleapis.com/v4/accounts/",
      GoogleConfig
    ).then(res => {
      localStorage.setItem("accountId", res.data.accounts[0].name);

      Axios.get(
        "https://mybusiness.googleapis.com/v4/" +
          localStorage.getItem("accountId") +
          "/locations",
        GoogleConfig
      ).then(resp => {
        console.log("google location", resp.data);
        this.setState({ all_pages: resp.data.locations });
      });
    });
  };

  onSubmit = index => e => {
    e.preventDefault();
    this.setState({ loading: true });

    const g_data = this.props.location.state;

    const data = {
      location_id: g_data.location_id,
      Platform: "Google",
      Token: g_data.Token,
      Username: this.state.all_pages[index].locationName,
      Email: g_data.Email,
      Password: "",
      Connect_status: "Connect",
      Other_info: this.state.all_pages[index].name
    };

    Axios.post(
      "https://dashify.biz/social-platforms/add-account",
      data,
      DjangoConfig
    )
      .then(resp => {
        console.log("google location response", resp.data);
        this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ loading: false });
      });
  };

  render() {
    var link;
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/locations/" +
            localStorage.getItem("locationId") +
            this.props.location.state.redirect_to
          }
        />
      );
    }

    const allPages = this.state.all_pages.map((p, i) => {
      return (
        <form onSubmit={this.onSubmit(i)}>
          <div className="listdata" key={p.id}>
            <div className="row d-flex">
              <div className="col-md-3">
                <div className="authordata ">
                  <div className="authordatatext">
                    <h3>{p.locationName}</h3>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center address">
                  <h4>{p.primaryCategory.displayName}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center phonenumber">
                  {p.address ? (
                    <div>
                      {p.address.addressLines.map(data => data)},
                      {p.address.locality},{p.address.administrativeArea},
                      {p.address.postalCode}
                    </div>
                  ) : (
                    "-"
                  )}

                  {p.primaryPhone ? (
                    <div>
                      {" "}
                      <br /> <b>Call:</b> {p.primaryPhone}{" "}
                    </div>
                  ) : (
                    ""
                  )}
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
            <img src={require("../images/google.png")} alt="Google" />
          </div>
          <h1>Google locations</h1>
        </div>
        <div className="tablediv">
          <div className="border-bottom">
            <div className="dataview nametop">
              <div className="titledivb">
                <div className="row">
                  <div className="col-md-3">
                    <div className="company-name text-left">Locatiobn name</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Category</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Address</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.all_pages.length == 0 ? (
            <Spinner />
          ) : (
            <div>{allPages}</div>
          )}
        </div>
      </div>
    );
  }
}

export default GoogleConnectedAccounts;
