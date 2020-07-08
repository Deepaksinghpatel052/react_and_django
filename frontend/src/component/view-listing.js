import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
// import InstagramLogin from "react-instagram-login";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};
export default class ViewListing extends Component {
  state = {
    fbName: "",
    instaName: "",
    googleName: "",
    yelpName: "",
    foursquareName: "",
    appleName: "",
    citysearchName: "",

    fbToken: "",
    // instaToken: "",

    fbIsLoggedIn: false,
    instaIsLoggedIn: false,
    yelpIsLoggedIn: false,
    googleIsLoggedIn: false,
    foursquareIsLoggedIn: false,
    appleIsLoggedIn: false,
    citysearchIsLoggedIn: false,
    allListings: [],
    yelpId: "",
    fbId: "",
    instaId: "",
    googleId: "",
    foursquareId: "",
    appleId: "",
    citysearchId: "",
    otherImage: [],
    redirect_to_connectedaccounts: false,
    loader: true,
    all_connections: []
  };

  async componentDidMount() {
    const data = {
      location_id: this.props.match.params.locationId
    };
    var googleToken, fbtoken, fbPageId, fbData, googleData;

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(resp => {
        console.log(resp);
        this.setState({ allListings: resp.data.data });

        if (this.state.allListings) {
          this.state.allListings.map(l => {
            if (l.Social_Platform.Platform == "Facebook") {
              fbtoken = l.Social_Platform.Token;
              fbPageId = l.Social_Platform.Other_info;
              fbData = l;
            }

            if (l.Social_Platform.Platform == "Google") {
              googleToken = l.Social_Platform.Token;
              googleData = l;
            }

            if (l.Social_Platform.Platform == "Foursquare") {
              console.log("yes four");
              this.setState({
                foursquareIsLoggedIn: true,
                foursquareId: l.id,
                foursquareName: l.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Foursquare" }
                ]
              });
            }

            if (l.Social_Platform.Platform == "Instagram") {
              console.log("yes Instagram");
              this.setState({
                instaIsLoggedIn: true,
                instaId: l.id,
                instaName: l.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Instagram" }
                ]
              });
            }

            if (l.Social_Platform.Platform == "Yelp") {
              console.log("yes yelp");
              this.setState({
                yelpIsLoggedIn: true,
                yelpId: l.id,
                yelpName: l.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Yelp" }
                ]
              });
            }

            if (l.Social_Platform.Platform == "Apple") {
              console.log("yes Apple");
              this.setState({
                appleIsLoggedIn: true,
                appleId: l.id,
                appleName: l.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Apple" }
                ]
              });
            }

            if (l.Social_Platform.Platform == "Citysearch") {
              console.log("yes Citysearch");
              this.setState({
                citysearchIsLoggedIn: true,
                citysearchId: l.id,
                citysearchName: l.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Citysearch" }
                ]
              });
            }
          });

          const GoogleConfig = {
            headers: { Authorization: "Bearer " + googleToken }
          };

          // for facebook
          if (fbtoken) {
            Axios.get(
              "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
            ).then(res => {
              var fbPageAccessToken;
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].id == fbPageId) {
                  fbPageAccessToken = res.data.data[i].access_token;
                }
              }
              Axios.get(
                "https://graph.facebook.com/" +
                  fbPageId +
                  "/insights/page_engaged_users,page_impressions,page_views_total,page_call_phone_clicks_logged_in_unique,page_get_directions_clicks_logged_in_unique,page_website_clicks_logged_in_unique?period=month&access_token=" +
                  fbPageAccessToken
              ).then(resp => {
                this.setState({
                  fbIsLoggedIn: true,
                  fbId: fbData.id,
                  fbName: fbData.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Facebook" }
                  ]
                });
              });
            });
          }

          // Google
          if (googleToken) {
            Axios.get(
              "https://mybusiness.googleapis.com/v4/accounts/",
              GoogleConfig
            ).then(res => {
              this.setState({
                googleIsLoggedIn: true,
                googleId: googleData.id,
                googleName: googleData.Social_Platform.Username,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Google" }
                ]
              });
            });
          }
        }
      })
      .catch(resp => {
        console.log(resp);
      });

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-location-by-id",
      data,
      DjangoConfig
    ).then(resp => {
      this.setState({ state: "Loading....", category: "Loading...." });
      Axios.get(
        "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/dropdown-values/states",
        DjangoConfig
      ).then(resp1 => {
        resp1.data.status.map((s, i) =>
          s.id == resp.data.location.State
            ? this.setState({ state: s.State_name })
            : ""
        );
      });

      Axios.get(
        "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/dropdown-values/business-categoryes",
        DjangoConfig
      ).then(resp1 => {
        resp1.data.BusinessCategory.map((b, i) =>
          b.id == resp.data.location.Business_category
            ? this.setState({ category: b.Category_Name })
            : ""
        );
      });

      console.log(resp.data);
      this.setState({
        location: resp.data.location,
        name: resp.data.location.Location_name,

        address: resp.data.location.Address_1,

        phone: resp.data.location.Phone_no,

        about: resp.data.location.About_Business,

        city: resp.data.location.City,
        postalCode: resp.data.location.Zipcode,
        logo: resp.data.location.Business_Logo,
        cover: resp.data.location.Business_Cover_Image,
        otherImage: resp.data.location.Df_location_image,

        loader: false
      });
    });
  }

  componentClicked = e => {
    console.log("clicked");
    // e.preventDefault();
  };

  // responseInstagram = response => {
  //   console.log("instagram response", response);
  //   const data = {
  //     location_id: this.props.match.params.locationId,
  //     Platform: "Instagram",
  //     Token: response.accessToken,
  //     Username: response.name,
  //     Email: response.email,
  //     Password: "",
  //     Connect_status: "Connect",
  //     Other_info: "{'URL':'','data':''}"
  //   };

  //   Axios.post(
  //     "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/social-platforms/add-account",
  //     data,
  //     DjangoConfig
  //   )
  //     .then(resp => {
  //       console.log(resp);
  //       console.log(resp.data.data);
  //       this.setState({
  //         instaIsLoggedIn: true,

  //         instaName: response.name,

  //         instaToken: response.accessToken,
  //         instaId: resp.data.data.conect_to_location_id
  //       });
  //     })
  //     .catch(resp => {
  //       console.log(resp);
  //     });

  //   localStorage.setItem("insta_token", response.accessToken);
  // };

  responseFacebook = async response => {
    console.log("facebook response", response);

    const fb_data = {
      location_id: this.props.match.params.locationId,
      Username: response.name,
      Email: response.email
    };
    await localStorage.setItem("fb_token", response.accessToken);
    await localStorage.setItem("fb_data", JSON.stringify(fb_data));

    this.setState({ redirect_to_connectedaccounts: true });

    // Axios.post(
    //   "https://graph.facebook.com/v7.0/oauth/access_token?grant_type=fb_exchange_token&client_id=187396122554776&client_secret=bad0dbb6029a3530ca46048415abe95e&fb_exchange_token=" +
    //     response.accessToken
    // ).then(res => {
    //   console.log("facebook long access token", res);
    // });

    // const data = {
    //   location_id: this.props.match.params.locationId,
    //   Platform: "Facebook",
    //   Token: response.accessToken,
    //   Username: response.name,
    //   Email: response.email,
    //   Password: "",
    //   Connect_status: "Connect",
    //   Other_info: "{'URL':'','data':''}"
    // };
  };

  disconnectAccount = e => {
    console.log("hey");
    console.log(e.target.name);
    var name = e.target.name;
    const data = { location_connect_social_id: e.target.id };

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/location-connect-remove-with-social-media",
      data,
      DjangoConfig
    )
      .then(resp => {
        console.log(resp);

        this.setState({ [name]: false });
      })
      .catch(resp => {
        console.log(resp);
      });
  };

  render() {
    console.log(this.state);

    let { all_connections } = this.state;

    var loader;
    if (this.state.loader) {
      loader = <Spinner />;
    } else {
      loader = "";
    }

    const responseGoogle = response => {
      console.log(response);
      const data = {
        location_id: this.props.match.params.locationId,
        Platform: "Google",
        Token: response.accessToken,
        Username: response.profileObj.name,
        Email: response.profileObj.email,
        Password: "",
        Connect_status: "Connect",
        Other_info: "{'URL':'','data':''}"
      };

      Axios.post(
        "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/social-platforms/add-account",
        data,
        DjangoConfig
      )
        .then(resp => {
          console.log(resp);
          this.setState({
            googleIsLoggedIn: true,
            googleId: resp.data.data.platfrom_id,
            googleName: response.profileObj.name
          });
        })
        .catch(resp => {
          console.log(resp);
        });

      localStorage.setItem("googleToken", response.accessToken);
    };

    const responseErrorGoogle = response => {
      console.log(response);
      alert("try again");
    };

    if (this.state.redirect_to_connectedaccounts) {
      return <Redirect to="/connectedaccounts" />;
    }

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">
            <h1>Listing</h1>
            {loader}
          </div>

          <div className="tablediv">
            <div className="row">
              <div className="col-md-6">
                <div className="listingdetails">
                  <div className="d-flex">
                    <div className="viewimg">
                      <img src={this.state.logo} />
                    </div>
                    <div className="viewlisting-text">
                      <h2>{this.state.name}</h2>
                      <p>{this.state.category}</p>
                      <h3>ADDRESS AND CONTACT</h3>
                      <p>
                        {this.state.address}, {this.state.state} ,
                        {this.state.postalCode}
                      </p>
                      <p>P:{this.state.phone}</p>
                      <div className="edit-icon">
                        <span>
                          <i className="zmdi  zmdi-edit"></i>
                        </span>

                        <a href="#" className="showmore">
                          Show More informations
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="business-box">
                  <ul>
                    {this.state.otherImage.map((img, i) => (
                      <li>
                        <img src={img.Image} height="100" width="100" />
                      </li>
                    ))}
                  </ul>
                  <div className="viewlisting-text">
                    <h3>BUSINESS DESCRIPTION</h3>
                    <p>{this.state.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-30">
            <div className="row">
              <div className="col-md-4">
                <div className="totl-listing">
                  <div className="icon">
                    <img src={require("../images/group-2.png")} />
                  </div>
                  <div className="icon-text">
                    <h2>7</h2>
                    <h3>Total listing</h3>
                    <p>Review all business listings</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="totl-listing">
                  <div className="icon">
                    <img src={require("../images/group-3.png")} />
                  </div>
                  <div className="icon-text">
                    <h2>{all_connections ? all_connections.length : "-"}</h2>
                    <h3>Sync listing</h3>
                    <p>Review Sync business listings</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="totl-listing">
                  <div className="icon">
                    <img src={require("../images/group-4.png")} />
                  </div>
                  <div className="icon-text">
                    <h2>
                      {" "}
                      {all_connections ? 7 - all_connections.length : "-"}
                    </h2>
                    <h3>Requiring Action</h3>
                    <p>Review All business listings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="update-account mt-30">
            <div className="box-space">
              <div className="row d-flex">
                <div className="col-md-8">
                  <h2>Last update yesterday at 10:10 PM</h2>
                </div>
                <div className="col-md-4 text-right">
                  <a href="#" className="report_btn">
                    Download Report
                  </a>
                </div>
              </div>
            </div>

            <div className="box-space">
              <div className="row d-flex">
                <div className="col-md-12">
                  <h2>Accounts</h2>
                </div>
              </div>
            </div>
            <div className=" connect-box">
              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img src={require("../images/yelp.png")} alt="yelp" />
                      </div>
                      <div className="yelp-text">
                        {this.state.yelpIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.yelpName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.yelpIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.yelpId}
                        name="yelpIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <a href="/yelplogin" className="connect_btn">
                        Connect a account
                      </a>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.yelpIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* instagram */}

              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/instagram.png")}
                          alt="instagram"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.instaIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.instaName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.instaIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.instaId}
                        name="instaIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <a href="/instagramlogin" className="connect_btn">
                        Connect a account
                      </a>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.instaIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* instagram */}

              {/* facebook */}

              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/facebook.png")}
                          alt="facebook"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.fbIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.fbName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {/* <a href="#" className="disconnect_btn">Disconnect a account</a> */}
                    {this.state.fbIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.fbId}
                        name="fbIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <FacebookLogin
                        appId="187396122554776"
                        // appId="3044182972316291"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                      />
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.fbIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Instagram */}

              {/* <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/instagram.png")}
                          alt="instagram"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.instaIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.instaName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div> */}

              {/* <div className="col-md-3"> */}
              {/* <a href="#" className="disconnect_btn">Disconnect a account</a> */}
              {/*  {this.state.instaIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.instaId}
                        name="instaIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <InstagramLogin
                        clientId="187396122554776"
                        buttonText="Login"
                        onSuccess={this.componentClicked}
                        onFailure={this.responseInstagram}
                      />
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.instaIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}

              {/* foursqaure */}
              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/foursquare.jpg")}
                          alt="foursquare"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.foursquareIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.foursquareName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.foursquareIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.foursquareId}
                        name="foursquareIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <a href="/foursquarelogin" className="connect_btn">
                        Connect a account
                      </a>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.foursquareIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/google.png")}
                          alt="google"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.googleIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.googleName}</h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.googleIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.googleId}
                        name="googleIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <div className="google_btnb">
                        <GoogleLogin
                          clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={responseGoogle}
                          onFailure={responseErrorGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.googleIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* apple */}
              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img src={require("../images/apple.png")} alt="apple" />
                      </div>
                      <div className="yelp-text">
                        {this.state.appleIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.appleName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.appleIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.appleId}
                        name="appleIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <a href="/applelogin" className="connect_btn">
                        Connect a account
                      </a>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.appleIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* apple */}

              {/* citysearch */}
              <div className="conntend">
                <div className="row d-flex ">
                  <div className="col-md-4">
                    <div className="f-connect">
                      <div className="yelp-icon">
                        <img
                          src={require("../images/citysearch.png")}
                          alt="citysearch"
                        />
                      </div>
                      <div className="yelp-text">
                        {this.state.citysearchIsLoggedIn ? (
                          <div>
                            <p>Connected</p>
                            <h4>{this.state.citysearchName} </h4>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {this.state.citysearchIsLoggedIn ? (
                      <button
                        className="disconnect_btn"
                        id={this.state.citysearchId}
                        name="appleIsLoggedIn"
                        onClick={this.disconnectAccount}
                      >
                        Disconnect a account
                      </button>
                    ) : (
                      <a href="/citysearchlogin" className="connect_btn">
                        Connect a account
                      </a>
                    )}
                  </div>

                  <div className="col-md-5">
                    {this.state.citysearchIsLoggedIn ? (
                      <div className="refres_box enble_refresh">
                        <i>
                          <img src={require("../images/sync-refresh.svg")} />
                        </i>

                        <span>Syncing</span>
                      </div>
                    ) : (
                      <div className="refres_box disble_refresh">
                        <i>
                          <img
                            src={require("../images/sync_disabled-24px.svg")}
                          />
                        </i>

                        <span>Connect your account to sync the listings</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* citysearch */}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}
