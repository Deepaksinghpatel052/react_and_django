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

const Zomatoconfig = {
  headers: {
    "user-key": "5a09665cb72fa8f5a661296e9ed00af4",
    Accept: "application/json"
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
    locationIdGoogle: "",

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
    google_direction: "-",
    isGoogleLoggedIn: false,

    yelpDetails: "",
    instaDetails: "",
    zillowDetails: "",
    instaFollowers: "-",
    instaFollowing: "-",
    instaPosts: "-",
    fViews: "-",
    fWebClicks: "-",
    fcalls: "-",
    fdirection: "-",
    fengaged: "-",
    fimpressions: "-",

    avvoDetails: "",
    avvoRating: "-",
    avvoReviews: "-",

    zomatoDetails: "",
    zomatoRating: "-",
    zomatoReviews: "-",

    tomtomDetails: "",
    tomtomRating: "-",
    tomtomReviews: "-",
    tomtomNewReviews: "-",

    fb_notification: "",
    fbReviews: [],
    googleReviews: [],
    is_google_reply: false,
    google_reply_to_id: "",
    google_reply: "",

    foursquareReviews: [],
    foursquareDetails:"",
    foursquareReviewlength:"-",

    appleReviews: [],
    appleRating:"-",

    citysearchReviews: [],
    citysearchNewReviews:"-",
    citysearchRating:"-",

    yelpReviews: [],
    yelp_new_reviews:"-",

    zillowReviews: [],
    view_notification_type1: false,
    view_notification_type2: false,
    view_notification_type3: false
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
      zillowUrl,
      avvoUrl,
      zomatoUrl,
      tomtomUrl,
      linkedinUrl,
      avvoToken,
      fbtoken,
      fbPageId,
      googleToken;

    const data = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(response => {
        console.log("all connections", response);
        response.data.data.map(l => {
          if (l.Social_Platform.Platform == "Facebook") {
            fbtoken = l.Social_Platform.Token;
            fbPageId = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Google") {
            console.log("yes google");
            googleToken = l.Social_Platform.Token;
            this.setState({
              google_token: googleToken,
              locationIdGoogle: l.Social_Platform.Other_info
            });
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
              all_connections: [
                ...this.state.all_connections,
                { name: "Apple" }
              ]
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
          if (l.Social_Platform.Platform == "Here") {
            this.setState({
              all_connections: [...this.state.all_connections, { name: "Here" }]
            });
          }
          if (l.Social_Platform.Platform == "Zillow") {
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Zillow" }
              ]
            });

            zillowUrl = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Avvo") {
            avvoUrl = l.Social_Platform.Other_info;
            avvoToken = l.Social_Platform.Token;
          }
          if (l.Social_Platform.Platform == "Zomato") {
            zomatoUrl = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Tomtom") {
            tomtomUrl = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Linkedin") {
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Linkedin" }
              ]
            });

            linkedinUrl = l.Social_Platform.Token;
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
              all_connections: [
                ...this.state.all_connections,
                { name: "Google" }
              ],
              isGoogleLoggedIn: true
            });
            this.business_report_insight();

            // Axios.get(
            //   "https://mybusiness.googleapis.com/v4/" +
            //     localStorage.getItem("accountId") +
            //     "/locations",
            //   GoogleConfig
            // ).then(resp => {
            //   console.log("google location", resp.data);

            //   localStorage.setItem(
            //     "locationIdGoogle",
            //     resp.data.locations[0].name
            //   );

            const google_data = {
              // locationNames: [localStorage.getItem("locationIdGoogle")],
              locationNames: [this.state.locationIdGoogle],
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

              if (respo.data.locationMetrics) {
                const data = respo.data.locationMetrics[0].metricValues;
                const google_views = (
                  parseInt(data[0].totalValue.value) +
                  parseInt(data[1].totalValue.value)
                ).toString();
                const google_searched = data[4].totalValue.value;
                const google_clicks = data[5].totalValue.value;
                const google_phone = data[6].totalValue.value;
                const google_direction = data[7].totalValue.value;
                this.setState({
                  google_views,
                  google_searched,
                  google_clicks,
                  google_phone,
                  google_direction
                });
              }
            });

            Axios.get(
              "https://mybusiness.googleapis.com/v4/" +
                this.state.locationIdGoogle +
                "/reviews",
              GoogleConfig
            ).then(respo => {
              console.log("google reviews", respo.data);
              this.setState({ googleReviews: respo.data.reviews });
            });
            // });
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
              const instaFollowers =
                res.data.graphql.user.edge_followed_by.count;
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
            

            let yelp_new_reviews = 0;
          for (let j = 0; j < resp.data.reviews.length; j++) {
            let create_time1 = resp.data.reviews[j].time_created;
            if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
              if (parseInt(create_time1.slice(5, 7)) == today.getMonth() + 1) {
                if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
                  yelp_new_reviews++;
                }
              }
            }
          }
          this.setState({ yelpReviews: resp.data.reviews,yelp_new_reviews });
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
              yelpUrl.slice(25),
            Yelpconfig
          ).then(resp => {
            console.log("hii");
            console.log("yelp details", resp.data);
            this.setState({ yelpDetails: resp.data });
          });

          });
        }

        // for zillow
        if (zillowUrl) {
          Axios.get(
            "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz173vkfofw97_8e096&email=" +
              zillowUrl +
              "&count=10&output=json"
          ).then(resp => {
            console.log("zillow data", resp.data);
            this.setState({
              zillowReviews: resp.data.response.results.proReviews.review,
              zillowDetails: resp.data.response.results.proInfo
            });
          });
        }

        if (avvoUrl && avvoToken) {
          const AvvoConfig = {
            headers: {
              Authorization: "Bearer " + avvoToken
            }
          };
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
              avvoUrl,
            AvvoConfig
          ).then(res => {
            console.log("avvo lawyer data in json", res.data);
            let avvoRating = parseFloat(
              res.data.lawyers[0].client_review_score
            );
            let avvoReviews = parseInt(res.data.lawyers[0].client_review_count);
            this.setState({
              avvoDetails: res.data,
              avvoRating,
              avvoReviews
            });
            this.setState({
              all_connections: [...this.state.all_connections, { name: "Avvo" }]
            });
          });
        }

        if (zomatoUrl) {
          Axios.get(
            "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
              zomatoUrl,
            Zomatoconfig
          ).then(res => {
            console.log("zomato data", res.data);

            let zomatoRating = res.data.user_rating.aggregate_rating
              ? parseFloat(res.data.user_rating.aggregate_rating)
              : 0;
            let zomatoReviews = parseInt(res.data.all_reviews_count);
            this.setState({
              zomatoDetails: res.data,
              zomatoRating,
              zomatoReviews
            });
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Zomato" }
              ]
            });
          });
        }

        if (tomtomUrl && tomtomUrl != "-") {
          Axios.get(
            "https://api.tomtom.com/search/2/poiDetails.json?key=BVtLuLXu3StRT6YXupe4H9cbtugU3i10&id=" +
              tomtomUrl
          ).then(res => {
            console.log("tomtom data", res.data);

            let tomtomRating = res.data.result.rating
              ? parseFloat(res.data.result.rating.value) / 2
              : 0;

            let tomtomReviews = parseInt(res.data.result.rating.totalRatings);

            var tomtomNewReviews = 0;
            for (let i = 0; i < res.data.result.reviews.length; i++) {
              let create_time1 = res.data.result.reviews[i];
              if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
                if (
                  parseInt(create_time1.slice(5, 7)) ==
                  today.getMonth() + 1
                ) {
                  if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
                    tomtomNewReviews++;
                  }
                }
              }
            }
            this.setState({
              tomtomDetails: res.data,
              tomtomRating,
              tomtomReviews,
              tomtomNewReviews
            });
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Tomtom" }
              ]
            });
          });
        }

        // For foursquare
        if (fourUrl) {
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
              fourUrl +
              "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
          ).then(res => {
            console.log("foursquare data", res.data);
            this.setState({
              foursquareReviews: res.data.response.venue.tips.groups[0].items,
              foursquareDetails: res.data.response.venue,
            foursquareReviewlength: res.data.response.venue.tips.count
            });
          });
        }

        // for apple
        if (appleUrl) {
          Axios.get(
            "https://itunes.apple.com/in/rss/customerreviews/id=" +
              appleUrl +
              "/sortBy=mostRecent/json"
          ).then(res => {
            console.log("apple reviews", res.data.feed.entry);

            let appleRating = 0;
          let appleReviews = res.data.feed.entry;

          for (let i = 0; i < appleReviews.length; i++) {
            appleRating += parseInt(appleReviews[i]["im:rating"].label);
          }
          appleRating = parseInt(
            (appleRating / appleReviews.length).toString().slice(0, 3)
          );
          this.setState({
            appleRating,
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
            console.log(
              "citysearch review",
              xml.getElementsByTagName("review")
            );




            let citysearchReviews = xml.getElementsByTagName("review");
            var citysearchRating = 0;
          var citysearchNewReviews = 0;
          for (let i = 0; i < citysearchReviews.length; i++) {
            citysearchRating +=
              parseInt(citysearchReviews[i].children[5].value) / 2;

            let create_time1 = citysearchReviews[i].children[6].value;
            if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
              if (parseInt(create_time1.slice(5, 7)) == today.getMonth() + 1) {
                if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
                  citysearchNewReviews++;
                }
              }
            }
          }
          citysearchRating = parseInt(
            (citysearchRating / citysearchReviews.length).toString().slice(0, 3)
          );
          this.setState({
            citysearchNewReviews,
            citysearchRating,
            citysearchReviews: xml.getElementsByTagName("review")
          });


          });
        }

        this.setState({ loader: false });
      })
      .catch(res => {
        console.log("error in overview", res);
        this.setState({
          loader: false
        });
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
          this.setState({
            loading: false
          });
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
        this.state.locationIdGoogle +
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
      isGoogleLoggedIn,
      google_views,
      google_searched,
      google_clicks,
      google_phone,
      google_direction,
      yelpDetails,
      instaDetails,
      zillowDetails,
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
      foursquareReviewlength,
      foursquareDetails,

      appleReviews,
      appleRating,


      citysearchReviews,
      citysearchNewReviews,
      citysearchRating,

      yelpReviews,
      yelp_new_reviews,

      zillowReviews,

      avvoDetails,
      avvoRating,
      avvoReviews,

      zomatoDetails,
      zomatoRating,
      zomatoReviews,

      tomtomDetails,
      tomtomRating,
      tomtomReviews,
      tomtomNewReviews,

      view_notification_type1,
      view_notification_type2,
      view_notification_type3
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
        value: 13 - all_connections.length,
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

    if (googleReviews) {
      for (let i = 0; i < googleReviews.length; i++) {
        if (googleReviews[i].createTime.slice(0, 10) == today_date) {
          total_notifications = [
            ...total_notifications,
            <div>
              <div className="notification-box">
                <img
                  src={require("../images/google.png")}
                  alt="google"
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
              src={require("../images/citysearch.jpg")}
              alt="citysearch"
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

    let total_social_overview = [];

    {
      all_connections.map(data => (
        <li>
          {data.name == "Facebook"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/facebook.png")} alt="" />
                  </div>
                  <div className="liks">
                    <span>Views</span>
                    <h4>{fViews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  {/* <div className="liks">
          <span>Clicks</span>
          <h4>{fWebClicks}</h4>
         
        </div> */}
                  <div className="liks">
                    <span>Calls</span>
                    <h4>{fcalls}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Direction</span>
                    <h4>{fdirection}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  {/* <div className="liks">
          <span>Engaged</span>
          <h4>{fengaged}</h4>

        </div>
        <div className="liks">
          <span>Impressions</span>
          <h4>{fimpressions}</h4>
     
        </div> */}
                </div>
              ])
            : ""}

          {data.name == "Google"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/google.png")} alt="" />
                  </div>
                  <div className="liks">
                    <span>Views</span>
                    <h4>{google_views}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  {/* <div className="liks">
          <span>Searches</span>
          <h4>{google_searched}</h4>
     
        </div> */}
                  {/* <div className="liks">
          <span>Clicks</span>
          <h4>{google_clicks}</h4>
  
        </div> */}
                  <div className="liks">
                    <span>Calls</span>
                    <h4>{google_phone}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Direction</span>
                    <h4>{google_direction}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

          {data.name == "Instagram"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/instagram.png")} alt="" />
                  </div>
                  <div className="liks">
                    <span>Posts</span>
                    <h4>{instaPosts}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Followers</span>
                    <h4>{instaFollowers}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Following</span>
                    <h4>{instaFollowing}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Avvo"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/avvo.png")} alt="Avvo" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{avvoRating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{avvoReviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Citysearch"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/citysearch.png")} alt="Citysearch" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{citysearchRating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{citysearchReviews.length}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>New Reviews</span>
                    <h4>{citysearchNewReviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Zomato"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/zomato.png")} alt="Zomato" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{zomatoRating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{zomatoReviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Apple"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/apple.png")} alt="Apple" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{appleRating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{appleReviews.length}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Tomtom"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/tomtom.png")} alt="Tomtom" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{tomtomRating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{tomtomReviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>New Reviews</span>
                    <h4>{tomtomNewReviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Yelp"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/yelp.png")} alt="Yelp" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{yelpDetails.rating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{yelpReviews.length}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>New Reviews</span>
                    <h4>{yelp_new_reviews}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

{data.name == "Foursquare"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
                  <div className="iconbxo">
                    <img src={require("../images/foursquare.png")} alt="Foursquare" />
                  </div>
                  <div className="liks">
                    <span>Rating</span>
                    <h4>{foursquareDetails.rating}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                  <div className="liks">
                    <span>Reviews</span>
                    <h4>{foursquareReviewlength}</h4>
                    {/* <div className="countbox">+10.3%</div> */}
                  </div>
                </div>
              ])
            : ""}

          {data.name == "Zillow"
            ? (total_social_overview = [
                ...total_social_overview,
                <div className="socailsbox">
        <div className="iconbxo">
          <img src={require("../images/zillow.png")} alt="Zillow" />
        </div>
        {/* <div className="liks">
          <span>Sales</span>
          <h4>{zillowDetails.recentSaleCount}</h4>
        </div> */}
        <div className="liks">
          <span>Rating</span>
          <h4>{zillowDetails.avgRating}</h4>
        </div>
        <div className="liks">
          <span>Reviews</span>
          <h4>{zillowReviews.length}</h4>
        </div>
        
        {/* <div className="liks">
          <span>Local Knowledge Rating</span>
          <h4>{zillowDetails.localknowledgeRating}</h4>
        </div>
        <div className="liks">
          <span>Negotiation Skills Rating</span>
          <h4>{zillowDetails.negotiationskillsRating}</h4>
        </div>
        <div className="liks">
          <span>Process Expertise Rating</span>
          <h4>{zillowDetails.processexpertiseRating}</h4>
        </div>
        <div className="liks">
          <span>Responsiveness Rating</span>
          <h4>{zillowDetails.responsivenessRating}</h4>
        </div> */}
      </div> 
              ])
            : ""}
        </li>
      ));
    }

    let total_listing_images = [];

    {
      all_connections.map(data => (
        <li>
          {data.name == "Google"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/google.png")}
                      alt="google"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Instagram"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a data-toggle="modal" data-target="#myModal">
                    <img
                      src={require("../images/instagram.png")}
                      alt="instagram"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Yelp"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img src={require("../images/yelp.png")} alt="yelp" />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Facebook"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/facebook.png")}
                      alt="facebook"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Foursquare"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/foursquare.png")}
                      alt="foursquare"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Apple"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/apple.png")}
                      alt="apple"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Citysearch"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/citysearch.jpg")}
                      alt="citysearch"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Here"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/here.png")}
                      alt="Here"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Zillow"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/zillow.png")}
                      alt="Zillow"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Avvo"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/avvo.png")}
                      alt="Avvo"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Linkedin"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/linkedin.png")}
                      alt="Linkedin"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Zomato"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/zomato.png")}
                      alt="Zomato"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
          {data.name == "Tomtom"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a>
                    <img
                      src={require("../images/tomtom.png")}
                      alt="Tomtom"
                      height="65"
                      width="65"
                    />
                  </a>
                </li>
              ])
            : ""}
        </li>
      ));
    }

    // let foursquare_show_review_notification = [];

    // for (let i = 0; i < foursquareReviews.length; i++) {
    //   if (foursquareReviews[i].time_created.slice(0, 10) == "2020-06-23") {
    //     foursquare_show_review_notification = [
    //       ...foursquare_show_review_notification,
    //       <div className="notification-box">
    //         <img
    //           src={require("../images/foursquare.png")}
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

        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div>
            {" "}
            <div className="main_content">
              <div className="mt-30">
                <div className="row">
                  <div className="col-md-7">
                    <div className="analytics-whice">
                      <div className="box-space">
                        <h2 className="analytics_btnx">
                          Recent Notifications
                          <button
                            onClick={() =>
                              view_notification_type1 == true
                                ? this.setState({
                                    view_notification_type1: false
                                  })
                                : this.setState({
                                    view_notification_type1: true
                                  })
                            }
                            className="viewall"
                          >
                            {view_notification_type1 == false
                              ? "View all"
                              : "View some"}
                            <i className="zmdi zmdi-caret-down"></i>
                          </button>
                        </h2>
                      </div>

                      <div className="notification-scroll style-4">
                        {total_notifications.length != 0 ? (
                          <div>
                            {view_notification_type1 == false ? (
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
                          </div>
                        ) : (
                          <h3>No new notification</h3>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="analytics-whice">
                      <div className="box-space">
                        <h2 className="analytics_btnx">
                          Social Overview
                          <button
                            onClick={() =>
                              view_notification_type3 == true
                                ? this.setState({
                                    view_notification_type3: false
                                  })
                                : this.setState({
                                    view_notification_type3: true
                                  })
                            }
                            className="viewall"
                          >
                            {view_notification_type3 == false
                              ? "View all"
                              : "View some"}
                            <i className="zmdi zmdi-caret-down"></i>
                          </button>
                        </h2>
                      </div>

                      <div className="notification-scroll style-4">
                        {total_social_overview.length != 0 ? (
                          <div>
                            {view_notification_type3 == false ? (
                              total_social_overview.length > 3 ? (
                                <div>
                                  {total_social_overview[0]}
                                  {total_social_overview[1]}
                                  {total_social_overview[2]}
                                  {total_social_overview[4]}
                                </div>
                              ) : (
                                total_social_overview
                              )
                            ) : (
                              total_social_overview
                            )}
                          </div>
                        ) : (
                          <h3>No listings connected, Please connect</h3>
                        )}
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
                                ? (((13 - all_connections.length) * 100) / 13)
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
                              <h2>13</h2>
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
                                {all_connections
                                  ? 13 - all_connections.length
                                  : "-"}
                              </h2>
                              <h3>Opted-out</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-30 box-shadowpie">
                        
                        <div className="col-md-9">
                          <ul className="socailicon overiconview">
                            {view_notification_type2 == false ? (
                              total_listing_images.length > 5 ? (
                                <div>
                                  {total_listing_images[0]}
                                  {total_listing_images[1]}
                                  {total_listing_images[2]}
                                  {total_listing_images[3]}
                                  {total_listing_images[4]}
                                </div>
                              ) : (
                                total_listing_images
                              )
                            ) : (
                              total_listing_images
                            )}
                          </ul>
                        </div>
                        <div className="col-md-3 mt-30">
                          <button
                            onClick={() =>
                              view_notification_type2 == true
                                ? this.setState({
                                    view_notification_type2: false
                                  })
                                : this.setState({
                                    view_notification_type2: true
                                  })
                            }
                            className="viewall"
                            style={{marginBottom:20}}
                          >
                            {view_notification_type2 == false
                              ? "View More"
                              : "View Some"}
                          </button>
                        </div>
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
                        <div
                          className="camgianbox"
                          style={{ marginLeft: "400px" }}
                        >
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
                  <div
                    id="stacked-column-chart"
                    className="apex-charts"
                    dir="ltr"
                  >
                    {/* <img src={require('../images/chart-colum.jpg')} alt=""/> */}

                    {isGoogleLoggedIn ? (
                      this.state.loading ? (
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
                      )
                    ) : (
                      <h4>Please connect Google to see graph</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      <i className="zmdi zmdi-close"></i>
                    </button>
                    <b>
                      <h3 className="modal-title">{instaDetails.username}</h3>
                    </b>
                    {instaDetails.edge_owner_to_timeline_media ? (
                      <p>
                        <span>
                          <b>
                            {instaDetails.edge_owner_to_timeline_media.count}
                          </b>
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
                              <a href={instaDetails.external_url} alt="link">
                                {instaDetails.external_url}
                              </a>
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
          </div>
        )}

        {/* </div> */}
      </div>
    );
  }
}
