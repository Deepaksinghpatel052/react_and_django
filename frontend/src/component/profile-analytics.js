import React, { Component, PropTypes } from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import Axios from "axios";
import ReactFacebookLogin from "react-facebook-login";
import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};
export default class ProfileAnalytics extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    in: [],
    loader: true,
    loading: false,
    profileViews: "-",
    gWeb: "-",
    gcalls: "-",
    gdirection: "-",
    gbutton: "-",
    profileViews1: "0",
    gWeb1: "0",
    gcalls1: "0",
    gdirection1: "0",
    gbutton1: "0",

    fbAccounts: [],
    fViews: "-",
    fWeb: "-",
    fcalls: "-",
    fdirection: "-",
    fViews1: "0",
    fWeb1: "0",
    fcalls1: "0",
    fdirection1: "0",

    fbIsLoggedIn: false,

    google_token: "",

    show_states: "",
    range_name: "Last week",
    today_date: "",
    last_week: "",
    last_month: "",
    last_3_month: "",
    last_6_month: "",
    last_year: ""
  };

  componentClicked = e => {
    console.log("clicked");
    // e.preventDefault();
  };
  responseFacebook = response => {
    console.log(response);
    const data = {
      location_id: this.props.match.params.locationId,
      Platform: "Facebook",
      Token: response.accessToken,
      Username: response.name,
      Email: response.email,
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
        console.log(resp.data.data);
        this.setState({
          fbIsLoggedIn: true,

          fbName: response.name,

          fbToken: response.accessToken,
          fbId: resp.data.data.conect_to_location_id
        });
      })
      .catch(resp => {
        console.log(resp);
      });

    localStorage.setItem("fb_token", response.accessToken);
  };

  componentDidMount() {
    var yelpUrl, fourUrl, fbtoken, fbPageId, googleToken;

    const data = {
      location_id: this.props.match.params.locationId
    };

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    var last_week =
      lastWeek.getFullYear() +
      "-" +
      (lastWeek.getMonth() + 1) +
      "-" +
      lastWeek.getDate();

    var lastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    );

    var last_month =
      lastMonth.getFullYear() +
      "-" +
      (lastMonth.getMonth() + 1) +
      "-" +
      lastMonth.getDate();

    var last3Month = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 91
    );

    var last_3_month =
      last3Month.getFullYear() +
      "-" +
      (last3Month.getMonth() + 1) +
      "-" +
      last3Month.getDate();

    var last6Month = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 182
    );

    var last_6_month =
      last6Month.getFullYear() +
      "-" +
      (last6Month.getMonth() + 1) +
      "-" +
      last6Month.getDate();

    var lastYear = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 365
    );

    var last_year =
      lastYear.getFullYear() +
      "-" +
      (lastYear.getMonth() + 1) +
      "-" +
      lastYear.getDate();

    this.setState({
      today_date: date,
      last_week: last_week,
      last_month: last_month,
      last_3_month: last_3_month,
      last_6_month: last_6_month,
      last_year: last_year,
      show_states: last_week
    });

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(response => {
      console.log(response);

      this.setState({ loader: false });
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Facebook") {
          fbtoken = l.Social_Platform.Token;
          this.setState({ fbIsLoggedIn: true });
          fbPageId = l.Social_Platform.Other_info;
        }

        if (l.Social_Platform.Platform == "Google") {
          console.log("yes goo");
          googleToken = l.Social_Platform.Token;
          this.setState({ google_token: googleToken });
          console.log(googleToken);
        }

        if (l.Social_Platform.Platform == "Foursquare") {
          console.log("yes four");

          fourUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[5];
        }

        if (l.Social_Platform.Platform == "Yelp") {
          console.log("yes yelp");

          yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        }
      });

      // for google

      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      if (googleToken) {
        Axios.get(
          "https://mybusiness.googleapis.com/v4/accounts/",
          GoogleConfig
        ).then(res => {
          console.log(res.data);
          localStorage.setItem("accountId", res.data.accounts[0].name);
          this.google_report_insight();
        });
      }

      console.log(fbtoken);

      // for facebook
      if (fbtoken) {
        Axios.get(
          "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
        ).then(res => {
          console.log(res.data);
          this.setState({ fbAccounts: res.data.data });
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
            console.log(resp.data);
            this.setState({
              fViews: resp.data.data[2].values[0].value,
              fWeb: resp.data.data[5].values[0].value,
              fcalls: resp.data.data[3].values[0].value,
              fdirection: resp.data.data[4].values[0].value,
              fViews1: resp.data.data[2].values[0].value,
              fWeb1: resp.data.data[5].values[0].value,
              fcalls1: resp.data.data[3].values[0].value,
              fdirection1: resp.data.data[4].values[0].value
            });
          });
        });
      }
    });
  }

  google_report_insight = () => {
    this.setState({ loading: true });
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.state.google_token }
    };

    Axios.get(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("accountId") +
        "/locations",
      GoogleConfig
    ).then(resp => {
      console.log(resp.data);

      localStorage.setItem("locationIdAna", resp.data.locations[0].name);
      Axios.post(
        "https://mybusiness.googleapis.com/v4/" +
          localStorage.getItem("accountId") +
          "/locations:reportInsights",
        {
          locationNames: [localStorage.getItem("locationIdAna")],
          basicRequest: {
            metricRequests: [
              {
                metric: "ALL"
              }
            ],
            timeRange: {
              startTime: this.state.show_states + "T01:01:23.045123456Z",
              endTime: this.state.today_date + "T23:59:59.045123456Z"
            }
          }
        },

        GoogleConfig
      ).then(res => {
        console.log(res.data.locationMetrics[0]);

        this.setState({
          in: res.data.locationMetrics[0].metricValues,
          profileViews:
            res.data.locationMetrics[0].metricValues[3].totalValue.value,
          gWeb: res.data.locationMetrics[0].metricValues[5].totalValue.value,
          gcalls: res.data.locationMetrics[0].metricValues[6].totalValue.value,
          gdirection:
            res.data.locationMetrics[0].metricValues[7].totalValue.value,
          profileViews1:
            res.data.locationMetrics[0].metricValues[3].totalValue.value,
          gWeb1: res.data.locationMetrics[0].metricValues[5].totalValue.value,
          gcalls1: res.data.locationMetrics[0].metricValues[6].totalValue.value,
          gdirection1:
            res.data.locationMetrics[0].metricValues[7].totalValue.value,
          loading: false
        });
      });
    });
  };

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  change_states = (states, range) => e => {
    console.log("e.target.name", states, range);
    this.setState({ show_states: states, range_name: range });
    this.google_report_insight();
  };

  render() {
    var loader;
    if (this.state.loader) {
      loader = <Spinner />;
    } else {
      loader = "";
    }

    let {
      today_date,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states
    } = this.state;
    console.log(
      "date",
      today_date,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states
    );
    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">{loader}</div>
          <div className="rightside_title">
            <h1>Profile Analytics</h1>
          </div>
          {this.state.fbIsLoggedIn ? (
            ""
          ) : (
            <div className=" mb-30">
              <div className="analytics-whice analytics">
                <div className="analyticsboxdd">
                  <div className="faceboxbox">
                    <img
                      src={require("../images/facebook.png")}
                      alt="facebook"
                    />
                  </div>
                  <div className="analytics-text">
                    <h2>
                      Connect your Facebook profile to get profile analytics for
                      your Facebook listing
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum{" "}
                    </p>
                  </div>
                  <div className="facebooks">
                    {/* <a href="#">
<i className="zmdi zmdi-facebook"></i> */}
                    <ReactFacebookLogin
                      appId="187396122554776"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={this.componentClicked}
                      callback={this.responseFacebook}
                    />
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className=" mb-30">
            <div className="analytics-whice">
              <div className="box-space ">
                <h2 className="analytics_btnx">
                  Profile States
                  <div className="camgianbox">
                    <button className="camaign" onClick={this.printDocument}>
                      {" "}
                      Download Report
                    </button>
                    <div className="dropdown">
                      <a
                        href="#"
                        className="last_btn dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i className="zmdi zmdi-calendar"></i>
                        {this.state.range_name}
                        <span className="zmdi zmdi-caret-down"></span>
                      </a>
                      <div className="dropdown-menu">
                        <ul>
                          <li
                            onClick={this.change_states(last_week, "Last week")}
                          >
                            Last week
                          </li>
                          <li
                            onClick={this.change_states(
                              last_month,
                              "Last month"
                            )}
                          >
                            Last month
                          </li>
                          <li
                            onClick={this.change_states(
                              last_3_month,
                              "Last 3 months"
                            )}
                          >
                            Last 3 months
                          </li>
                          <li
                            onClick={this.change_states(
                              last_6_month,
                              "Last 6 months"
                            )}
                          >
                            Last 6 months
                          </li>
                          <li
                            onClick={this.change_states(last_year, "Last year")}
                          >
                            Last year
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </h2>
              </div>
            </div>
          </div>

          <div
            id="divToPrint"
            className="mt4"
            {...css({
              backgroundColor: "#f5f5f5",
              width: "210mm",
              minHeight: "297mm",
              marginLeft: "auto",
              marginRight: "auto"
            })}
            style={{
              height: "297mm",
              width: "180mm",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {this.state.loading ? (
              <div style={{ textAlign: "center" }}>
                <Loader2
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  // timeout={3000} //3 secs
                />
              </div>
            ) : (
              <div>
                <div className="total_ant antvd">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="totl-listing">
                        <div className="icon">
                          <img src={require("../images/re_an_1.png")} />
                        </div>
                        <div className="icon-text">
                          <h2>
                            {parseInt(this.state.fViews1) +
                              parseInt(this.state.profileViews1)}{" "}
                            <div className="dropdown parsent">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {/* +01.3% */}-
                                <span className="zmdi zmdi-caret-down"></span>
                              </a>
                              <div className="dropdown-menu">
                                <ul>
                                  <li>{/* +01.3% */}-</li>
                                  <li>{/* +01.3% */}-</li>
                                </ul>
                              </div>
                            </div>
                          </h2>
                          <h3>Total Profile View</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="totl-listing">
                        <div className="icon">
                          <img src={require("../images/re_an_2.png")} />
                        </div>
                        <div className="icon-text">
                          <h2>
                            {parseInt(this.state.fWeb1) +
                              parseInt(this.state.gWeb1)}{" "}
                            <div className="dropdown parsent red">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {/* 0.52% */}-
                                <span className="zmdi zmdi-caret-down"></span>
                              </a>
                              <div className="dropdown-menu">
                                <ul>
                                  <li>{/* 0.52% */}-</li>
                                  <li>{/* 0.52% */}-</li>
                                </ul>
                              </div>
                            </div>
                          </h2>
                          <h3>Website visits</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="totl-listing">
                        <div className="icon">
                          <img src={require("../images/re_an_3.png")} />
                        </div>
                        <div className="icon-text">
                          <h2>
                            {parseInt(this.state.fcalls1) +
                              parseInt(this.state.gcalls1)}{" "}
                            <div className="dropdown parsent">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {/* 1.34% */}-
                                <span className="zmdi zmdi-caret-down"></span>
                              </a>
                              <div className="dropdown-menu">
                                <ul>
                                  <li>{/* 1.34% */}-</li>
                                  <li>{/* 1.34% */}-</li>
                                </ul>
                              </div>
                            </div>
                          </h2>
                          <h3>Phone cells</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="totl-listing">
                        <div className="icon">
                          <img src={require("../images/re_an_4.png")} />
                        </div>
                        <div className="icon-text">
                          <h2>
                            {parseInt(this.state.gdirection1) +
                              parseInt(this.state.fdirection1)}{" "}
                            <div className="dropdown parsent">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {/* 1.34% */}-
                                <span className="zmdi zmdi-caret-down"></span>
                              </a>
                              <div className="dropdown-menu">
                                <ul>
                                  <li>{/* 1.34% */}-</li>
                                  <li>{/* 1.34% */}-</li>
                                </ul>
                              </div>
                            </div>
                          </h2>
                          <h3>Direction Request</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="totl-listing">
                        <div className="icon">
                          <img src={require("../images/re_an_5.png")} />
                        </div>
                        <div className="icon-text">
                          <h2>
                            {parseInt(this.state.gdirection1) +
                              parseInt(this.state.fdirection1)}{" "}
                            <div className="dropdown parsent">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {/* 1.34% */}-
                                <span className="zmdi zmdi-caret-down"></span>
                              </a>
                              <div className="dropdown-menu">
                                <ul>
                                  <li>{/* 1.34% */}-</li>
                                  <li>{/* 1.34% */}-</li>
                                </ul>
                              </div>
                            </div>
                          </h2>
                          <h3>Button clicks</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-30">
                  <div className="">
                    <table
                      id="example"
                      className="analytics-whice"
                      cellSpacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Profile (2)</th>
                          <th>Profile View</th>
                          <th>Website Visits</th>
                          <th>Phone Cells</th>
                          <th>Direction Request</th>
                          <th>Button Clicks</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Consolidated</td>
                          <td>
                            {parseInt(this.state.fViews1) +
                              parseInt(this.state.profileViews1)}
                          </td>
                          <td>
                            {parseInt(this.state.fWeb1) +
                              parseInt(this.state.gWeb1)}
                          </td>
                          <td>
                            {parseInt(this.state.fcalls1) +
                              parseInt(this.state.gcalls1)}
                          </td>
                          <td>
                            {parseInt(this.state.gdirection1) +
                              parseInt(this.state.fdirection1)}
                          </td>
                          <td>
                            {parseInt(this.state.gcalls1) +
                              parseInt(this.state.gdirection1) +
                              parseInt(this.state.gWeb1) +
                              parseInt(this.state.fcalls1) +
                              parseInt(this.state.fdirection1) +
                              parseInt(this.state.fWeb1)}
                          </td>
                        </tr>
                        <tr>
                          <td>Google</td>
                          <td>{this.state.profileViews}</td>
                          <td>{this.state.gWeb}</td>
                          <td>{this.state.gcalls} </td>
                          <td>{this.state.gdirection}</td>
                          <td>
                            {this.state.gcalls == "-"
                              ? "-"
                              : parseInt(this.state.gcalls) +
                                parseInt(this.state.gdirection) +
                                parseInt(this.state.gWeb)}
                          </td>
                        </tr>

                        <tr>
                          <td>Facebook</td>
                          <td>{this.state.fViews}</td>
                          <td>{this.state.fWeb}</td>
                          <td>{this.state.fcalls} </td>
                          <td>{this.state.fdirection}</td>
                          <td>
                            {this.state.fcalls == "-"
                              ? "-"
                              : parseInt(this.state.fcalls) +
                                parseInt(this.state.fdirection) +
                                parseInt(this.state.fWeb)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
