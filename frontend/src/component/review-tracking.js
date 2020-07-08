import React, { Component } from "react";
import Axios from "axios";
import Rating from "react-rating";
import Spinner from "./common/Spinner";
import { breakStatement } from "@babel/types";

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

export default class ReviewTracking extends Component {
  state = {
    fbAccounts: [],

    fbReviews: [],

    fbToken: "",
    yelpReviews: [],
    yelpDetails: [],
    googleReviews: [],
    foursquareReviews: [],
    appleReviews: [],
    citysearchReviews: [],
    instaComments: [],
    foursquareDetails: [],
    appleDetails: [],
    citysearchDetails: [],
    foursquareReviewCount: 0,
    appleReviewCount: 0,
    citysearchReviewCount: 0,
    apple_star_sum: 0,
    citysearch_star_sum: 0,
    star_5: 0,
    star_4: 0,
    star_3: 0,
    star_2: 0,
    star_1: 0,
    most_helpful_review: "",
    loader: true
  };

  componentDidMount = () => {
    var yelpUrl,
      instaUrl,
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
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(response => {
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
            console.log("foursquare platform", l.Social_Platform.Other_info);

            fourUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[5];
          }

          if (l.Social_Platform.Platform == "Instagram") {
            console.log("yes instagram");
            console.log(
              "instagram id",
              l.Social_Platform.Other_info.split(",")[0].slice(7)
            );
            instaUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.Social_Platform.Platform == "Yelp") {
            console.log("yes yelp");
            console.log(l.Social_Platform.Other_info.split(",")[0].slice(7));
            yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.Social_Platform.Platform == "Apple") {
            console.log("yes apple");
            console.log(
              "apple platform",
              l.Social_Platform.Other_info.split(",")[0]
                .slice(7)
                .split("/")[6]
                .slice(2)
            );

            appleUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[6]
              .slice(2);
          }

          if (l.Social_Platform.Platform == "Citysearch") {
            console.log("yes Citysearch");
            console.log("Citysearch platform", l.Social_Platform.Other_info);

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
              this.fb_star_counting(res.data.data);
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
            console.log(resp.data.reviews);
            this.setState({ yelpReviews: resp.data.reviews });
            this.yelp_star_counting(resp.data.reviews);
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
                console.log("google reviews", respo.data);
                this.setState({ googleReviews: respo.data });
                this.google_star_counting(respo.data);
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
            console.log("four");
            console.log(res.data.response.venue.tips.groups[0].items);
            this.setState({
              foursquareReviews: res.data.response.venue.tips.groups[0].items,
              foursquareDetails: res.data.response.venue,
              foursquareReviewCount: res.data.response.venue.tips.count
            });
            this.foursquare_star_counting(
              res.data.response.venue.rating,
              res.data.response.venue.tips.count
            );
          });
        }

        // instagram

        if (instaUrl) {
          Axios.get("https://www.instagram.com/" + instaUrl + "/?__a=1").then(
            res => {
              console.log("instagram data in json", res.data);
              console.log(
                "instagram data in json",
                res.data.graphql.user.edge_owner_to_timeline_media.edges[0].node
                  .shortcode
              );

              res.data.graphql.user.edge_owner_to_timeline_media.edges.map(
                (post, i) => {
                  Axios.get(
                    "https://www.instagram.com/p/" +
                      post.node.shortcode +
                      "/?__a=1"
                  ).then(resp => {
                    console.log(
                      "instagram comment in json",
                      resp.data.graphql.shortcode_media
                        .edge_media_to_parent_comment
                    );
                    console.log(
                      "instagram comment in json",
                      resp.data.graphql.shortcode_media
                        .edge_media_to_parent_comment.edges[0].node.text
                    );

                    let a =
                      resp.data.graphql.shortcode_media
                        .edge_media_to_parent_comment.edges;

                    for (let i = 0; i < a.length; i++) {
                      if (i < 6) {
                        this.setState({
                          instaComments: [
                            ...this.state.instaComments,
                            a[i].node
                          ]
                        });
                      } else {
                        break;
                      }
                    }
                  });
                }
              );
            }
          );
        }

