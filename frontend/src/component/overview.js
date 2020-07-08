import React, { Component } from "react";
import Chart from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";
import Axios from "axios";
import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";
import Rating from "react-rating";

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer XkjWF9GSy19xRS_yytCtISMaViqsPuXGmQiTzzAdcRHHNJmISD9bnHisRb8tgF5H7xVuMnbcybxOvEHHM7o91yTFKcGO7KrERhOSMS9NtRiPQNq9tCxMl61oD10pXnYx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class Overview extends Component {
  state = {
    metric: [],
    loader: true,
    loading: false,
    google_token: "",
    show_states: "",
    range_name: "Last week",
    today_date: "",
    today_time: "",
    last_week: "",
    last_month: "",
    last_3_month: "",
    last_6_month: "",
    last_year: "",
    all_connections: [],
    google_views: "-",
    google_searched: "-",
    google_clicks: "-",
    google_phone: "-",
    yelpDetails: "",
    instaDetails: "",
    instaFollowers: "-",
    instaFollowing: "-",
    instaPosts: "-",
    fViews: "-",
    fWebClicks: "-",
    fcalls: "-",
    fdirection: "-",
    fengaged: "-",
    fimpressions: "-",
    fb_notification: "",
    fbReviews: [],
    googleReviews: [],
    is_google_reply: false,
    google_reply_to_id: "",
    google_reply: "",
    foursquareReviews: [],
    appleReviews: [],
    citysearchReviews: [],
    yelpReviews: [],
    view_notification_type: false
  };
  componentDidMount() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var time =
      today.getHours() +
      ":" +
      (today.getMinutes() + 1) +
      ":" +
      today.getSeconds();

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
      today_time: time,
      last_week: last_week,
      last_month: last_month,
      last_3_month: last_3_month,
      last_6_month: last_6_month,
      last_year: last_year,
      show_states: last_week
    });

    var yelpUrl,
      fourUrl,
      appleUrl,
      citysearchUrl,
      instaUrl,
      fbtoken,
      fbPageId,
      googleToken;

    const data = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(response => {
      console.log("all connections", response);
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Facebook") {
          fbtoken = l.Social_Platform.Token;
          fbPageId = l.Social_Platform.Other_info;
        }
        if (l.Social_Platform.Platform == "Google") {
          console.log("yes google");
          googleToken = l.Social_Platform.Token;
          this.setState({ google_token: googleToken });
        }
        if (l.Social_Platform.Platform == "Yelp") {
          // console.log("yes yelp");
          // console.log(l.Social_Platform.Other_info.split(",")[0].slice(7));
          // yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          this.setState({
            all_connections: [...this.state.all_connections, { name: "Yelp" }]
          });
          yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        }

        if (l.Social_Platform.Platform == "Foursquare") {
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Foursquare" }
            ]
          });

          fourUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[5];
        }

        if (l.Social_Platform.Platform == "Apple") {
          this.setState({
            all_connections: [...this.state.all_connections, { name: "Apple" }]
          });

          appleUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[6]
            .slice(2);
        }

        if (l.Social_Platform.Platform == "Instagram") {
          console.log("yes instagram");
          console.log(
            "instagram id",
            l.Social_Platform.Other_info.split(",")[0].slice(7)
          );
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Instagram" }
            ]
          });
          instaUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        }

        if (l.Social_Platform.Platform == "Citysearch") {
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Citysearch" }
            ]
          });

          citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[4];
        }
      });

      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      // for imstagram
      // if (fbtoken) {
      //   Axios.get(
      //     "https://www.instagram.com/oauth/authorize?client_id=708019883077720&redirect_uri=https://digimonk.com/auth/&scope=user_profile,user_media&response_type=code"
      //   ).then(resp => {
      //     console.log("instagram data", resp);
      //   });
      // }

      //for yelp
      // if (yelpUrl) {
      //   Axios.get(
      //     "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
      //       yelpUrl.slice(25),
      //     Yelpconfig
      //   ).then(resp => {
      //     console.log("hii");
      //     console.log("yelpDetails", resp.data);
      //     this.setState({ yelpDetails: resp.data });
      //   });
      // }

      // for facebook
      if (fbtoken) {
        Axios.get(
          "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
        ).then(res => {
          console.log("facebook data1", res.data);
          this.setState({
            fbAccounts: res.data.data,
            all_connections: [
              ...this.state.all_connections,
              { name: "Facebook" }
            ]
          });
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
            console.log("facebook data2", resp.data);
            this.setState({
              fViews: resp.data.data[2].values[0].value,
              fWebClicks: resp.data.data[5].values[0].value,
              fcalls: resp.data.data[3].values[0].value,
              fdirection: resp.data.data[4].values[0].value,
              fengaged: resp.data.data[0].values[0].value,
              fimpressions: resp.data.data[1].values[0].value
            });
          });
          Axios.get(
            "https://graph.facebook.com/" +
              fbPageId +
              "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
              fbPageAccessToken
          ).then(res => {
            console.log("fb reviews", res.data);
            this.setState({ fbReviews: res.data.data });
          });
          Axios.get(
            "https://graph.facebook.com/" +
              fbPageId +
              "?fields=new_like_count,talking_about_count,unread_message_count,unread_notif_count,unseen_message_count&access_token=" +
              fbPageAccessToken
          ).then(resp => {
            console.log("facebook notifications", resp.data);
            this.setState({ fb_notification: resp.data });
          });
        });
      }

      // Google
      if (googleToken) {
        Axios.get(
          "https://mybusiness.googleapis.com/v4/accounts/",
          GoogleConfig
        ).then(res => {
          console.log("google account", res.data);
          localStorage.setItem("accountId", res.data.accounts[0].name);
          this.setState({
            loader: false,
            all_connections: [...this.state.all_connections, { name: "Google" }]
          });
          this.business_report_insight();

          Axios.get(
            "https://mybusiness.googleapis.com/v4/" +
              localStorage.getItem("accountId") +
              "/locations",
            GoogleConfig
          ).then(resp => {
            console.log("google location", resp.data);

            localStorage.setItem(
              "locationIdGoogle",
              resp.data.locations[0].name
            );

            const google_data = {
              locationNames: [localStorage.getItem("locationIdGoogle")],
              basicRequest: {
                metricRequests: [{ metric: "ALL" }],
                timeRange: {
                  startTime: "2019-10-12T01:01:23.045123456Z",
                  endTime: "2020-05-10T23:59:59.045123456Z"
                }
              }
            };
            Axios.post(
              "https://mybusiness.googleapis.com/v4/" +
                localStorage.getItem("accountId") +
                "/locations:reportInsights",
              google_data,
              GoogleConfig
            ).then(respo => {
              console.log("google location insight", respo.data);
              const data = respo.data.locationMetrics[0].metricValues;
              const google_views = (
                parseInt(data[0].totalValue.value) +
                parseInt(data[1].totalValue.value)
              ).toString();
              const google_searched = data[4].totalValue.value;
              const google_clicks = data[5].totalValue.value;
              const google_phone = data[6].totalValue.value;
              this.setState({
                google_views,
                google_searched,
                google_clicks,
                google_phone
              });
            });

            Axios.get(
              "https://mybusiness.googleapis.com/v4/" +
                localStorage.getItem("locationIdGoogle") +
                "/reviews",
              GoogleConfig
            ).then(respo => {
              console.log("google reviews", respo.data);
              this.setState({ googleReviews: respo.data.reviews });
            });
          });
        });
      }

      //for instagram
      if (instaUrl) {
        Axios.get("https://www.instagram.com/" + instaUrl + "/?__a=1").then(
          res => {
            console.log("instagram data in json", res.data);
            console.log(
              "instagram data in json",
              res.data.graphql.user.edge_owner_to_timeline_media.edges[0].node
                .shortcode
            );
            const instaDetails = res.data.graphql.user;
            const instaFollowers = res.data.graphql.user.edge_followed_by.count;
            const instaFollowing = res.data.graphql.user.edge_follow.count;
            const instaPosts =
              res.data.graphql.user.edge_owner_to_timeline_media.count;
            this.setState({
              instaDetails,
              instaFollowers,
              instaFollowing,
              instaPosts
            });
          }
        );
      }

      // for yelp
      if (yelpUrl) {
        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
            yelpUrl.slice(25) +
            "/reviews",
          Yelpconfig
        ).then(resp => {
          console.log("yelp reviews", resp.data.reviews);
          this.setState({ yelpReviews: resp.data.reviews });
        });
      }

      // For foursquare
      // if (fourUrl) {
      //   Axios.get(
      //     "https://api.foursquare.com/v2/venues/" +
      //       fourUrl +
      //       "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
      //   ).then(res => {
      //     console.log(
      //       "foursquare reviews",
      //       res.data.response.venue.tips.groups[0].items
      //     );
      //     this.setState({
      //       foursquareReviews: res.data.response.venue.tips.groups[0].items
      //     });
      //   });
      // }

      // for apple
      if (appleUrl) {
        Axios.get(
          "https://itunes.apple.com/in/rss/customerreviews/id=" +
            appleUrl +
            "/sortBy=mostRecent/json"
        ).then(res => {
          console.log("apple reviews", res.data.feed.entry);

          this.setState({
            appleReviews: res.data.feed.entry
          });
        });
      }

      if (citysearchUrl) {
        console.log("inside citysearchUrl");
        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
            citysearchUrl +
            "&publisher=test"
        ).then(res => {
          console.log("citysearchUrl response", res);

          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
          console.log(xml);
          console.log("citysearch review", xml.getElementsByTagName("review"));
          this.setState({
            citysearchReviews: xml.getElementsByTagName("review")
          });
        });
      }

      this.setState({ loader: false });
    });
  }

  business_report_insight = () => {
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

      localStorage.setItem("locationIdover", resp.data.locations[0].name);

      const reportInsights = {
        locationNames: [localStorage.getItem("locationIdover")],
        basicRequest: {
          metricRequests: [
            {
              metric: "VIEWS_MAPS",
              options: "AGGREGATED_DAILY"
            },
            {
              metric: "ACTIONS_WEBSITE",
              options: "AGGREGATED_DAILY"
            },
            {
              metric: "ACTIONS_PHONE",
              options: "AGGREGATED_DAILY"
            }
          ],

          timeRange: {
            startTime: this.state.show_states + "T01:01:23.045123456Z",
            endTime: this.state.today_date + "T23:59:59.045123456Z"
          }
        }
      };
      Axios.post(
        "https://mybusiness.googleapis.com/v4/accounts/101169599313855130194/locations:reportInsights",
        reportInsights,
        GoogleConfig
      )
        .then(res => {
          console.log(res);

          this.setState({
            metric: res.data.locationMetrics[0].metricValues,
            loading: false
          });
        })
        .catch(res => {
          console.log("error in overview");
        });
    });
  };

  google_reply_submit = () => {
    let { google_reply_to_id, google_reply, google_token } = this.state;

    const GoogleConfig = {
      headers: { Authorization: "Bearer " + google_token }
    };

    const data = {
      comment: google_reply
    };

    Axios.put(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("locationIdGoogle") +
        "/reviews/" +
        google_reply_to_id +
        "/reply",
      data,
      GoogleConfig
    )
      .then(respo => {
        console.log("google reply response", respo.data);
        this.setState({ is_google_reply: false });
      })
      .catch(respo => {
        console.log("google reply response", respo.data);
      });
  };

  change_states = (states, range) => e => {
    console.log("e.target.name", states, range);
    this.setState({ show_states: states, range_name: range });
    this.business_report_insight();
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
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
      today_time,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states,
      all_connections,
      google_views,
      google_searched,
      google_clicks,
      google_phone,
      yelpDetails,
      instaDetails,
      instaFollowers,
      instaFollowing,
      instaPosts,
      fViews,
      fWebClicks,
      fcalls,
      fdirection,
      fengaged,
      fimpressions,
      fb_notification,
      fbReviews,
      googleReviews,
      is_google_reply,
      google_reply_to_id,
      foursquareReviews,
      appleReviews,
      citysearchReviews,
      yelpReviews,
      view_notification_type
    } = this.state;

    console.log(this.state);
    var date = [],
      phone = [],
      website = [],
      direction = [];

    var chartData = [
      [
        "Date",
        "Phone Call",
        { role: "style" },
        "Get Direction",
        { role: "style" },
        "Website Visited",
        { role: "style" }
      ],
      // ["2020-12-11", 30, "#8860d0", 20, "#528af7", 10, "#58c8fa"]
      ["YYYY-MM-DD", 0, "#8860d0", 0, "#528af7", 0, "#58c8fa"]
    ];
    if (this.state.metric.length > 0) {
      this.state.metric[0].dimensionalValues.map(d => {
        date.push(d.timeDimension.timeRange.startTime);
      });
    }
    console.log(date);
    if (this.state.metric.length > 0) {
      this.state.metric.map(da => {
        if (da.metric == "VIEWS_MAPS") {
          da.dimensionalValues.map(m => {
            direction.push(m.value);
          });
        }
        if (da.metric == "ACTIONS_WEBSITE") {
          da.dimensionalValues.map(m => {
            website.push(m.value);
          });
        }
        if (da.metric == "ACTIONS_PHONE") {
          da.dimensionalValues.map(m => {
            phone.push(m.value);
          });
        }
      });
    }
    console.log(direction);
    console.log(phone);
    console.log(website);

    if (direction.length > 0) {
      for (var i = 0; i < direction.length; i++) {
        chartData.push([
          date[i],
          phone[i],
          "#8860d0",
          direction[i],
          "#528af7",
          website[i],
          "#58c8fa"
        ]);
      }
    }

    const dataMock = [
      // { title: "Google", value: 6, color: "#ffb92d" },
      {
        title: "Opted out",
        value: 7 - all_connections.length,
        color: "#0460ea"
      },
      { title: "Live Listing", value: all_connections.length, color: "#04e38a" }
    ];

    // let fb_show_count_unseen1;
    // let fb_show_count_unseen2;
    // let fb_show_review_notification = [];
    let total_notifications = [];

    if (fb_notification.unseen_message_count > 0) {
      total_notifications = [
        ...total_notifications,
        <div className="notification-box">
          <img
            src={require("../images/facebook.png")}
            alt="facebook"
            height="65"
            width="65"
          />
          <h4>
            Message{" "}
            {/* <span>
              <i className="zmdi zmdi-time"></i> 2 hours ago
            </span> */}
          </h4>
          <p>
            You have {fb_notification.unseen_message_count} unread messages on
            your facebook page
          </p>
          <a
            href={"https://www.facebook.com/" + fb_notification.id + "/inbox"}
            className="notification_btn"
          >
            See message
          </a>
        </div>
      ];
    }

    if (fb_notification.unread_notif_count > 0) {
      total_notifications = [
        ...total_notifications,
        <div className="notification-box">
          <img
            src={require("../images/facebook.png")}
            alt="facebook"
            height="65"
            width="65"
          />
          <h4>
            Notification{" "}
            {/* <span>
              <i className="zmdi zmdi-time"></i> 2 hours ago
            </span> */}
          </h4>
          <p>
            You have {fb_notification.unread_notif_count} unread notifications
            on your facebook page
          </p>
          <a
            href={"https://www.facebook.com/" + fb_notification.id}
            className="notification_btn"
          >
            Go to Page
          </a>
        </div>
      ];
    }

    for (let i = 0; i < fbReviews.length; i++) {
      if (fbReviews[i].created_time.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <div className="notification-box">
            <img
              src={require("../images/facebook.png")}
              alt="facebook"
              height="65"
              width="65"
            />
            <h4>
              Someone give a {fbReviews[i].recommendation_type} review{" "}
              {/* <span>
                  <i className="zmdi zmdi-time"></i> 2 hours ago
                </span> */}
            </h4>
            <p>{fbReviews[i].review_text}</p>
            <a
              href={
                "https://www.facebook.com/" + fb_notification.id + "/reviews"
              }
              className="notification_btn"
            >
              Reply
            </a>
          </div>
        ];
      } else {
        break;
      }
    }

    console.log("this.state", this.state);

    // let google_show_review_notification = [];

    for (let i = 0; i < googleReviews.length; i++) {
      if (googleReviews[i].createTime.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <div>
            <div className="notification-box">
              <img
                src={require("../images/google.png")}
                alt="facebook"
                height="65"
                width="65"
              />
              <br />
              <div className="autor_name">
                <h4>
                  {googleReviews[i].reviewer.displayName}
                  <span>
                    <i className="zmdi zmdi-time"></i>{" "}
                    {parseInt(today_time.slice(0, 2)) -
                      parseInt(googleReviews[i].createTime.slice(11, 13)) ==
                    0
                      ? parseInt(today_time.slice(3, 5)) -
                        parseInt(googleReviews[i].createTime.slice(14, 16)) +
                        "minutes ago"
                      : parseInt(today_time.slice(0, 2)) -
                        parseInt(googleReviews[i].createTime.slice(11, 13)) +
                        "hours ago"}{" "}
                  </span>
                </h4>
                <ul>
                  {googleReviews[i].starRating == "FIVE"
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : googleReviews[i].starRating == "FOUR"
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : googleReviews[i].starRating == "THREE"
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : googleReviews[i].starRating == "TWO"
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : googleReviews[i].starRating == "ONE"
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
              <p>
                {" "}
                {googleReviews[i].comment
                  ? googleReviews[i].comment.length > 160
                    ? googleReviews[i].comment.slice(0, 160) + "..."
                    : googleReviews[i].comment
                  : ""}
              </p>
              <a
                className="notification_btn"
                onClick={() =>
                  this.setState({
                    is_google_reply: is_google_reply == true ? false : true,
                    google_reply_to_id: googleReviews[i].reviewId
                  })
                }
              >
                Reply
              </a>
            </div>

            {is_google_reply == true &&
            google_reply_to_id == googleReviews[i].reviewId ? (
              <div className="notification-box">
                <input
                  type="text"
                  placeholder="Enter your reply"
                  className="form-control"
                  name="google_reply"
                  onChange={this.changeHandler}
                  value={this.state.google_reply}
                  required
                />
                <br />
                <a
                  className="notification_btn"
                  onClick={this.google_reply_submit}
                >
                  Reply
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        ];
      } else {
        break;
      }
    }

    // let yelp_show_review_notification = [];

    for (let i = 0; i < yelpReviews.length; i++) {
      if (yelpReviews[i].time_created.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <div className="notification-box">
            <img
              src={require("../images/yelp.png")}
              alt="yelp"
              height="65"
              width="65"
            />
            <br />
            <br />
            <div className="autor_name">
              <h4>
                {yelpReviews[i].user.name}
                <span>
                  <i className="zmdi zmdi-time"></i>{" "}
                  {parseInt(today_time.slice(0, 2)) -
                    parseInt(yelpReviews[i].time_created.slice(11, 13)) ==
                  0
                    ? parseInt(today_time.slice(3, 5)) -
                      parseInt(yelpReviews[i].time_created.slice(14, 16)) +
                      "minutes ago"
                    : parseInt(today_time.slice(0, 2)) -
                      parseInt(yelpReviews[i].time_created.slice(11, 13)) +
                      "hours ago"}{" "}
                </span>
              </h4>
              <fieldset className="rating star">
                <Rating
                  style={{ color: "#f7c508" }}
                  emptySymbol={["fa fa-star-o fa-2x high"]}
                  fullSymbol={["fa fa-star fa-2x high"]}
                  fractions={3}
                  initialRating={yelpReviews[i].rating}
                  readonly={true}
                />
              </fieldset>
              {/* <ul>
                {yelpReviews[i].rating == 5
                  ? [1, 2, 3, 4, 5].map(res => (
                      <li>
                        <span className="glyphicon glyphicon-star"></span>
                      </li>
                    ))
                  : yelpReviews[i].rating == 4
                  ? [1, 2, 3, 4].map(res => (
                      <li>
                        <span className="glyphicon glyphicon-star"></span>
                      </li>
                    ))
                  : yelpReviews[i].rating == 3
                  ? [1, 2, 3].map(res => (
                      <li>
                        <span className="glyphicon glyphicon-star"></span>
                      </li>
                    ))
                  : yelpReviews[i].rating == 2
                  ? [1, 2].map(res => (
                      <li>
                        <span className="glyphicon glyphicon-star"></span>
                      </li>
                    ))
                  : yelpReviews[i].rating == 1
                  ? [1].map(res => (
                      <li>
                        <span className="glyphicon glyphicon-star"></span>
                      </li>
                    ))
                  : ""}
              </ul> */}
            </div>
            <p>
              {" "}
              {yelpReviews[i].text
                ? yelpReviews[i].text.length > 160
                  ? yelpReviews[i].text.slice(0, 160) + "..."
                  : yelpReviews[i].text
                : ""}
            </p>

            <a href={yelpReviews[i].url} className="notification_btn">
              Reply
            </a>
          </div>
        ];
      } else {
        break;
      }
    }

    // let citysearch_show_review_notification = [];

    for (let i = 0; i < citysearchReviews.length; i++) {
      if (citysearchReviews[i].children[6].value.slice(0, 10) == "2006-04-01") {
        total_notifications = [
          ...total_notifications,
          <div className="notification-box">
            <img
              src={require("../images/citysearch2.jpg")}
              alt="yelp"
              height="65"
              width="65"
            />
            <br />
            <br />
            <div className="autor_name">
              <h4>
                {citysearchReviews[i].children[7].value} leaves{" "}
                {citysearchReviews[i].children[5].value} star review
                <span>
                  <i className="zmdi zmdi-time"></i>{" "}
                  {parseInt(
                    today_time.slice(0, 2) -
                      parseInt(
                        citysearchReviews[i].children[6].value.slice(11, 13)
                      )
                  ) == 0
                    ? parseInt(
                        today_time.slice(3, 5) -
                          parseInt(
                            citysearchReviews[i].children[6].value.slice(14, 16)
                          )
                      ) + "minutes ago"
                    : parseInt(
                        today_time.slice(0, 2) -
                          parseInt(
                            citysearchReviews[i].children[6].value.slice(11, 13)
                          )
                      ) + "hours ago"}{" "}
                </span>
              </h4>
            </div>
            {/* <b>
              {citysearchReviews[i].children[1].value
                ? citysearchReviews[i].children[1].value
                : ""}
            </b> */}
            <p>
              {" "}
              {citysearchReviews[i].children[2].value
                ? citysearchReviews[i].children[2].value.length > 160
                  ? citysearchReviews[i].children[2].value.slice(0, 160) + "..."
                  : citysearchReviews[i].children[2].value
                : ""}
            </p>

            <a
              href={citysearchReviews[i].children[21].value}
              className="notification_btn"
            >
              Reply
            </a>
          </div>
        ];
      } else {
        break;
      }
    }

    // let foursquare_show_review_notification = [];

    // for (let i = 0; i < foursquareReviews.length; i++) {
    //   if (foursquareReviews[i].time_created.slice(0, 10) == "2020-06-23") {
    //     foursquare_show_review_notification = [
    //       ...foursquare_show_review_notification,
    //       <div className="notification-box">
    //         <img
    //           src={require("../images/foursquare.jpg")}
    //           alt="foursquare"
    //           height="65"
    //           width="65"
    //         />
    //         <br />
    //         <br />
    //         <div className="autor_name">
    //           <h4>
    //             {foursquareReviews[i].user.firstName}{" "}
    //             {foursquareReviews[i].user.lastName} leave a review
    //           </h4>
    //         </div>
    //         <p>
    //           {" "}
    //           {foursquareReviews[i].text
    //             ? foursquareReviews[i].text.length > 160
    //               ? foursquareReviews[i].text.slice(0, 160) + "..."
    //               : foursquareReviews[i].text
    //             : ""}
    //         </p>

    //         <a href={yelpReviews[i].canonicalUrl} className="notification_btn">
    //           Reply
    //         </a>
    //       </div>
    //     ];
    //   } else {
    //     break;
    //   }
    // }

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">{loader}</div>
          <div className="mt-30">
            <div className="row">
              <div className="col-md-7">
                <div className="analytics-whice">
                  <div className="box-space">
                    <h2 className="analytics_btnx">
                      Recent Notifications
                      <button
                        onClick={() =>
                          view_notification_type == true
                            ? this.setState({ view_notification_type: false })
                            : this.setState({ view_notification_type: true })
                        }
                        className="viewall"
                      >
                        {view_notification_type == false
                          ? "View all"
                          : "View some"}
                        <i className="zmdi zmdi-caret-down"></i>
                      </button>
                    </h2>
                  </div>

                  <div className="notification-scroll style-4">
                    {view_notification_type == false ? (
                      total_notifications.length > 3 ? (
                        <div>
                          {total_notifications[0]}
                          {total_notifications[1]}
                          {total_notifications[2]}
                        </div>
                      ) : (
                        total_notifications
                      )
                    ) : (
                      total_notifications
                    )}

                    {/* <div className="notification-box">
                      <h4>
                        Company A wirte a comment on post{" "}
                        <span>
                          <i className="zmdi zmdi-time"></i> 2 hours ago
                        </span>
                      </h4>
                      <p>
                        Some dummy comment will be appear here so that use can
                        see something
                      </p>
                      <a href="#" className="notification_btn">
                        Comment
                      </a>
                    </div>

                    <div className="notification-box">
                      <h4>
                        Mark Smith Sent a message{" "}
                        <span>
                          <i className="zmdi zmdi-time"></i> 2 hours ago
                        </span>
                      </h4>
                      <p>
                        Some dummy comment will be appear here so that use can
                        see something
                      </p>
                      <a href="#" className="messages_btn">
                        messages
                      </a>
                    </div>

                    <div className="notification-box">
                      <h4>
                        David Lee ask a question{" "}
                        <span>
                          <i className="zmdi zmdi-time"></i> 2 hours ago
                        </span>
                      </h4>
                      <p>
                        Some dummy comment will be appear here so that use can
                        see something
                      </p>
                      <a href="#" className="registrations_btn">
                        Registrations
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="analytics-whice">
                  <div className="box-space">
                    <h2 className="analytics_btnx">
                      Social Overview
                      <a href="#" className="viewall">
                        View all<i className="zmdi zmdi-caret-down"></i>
                      </a>{" "}
                    </h2>
                  </div>
                  <div className="notification-scroll style-4">
                    <div className="socailsbox">
                      <div className="iconbxo">
                        <img src={require("../images/facebook.png")} alt="" />
                      </div>
                      <div className="liks">
                        <span>Views</span>
                        <h4>{fViews}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Clicks</span>
                        <h4>{fWebClicks}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Calls</span>
                        <h4>{fcalls}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Direction</span>
                        <h4>{fdirection}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Engaged</span>
                        <h4>{fengaged}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Impressions</span>
                        <h4>{fimpressions}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                    </div>

                    <div className="socailsbox">
                      <div className="iconbxo">
                        <img src={require("../images/google.png")} alt="" />
                      </div>
                      <div className="liks">
                        <span>Views</span>
                        <h4>{google_views}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Searches</span>
                        <h4>{google_searched}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Clicks</span>
                        <h4>{google_clicks}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Calls</span>
                        <h4>{google_phone}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                    </div>

                    <div className="socailsbox">
                      <div className="iconbxo">
                        <img src={require("../images/instagram.png")} alt="" />
                      </div>
                      <div className="liks">
                        <span>Posts</span>
                        <h4>{instaPosts}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Followers</span>
                        <h4>{instaFollowers}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Following</span>
                        <h4>{instaFollowing}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                    </div>

                    {/* <div className="socailsbox">
                      <div className="iconbxo">
                        <img src={require("../images/twitter.png")} alt="" />
                      </div>
                      <div className="liks">
                        <span>Likes</span>
                        <h4>310,125</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Check ins</span>
                        <h4>310,125</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Taking About</span>
                        <h4>310,125</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                    </div> */}

                    {/* <div className="socailsbox">
                      <div className="iconbxo">
                        <img src={require("../images/yelp.png")} alt="yelp" />
                      </div>
                      <div className="liks">
                        <span>Rating</span>
                        <h4>{yelpDetails.rating ? yelpDetails.rating : "-"}</h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                      <div className="liks">
                        <span>Reviews</span>
                        <h4>
                          {yelpDetails.review_count
                            ? yelpDetails.review_count
                            : "-"}
                        </h4>
                        <div className="countbox">+10.3%</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-30">
            <div className="business-cover">
              <h3 className="status">Listing Status</h3>
              <div className="row">
                <div className="col-md-3">
                  <div className="box-shadowpie">
                    <div id="pie-chart" className="piebox">
                      <div className="pie-count">
                        <PieChart
                          data={dataMock}
                          lineWidth={23}
                          rounded
                          //   style={{ height: "220px" }}
                        />

                        <h3>
                          {all_connections
                            ? (((7 - all_connections.length) * 100) / 7)
                                .toString()
                                .slice(0, 4) + "%"
                            : "-"}
                        </h3>
                        <p>Opted out</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="row overadd">
                    <div className="col-md-4">
                      <div className="post-promonal">
                        <div className="promo-icon">
                          <img
                            src={require("../images/ad-1.png")}
                            alt="promo"
                          />
                        </div>
                        <div className="promo-text">
                          <h2>7</h2>
                          <h3>All Listing</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="post-promonal">
                        <div className="promo-icon">
                          <img
                            src={require("../images/ad-2.png")}
                            alt="promo"
                          />
                        </div>
                        <div className="promo-text">
                          <h2>
                            {all_connections ? all_connections.length : "-"}
                          </h2>
                          <h3>Live Listing</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="post-promonal">
                        <div className="promo-icon">
                          <img
                            src={require("../images/ad-3.png")}
                            alt="promo"
                          />
                        </div>
                        <div className="promo-text">
                          <h2>-</h2>
                          <h3>Processing</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="post-promonal">
                        <div className="promo-icon">
                          <img
                            src={require("../images/ad-4.png")}
                            alt="promo"
                          />
                        </div>
                        <div className="promo-text">
                          <h2>-</h2>
                          <h3>Unavailable</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="post-promonal">
                        <div className="promo-icon">
                          <img
                            src={require("../images/ad-5.png")}
                            alt="promo"
                          />
                        </div>
                        <div className="promo-text">
                          <h2>
                            {all_connections ? 7 - all_connections.length : "-"}
                          </h2>
                          <h3>Opted-out</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-30 box-shadowpie">
                    <ul className="socailicon overiconview">
                      {all_connections.map(data => (
                        <li>
                          {data.name == "Google" ? (
                            <a href="#">
                              <img
                                src={require("../images/google.png")}
                                alt="google"
                                height="65"
                                width="65"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Instagram" ? (
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#myModal"
                            >
                              <img
                                src={require("../images/instagram.png")}
                                alt="instagram"
                                height="65"
                                width="65"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Yelp" ? (
                            <a href="#">
                              <img
                                src={require("../images/yelp.png")}
                                alt="yelp"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Facebook" ? (
                            <a href="#">
                              <img
                                src={require("../images/facebook.png")}
                                alt="facebook"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Foursquare" ? (
                            <a href="#">
                              <img
                                src={require("../images/foursquare.jpg")}
                                alt="foursquare"
                                height="65"
                                width="65"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Apple" ? (
                            <a href="#">
                              <img
                                src={require("../images/apple.png")}
                                alt="apple"
                                height="65"
                                width="65"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Citysearch" ? (
                            <a href="#">
                              <img
                                src={require("../images/citysearch.png")}
                                alt="citysearch"
                                height="65"
                                width="65"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {/* {data.Social_Platform.Platform == "Instagram" ? (
                              <a href="#">
                                <img src={require("../images/instagram.png")} />
                              </a>
                            ) : (
                              ""
                            )} */}
                          {/* {data.name == "Twitter" ? (
                            <a href="#">
                              <img src={require("../images/twitter.png")} />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Snapchat" ? (
                            <a href="#">
                              <img src={require("../images/snapchat.png")} />
                            </a>
                          ) : (
                            ""
                          )}
                          {data.name == "Pinterest" ? (
                            <a href="#">
                              <img src={require("../images/pinterest.png")} />
                            </a>
                          ) : (
                            ""
                          )} */}
                        </li>
                      ))}
                      <li>
                        <a href="#" className="viewall">
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-30">
            <div className="business-cover chartlist">
              <h3>
                <div className="box-space ">
                  <h2 className="analytics_btnx">
                    Average Google customer Actions{" "}
                    <div className="camgianbox" style={{ marginLeft: "400px" }}>
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
                              onClick={this.change_states(
                                last_week,
                                "Last week"
                              )}
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
                              onClick={this.change_states(
                                last_year,
                                "Last year"
                              )}
                            >
                              Last year
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </h2>
                </div>
              </h3>
              <div id="stacked-column-chart" className="apex-charts" dir="ltr">
                {/* <img src={require('../images/chart-colum.jpg')} alt=""/> */}

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
                  <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                      chartArea: { width: "90%" },
                      isStacked: true,
                      bar: { groupWidth: "20%" }
                    }}
                    // For tests
                    rootProps={{ "data-testid": "3" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <i className="zmdi zmdi-close"></i>
                </button>
                <b>
                  <h3 className="modal-title">{instaDetails.username}</h3>
                </b>
                {instaDetails.edge_owner_to_timeline_media ? (
                  <p>
                    <span>
                      <b>{instaDetails.edge_owner_to_timeline_media.count}</b>
                      posts
                    </span>
                    <span>
                      <b>{instaDetails.edge_followed_by.count}</b> followers
                    </span>
                    <span>
                      <b>{instaDetails.edge_follow.count}</b> following
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="modal-body" style={{ paddingTop: "0px" }}>
                <div className="makepost">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="addpost">
                        <div className="uploadimg">
                          <img
                            src={instaDetails.profile_pic_url_hd}
                            alt="Profile Pic"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="addacta">
                        <b>{instaDetails.full_name}</b>
                        <p>{instaDetails.biography}</p>
                        {instaDetails.external_url ? (
                          <a href={instaDetails.external_url} alt="link">{instaDetails.external_url}</a>
                        ) : (
                          ""
                        )}
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
