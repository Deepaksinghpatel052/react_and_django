import React, { Component } from "react";
import Axios from "axios";
import Spinner from "./common/Spinner";
import { PieChart } from "react-minimal-pie-chart";
import Chart from "react-google-charts";
// import CanvasJSReact from "./canvas/canvasjs.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer XkjWF9GSy19xRS_yytCtISMaViqsPuXGmQiTzzAdcRHHNJmISD9bnHisRb8tgF5H7xVuMnbcybxOvEHHM7o91yTFKcGO7KrERhOSMS9NtRiPQNq9tCxMl61oD10pXnYx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

export default class PromotioalGenerationStats extends Component {
  state = {
    loader: true,

    fb_reviews: "",
    google_reviews: "",

    google_average_rating: 0,
    google_all_reviews: 0,
    fb_average_rating: 0,
    fb_all_reviews: 0,
    yelp_average_rating: 0,
    yelp_all_reviews: 0,
    foursquare_average_rating: 0,
    foursquare_all_reviews: 0,

    today: "",
    days: [],
    months: [],
    years: [],
    // options: {
    //   animationEnabled: true,
    //   title: {
    //     text: "Google vs Facebook"
    //   },
    //   axisY: {
    //     title: "Reviews",
    //     includeZero: false
    //   },
    //   toolTip: {
    //     shared: true
    //   },
    //   data: [
    //     {
    //       type: "spline",
    //       name: "Google",
    //       showInLegend: true,
    //       dataPoints: []
    //     },
    //     {
    //       type: "spline",
    //       name: "Facebook",
    //       showInLegend: true,
    //       dataPoints: []
    //     }
    //   ]
    // },
    // dataPoints1: [],
    // dataPoints2: [],
    google_dataPoints: [],
    dailyClicked: false,
    monthlyClicked: true,
    yearlyClicked: false
  };

  componentDidMount = () => {
    var today = new Date();

    var day0 = today;
    var day1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );

