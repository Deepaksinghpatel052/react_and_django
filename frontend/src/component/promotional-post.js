import React, { Component } from "react";
import Axios from "axios";
import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

export default class PromotionalPost extends Component {
  state = {
    all_posts: [],
    all_posts_report: [],
    edit_post: "",
    total_post_clicks: "-",
    total_post_views: "-",
    total_post_clicks2: "-",
    total_post_views2: "-",
    total_active_posts: "-",
    total_processing_posts: "-",
    total_rejected_posts: "-",
    summary: "",
    sourceUrl: "",
    CTA: false,
    actionType: "",
    url: "",
    post_event: false,
    title: "",
    date1: "",
    date2: "",
    time1: "",
    time2: "",
    post_promotional: false,
    termsConditions: "",
    redeemOnlineUrl: "",
    couponCode: "",

    google_token: "",
    locationIdGoogle: "",
    isGoogleLoggedIn: false,
    loader: true,
    loading: false,

    show_states: "",
    range_name: "Last week",
    today_date: "",
    last_week: "",
    last_month: "",
    last_3_month: "",
    last_6_month: "",
    last_year: "",
    search: []
  };

  componentDidMount() {
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

      var last2ndWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14
      );
  
      var last_2nd_week =
        last2ndWeek.getFullYear() +
        "-" +
        (last2ndWeek.getMonth() + 1) +
        "-" +
        last2ndWeek.getDate();  

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