        if (appleUrl) {
          Axios.get(
            "https://itunes.apple.com/in/rss/customerreviews/id=" +
              appleUrl +
              "/sortBy=mostRecent/json"
          ).then(res => {
            console.log("apple data in json", res.data.feed.entry);

            this.setState({
              appleReviews: res.data.feed.entry,
              appleDetails: res,
              appleReviewCount: res.data.feed.entry.length
            });
            this.apple_star_counting(res.data.feed.entry);
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
            console.log(xml.getElementsByTagName("review"));
            this.setState({
              citysearchReviews: xml.getElementsByTagName("review"),
              citysearchDetails: xml,
              citysearchReviewCount: xml.getElementsByTagName("review").length
            });
            this.citysearch_star_counting(xml.getElementsByTagName("review"));
          });
        }
        this.setState({ loader: false });
      })
      .catch(res => {
        console.log(res);
      });
  };

  google_star_counting = data => {
    data.reviews.map(res =>
      res.starRating == "FIVE"
        ? this.setState({ star_5: this.state.star_5 + 1 })
        : res.starRating == "FOUR"
        ? this.setState({ star_4: this.state.star_4 + 1 })
        : res.starRating == "THREE"
        ? this.setState({ star_3: this.state.star_3 + 1 })
        : res.starRating == "TWO"
        ? this.setState({ star_2: this.state.star_2 + 1 })
        : res.starRating == "ONE"
        ? this.setState({ star_1: this.state.star_1 + 1 })
        : ""
    );
  };

  yelp_star_counting = data => {
    data.map(res =>
      res.rating == 5
        ? this.setState({ star_5: this.state.star_5 + 1 })
        : res.rating == 4
        ? this.setState({ star_4: this.state.star_4 + 1 })
        : res.rating == 3
        ? this.setState({ star_3: this.state.star_3 + 1 })
        : res.rating == 2
        ? this.setState({ star_2: this.state.star_2 + 1 })
        : res.rating == 1
        ? this.setState({ star_1: this.state.star_1 + 1 })
        : ""
    );
  };

  apple_star_counting = data => {
    data.map(res =>
      res["im:rating"].label == "5"
        ? this.setState({ star_5: this.state.star_5 + 1 })
        : res["im:rating"].label == "4"
        ? this.setState({ star_4: this.state.star_4 + 1 })
        : res["im:rating"].label == "3"
        ? this.setState({ star_3: this.state.star_3 + 1 })
        : res["im:rating"].label == "2"
        ? this.setState({ star_2: this.state.star_2 + 1 })
        : res["im:rating"].label == "1"
        ? this.setState({ star_1: this.state.star_1 + 1 })
        : ""
    );
    data.map(res =>
      this.setState({
        apple_star_sum:
          parseInt(res["im:rating"].label) + this.state.apple_star_sum
      })
    );
  };

  citysearch_star_counting = data => {
    var rating;
    data.map(
      res =>
        (rating =
          Math.round(res.children[5].value / 2) == "5"
            ? this.setState({ star_5: this.state.star_5 + 1 })
            : rating == "4"
            ? this.setState({ star_4: this.state.star_4 + 1 })
            : rating == "3"
            ? this.setState({ star_3: this.state.star_3 + 1 })
            : rating == "2"
            ? this.setState({ star_2: this.state.star_2 + 1 })
            : rating == "1"
            ? this.setState({ star_1: this.state.star_1 + 1 })
            : "")
    );

    data.map(res =>
      this.setState({
        citysearch_star_sum:
          Math.round(res.children[5].value / 2) + this.state.citysearch_star_sum
      })
    );
  };

  foursquare_star_counting = (rating, total_number) => {
    rating = Math.round(rating / 2);
    console.log("foursquare_rating total_no", rating, total_number);

    if (rating == 5) {
      this.setState({ star_5: this.state.star_5 + total_number });
    } else if (rating == 4) {
      this.setState({ star_4: this.state.star_4 + total_number });
    } else if (rating == 3) {
      this.setState({ star_3: this.state.star_3 + total_number });
    } else if (rating == 2) {
      this.setState({ star_2: this.state.star_2 + total_number });
    } else if (rating == 1) {
      this.setState({ star_1: this.state.star_1 + total_number });
    }
  };

  fb_star_counting = data => {
    data.map(res =>
      res.has_rating
        ? res.rating == 5
          ? this.setState({ star_5: this.state.star_5 + 1 })
          : res.rating == 4
          ? this.setState({ star_4: this.state.star_4 + 1 })
          : res.rating == 3
          ? this.setState({ star_3: this.state.star_3 + 1 })
          : res.rating == 2
          ? this.setState({ star_2: this.state.star_2 + 1 })
          : res.rating == 1
          ? this.setState({ star_1: this.state.star_1 + 1 })
          : ""
        : ""
    );
  };

  render() {
    console.log("this.state", this.state);

    var loader;
    if (this.state.loader) {
      loader = <Spinner />;
    } else {
      loader = "";
    }

    let {
      fbAccounts,
      fbReviews,
      fbToken,
      yelpReviews,
      yelpDetails,
      googleReviews,
      foursquareReviews,
      appleReviews,
      citysearchReviews,
      instaComments,
      foursquareDetails,
      appleDetails,
      citysearchDetails,
      foursquareReviewCount,
      appleReviewCount,
      citysearchReviewCount,
      apple_star_sum,
      citysearch_star_sum,
      star_5,
      star_4,
      star_3,
      star_2,
      star_1
    } = this.state;

    let total_count = star_5 + star_4 + star_3 + star_2 + star_1;
    var most_helpful_review;
    var google_reviews = this.state.googleReviews.reviews;

    // <div className="whitebox" key={rev.reviewId}>
    //       <div className="view_author">
    //         <img src={rev.reviewer.profilePhotoUrl} width={150} />
    //       </div>
    //       <div className="text_viewahor">
    //         <h4>
    //           {rev.reviewer.displayName} leave a 5 star review{" "}
    //           <span>{rev.createTime.slice(0, 10)}</span>
    //         </h4>
    //         {rev.starRating ? (
    //           <Rating
    //             style={{ color: "#f7c508" }}
    //             emptySymbol={["fa fa-star-o fa-2x high"]}
    //             fullSymbol={["fa fa-star fa-2x high"]}
    //             fractions={3}
    //             initialRating={star[rev.starRating]}
    //             readonly={true}
    //           />
    //         ) : (
    //           <Rating
    //             style={{ color: "#f7c508" }}
    //             emptySymbol={["fa fa-star-o fa-2x high"]}
    //             fullSymbol={["fa fa-star fa-2x high"]}
    //             fractions={3}
    //             initialRating={0}
    //             readonly={true}
    //           />
    //         )}

    //         <p>{rev.comment}</p>
    //       </div>
    //     </div>

    if (google_reviews) {
      let k = 0;
      for (var i = 0; i < google_reviews.length; i++) {
        if (google_reviews[i].starRating == "FIVE") {
          k = i;
          break;
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  src={google_reviews[k].reviewer.profilePhotoUrl}
                  width={120}
                />

                <div className="autor_name">
                  <h5>{google_reviews[k].reviewer.displayName}</h5>
                  <ul>
                    {google_reviews[k].starRating == "FIVE"
                      ? [1, 2, 3, 4, 5].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "FOUR"
                      ? [1, 2, 3, 4].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "THREE"
                      ? [1, 2, 3].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "TWO"
                      ? [1, 2].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "ONE"
                      ? [1].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text_autor">
              <p>{google_reviews[k].comment}</p>
            </div>
          </div>
        </div>
      );
    } else if (yelpReviews.length != 0) {
      console.log("yelpReviews", yelpReviews);
      let k = 0;
      for (var i = 0; i < yelpReviews.length; i++) {
        if (yelpReviews[i].rating == 5) {
          k = i;
          break;
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img src={yelpReviews[k].user.image_url} width={120} />
              </div>
              <div className="autor_name">
                <h5>{yelpReviews[k].user.name}</h5>
                <ul>
                  {yelpReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            <div className="text_autor">
              <p>{yelpReviews[k].text}</p>
            </div>
          </div>
        </div>
      );
    } else if (fbReviews.length != 0) {
      console.log("fbReviews", fbReviews);
      let k = 0;
      for (var i = 0; i < fbReviews.length; i++) {
        if (fbReviews[i].has_rating && fbReviews[i].has_review) {
          if (fbReviews[i].rating == 5) {
            k = i;
            break;
          }
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  // src={fbReviews[k].user.image_url}
                  alt="image"
                  width={120}
                />
              </div>
              <div className="autor_name">
                {/* <h5>{fbReviews[k].user.name}</h5> */}
                <h5>User</h5>
                <ul>
                  {fbReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            <div className="text_autor">
              <p>{fbReviews[k].review_text}</p>
            </div>
          </div>
        </div>
      );
    } else if (foursquareReviews.length != 0) {
      console.log("foursquareReviews", foursquareReviews);
      let k = 0;
      // for (var i = 0; i < foursquareReviews.length; i++) {
      //   if (foursquareReviews[i].rating == 5) {
      //     k = i;
      //     break;
      //   }
      // }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  src={
                    foursquareReviews[k].user.photo.prefix +
                    "original" +
                    foursquareReviews[k].user.photo.suffix
                  }
                  width={120}
                />
              </div>
              <div className="autor_name">
                <h5>
                  {foursquareReviews[k].user.firstName}{" "}
                  {foursquareReviews[k].user.lastName}
                </h5>
                {/* <ul>
                 {foursquareReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""} 
                </ul>*/}
              </div>
            </div>

            <div className="text_autor">
              <p>{foursquareReviews[k].text}</p>
            </div>
          </div>
        </div>
      );
    }

    //rating calculation
    var overAllRating = 0,
      overAllReviewCount = 0;

    // var fbReviewCounter=0,i=0;
    // this.state.fbReviews.map((r)=>{
    //   if (r.has_rating){
    //     i++;
    //     fbReviewCounter+=r.rating;
    //   }
    // console.log("fbReviewCounter");
    // console.log(fbReviewCounter);
    // console.log(i);
    // })

    let a = 0;
    overAllRating =
      (yelpDetails.rating ? yelpDetails.rating : 0) +
      (googleReviews.averageRating ? googleReviews.averageRating : 0) +
      (foursquareDetails.rating ? foursquareDetails.rating / 2 : 0) +
      (fbAccounts[0] ? fbAccounts[0].overall_star_rating : 0) +
      (appleReviewCount ? apple_star_sum / appleReviewCount : 0) +
      (citysearchReviewCount ? citysearch_star_sum / citysearchReviewCount : 0);

    a =
      a +
      (yelpDetails.rating ? 1 : 0) +
      (googleReviews.averageRating ? 1 : 0) +
      (foursquareDetails.rating ? 1 : 0) +
      (fbAccounts[0] ? 1 : 0) +
      (appleReviewCount ? 1 : 0) +
      (citysearchReviewCount ? 1 : 0);

    if (a == 0) {
      overAllRating = NaN;
    } else {
      overAllRating = overAllRating / a;
    }

    console.log("overAllRating", overAllRating, a);

    console.log("revewCount");
    console.log("googleReviews count", this.state.googleReviews);

    overAllReviewCount =
      fbReviews.length +
      yelpReviews.length +
      (googleReviews.totalReviewCount == undefined
        ? 0
        : googleReviews.totalReviewCount) +
      foursquareReviews.length +
      appleReviewCount +
      foursquareReviewCount;

    console.log("overAllReviewCount", overAllReviewCount);

    var FbAllReviews,
      j = 0;

    // fb
    FbAllReviews = this.state.fbReviews.map(rev => (
      <div className="whitebox" key={++j}>
        <div className="view_author">
          <img src={require("../images/re-1.jpg")} />
        </div>
        <div className="text_viewahor">
          <h4>
            Katrina leave a 5 star review{" "}
            <span>{rev.created_time.slice(0, 10)}</span>
          </h4>
          {rev.has_rating ? (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={rev.rating}
              readonly={true}
            />
          ) : (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={0}
              readonly={true}
            />
          )}

          <p>{rev.review_text}</p>
        </div>
      </div>
    ));

    // instagram

    var instaAllComments;
    var date = new Date();

    instaAllComments = this.state.instaComments.map((rev, i) => (
      <div className="whitebox" key={rev.id}>
        <div className="view_author">
          <img src={rev.owner.profile_pic_url} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.owner.username}
            <span>{rev.created_at}</span>
          </h4>
          <p>{rev.text}</p>
        </div>
      </div>
    ));

    // yelp

    var yelpAllReviews;

    yelpAllReviews = this.state.yelpReviews.map(rev => (
      <div className="whitebox" key={rev.id}>
        <div className="view_author">
          <img src={rev.user.image_url} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.user.name} leave a 5 star review{" "}
            <span>{rev.time_created.slice(0, 10)}</span>
          </h4>
          {rev.rating ? (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={rev.rating}
              readonly={true}
            />
          ) : (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={0}
              readonly={true}
            />
          )}

          <p>{rev.text}</p>
        </div>
      </div>
    ));

    //Google
    const star = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5
    };
    console.log(star);
    console.log(star["ONE"]);
    var googleAllReviews;
    if (this.state.googleReviews.reviews) {
      googleAllReviews = this.state.googleReviews.reviews.map(rev => (
        <div className="whitebox" key={rev.reviewId}>
          <div className="view_author">
            <img src={rev.reviewer.profilePhotoUrl} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.reviewer.displayName} leave a 5 star review{" "}
              <span>{rev.createTime.slice(0, 10)}</span>
            </h4>
            {rev.starRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={star[rev.starRating]}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>{rev.comment}</p>
          </div>
        </div>
      ));
    }

    var foursquareAllReviews;

    if (this.state.foursquareReviews) {
      foursquareAllReviews = this.state.foursquareReviews.map(rev => (
        <div className="whitebox" key={rev.reviewId}>
          <div className="view_author">
            <img
              src={rev.user.photo.prefix + "original" + rev.user.photo.suffix}
              width={150}
            />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.user.firstName} leave a 5 star review{" "}
              <span>{rev.createdAt}</span>
            </h4>
            <ul>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
            </ul>

            <p>{rev.text}</p>
          </div>
        </div>
      ));
    }

    var appleAllReviews;
    if (this.state.appleReviews) {
      appleAllReviews = this.state.appleReviews.map(rev => (
        <div className="whitebox" key={rev.id.label}>
          <div className="view_author">
            <img src={require("../images/apple.png")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.author.name.label} leave a {rev["im:rating"].label} star
              review {/* <span>{rev.createdAt}</span> */}
            </h4>
            {rev["im:rating"].label ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={rev["im:rating"].label}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>
              <b>{rev.title.label}</b>
            </p>
            <p>{rev.content.label}</p>
          </div>
        </div>
      ));
    }

    var citysearchAllReviews;
    if (this.state.citysearchReviews) {
      citysearchAllReviews = this.state.citysearchReviews.map(rev => (
        <div className="whitebox" key={rev.children[0].value}>
          <div className="view_author">
            <img src={require("../images/citysearch2.jpg")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.children[7].value} leave a{" "}
              {parseInt(rev.children[5].value) / 2} star review{" "}
              <span>{rev.children[6].value.split("T")[0]}</span>
            </h4>
            {rev.children[5].value ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.children[5].value) / 2}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>
              <b>{rev.children[1].value}</b>
            </p>
            <p>{rev.children[2].value}</p>
          </div>
        </div>
      ));
    }

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">
            <h1>Review Tracking</h1>
            {loader}
          </div>
          <div className=" mb-30">
            <div className="row">
              <div className="col-md-4">
                <div className="rating-block tablediv">
                  <h4>Overall Rating</h4>
                  <h2 className="bold padding-bottom-7">
                    {overAllRating.toString().slice(0, 3)} <small>/ 5</small>
                  </h2>
                  <fieldset className="rating star">
                    {/* <input type="radio" id="field6_star5" name="rating2" value="5" /><label className="full" htmlFor="field6_star5"></label>
                                            <input type="radio" id="field6_star4" name="rating2" value="4" /><label className="full" htmlFor="field6_star4"></label>
                                            <input type="radio" id="field6_star3" name="rating2" value="3" /><label className="full" htmlFor="field6_star3"></label>
                                            <input type="radio" id="field6_star2" name="rating2" value="2" /><label className="full" htmlFor="field6_star2"></label>
                                            <input type="radio" id="field6_star1" name="rating2" value="1" /><label className="full" htmlFor="field6_star1"></label> */}
                    <Rating
                      style={{ color: "#f7c508" }}
                      emptySymbol={["fa fa-star-o fa-2x high"]}
                      fullSymbol={["fa fa-star fa-2x high"]}
                      fractions={3}
                      initialRating={overAllRating}
                      readonly={true}
                    />
                  </fieldset>
                  <div className="reviewthis">
                    <h5>{overAllReviewCount} Review</h5>
                    <h5>This Month</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="tablediv ratingdown">
                  <h4>Rating breakdown</h4>
                  <div className="pull-left bottomstar">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: "1" }}
                    >
                      <div style={{ height: "12px", margin: "5px 0px" }}>
                        5 <span className="glyphicon glyphicon-star"></span>
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "12px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="5"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: (star_5 / total_count) * 100 + "%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {((star_5 / total_count) * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="pull-left bottomstar">
                    <div
                      className="pull-left"
                      style={{ width: "35px", " lineHeight": "1" }}
                    >
                      <div style={{ height: "12px", margin: "5px 0" }}>
                        4 <span className="glyphicon glyphicon-star"></span>
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "12px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar progress-bar-primary"
                          role="progressbar"
                          aria-valuenow="4"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: (star_4 / total_count) * 100 + "%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {((star_4 / total_count) * 100).toFixed(2)}%
                    </div>
                  </div>
                  <div className="pull-left bottomstar">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: "1" }}
                    >
                      <div style={{ height: "12px", margin: "5px 0" }}>
                        3 <span className="glyphicon glyphicon-star"></span>
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "12px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar progress-bar-info"
                          role="progressbar"
                          aria-valuenow="3"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: (star_3 / total_count) * 100 + "%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {((star_3 / total_count) * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="pull-left bottomstar">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: "1" }}
                    >
                      <div style={{ height: "12px", margin: "5px 0" }}>
                        2 <span className="glyphicon glyphicon-star"></span>
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "12px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar progress-bar-warning"
                          role="progressbar"
                          aria-valuenow="2"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: (star_2 / total_count) * 100 + "%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {((star_2 / total_count) * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="pull-left bottomstar">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: "1" }}
                    >
                      <div style={{ height: "12px", margin: "5px 0" }}>
                        1 <span className="glyphicon glyphicon-star"></span>
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "12px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar progress-bar-danger"
                          role="progressbar"
                          aria-valuenow="1"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: (star_1 / total_count) * 100 + "%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {((star_1 / total_count) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {most_helpful_review}
            </div>
          </div>

          <div className="mt-30 viewallreview">
            <div className="box-space ">
              <h1>View All Review</h1>
            </div>

            <ul className="nav nav-tabs nav-tabs-dropdown" role="tablist">
              <li role="presentation" className="active">
                <a
                  href="#all-interactions"
                  aria-controls="all-interactions"
                  role="tab"
                  data-toggle="tab"
                >
                  All Interactions
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#google"
                  aria-controls="city-search"
                  role="tab"
                  data-toggle="tab"
                >
                  Google
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#instagram"
                  aria-controls="inside"
                  role="tab"
                  data-toggle="tab"
                >
                  Instagram
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#foursquare"
                  aria-controls="inside"
                  role="tab"
                  data-toggle="tab"
                >
                  Foursquare
                </a>
              </li>

              <li role="presentation">
                <a
                  href="#yelp"
                  aria-controls="yelp"
                  role="tab"
                  data-toggle="tab"
                >
                  Yelp
                </a>
              </li>
              {/* <li role="presentation"><a href="#yellow-pages" aria-controls="yellow-pages" role="tab" data-toggle="tab">Yellow Pages</a></li> */}
              <li role="presentation">
                <a
                  href="#facebook"
                  aria-controls="facebook"
                  role="tab"
                  data-toggle="tab"
                >
                  Facebook
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#apple"
                  aria-controls="inside"
                  role="tab"
                  data-toggle="tab"
                >
                  Apple
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#citysearch"
                  aria-controls="inside"
                  role="tab"
                  data-toggle="tab"
                >
                  Citysearch
                </a>
              </li>
              {/* <li role="presentation"><a href="#instagram" aria-controls="instagram" role="tab" data-toggle="tab">Instagram</a></li>
  <li role="presentation"><a href="#twitter" aria-controls="twitter" role="tab" data-toggle="tab">Twitter</a></li>
   */}
            </ul>
          </div>

          <div className="mt-30 ">
            <div className="tab-content">
              <div
                role="tabpanel"
                className="tab-pane active"
                id="all-interactions"
              >
                {googleAllReviews}
                {instaAllComments}
                {yelpAllReviews}
                {foursquareAllReviews}
                {FbAllReviews}
                {appleAllReviews}
                {citysearchAllReviews}
              </div>
              <div role="tabpanel" className="tab-pane" id="google">
                {googleAllReviews}
              </div>
              <div role="tabpanel" className="tab-pane" id="instagram">
                {instaAllComments}
              </div>
              <div role="tabpanel" className="tab-pane " id="foursquare">
                {foursquareAllReviews}
              </div>
              <div role="tabpanel" className="tab-pane " id="yelp">
                {yelpAllReviews}
              </div>
              <div role="tabpanel" className="tab-pane " id="apple">
                {appleAllReviews}
              </div>
              <div role="tabpanel" className="tab-pane " id="citysearch">
                {citysearchAllReviews}
              </div>
              {/* <div role="tabpanel" className="tab-pane " id="yellow-pages">
  <div className="whitebox">
  <h4>Comming soon</h4>
      </div>

  </div> */}
              <div role="tabpanel" className="tab-pane " id="facebook">
                {FbAllReviews}
              </div>
              {/* <div role="tabpanel" className="tab-pane " id="instagram">
  <div className="whitebox">
  <h4>Comming soon</h4>
      </div>
  </div>
  <div role="tabpanel" className="tab-pane " id="twitter">
  <div className="whitebox">
  <h4>Comming soon</h4>
      </div>

  </div> */}
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