    var day2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 2
    );

    var day3 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 3
    );

    var day4 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 4
    );

    var day5 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 5
    );

    var day6 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 6
    );

    var day7 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    var day8 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 8
    );

    var day9 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 9
    );

    var month0 = today;

    var month1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    );

    var month2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 60
    );

    var month3 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 90
    );

    var month4 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 120
    );

    var month5 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 150
    );

    var month6 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 180
    );

    var month7 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 210
    );

    var month8 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 240
    );

    var month9 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 270
    );

    var month10 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 300
    );

    var month11 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 330
    );

    var month12 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 360
    );

    this.setState({
      today,
      days: [day0, day1, day2, day3, day4, day5, day6, day7, day8, day9]
    });

    this.setState({
      months: [
        month0,
        month1,
        month2,
        month3,
        month4,
        month5,
        month6,
        month7,
        month8,
        month9,
        month10,
        month11
      ]
    });

    var year0 = today.getFullYear();

    this.setState({
      years: [
        year0,
        year0 - 1,
        year0 - 2,
        year0 - 3,
        year0 - 4,
        year0 - 5,
        year0 - 6,
        year0 - 7,
        year0 - 8,
        year0 - 9,
        year0 - 10
      ]
    });

    var yelpUrl,
      fourUrl,
      appleUrl,
      citysearchUrl,
      fbtoken,
      fbPageId,
      googleToken;
    const data = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "http://18.216.54.114/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(response => {
        console.log(response);

        response.data.data.map(l => {
          if (l.Social_Platform.Platform == "Facebook") {
            fbtoken = l.Social_Platform.Token;
            fbPageId = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Google") {
            googleToken = l.Social_Platform.Token;
          }

          if (l.Social_Platform.Platform == "Foursquare") {
            fourUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[5];
          }

          if (l.Social_Platform.Platform == "Yelp") {
            yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.Social_Platform.Platform == "Apple") {
            appleUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[6]
              .slice(2);
          }

          if (l.Social_Platform.Platform == "Citysearch") {
            citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[4];
          }
        });

        const GoogleConfig = {
          headers: { Authorization: "Bearer " + googleToken }
        };

        // for facebook
        if (fbtoken) {
          Axios.get(
            "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
              fbtoken
          ).then(res => {
            console.log("facebook data", res.data);
            var fbPageAccessToken, index;
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].id == fbPageId) {
                fbPageAccessToken = res.data.data[i].access_token;
                index = i;
              }
            }
            Axios.get(
              "https://graph.facebook.com/" +
                fbPageId +
                "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
                fbPageAccessToken
            ).then(resp => {
              console.log("facebook page data", resp.data.data);
              this.setState({
                fb_reviews: resp.data.data,
                fb_all_reviews: resp.data.data.length,
                fb_average_rating: res.data.data[index].overall_star_rating
              });

              this.monthlyLineGraph();
            });
          });
        }

        // for yelp
        if (yelpUrl) {
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
              yelpUrl.slice(25),
            Yelpconfig
          ).then(resp => {
            console.log("yelpDetails", resp.data);
            this.setState({
              yelp_all_reviews: resp.data.review_count,
              yelp_average_rating: resp.data.rating
            });
          });
        }

        // for google
        if (googleToken) {
          Axios.get(
            "https://mybusiness.googleapis.com/v4/accounts/",
            GoogleConfig
          ).then(res => {
            console.log(res.data);
            localStorage.setItem("accountId", res.data.accounts[0].name);

            Axios.get(
              "https://mybusiness.googleapis.com/v4/" +
                localStorage.getItem("accountId") +
                "/locations",
              GoogleConfig
            ).then(resp => {
              console.log("all google locations", resp.data);

              localStorage.setItem(
                "locationIdGoogle",
                resp.data.locations[0].name
              );

              Axios.get(
                "https://mybusiness.googleapis.com/v4/" +
                  localStorage.getItem("locationIdGoogle") +
                  "/reviews",
                GoogleConfig
              ).then(respo => {
                console.log("google reviews", respo.data);
                this.setState({
                  google_reviews: respo.data.reviews,
                  google_all_reviews: respo.data.reviews.length,
                  google_average_rating: respo.data.averageRating
                });
                this.monthlyLineGraph();
              });
            });
          });
        }

        // For foursquare
        if (fourUrl) {
          Axios.get(
            "https://api.foursquare.com/v2/venues/" +
              fourUrl +
              "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
          ).then(res => {
            console.log("foursquare", res.data.response);
            this.setState({
              foursquare_average_rating: res.data.response.venue.rating / 2,
              foursquare_all_reviews: res.data.response.venue.tips.count
            });
          });
        }

        // apple
        // if (appleUrl) {
        //   Axios.get(
        //     "https://itunes.apple.com/in/rss/customerreviews/id=" +
        //       appleUrl +
        //       "/sortBy=mostRecent/json"
        //   ).then(res => {
        //     console.log("apple data in json", res);

        //     this.setState({
        //       appleReviews: res.data.feed.entry,
        //       appleDetails: res,
        //       appleReviewCount: res.data.feed.entry.length
        //     });
        //   });
        // }

        // citysearch
        // if (citysearchUrl) {
        //   console.log("inside citysearchUrl");
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
        //       citysearchUrl +
        //       "&publisher=test"
        //   ).then(res => {
        //     console.log("citysearchUrl response", res);

        //     var XMLParser = require("react-xml-parser");
        //     var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
        //     console.log(xml);
        //     console.log(xml.getElementsByTagName("review"));
        //     this.setState({
        //       citysearchReviews: xml.getElementsByTagName("review"),
        //       citysearchDetails: xml,
        //       citysearchReviewCount: xml.getElementsByTagName("review").length
        //     });
        //     this.citysearch_star_counting(xml.getElementsByTagName("review"));
        //   });
        // }

        this.setState({ loader: false });
      })
      .catch(res => {
        console.log(res);
      });
  };

  dailyLineGraph = () => {
    console.log("clicked dailyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      days
    } = this.state;

    this.setState({
      yearlyClicked: false,
      monthlyClicked: false,
      dailyClicked: false
    });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < days.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == days[i].getFullYear()) {
          if (parseInt(create_time1.slice(5, 7)) == days[i].getMonth() + 1) {
            if (parseInt(create_time1.slice(8, 10)) == days[i].getDate()) {
              a1++;
            }
          }
        }
      }

      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == days[i].getFullYear()) {
          if (parseInt(create_time2.slice(5, 7)) == days[i].getMonth() + 1) {
            if (parseInt(create_time2.slice(8, 10)) == days[i].getDate()) {
              a2++;
            }
          }
        }
      }
      // dataPoints1.push({ y: a1, label: (days[i] + "").slice(0, 15) });
      // dataPoints2.push({ y: a2, label: (days[i] + "").slice(0, 15) });
      google_dataPoints.push([(days[i] + "").slice(0, 15), a1, a2]);
    }
    // 2nd chart end
    // this.setState({ dataPoints1, dataPoints2, dailyClicked: true });
    this.setState({
      google_dataPoints,
      dailyClicked: true
    });
  };

  monthlyLineGraph = () => {
    console.log("clicked monthlyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      months
    } = this.state;

    this.setState({
      yearlyClicked: false,
      monthlyClicked: false,
      dailyClicked: false
    });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < months.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == months[i].getFullYear()) {
          if (parseInt(create_time1.slice(5, 7)) == months[i].getMonth() + 1) {
            a1++;
          }
        }
      }
      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == months[i].getFullYear()) {
          if (parseInt(create_time2.slice(5, 7)) == months[i].getMonth() + 1) {
            a2++;
          }
        }
      }
      // dataPoints1.push({ y: a1, label: (months[i] + "").slice(0, 15) });
      // dataPoints2.push({ y: a2, label: (months[i] + "").slice(0, 15) });
      google_dataPoints.push([(months[i] + "").slice(0, 15), a1, a2]);
    }

    // 2nd chart end
    // this.setState({ dataPoints1, dataPoints2, monthlyClicked: true });
    this.setState({
      google_dataPoints,
      monthlyClicked: true
    });
  };

  yearlyLineGraph = () => {
    console.log("clicked yearlyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      years
    } = this.state;

    this.setState({ yearlyClicked: false, monthlyClicked: false });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < years.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == years[i]) {
          a1++;
        }
      }
      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == years[i]) {
          a2++;
        }
      }
      // dataPoints1.push({ y: a1, label: (years[i] + "").slice(0, 4) });
      // dataPoints2.push({ y: a2, label: (years[i] + "").slice(0, 4) });
      google_dataPoints.push([(years[i] + "").slice(0, 15), a1, a2]);
    }

    // 2nd chart end
    this.setState({
      google_dataPoints,
      yearlyClicked: true
    });
  };

  render() {
    let {
      fb_reviews,
      google_reviews,

      google_all_reviews,
      google_average_rating,
      fb_all_reviews,
      fb_average_rating,
      yelp_all_reviews,
      yelp_average_rating,
      foursquare_all_reviews,
      foursquare_average_rating,

      // dataPoints1,
      // dataPoints2,
      google_dataPoints,
      dailyClicked,
      monthlyClicked,
      yearlyClicked
    } = this.state;

    let a = 0;
    a =
      a +
      (google_average_rating != 0 ? 1 : 0) +
      (fb_average_rating != 0 ? 1 : 0) +
      (yelp_average_rating != 0 ? 1 : 0) +
      (foursquare_average_rating != 0 ? 1 : 0);

    const all_reviews =
      google_all_reviews +
      fb_all_reviews +
      yelp_all_reviews +
      foursquare_all_reviews;

    const average_rating =
      a == 0
        ? "-"
        : (google_average_rating +
            fb_average_rating +
            yelp_average_rating +
            foursquare_average_rating) /
          a;

    const dataMock = [
      { title: "Google", value: google_all_reviews, color: "#ffb92d" },
      { title: "Facebook", value: fb_all_reviews, color: "#0460ea" },
      {
        title: "Other sites",
        value: foursquare_all_reviews + yelp_all_reviews,
        color: "#04e38a"
      }
      // { title: "Foursquare", value: foursquare_all_reviews, color: "#04e38a" }
    ];

    // const options = {
    //   animationEnabled: true,
    //   title: {
    //     text: "Google vs Facebook"
    //   },
    //   axisY: {
    //     title: "Reviews",
    //     includeZero: false
    //   },
    //   toolTip: {
    //     shared: true
    //   },
    //   data: [
    //     {
    //       type: "spline",
    //       name: "Google",
    //       showInLegend: true,
    //       dataPoints: dataPoints1
    //     },
    //     {
    //       type: "spline",
    //       name: "Facebook",
    //       showInLegend: true,
    //       dataPoints: dataPoints2
    //     }
    //   ]
    // };

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">
            <h1 className="reviewboxtitle">
              Promotional Generation Stats
              <div className="camgianbox">
                <a href="#" className="camaign">
                  <i className="zmdi zmdi-plus"></i> Create new campaign
                </a>
                <div className="dropdown">
                  <a
                    href="#"
                    className="last_btn dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="zmdi zmdi-calendar"></i>
                    This Week
                    <span className="zmdi zmdi-caret-down"></span>
                  </a>
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <a href="#">Last Week</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <a href="#" className="settings">
                  <i className="zmdi zmdi-settings"></i>
                </a>
              </div>
            </h1>
          </div>

          <div className="mt-30">
            <div className="row">
              <div className="col-md-8">
                <div className="viewallreview">
                  <div className="border-bottom d-online-flex">
                    <ul className="review_weekly">
                      <li
                        onClick={this.dailyLineGraph}
                        className={dailyClicked ? "active" : ""}
                      >
                        {" "}
                        <a>Daily</a>
                      </li>
                      <li>
                        <a>Weekly</a>
                      </li>
                      <li
                        onClick={this.monthlyLineGraph}
                        className={monthlyClicked ? "active" : ""}
                      >
                        {" "}
                        <a>Monthly</a>
                      </li>

                      <li
                        onClick={this.yearlyLineGraph}
                        className={yearlyClicked ? "active" : ""}
                      >
                        <a>Yearly</a>
                      </li>
                    </ul>
                    <div className="onlineshow">
                      <span>
                        <input
                          type="checkbox"
                          id="online"
                          name="fruit-1"
                          value="online"
                          defaultChecked
                        />
                        <label htmlFor="online">Online</label>
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          id="store"
                          name="fruit-1"
                          value="store"
                        />
                        <label htmlFor="store">store</label>
                      </span>
                    </div>
                  </div>

                  <div className="line-chart">
                    {/* <img src={require("../images/chart-line.jpg")} alt="" /> */}
                    {/* line chart */}

                    <div>
                      {/* <CanvasJSChart options={options} /> */}
                      <Chart
                        width={"600px"}
                        height={"400px"}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.google_dataPoints}
                        options={{
                          hAxis: {
                            title: "Day"
                          },
                          vAxis: {
                            title: "Reviews"
                          },
                          series: {
                            0: { curveType: "function" },
                            1: { curveType: "function" }
                          }
                        }}
                        rootProps={{ "data-testid": "2" }}
                      />
                    </div>

                    {/* line chart */}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="viewallreview traffic-chartbox">
                  <h3>Traffic Chart</h3>
                  <div className="text-center mt-30">
                    {/* <img src={require("../images/pie-chart-2.jpg")} /> */}
                    {/* pie chart */}
                    <PieChart
                      data={dataMock}
                      lineWidth={23}
                      rounded
                      //   style={{ height: "220px" }}
                    />
                    {/* pie chart */}
                  </div>

                  <div className="stats-box">
                    <div className="countboxpie">
                      <div className="col-md-4">
                        <div className="facpie sitebox">
                          <h2>
                            {all_reviews == 0
                              ? "-"
                              : ((google_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </h2>
                          <span>Google</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="facpie facebook_div">
                          <h2>
                            {all_reviews == 0
                              ? "-"
                              : ((fb_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </h2>
                          <span>Facebook</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="facpie whatsaapbox">
                          <h2>
                            {all_reviews == 0
                              ? "-"
                              : (
                                  ((yelp_all_reviews + foursquare_all_reviews) /
                                    all_reviews) *
                                  100
                                )
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </h2>
                          <span>Other sites</span>
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="facpie whatsaapbox">
                          <h2>
                            {all_reviews == 0
                              ? "-"
                              : ((yelp_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </h2>
                          <span>Yelp</span>
                        </div>
                      </div> */}
                      {/* <div className="col-md-4">
                        <div className="facpie foursquarebox">
                          <h2>
                            {all_reviews == 0
                              ? "-"
                              : ((foursquare_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </h2>
                          <span>Foursquare</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-30">
            <div className="analytics-whice">
              <div className="box-space ">
                <h2 className="analytics_btnx">campaign list</h2>
              </div>

              <div className="total_ant">
                <div className="row">
                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/c-1.jpg")} />
                      </div>
                      <div className="icon-text">
                        <h2>31</h2>
                        <h3>Total campaign</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/c-2.jpg")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {average_rating != 0
                            ? average_rating.toString().slice(0, 4)
                            : "-"}
                          <div className="dropdown parsent red">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              0.52%
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>0.52%</li>
                                <li>0.52%</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>Overall Rating</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/c-3.jpg")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {all_reviews != 0 ? all_reviews : "-"}
                          <div className="dropdown parsent">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              1.34%
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>170%</li>
                                <li>180%</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>Number of reviews</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/c-4.jpg")} />
                      </div>
                      <div className="icon-text">
                        <h2 className="bo25">
                          25{" "}
                          <span>
                            <i className="zmdi zmdi-email"></i>
                          </span>
                          25{" "}
                          <span>
                            <i className="zmdi zmdi-comment-more"></i>
                          </span>
                        </h2>
                        <h3>Invites sent</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
