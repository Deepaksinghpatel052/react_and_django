import React, { Component } from "react";
import Axios from "axios";
import Chart from "react-google-charts";

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

export default class ReviewAnalytics extends Component {
  state = {
    fbAccounts: [],

    fbReviews: [],

    fbToken: "",
    yelpReviews: [],
    yelpDetails: [],
    googleReviews: [],
    foursquareReviews: [],
    foursquareDetails: [],
    foursquareReviewCount: "-"
  };

  componentDidMount() {
    //   var yelpUrl;
    //   if(localStorage.getItem('yelpUrl')){
    //      yelpUrl=localStorage.getItem('yelpUrl')
    //   }

    //     var fbtoken=localStorage.getItem('fb_token');
    //     console.log(fbtoken);

    var yelpUrl, fourUrl, fbtoken, fbPageId, googleToken;

    const data = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    ).then(response => {
      console.log(response);

      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Facebook") {
          fbtoken = l.Social_Platform.Token;
          console.log(fbtoken);
          fbPageId = l.Social_Platform.Other_info;
        }

        if (l.Social_Platform.Platform == "Google") {
          console.log("yes goo");
          googleToken = l.Social_Platform.Token;
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

      // for facebook
      if (fbtoken) {
        Axios.get(
          "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
            fbtoken
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
              "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
              fbPageAccessToken
          ).then(res => {
            console.log(res.data.data);
            this.setState({ fbReviews: res.data.data });
          });
        });
      }

      //for yelp