    var last2ndMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 60
    );

    var last_2nd_Month =
      last2ndMonth.getFullYear() +
      "-" +
      (last2ndMonth.getMonth() + 1) +
      "-" +
      last2ndMonth.getDate();

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

      var last2ndYear = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 730
      );
  
      var last_2nd_year =
        last2ndYear.getFullYear() +
        "-" +
        (last2ndYear.getMonth() + 1) +
        "-" +
        last2ndYear.getDate();
  

    this.setState({
      today_date: date,
      last_week: last_week,
      last_2nd_week: last_2nd_week,
      last_month: last_month,
      last_2nd_Month: last_2nd_Month,
      last_3_month: last_3_month,
      last_6_month: last_6_month,
      last_year: last_year,
      last_2nd_year: last_2nd_year,
      show_states: last_week
    });

    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(response => {
        this.setState({ loader: false });
        var googleToken;
        response.data.data.map(l => {
          if (l.Social_Platform.Platform == "Google") {
            googleToken = l.Social_Platform.Token;
            this.setState({
              google_token: googleToken,
              locationIdGoogle: l.Social_Platform.Other_info
            });
          }
        });

        const GoogleConfig = {
          headers: { Authorization: "Bearer " + googleToken }
        };

        if (googleToken) {
          Axios.get(
            "https://mybusiness.googleapis.com/v4/accounts/",
            GoogleConfig
          ).then(res => {
            console.log("google account", res.data);
            console.log("googleconfig", GoogleConfig);
            console.log("google data", JSON.stringify(data));
            localStorage.setItem("accountId", res.data.accounts[0].name);
            this.setState({isGoogleLoggedIn: true})
            this.google_localpost_insight();
          });
        }
      })
      .catch(res => {
        console.log("error in promotional post", res);
        this.setState({ loader: false });
      });
  }

  submitHandler = event => {
    event.preventDefault();

    this.setState({loader: true})
    const data = {
      location_id: this.props.match.params.locationId
    };
    var {
      summary,
      sourceUrl,
      CTA,
      actionType,
      url,
      post_event,
      title,
      date1,
      date2,
      time1,
      time2,
      post_promotional,
      termsConditions,
      redeemOnlineUrl,
      couponCode
    } = this.state;

    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(response => {
      var googleToken;
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Google") {
          googleToken = l.Social_Platform.Token;
        }
      });

      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      if (googleToken) {
        Axios.get(
          "https://mybusiness.googleapis.com/v4/accounts/",
          GoogleConfig
        ).then(async res => {
          console.log("google account", res.data);
          console.log("googleconfig", GoogleConfig);
          console.log("google data", JSON.stringify(data));
          localStorage.setItem("accountId", res.data.accounts[0].name);

          if (summary || sourceUrl) {
            const google_data = await this.postData();
            Axios.post(
              "https://mybusiness.googleapis.com/v4/" +
                this.state.locationIdGoogle +
                "/localPosts",
              google_data,
              GoogleConfig
            )
              .then(respo => {
                console.log("google post", respo.data);
                this.componentDidMount()
              })
              .catch(resp => {
                console.log("google post error", resp);
                alert("Something went wrong");
                this.setState({loader: false})
              });
          } else {
            alert("Both Image and summary field can not be empty at same time");
            this.setState({loader: false})
          }
        });
      } else {
        alert("Please connect google listing");
        this.setState({loader: false})
      }
    });
  };

  editPost = event => {
    event.preventDefault();
    this.setState({loader: true})
    const data = {
      location_id: this.props.match.params.locationId
    };
    var {
      edit_post,
      summary,
      sourceUrl,
      CTA,
      actionType,
      url,
      post_event,
      title,
      date1,
      date2,
      time1,
      time2,
      post_promotional,
      termsConditions,
      redeemOnlineUrl,
      couponCode
    } = this.state;
    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(async response => {
      var googleToken;
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Google") {
          googleToken = l.Social_Platform.Token;
        }
      });
      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };
      if (googleToken) {
        if (summary || sourceUrl) {
          const google_data = await this.postData();
          Axios.patch(
            "https://mybusiness.googleapis.com/v4/" +
              edit_post.name +
              "?updateMask=summary,callToAction,media,event",
            google_data,
            GoogleConfig
          ).then(respo => {
            console.log("edit post", respo.data);
            this.componentDidMount()
            // this.setState({ googleReviews: respo.data });
            // this.google_star_counting(respo.data);
          }).catch(res => {
            this.setState({loader:false})
            alert("post is not updated")
          })
        } else {
          alert("Both Image and summary field can not be empty at same time");
          this.setState({loader:false})
        }
      } else {
        alert("Please connect google listing");
        this.setState({loader:false})
      }
    }).catch(res => {
      console.log("error while updating",res)
      this.setState({loader:false})
      alert("Please connect google listing");
    })
  };

  postData = () => {
    var google_data;
    var {
      CTA,
      post_event,
      summary,
      sourceUrl,
      actionType,
      url,
      title,
      date1,
      date2,
      time1,
      time2,
      post_promotional,
      termsConditions,
      redeemOnlineUrl,
      couponCode
    } = this.state;

    google_data = { languageCode: "en-US" };

    if (summary) {
      google_data = { ...google_data, summary };
    }

    if (sourceUrl) {
      google_data = {
        ...google_data,
        media: [
          {
            mediaFormat: "PHOTO",
            sourceUrl
          }
        ]
      };
    }

    if (title && date1 && date2 && time1 && time2 && post_event) {
      google_data = {
        ...google_data,
        event: {
          title,
          schedule: {
            startDate: {
              year: date1.split("-")[0],
              month: date1.split("-")[1],
              day: date1.split("-")[2]
            },
            startTime: {
              hours: time1.split(":")[0],
              minutes: time1.split(":")[1],
              seconds: 0,
              nanos: 0
            },
            endDate: {
              year: date2.split("-")[0],
              month: date2.split("-")[1],
              day: date2.split("-")[2]
            },
            endTime: {
              hours: time2.split(":")[0],
              minutes: time2.split(":")[1],
              seconds: 0,
              nanos: 0
            }
          }
        }
      };
    }

    if (actionType && url && CTA) {
      google_data = {
        ...google_data,
        callToAction: {
          actionType,
          url
        }
      };
    }

    if (post_promotional && termsConditions && redeemOnlineUrl && couponCode) {
      google_data = {
        ...google_data,
        offer: {
          couponCode,
          redeemOnlineUrl,
          termsConditions
        }
      };
    }

    console.log("post_data in function", google_data);
    return google_data;
  };

  posts_status = data => {
    let total_active_posts = 0;
    let total_processing_posts = 0;
    let total_rejected_posts = 0;

    data.map(value => {
      if (value.state == "LIVE") {
        total_active_posts++;
      } else if (value.state == "PROCESSING") {
        total_processing_posts++;
      } else if (value.state == "REJECTED") {
        total_rejected_posts++;
      }
    });
    this.setState({
      total_active_posts,
      total_processing_posts,
      total_rejected_posts
    });
  };

  delete_post = value => {
    // console.log("deleted", data);

    this.setState({loader : true})

    const data = {
      location_id: this.props.match.params.locationId
    };
    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(response => {
      var googleToken;
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Google") {
          googleToken = l.Social_Platform.Token;
        }
      });
      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      if (googleToken) {
        Axios.delete(
          "https://mybusiness.googleapis.com/v4/" + value,
          GoogleConfig
        ).then(respo => {
          console.log("post delete", respo.data);
          // this.setState({ googleReviews: respo.data });
          // this.google_star_counting(respo.data);
          this.componentDidMount()
        }).catch(res => {
          console.log("error in deleting post",res)
          this.setState({loader:false});
        })
      } else {
        this.setState({loader:false});
        alert("Google listing is disconnected, please connect first")
      }
    });
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxHandler = event => {
    console.log("checkbox event", event.target.checked);
    if (event.target.checked) {
      this.setState({ [event.target.name]: true });
    } else {
      this.setState({ [event.target.name]: false });
    }
  };

  dateMonthFunction = data => {
    console.log("dateMonthFunction", data);
    return data.toString().length == 1 ? "0" + data : data;
  };

  google_localpost_insight = () => {
    this.setState({ loading: true });
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.state.google_token }
    };

    let {
      range_name,
      last_2nd_week,
      last_2nd_Month,
      last_6_month,
      last_year,
      last_2nd_year
    } = this.state;
    let show_states2 = "";
    if (range_name == "Last week") {
      show_states2 = last_2nd_week;
    } else if (range_name == "Last month") {
      show_states2 = last_2nd_Month;
    } else if (range_name == "Last 3 months") {
      show_states2 = last_6_month;
    } else if (range_name == "Last 6 months") {
      show_states2 = last_year;
    } else if (range_name == "Last year") {
      show_states2 = last_2nd_year;
    }

    Axios.post(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("accountId") +
        "/locations:reportInsights",
        {
          // locationNames: [localStorage.getItem("locationIdGoogle")],
          locationNames: [this.state.locationIdGoogle],
          basicRequest: {
            metricRequests: [{ metric: "ALL" }],
            timeRange: {
              startTime: this.state.show_states + "T01:01:23.045123456Z",
              endTime: this.state.today_date + "T23:59:59.045123456Z"
            }
          }
        },
      GoogleConfig
    ).then(respo => {
      console.log("google location insight", respo.data);
      const total_post_views =
        respo.data.locationMetrics[0].metricValues[12].totalValue.value;
      const total_post_clicks =
        respo.data.locationMetrics[0].metricValues[13].totalValue.value;
      this.setState({ total_post_views, total_post_clicks });
    });

    Axios.post(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("accountId") +
        "/locations:reportInsights",
        {
          locationNames: [this.state.locationIdGoogle],
          basicRequest: {
            metricRequests: [{ metric: "ALL" }],
            timeRange: {
              startTime: show_states2 + "T01:01:23.045123456Z",
              endTime: this.state.show_states + "T23:59:59.045123456Z"
            }
          }
        },
      GoogleConfig
    ).then(respo => {
      console.log("google location insight 2", respo.data);
      const total_post_views2 =
        respo.data.locationMetrics[0].metricValues[12].totalValue.value;
      const total_post_clicks2 =
        respo.data.locationMetrics[0].metricValues[13].totalValue.value;
      this.setState({ total_post_views2, total_post_clicks2 });
    });


    Axios.get(
      "https://mybusiness.googleapis.com/v4/" +
        this.state.locationIdGoogle +
        "/localPosts",
      GoogleConfig
    ).then(respo => {
      console.log("google localpost data", respo.data);
      this.posts_status(respo.data.localPosts);
      this.setState({ all_posts: respo.data.localPosts });

      const data = {
        localPostNames: respo.data.localPosts.map(val => val.name),
        basicRequest: {
          metricRequests: [{ metric: "ALL" }],
          timeRange: {
            startTime: this.state.show_states + "T01:01:23.045123456Z",
            endTime: this.state.today_date + "T23:59:59.045123456Z"
          }
        }
      };
      Axios.post(
        "https://mybusiness.googleapis.com/v4/" +
          this.state.locationIdGoogle +
          "/localPosts:reportInsights",
        data,
        GoogleConfig
      ).then(respo => {
        console.log("google localpost reportInsights", respo.data);
        // this.posts_status(respo.data.localPosts);
        this.setState({
          all_posts_report: respo.data.localPostMetrics
            ? respo.data.localPostMetrics
            : [],
          loading: false
        });
      });

    });
  };

  change_states = (states, range) => async e => {
    console.log("e.target.name", states, range);
    await this.setState({ show_states: states, range_name: range });
    this.google_localpost_insight();
  };

  render() {
    
    var {
      all_posts,
      all_posts_report,
      edit_post,
      total_post_clicks,
      total_post_views,
      total_post_clicks2,
      total_post_views2,
      total_active_posts,
      total_processing_posts,
      total_rejected_posts,
      summary,
      CTA,
      actionType,
      url,
      sourceUrl,
      post_event,
      title,
      date1,
      date2,
      time1,
      time2,
      post_promotional,
      termsConditions,
      redeemOnlineUrl,
      couponCode,
      today_date,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states,
      isGoogleLoggedIn
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

    let courses = [];

    if (all_posts.length != 0) {
      courses = all_posts.map(data => data.summary);
    }

    let options;
    if (this.state.search.length) {
      const searchPattern = new RegExp(
        this.state.search.map(term => `(?=.*${term})`).join(""),
        "i"
      );
      options = courses.filter(option => option.match(searchPattern));
    } else {
      options = courses;
    }

    let filtered_posts = [];
    if (options.length != 0) {
      options.map((data1, i) => {
        all_posts.map((data2, j) => {
          if (data1 == data2.summary) {
            filtered_posts = [...filtered_posts, data2];
          }
        });
      });
    }

    let i = 0;
    return (
      <div>
        {/* <div className="content-page"> */}
        

        {this.state.loader ? <div className="rightside_title">
            <Spinner />
          </div> : <div className="main_content">
          <div className="rightside_title">
            <h1>
              Promotional Post{" "}
              <form className="serachbox-right">
                <input type="text" placeholder="Search Google Post" />
              </form>{" "}
            </h1>
          </div>
          {isGoogleLoggedIn ? <div>
            <div className="mb-30">
            <div className="row">
              <div className="col-md-9">
                <div className="analytics-whice">
                  <div className="box-space ">
                    <h2 className="analytics_btnx">
                      Analytics
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
                    </h2>
                  </div>
                  <div className="promotional-box">
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
                      <div className="row">
                        <div className="col-md-4">
                          <div className="post-promonal">
                            <div className="promo-icon">
                              <img
                                src={require("../images/promo-1.jpg")}
                                alt="promo"
                              />
                            </div>
                            <div className="promo-text">
                              <h2>
                                {total_active_posts}{" "}
                                <span>
                                  <i className="zmdi"></i>-
                                </span>
                              </h2>
                              <h3>Total Active post</h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="post-promonal">
                            <div className="promo-icon">
                              <img
                                src={require("../images/promo-2.jpg")}
                                alt="promo"
                              />
                            </div>
                            <div className="promo-text">
                              <h2>
                                {total_post_views}{" "}
                                {/* <span>
                                  <i className="zmdi zmdi-minus"></i>1.03%
                                </span> */}


                                {total_post_views ? (parseInt(total_post_views) -
                                  parseInt(total_post_views2) >
                                0 ? (
                                  <div style={{ color: "green" }}>
                                    <span>
                                  <i className="zmdi zmdi-plus"></i>
                                    {
                                      (
                                        ((parseInt(total_post_views) -
                                          parseInt(total_post_views2)) *
                                          100) /
                                        parseInt(total_post_views2)
                                      )
                                        .toString()
                                        .slice(0, 4) +
                                      " %"}
                                   </span>
                                  </div>
                                ) : parseInt(total_post_views) -
                                parseInt(total_post_views2) <
                              0 ? (
                                <div style={{ color: "red" }}>
                                  <span>
                                <i className="zmdi zmdi-minus"></i>
                                  {
                                    (
                                      ((parseInt(total_post_views) -
                                        parseInt(total_post_views2)) *
                                        100) /
                                      parseInt(total_post_views2)
                                    )
                                      .toString()
                                      .slice(1, 5) +
                                    " %"}
                                 </span>
                                </div>
                              ) : 
                                  "0%"
                                ) : (
                                  "-"
                                )}

                              </h2>
                              <h3>Total post views</h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="post-promonal">
                            <div className="promo-icon">
                              <img
                                src={require("../images/promo-3.jpg")}
                                alt="promo"
                              />
                            </div>
                            <div className="promo-text">
                              <h2>
                                {total_post_clicks}{" "}
                                {/* <span>
                                  <i className="zmdi zmdi-plus"></i>1.03%
                                </span> */}


                                {total_post_clicks ? (parseInt(total_post_clicks) -
                                  parseInt(total_post_clicks2) >
                                0 ? (
                                  <div style={{ color: "green" }}>
                                    <span>
                                  <i className="zmdi zmdi-plus"></i>
                                    {
                                      (
                                        ((parseInt(total_post_clicks) -
                                          parseInt(total_post_clicks2)) *
                                          100) /
                                        parseInt(total_post_clicks2)
                                      )
                                        .toString()
                                        .slice(0, 4) +
                                      " %"}
                                   </span>
                                  </div>
                                ) : parseInt(total_post_clicks) -
                                parseInt(total_post_clicks2) <
                              0 ? (
                                <div style={{ color: "red" }}>
                                  <span>
                                <i className="zmdi zmdi-minus"></i>
                                  {
                                    (
                                      ((parseInt(total_post_clicks) -
                                        parseInt(total_post_clicks2)) *
                                        100) /
                                      parseInt(total_post_clicks2)
                                    )
                                      .toString()
                                      .slice(1, 4) +
                                    " %"}
                                 </span>
                                </div>
                              ) : 
                                  "0%"
                                ) : (
                                  "-"
                                )}

                              </h2>
                              <h3>Total post clicks</h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="post-promonal">
                            <div className="promo-icon">
                              <img
                                src={require("../images/promo-4.jpg")}
                                alt="promo"
                              />
                            </div>
                            <div className="promo-text">
                              <h2>- </h2>
                              <h3>Scheduled Posts</h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="post-promonal">
                            <div className="promo-icon">
                              <img
                                src={require("../images/promo-5.jpg")}
                                alt="promo"
                              />
                            </div>
                            <div className="promo-text">
                              <h2>- </h2>
                              <h3>Expired Posts</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="promoimg">
                  <img src={require("../images/promo-6.jpg")} alt="promo" />
                  <a href="#" data-toggle="modal" data-target="#myModal">
                    <img src={require("../images/iconplus.jpg")} alt="" />{" "}
                    Create a new post
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-30">
            <table className="table_bg">
              <thead>
                <tr>
                  <th>
                    <input
                      type="text"
                      onChange={e =>
                        this.setState({ search: e.target.value.split(" ") })
                      }
                      placeholder="Search Google Posts"
                      className="google_post"
                    />
                  </th>
                  <th>Views</th>
                  <th>Clicks</th>
                  <th>Status</th>
                </tr>
              </thead>
              {this.state.loading ? (
                <div className="promotional-box">
                <div style={{ textAlign: "right" }}>
                  <Loader2
                    type="Oval"
                    color="#00BFFF"
                    height={25}
                    width={25}
                    // timeout={3000} //3 secs
                  />
                </div>
                </div>
              ) : (
                <tbody>
                  {filtered_posts.length != 0
                    ? filtered_posts.map((data, j) => (
                        <tr>
                          <td>
                            <div className="googlenewpost">
                              <div className="googleimgpost">
                                <img
                                  src={
                                    data.media
                                      ? data.media[0].googleUrl
                                      : require("../images/googleimg.jpg")
                                  }
                                  alt="image"
                                  height="125"
                                />
                              </div>
                              <div className="googleposttext">
                                <span>
                                  {data.createTime
                                    ? data.createTime.slice(0, 10)
                                    : ""}
                                </span>
                                {/* <h4>Jazz Today By Whitney Ballett</h4> */}
                                <p>{data.summary}</p>
                                {data.event ? (
                                  <div>
                                    <p>
                                      <b>{data.event.title}</b>
                                    </p>

                                    <p>
                                      Start Date:
                                      {data.event.schedule.startDate.day}-
                                      {data.event.schedule.startDate.month}-
                                      {data.event.schedule.startDate.year}
                                    </p>

                                    <p>
                                      Start Time:
                                      {data.event.schedule.startTime.hours}:
                                      {data.event.schedule.startTime.minutes}
                                    </p>

                                    <p>
                                      End Date:
                                      {data.event.schedule.endDate.day}-
                                      {data.event.schedule.endDate.month}-
                                      {data.event.schedule.endDate.year}
                                    </p>

                                    <p>
                                      End Time:
                                      {data.event.schedule.endTime.hours}:
                                      {data.event.schedule.endTime.minutes}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {data.callToAction ? (
                                  <div>
                                    <a href={data.callToAction.url}>
                                      <p>{data.callToAction.actionType}</p>
                                    </a>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="editboxicon">
                                  {/* <a href="#" className="editicon">
                                  <i className="zmdi zmdi-edit"></i>
                                </a> */}

                                  <a
                                    href="#"
                                    data-toggle="modal"
                                    className="editicon"
                                    data-target="#myModal2"
                                    onClick={() =>
                                      this.setState({
                                        edit_post: data,
                                        summary: data.summary
                                          ? data.summary
                                          : "",
                                        CTA: data.callToAction ? true : false,
                                        actionType: data.callToAction
                                          ? data.callToAction.actionType
                                          : "",
                                        url: data.callToAction
                                          ? data.callToAction.url
                                          : "",
                                        post_event: data.event ? true : false,
                                        title: data.event
                                          ? data.event.title
                                          : "",
                                        date1: data.event
                                          ? data.event.schedule.startDate.year +
                                            "-" +
                                            this.dateMonthFunction(
                                              data.event.schedule.startDate
                                                .month
                                            ) +
                                            "-" +
                                            this.dateMonthFunction(
                                              data.event.schedule.startDate.day
                                            )
                                          : "",
                                        time1: data.event
                                          ? this.dateMonthFunction(
                                              data.event.schedule.startTime
                                                .hours
                                            ) +
                                            ":" +
                                            this.dateMonthFunction(
                                              data.event.schedule.startTime
                                                .minutes
                                            )
                                          : "",
                                        date2: data.event
                                          ? data.event.schedule.endDate.year +
                                            "-" +
                                            this.dateMonthFunction(
                                              data.event.schedule.endDate.month
                                            ) +
                                            "-" +
                                            this.dateMonthFunction(
                                              data.event.schedule.endDate.day
                                            )
                                          : "",
                                        time2: data.event
                                          ? this.dateMonthFunction(
                                              data.event.schedule.endTime.hours
                                            ) +
                                            ":" +
                                            this.dateMonthFunction(
                                              data.event.schedule.endTime
                                                .minutes
                                            )
                                          : "",
                                        sourceUrl: data.media
                                          ? data.media[0].googleUrl
                                          : ""
                                      })
                                    }
                                  >
                                    <i className="zmdi zmdi-edit"></i>
                                  </a>

                                  <a
                                    className="deleteicon"
                                    onClick={() => this.delete_post(data.name)}
                                  >
                                    <i className="zmdi zmdi-delete"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {console.log(
                              "all post report",
                              all_posts_report[j]
                            )}
                            {all_posts_report.length != 0
                              ? all_posts_report[j] &&
                                all_posts_report[j].metricValues[0].totalValue
                                  .value
                              : "N/A"}
                          </td>
                          <td>
                            {all_posts_report.length != 0
                              ? all_posts_report[j] &&
                                all_posts_report[j].metricValues[1].totalValue
                                  .value
                              : "N/A"}
                          </td>
                          <p hidden>{i++}</p>
                          <td>
                            <a href="#" className="actives">
                              {data.state}
                            </a>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              )}
            </table>
          </div>
          </div> :  
          <div className="analytics-whice">
            <div className="box-space2"><h4>Connect Google listing</h4></div></div> }
          
        </div>}

        {/* </div> */}

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate
              >
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <i className="zmdi zmdi-close"></i>
                  </button>
                  <h4 className="modal-title">Additional Promotional post</h4>
                  <p>
                    Wite your post <span>100-150 Characters</span>
                  </p>
                </div>
                <div className="modal-body" style={{ paddingTop: "0px" }}>
                  <div className="form-group enterpost">
                    <textarea
                      value={summary}
                      name="summary"
                      onChange={this.changeHandler}
                      required
                      placeholder="Enter your post Content here..."
                    ></textarea>
                  </div>

                  <div className="makepost">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="addpost">
                          <h4>Make your post stand out with a pic</h4>
                          <div className="uploadimg">
                            <img
                              src={require("../images/upload-img.png")}
                              alt=""
                            />
                            <div className="attatchfile">
                              {/* <a>
                                <i className="zmdi zmdi-image"></i> Attatch a
                                image
                              </a> */}
                              <a>
                                <input
                                  type="url"
                                  onChange={this.changeHandler}
                                  name="sourceUrl"
                                  placeholder="Put image url"
                                  required
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="addacta">
                          <ul>
                            <li>
                              <a className="active">
                                <label className="container-checkbox" style={{fontSize:"16px"}}>
                                <input
                                  name="CTA"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                />
                                <span className="checkmark zmdi"></span> Add a
                                CTA
                                </label>
                              </a>
                              {CTA ? (
                                <div>
                                  <ul>
                                    <li>
                                      <input
                                        name="actionType"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        value="BOOK"
                                      />
                                      BOOK
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="ORDER"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                      />
                                      ORDER
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="SHOP"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                      />
                                      SHOP
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="LEARN_MORE"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                      />
                                      LEARN MORE
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="SIGN_UP"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                      />
                                      SIGN UP
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="CALL"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                      />
                                      CALL
                                    </li>
                                  </ul>
                                  url:
                                  <input
                                    type="url"
                                    name="url"
                                    onChange={this.changeHandler}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </li>

                            <li>
                              <a className="active">
                              <label className="container-checkbox" style={{fontSize:"16px"}}>
                                <input
                                  name="post_event"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                />
                                <span className="checkmark zmdi"></span> Post
                                an event
                                </label>
                              </a>
                              {post_event ? (
                                <div>
                                  Title:
                                  <input
                                    type="text"
                                    name="title"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                  />
                                  <div>
                                    <p className="basicExample">
                                      Start date:
                                      <input
                                        name="date1"
                                        onChange={this.changeHandler}
                                        type="date"
                                        className="time form-control "
                                        defaultValue=""
                                      />
                                      Start time:
                                      <input
                                        name="time1"
                                        onChange={this.changeHandler}
                                        type="time"
                                        className="time end form-control "
                                        defaultValue="00:00"
                                      />
                                      End date:
                                      <input
                                        name="date2"
                                        onChange={this.changeHandler}
                                        type="date"
                                        className="time form-control "
                                        defaultValue=""
                                      />
                                      End time:
                                      <input
                                        name="time2"
                                        onChange={this.changeHandler}
                                        type="time"
                                        className="time end form-control "
                                        defaultValue="23:59"
                                      />
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </li>

                            <li>
                              <a className="active">
                              <label className="container-checkbox" style={{fontSize:"16px"}}>
                                <input
                                  name="post_promotional"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                />
                                <span className="checkmark zmdi"></span>Make
                                this post a promotional
                                </label>
                              </a>
                              {post_promotional ? (
                                <div>
                                  Coupon code:
                                  <input
                                    type="text"
                                    name="couponCode"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                  />
                                  Redeem Online Url:
                                  <input
                                    type="text"
                                    name="redeemOnlineUrl"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                  />
                                  Terms and Conditions:
                                  <input
                                    type="text"
                                    name="termsConditions"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </li>

                            <li>
                              <a>
                              <label className="container-checkbox" style={{fontSize:"16px"}}>
                              <span className="checkmark zmdi"></span>
                                Report this post after expiry
                                </label>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row top-15">
                      <div className="col-md-6">
                        <div className="savepost">
                          <a href="#">Save as Draft</a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="confirompost">
                          <button
                            onClick={() => this.editPost}
                            className="sign-btn"
                          >
                            Confirm Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="myModal2" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                className="needs-validation"
                onSubmit={this.editPost}
                noValidate
              >
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <i className="zmdi zmdi-close"></i>
                  </button>
                  <h4 className="modal-title">Additional Promotional post</h4>
                  <p>
                    Wite your post <span>100-150 Characters</span>
                  </p>
                </div>
                <div className="modal-body" style={{ paddingTop: "0px" }}>
                  <div className="form-group enterpost">
                    <textarea
                      value={summary}
                      name="summary"
                      onChange={this.changeHandler}
                      required
                    ></textarea>
                  </div>

                  <div className="makepost">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="addpost">
                          <h4>Make your post stand out with a pic</h4>
                          <div className="uploadimg">
                            <img
                              src={
                                sourceUrl
                                  ? sourceUrl
                                  : require("../images/upload-img.png")
                              }
                              alt=""
                            />
                            <div className="attatchfile">
                              {/* <a>
                                <i className="zmdi zmdi-image"></i> Attatch a
                                image
                              </a> */}
                              <a>
                                <input
                                  type="url"
                                  onChange={this.changeHandler}
                                  name="sourceUrl"
                                  placeholder="Put image url"
                                  value={sourceUrl}
                                  required
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="addacta">
                          <ul>
                            <li>
                              <a className="active">
                                <input
                                  name="CTA"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                  checked={CTA}
                                />
                                <i className="zmdi zmdi-check-circle"></i> Add a
                                CTA
                              </a>
                              {CTA ? (
                                <div>
                                  <ul>
                                    <li>
                                      <input
                                        name="actionType"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        value="BOOK"
                                        checked={
                                          actionType == "BOOK" ? true : false
                                        }
                                      />
                                      BOOK
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="ORDER"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        checked={
                                          actionType == "ORDER" ? true : false
                                        }
                                      />
                                      ORDER
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="SHOP"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        checked={
                                          actionType == "SHOP" ? true : false
                                        }
                                      />
                                      SHOP
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="LEARN_MORE"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        checked={
                                          actionType == "LEARN_MORE"
                                            ? true
                                            : false
                                        }
                                      />
                                      LEARN MORE
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="SIGN_UP"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        checked={
                                          actionType == "SIGN_UP" ? true : false
                                        }
                                      />
                                      SIGN UP
                                    </li>
                                    <li>
                                      <input
                                        name="actionType"
                                        value="CALL"
                                        type="checkbox"
                                        onChange={this.changeHandler}
                                        checked={
                                          actionType == "CALL" ? true : false
                                        }
                                      />
                                      CALL
                                    </li>
                                  </ul>
                                  url:
                                  <input
                                    type="url"
                                    name="url"
                                    value={url}
                                    onChange={this.changeHandler}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </li>
                            <li>
                              <a className="active">
                                <input
                                  name="post_event"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                  checked={post_event}
                                />
                                <i className="zmdi zmdi-check-circle"></i> Post
                                an event
                              </a>
                              {post_event ? (
                                <div>
                                  Title:
                                  <input
                                    type="text"
                                    name="title"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    value={title}
                                  />
                                  <div>
                                    <p className="basicExample">
                                      Start date:
                                      <input
                                        name="date1"
                                        onChange={this.changeHandler}
                                        type="date"
                                        className="time form-control "
                                        value={date1}
                                      />
                                      Start time:
                                      <input
                                        name="time1"
                                        onChange={this.changeHandler}
                                        type="time"
                                        className="time end form-control "
                                        value={time1}
                                      />
                                      End date:
                                      <input
                                        name="date2"
                                        onChange={this.changeHandler}
                                        type="date"
                                        className="time form-control "
                                        value={date2}
                                      />
                                      End time:
                                      <input
                                        name="time2"
                                        onChange={this.changeHandler}
                                        type="time"
                                        className="time end form-control "
                                        value={time2}
                                      />
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </li>
                            <li>
                              <a className="active">
                                <input
                                  name="post_promotional"
                                  type="checkbox"
                                  onChange={this.checkBoxHandler}
                                  checked={post_promotional}
                                />
                                <i className="zmdi zmdi-check-circle"></i>Make
                                this post a promotional
                              </a>
                              {post_promotional ? (
                                <div>
                                  Coupon code:
                                  <input
                                    type="text"
                                    name="couponCode"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    value={couponCode}
                                  />
                                  Redeem Online Url:
                                  <input
                                    type="text"
                                    name="redeemOnlineUrl"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    value={redeemOnlineUrl}
                                  />
                                  Terms and Conditions:
                                  <input
                                    type="text"
                                    name="termsConditions"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    value={termsConditions}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </li>
                            <li>
                              <a>
                                <i className="zmdi zmdi-check-circle"></i>{" "}
                                Report this post after expiiry
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row top-15">
                      <div className="col-md-6">
                        <div className="savepost">
                          <a href="#">Save as Draft</a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="confirompost">
                          <button type="submit" className="sign-btn">
                            Confirm Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