      if (yelpUrl) {
        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
            yelpUrl.slice(25) +
            "/reviews",
          Yelpconfig
        ).then(resp => {
          console.log("bye");
          console.log(resp.data.reviews);
          this.setState({ yelpReviews: resp.data.reviews });
        });

        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
            yelpUrl.slice(25),
          Yelpconfig
        ).then(resp => {
          console.log("hii");
          console.log(resp.data);
          this.setState({ yelpDetails: resp.data });
        });
      }

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

          Axios.get(
            "https://mybusiness.googleapis.com/v4/" +
              localStorage.getItem("accountId") +
              "/locations",
            GoogleConfig
          ).then(resp => {
            console.log(resp.data);

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
              console.log(respo.data);
              this.setState({ googleReviews: respo.data });
            });
          });
        });
      }

      // For foursquare

      //   var fourUrl=localStorage.getItem('fourUrl');

      if (fourUrl) {
        Axios.get(
          "https://api.foursquare.com/v2/venues/" +
            fourUrl +
            "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
        ).then(res => {
          console.log("four");
          console.log(res.data.response.venue.tips.groups[0].items);
          this.setState({
            foursquareReviews: res.data.response.venue.tips.groups[0].items,
            foursquareDetails: res.data.response.venue,
            foursquareReviewCount: res.data.response.venue.tips.count
          });
        });
      }
    });
  }

  render() {
    console.log(this.state);

    //rating calculation
    var overAllRating = 0,
      overAllReviewCount = 0;
    //   var fbReviewCounter=0,i=0;
    if (this.state.foursquareDetails) {
      //       this.state.fbReviews.map((r)=>{
      //         if (r.has_rating){
      //           i++;
      //           fbReviewCounter+=r.rating;
      //         }
      //         // console.log("fbReviewCounter");
      //         // console.log(fbReviewCounter);
      //         // console.log(i);
      //       })

      overAllRating =
        (this.state.yelpDetails.rating ? this.state.yelpDetails.rating : "-") +
        (this.state.googleReviews.averageRating
          ? this.state.googleReviews.averageRating
          : "-") +
        (this.state.foursquareDetails.rating
          ? this.state.foursquareDetails.rating / 2
          : "-") +
        (this.state.fbAccounts[0]
          ? this.state.fbAccounts[0].overall_star_rating
          : "-");
      //   + ((fbReviewCounter/i)?fbReviewCounter/i:0) ;
      //avg
      overAllRating = overAllRating / 4;
      console.log(overAllRating);

      console.log("revewCount");

      overAllReviewCount =
        this.state.fbReviews.length +
        this.state.yelpDetails.review_count +
        this.state.googleReviews.totalReviewCount +
        this.state.foursquareReviewCount;

      console.log(overAllReviewCount);
    }

    var pieData = [
      ["Site", "Total Reviews"],
      ["Google", this.state.googleReviews.totalReviewCount],
      ["Facebook", this.state.fbReviews.length],
      ["Yelp", this.state.yelpDetails.review_count],
      ["Foursquare", this.state.foursquareReviewCount]
    ];

    var columnData = [
      [
        "Site",
        "Average Rating",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify"
        }
      ],
      [
        "Google",
        this.state.googleReviews.averageRating
          ? this.state.googleReviews.averageRating
          : 0,
        "#085bff",
        null
      ],
      [
        "Facebook",
        this.state.fbAccounts[0]
          ? this.state.fbAccounts[0].overall_star_rating
          : 0,
        "#085bff",
        null
      ],
      [
        "Yelp",
        this.state.yelpDetails.rating ? this.state.yelpDetails.rating : 0,
        "#085bff",
        null
      ],
      [
        "Foursquare",
        this.state.foursquareDetails.rating
          ? this.state.foursquareDetails.rating / 2
          : 0,
        "#085bff",
        null
      ]
    ];

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">
            <h1>Review Analytics</h1>
          </div>
          <div className=" mb-30">
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
                      Last six month
                      <span className="zmdi zmdi-caret-down"></span>
                    </a>
                    <div className="dropdown-menu">
                      <ul>
                        <li>Last three month</li>
                        <li>Last nine month</li>
                      </ul>
                    </div>
                  </div>
                </h2>
              </div>

              <div className="total_ant">
                <div className="row">
                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/re_an_1.png")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {overAllReviewCount ? overAllReviewCount : "-"}
                          <div className="dropdown parsent">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {/* 160% */}-
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>{/* 160% */}-</li>
                                <li>{/* 160% */}-</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>Total Review</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/re_an_2.png")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {/* 13 */}-
                          <div className="dropdown parsent">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {/* 160% */}-
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>{/* 160% */}-</li>
                                <li>{/* 160% */}-</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>New Review</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/re_an_3.png")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {overAllRating ? overAllRating : "-"}{" "}
                          <div className="dropdown parsent">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {/* 160% */}-
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>{/* 160% */}-</li>
                                <li>{/* 160% */}-</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>Average Rating</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="totl-listing">
                      <div className="icon">
                        <img src={require("../images/re_an_4.png")} />
                      </div>
                      <div className="icon-text">
                        <h2>
                          {/* 84 */}-
                          <div className="dropdown parsent">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {/* 160% */}-
                              <span className="zmdi zmdi-caret-down"></span>
                            </a>
                            <div className="dropdown-menu">
                              <ul>
                                <li>{/* 160% */}-</li>
                                <li>{/* 160% */}-</li>
                              </ul>
                            </div>
                          </div>
                        </h2>
                        <h3>Review Response rate</h3>
                      </div>
                    </div>
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
                    <th>Review Sites (5)</th>
                    <th>Avg.Rating</th>
                    <th>Total Review</th>
                    <th>New Reviews</th>
                    <th>Rencency</th>
                    <th>Base Rating</th>
                    <th>Base Review</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Consolidated</td>
                    <td>
                      {overAllRating ? overAllRating : "-"}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {overAllReviewCount ? overAllReviewCount : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* 06 */}-{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>{/* 1 days */}-</td>
                    <td>{/* 4.1 */}-</td>
                    <td>{/* 160 */}-</td>
                  </tr>
                  <tr>
                    <td>Google</td>
                    <td>
                      {this.state.googleReviews.averageRating
                        ? this.state.googleReviews.averageRating
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {this.state.googleReviews.totalReviewCount
                        ? this.state.googleReviews.totalReviewCount
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* 06 */}-{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>{/* 1 days */}-</td>
                    <td>{/* 4.1 */}-</td>
                    <td>{/* 160 */}-</td>
                  </tr>
                  <tr>
                    <td>Facebook</td>
                    <td>
                      {this.state.fbAccounts[0]
                        ? this.state.fbAccounts[0].overall_star_rating
                        : "-"}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {this.state.fbReviews.length}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* 06 */}-{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>{/* 1 days */}-</td>
                    <td>{/* 4.1 */}-</td>
                    <td>{/* 160 */}-</td>
                  </tr>
                  <tr>
                    <td>Yelp</td>
                    <td>
                      {this.state.yelpDetails.rating
                        ? this.state.yelpDetails.rating
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {this.state.yelpDetails.review_count
                        ? this.state.yelpDetails.review_count
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* 06 */}-{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>{/* 1 days */}-</td>
                    <td>{/* 4.1 */}-</td>
                    <td>{/* 160 */}-</td>
                  </tr>
                  <tr>
                    <td>Foursqure</td>
                    <td>
                      {this.state.foursquareDetails.rating / 2
                        ? this.state.foursquareDetails.rating / 2
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {this.state.foursquareReviewCount
                        ? this.state.foursquareReviewCount
                        : "-"}{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* 06 */}-{" "}
                      <div className="dropdown tablebx_d">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span className="zmdi zmdi-caret-down"></span>{" "}
                          {/* 160% */}-
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li>{/* 160% */}-</li>
                            <li>{/* 160% */}-</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td>{/* 1 days */}-</td>
                    <td>{/* 4.1 */}-</td>
                    <td>{/* 160 */}-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-30">
            <div className="row">
              <div className="col-md-6">
                <div className="whitechart">
                  {/* <img src={require('../images/pie.jpg')}/> */}

                  <Chart
                    width={"500px"}
                    height={"500px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={pieData}
                    options={{
                      title: "Sitewise Distribution Reviews",
                      pieSliceText: "label",
                      legend: "none",
                      pieHole: 0.4
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="whitechart">
                  {/* <img src={require('../images/pie-1.jpg')}/> */}

                  <Chart
                    width={"500px"}
                    height={"300px"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={columnData}
                    options={{
                      title: "Sitewise Distribution Of Ratings",
                      width: 580,
                      height: 500,
                      bar: { groupWidth: "25%" },
                      legend: {
                        position: "none",
                        textStyle: { color: "black", fontSize: 6 }
                      }
                    }}
                    // For tests
                    rootProps={{ "data-testid": "6" }}
                  />
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
