import React, { Component } from "react";
import Axios from "axios";
import Rating from "react-rating";
import Spinner from "./common/Spinner";
import { breakStatement } from "@babel/types";
import ReactPDF, {
  Image,
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

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

// Create styles

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#E4E4E4"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 30,
    // marginHorizontal: 100,
    textAlign: "center",
    width: 125,
    height: 125
  },
  image2: {
    marginVertical: 20,
    // marginHorizontal: 100,
    textAlign: "center",
    width: 80,
    height: 80
  },
  emphasis: {
    margin: 12,
    fontSize: 24,
    color: "#F22300",
    fontFamily: "Oswald"
  }
});

export default class ReviewTracking extends Component {
  state = {
    fbAccounts: [],

    fbReviews: [],
    fb_overallrating: 0,
    zillowAvgRating: "",
    tomtomAvgRating: "",
    avvoAvgRating: "",
    zomatoAvgRating: "",

    fbToken: "",
    yelpReviews: [],
    yelpDetails: [],
    googleReviews: [],
    foursquareReviews: [],
    appleReviews: [],
    citysearchReviews: [],
    zillowReviews: [],
    tomtomReviews: [],
    avvoReviews: [],
    zomatoReviews: [],
    instaComments: [],
    foursquareDetails: [],
    appleDetails: [],
    citysearchDetails: [],
    zillowDetails: [],
    tomtomDetails: [],
    avvoDetails: [],
    zomatoDetails: [],
    foursquareReviewCount: 0,
    appleReviewCount: 0,
    citysearchReviewCount: 0,
    zillowReviewCount: 0,
    tomtomReviewCount: 0,
    avvoReviewCount: 0,
    zomatoReviewCount: 0,
    apple_star_sum: 0,
    citysearch_star_sum: 0,
    star_5: 0,
    star_4: 0,
    star_3: 0,
    star_2: 0,
    star_1: 0,
    most_helpful_review: "",
    loader: true,

    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    category: "",
    state: "",
    today: "",

    active_listing: [],
    pdf_data1: [],
    pdf_data2: []
  };

  componentDidMount = () => {
    var yelpUrl,
      instaUrl,
      fourUrl,
      appleUrl,
      citysearchUrl,
      zillowUrl,
      tomtomUrl,
      avvoUrl,
      avvoToken,
      zomatoUrl,
      fbtoken,
      fbPageId,
      googleToken;

    let { active_listing } = this.state;

    var today = new Date();
    today =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    this.setState({ today });

    const data = {
      location_id: this.props.match.params.locationId
    };


    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
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

          if (l.Social_Platform.Platform == "Zillow") {
            console.log("yes Zillow");
            console.log("Zillow platform", l.Social_Platform.Other_info);

            zillowUrl = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Tomtom") {
            console.log("yes Tomtom");
            console.log("Tomtom platform", l.Social_Platform.Other_info);

            tomtomUrl = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Avvo") {
            console.log("yes Avvo");
            console.log("Avvo platform", l.Social_Platform.Other_info);

            avvoUrl = l.Social_Platform.Other_info;
            avvoToken = l.Social_Platform.Token;
          }

          if (l.Social_Platform.Platform == "Zomato") {
            console.log("yes Zomato");
            console.log("Zomato platform", l.Social_Platform.Other_info);

            zomatoUrl = l.Social_Platform.Other_info;
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
              console.log("fb page data", res.data);
              this.setState({
                fbReviews: res.data.data,
                active_listing: [...this.state.active_listing, "Facebook"]
              });
              this.fb_star_counting(res.data.data);

              if (this.state.fbReviews.length != 0) {
                this.setState({
                  pdf_data1: [
                    ...this.state.pdf_data1,
                    {
                      name: "Facebook",
                      image: require("../images/facebook.png"),
                      data: this.state.fbReviews
                    }
                  ]
                });
              }
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
            this.setState({
              yelpReviews: resp.data.reviews,
              active_listing: [...this.state.active_listing, "Yelp"]
            });
            this.yelp_star_counting(resp.data.reviews);

            if (this.state.yelpReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Yelp",
                    image: require("../images/yelp.png"),
                    data: this.state.yelpReviews
                  }
                ]
              });
            }
          });

          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
              yelpUrl.slice(25),
            Yelpconfig
          ).then(resp => {
            console.log("hii");
            console.log(resp.data);
            this.setState({ yelpDetails: resp.data });
            if (resp.data.rating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Yelp",
                    image: require("../images/yelp.png"),
                    data: resp.data.rating
                  }
                ]
              });
            }
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
                this.setState({
                  googleReviews: respo.data,
                  active_listing: [...this.state.active_listing, "Google"]
                });
                if (respo.data.averageRating) {
                  this.setState({
                    pdf_data2: [
                      ...this.state.pdf_data2,
                      {
                        name: "Google",
                        image: require("../images/google.png"),
                        data: respo.data.averageRating
                      }
                    ]
                  });
                }

                if (
                  this.state.googleReviews &&
                  this.state.googleReviews.length != 0
                ) {
                  if (
                    this.state.googleReviews.reviews &&
                    this.state.googleReviews.reviews.length != 0
                  ) {
                    this.setState({
                      pdf_data1: [
                        ...this.state.pdf_data1,
                        {
                          name: "Google",
                          image: require("../images/google.png"),
                          data: this.state.googleReviews.reviews
                        }
                      ]
                    });
                  }
                }

                this.google_star_counting(respo.data);
              });
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
            console.log("four");
            console.log(res.data.response.venue.tips.groups[0].items);
            this.setState({
              foursquareReviews: res.data.response.venue.tips.groups[0].items,
              foursquareDetails: res.data.response.venue,
              foursquareReviewCount: res.data.response.venue.tips.count,
              active_listing: [...this.state.active_listing, "Foursquare"]
            });

            if (res.data.response.venue.rating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Foursquare",
                    image: require("../images/foursquare.png"),
                    data: res.data.response.venue.rating
                  }
                ]
              });
            }

            if (this.state.foursquareReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Foursquare",
                    image: require("../images/foursquare.png"),
                    data: this.state.foursquareReviews
                  }
                ]
              });
            }

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
                    // console.log(
                    //   "instagram comment in json",
                    //   resp.data.graphql.shortcode_media
                    //     .edge_media_to_parent_comment.edges[0].node.text
                    // );

                    let a =
                      resp.data.graphql.shortcode_media
                        .edge_media_to_parent_comment.edges;

                    for (let i = 0; i < a.length; i++) {
                      if (i < 6) {
                        this.setState({
                          instaComments: [
                            ...this.state.instaComments,
                            a[i].node
                          ],
                          active_listing: [
                            ...this.state.active_listing,
                            "Instagram"
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
              appleReviewCount: res.data.feed.entry.length,
              active_listing: [...this.state.active_listing, "Apple"]
            });
            this.apple_star_counting(res.data.feed.entry);

            if (this.state.appleReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Apple",
                    image: require("../images/apple.png"),
                    data: this.state.appleReviews
                  }
                ]
              });
            }
          });
        }

        if (zillowUrl) {
          Axios.get(
            "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz173vkfofw97_8e096&email=" +
              zillowUrl +
              "&count=10&output=json"
          ).then(res => {
            console.log("zillow data in json", res.data);

            this.setState({
              zillowReviews: res.data.response.results.proReviews.review,
              zillowDetails: res.data,
              zillowReviewCount: parseInt(
                res.data.response.results.proInfo.reviewCount
              ),
              zillowAvgRating: parseFloat(
                res.data.response.results.proInfo.avgRating
              ),
              active_listing: [...this.state.active_listing, "Zillow"]
            });

            if (res.data.response.results.proInfo.avgRating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Zillow",
                    image: require("../images/zillow.png"),
                    data: parseFloat(
                      res.data.response.results.proInfo.avgRating
                    )
                  }
                ]
              });
            }

            if (this.state.zillowReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Zillow",
                    image: require("../images/zillow.png"),
                    data: this.state.zillowReviews
                  }
                ]
              });
            }
          });
        }

        if (tomtomUrl != "-") {
          Axios.get(
            "https://api.tomtom.com/search/2/poiDetails.json?key=BVtLuLXu3StRT6YXupe4H9cbtugU3i10&id=" +
              tomtomUrl
          ).then(res => {
            console.log("tomtom data in json", res.data);

            this.setState({
              tomtomReviews: res.data.result.reviews,
              tomtomDetails: res.data,
              tomtomReviewCount: res.data.result.rating
                ? parseInt(res.data.result.rating.totalRatings)
                : 0,
              tomtomAvgRating: res.data.result.rating
                ? parseFloat(res.data.result.rating.value) / 2
                : res.data.result.rating,
              active_listing: [...this.state.active_listing, "Tomtom"]
            });

            if (this.state.tomtomAvgRating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Tomtom",
                    image: require("../images/tomtom.png"),
                    data: this.state.tomtomAvgRating
                  }
                ]
              });
            }

            if (
              this.state.tomtomReviews &&
              this.state.tomtomReviews.length != 0
            ) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Tomtom",
                    image: require("../images/tomtom.png"),
                    data: this.state.tomtomReviews
                  }
                ]
              });
            }
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

            this.setState({
              avvoDetails: res.data.lawyers[0],
              avvoReviewCount: parseInt(
                res.data.lawyers[0].client_review_count
              ),
              avvoAvgRating: parseFloat(res.data.lawyers[0].client_review_score)
            });

            if (this.state.avvoAvgRating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Avvo",
                    image: require("../images/avvo.png"),
                    data: this.state.avvoAvgRating
                  }
                ]
              });
            }
          });
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/reviews.json?lawyer_id[]=" +
              avvoUrl +
              "&per_page=50",
            AvvoConfig
          ).then(res => {
            console.log("avvo reviews data in json", res.data);
            this.setState({
              avvoReviews: res.data.reviews,
              active_listing: [...this.state.active_listing, "Avvo"]
            });

            if (this.state.avvoReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Avvo",
                    image: require("../images/avvo.png"),
                    data: this.state.avvoReviews
                  }
                ]
              });
            }
          });
        }

        if (zomatoUrl) {
          Axios.get(
            "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
              zomatoUrl,
            Zomatoconfig
          ).then(res => {
            console.log("zomato data in json", res.data);

            this.setState({
              zomatoDetails: res.data,
              zomatoReviewCount: parseInt(res.data.all_reviews_count),
              zomatoAvgRating: parseFloat(res.data.user_rating.aggregate_rating)
            });

            if (this.state.zomatoAvgRating) {
              this.setState({
                pdf_data2: [
                  ...this.state.pdf_data2,
                  {
                    name: "Zomato",
                    image: require("../images/zomato.png"),
                    data: this.state.zomatoAvgRating
                  }
                ]
              });
            }
          });

          Axios.get(
            "https://developers.zomato.com/api/v2.1/reviews?res_id=" +
              zomatoUrl,
            Zomatoconfig
          ).then(res => {
            console.log("zomato reviews in json", res.data);

            this.setState({
              zomatoReviews: res.data.user_reviews,
              active_listing: [...this.state.active_listing, "Zomato"]
            });

            if (this.state.zomatoReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Zomato",
                    image: require("../images/zomato.png"),
                    data: this.state.zomatoReviews
                  }
                ]
              });
            }
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
              citysearchReviewCount: xml.getElementsByTagName("review").length,
              active_listing: [...this.state.active_listing, "Citysearch"]
            });

            if (this.state.citysearchReviews.length != 0) {
              this.setState({
                pdf_data1: [
                  ...this.state.pdf_data1,
                  {
                    name: "Citysearch",
                    image: require("../images/citysearch.jpg"),
                    data: this.state.citysearchReviews
                  }
                ]
              });
            }

            this.citysearch_star_counting(xml.getElementsByTagName("review"));
          });
        }
        this.setState({ loader: false });
      })
      .catch(res => {
        console.log("error in review tracking", res);
        this.setState({ loader: false });
      });

    // getting business address
    Axios.post(
      "https://dashify.biz/locations/get-location-by-id",
      data,
      DjangoConfig
    ).then(resp => {
      // this.setState({ state: "Loading....", category: "Loading...." });
      Axios.get(
        "https://dashify.biz/dropdown-values/states",
        DjangoConfig
      ).then(resp1 => {
        resp1.data.status.map((s, i) =>
          s.id == resp.data.location.State
            ? this.setState({ state: s.State_name })
            : ""
        );
      });

      Axios.get(
        "https://dashify.biz/dropdown-values/business-categoryes",
        DjangoConfig
      ).then(resp1 => {
        resp1.data.BusinessCategory.map((b, i) =>
          b.id == resp.data.location.Business_category
            ? this.setState({ category: b.Category_Name })
            : ""
        );
      });

      this.setState({
        name: resp.data.location.Location_name,
        address: resp.data.location.Address_1,
        phone: resp.data.location.Phone_no,
        city: resp.data.location.City,
        postalCode: resp.data.location.Zipcode
      });
    });
  };

  google_star_counting = data => {
    data.reviews &&
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

    if (this.state.appleReviewCount) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Apple",
            image: require("../images/apple.png"),
            // data: apple_star_sum / appleReviewCount
            data: this.state.apple_star_sum / this.state.appleReviewCount
          }
        ]
      });
    }
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

    if (this.state.citysearchReviewCount) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Citysearch",
            image: require("../images/citysearch.jpg"),
            data:
              this.state.citysearch_star_sum / this.state.citysearchReviewCount
          }
        ]
      });
    }
  };

  Quixote = (pdf_data1, pdf_data2) => (
    <Document>
      {console.log("pdf data1", pdf_data1)}
      {console.log("pdf data2", pdf_data2)}
      <Page style={styles.body} wrap>
        <Text style={styles.title}>LISTINGS REVIEW REPORT</Text>
        <Text style={styles.author}>REPORT DATE: {this.state.today}</Text>
        <View>
          <Image style={styles.image} src={require("../images/alexa.png")} />
          <Text style={styles.subtitle}>Location Name : {this.state.name}</Text>
          <Text style={styles.subtitle}>
            Address : {this.state.category},{this.state.address},{" "}
            {this.state.city}
            {this.state.state} ,{this.state.postalCode},{this.state.phone}
          </Text>
        </View>
        {pdf_data2.map((data, i) =>
          data.name == "Overallrating" ? (
            <View>
              <Text style={styles.subtitle}>
                Over All Rating : {data.data}/5
              </Text>
            </View>
          ) : (
            <View>
              <Image style={styles.image2} src={data.image} />
              <Text style={styles.subtitle}>Rating : {data.data}</Text>
            </View>
          )
        )}

        {/* {pdf_data2.map((data, i) =>

            <View>
              <Image style={styles.image2} src={data.image} />
              <Text style={styles.subtitle}>Name : {data.name}</Text>
              <Text style={styles.subtitle}>Rating : {data.data}</Text>
            </View>
                    )} */}

        <View>
          <Text style={styles.subtitle}>ALL REVIEWS</Text>
        </View>
        {pdf_data1.map((data1, i) =>
          data1.name == "Yelp" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image style={styles.image2} src={data2.user.image_url} /> */}
                  <Text style={styles.subtitle}>Name : {data2.user.name}</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>Review :</Text>
                  <Text style={styles.text}>{data2.text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Apple" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>
                    Name : {data2.author.name.label}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2["im:rating"].label}/5
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.title.label}
                  </Text>
                  <Text style={styles.text}>{data2.content.label}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Citysearch" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>
                    Name : {data2.children[7].value}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.children[5].value}/10
                  </Text>
                  <Text style={styles.subtitle}>
                    Date :{" "}
                    {data2.children[6].value
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.children[1].value}
                  </Text>
                  <Text style={styles.text}>{data2.children[2].value}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Facebook" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.review_text}
                  </Text>
                  <Text style={styles.text}>{data2.review_text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Google" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />

              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={data2.reviewer.profilePhotoUrl}
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.reviewer.displayName}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.starRating}/5
                  </Text>
                  <Text style={styles.subtitle}>Review :</Text>
                  <Text style={styles.text}>{data2.comment}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Foursquare" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={
                    data2.user.photo.prefix +
                    "original" +
                    data2.user.photo.suffix
                  }
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.user.firstName}
                  </Text>
                  <Text style={styles.subtitle}>Date : {data2.createdAt}</Text>
                  <Text style={styles.subtitle}>Review : {data2.text}</Text>
                  <Text style={styles.text}>{data2.text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Avvo" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>Review : {data2.title}</Text>
                  <Text style={styles.text}>{data2.body}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Zomato" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={data2.review.user.profile_image}
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.review.user.name}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.review.rating}/5
                  </Text>
                  <Text style={styles.subtitle}>
                    Date : {data2.review.review_time_friendly}
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.review.rating_text}
                  </Text>
                  <Text style={styles.text}>{data2.review.review_text}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.subtitle}></Text>
          )
        )}
      </Page>
    </Document>
  );

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
    let fb_overallrating = 0,
      i = 0;
    data.map(res =>
      res.has_rating ? (fb_overallrating += res.rating) && i++ : ""
    );
    fb_overallrating = fb_overallrating / i;
    this.setState({ fb_overallrating });

    if (fb_overallrating != 0) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Facebook",
            image: require("../images/facebook.png"),
            data: fb_overallrating
          }
        ]
      });
    }
  };

  render() {
    console.log("this.state", this.state);

    let {
      fbAccounts,
      fbReviews,
      fb_overallrating,
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
      star_1,
      zillowAvgRating,
      zillowDetails,
      zillowReviewCount,
      zillowReviews,
      tomtomAvgRating,
      tomtomDetails,
      tomtomReviewCount,
      tomtomReviews,
      avvoAvgRating,
      avvoDetails,
      avvoReviewCount,
      avvoReviews,
      zomatoAvgRating,
      zomatoDetails,
      zomatoReviewCount,
      zomatoReviews,
      active_listing
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
      fb_overallrating +
      (appleReviewCount ? apple_star_sum / appleReviewCount : 0) +
      (citysearchReviewCount
        ? citysearch_star_sum / citysearchReviewCount
        : 0) +
      (zillowAvgRating ? zillowAvgRating : 0) +
      (tomtomAvgRating ? tomtomAvgRating : 0) +
      (avvoAvgRating ? avvoAvgRating : 0) +
      (zomatoAvgRating ? zomatoAvgRating : 0);

    a =
      a +
      (yelpDetails.rating ? 1 : 0) +
      (googleReviews.averageRating ? 1 : 0) +
      (foursquareDetails.rating ? 1 : 0) +
      (fbAccounts[0] ? 1 : 0) +
      (appleReviewCount ? 1 : 0) +
      (citysearchReviewCount ? 1 : 0) +
      (zillowAvgRating ? 1 : 0) +
      (tomtomAvgRating ? 1 : 0) +
      (avvoAvgRating ? 1 : 0) +
      (zomatoAvgRating ? 1 : 0);

    if (a == 0) {
      overAllRating = NaN;
    } else {
      overAllRating = overAllRating / a;
    }

    //pdf data

    let pdf_data2 = [];

    if (overAllRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Overallrating",
          image: require("../images/alexa.png"),
          data: overAllRating.toString().slice(0, 3)
        }
      ];
    }

    if (yelpDetails.rating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Yelp",
          image: require("../images/yelp.png"),
          data: yelpDetails.rating
        }
      ];
    }

    if (googleReviews.averageRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Google",
          image: require("../images/google.png"),
          data: googleReviews.averageRating
        }
      ];
    }

    if (foursquareDetails.rating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Foursquare",
          image: require("../images/foursquare.png"),
          data: foursquareDetails.rating
        }
      ];
    }

    if (fb_overallrating != 0) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Facebook",
          image: require("../images/facebook.png"),
          data: fb_overallrating
        }
      ];
    }

    if (appleReviewCount) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Apple",
          image: require("../images/apple.png"),
          data: apple_star_sum / appleReviewCount
        }
      ];
    }

    if (citysearchReviewCount) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Citysearch",
          image: require("../images/citysearch.jpg"),
          data: citysearch_star_sum / citysearchReviewCount
        }
      ];
    }

    if (zillowAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Zillow",
          image: require("../images/zillow.png"),
          data: zillowAvgRating
        }
      ];
    }

    if (tomtomAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Tomtom",
          image: require("../images/tomtom.png"),
          data: tomtomAvgRating
        }
      ];
    }

    if (avvoAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Avvo",
          image: require("../images/avvo.png"),
          data: avvoAvgRating
        }
      ];
    }

    if (zomatoAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Zomato",
          image: require("../images/zomato.png"),
          data: zomatoAvgRating
        }
      ];
    }

    let pdf_data1 = [];

    if (this.state.googleReviews && this.state.googleReviews.length != 0) {
      if (
        this.state.googleReviews.reviews &&
        this.state.googleReviews.reviews.length != 0
      ) {
        pdf_data1 = [
          ...pdf_data1,
          {
            name: "Google",
            image: require("../images/google.png"),
            data: this.state.googleReviews.reviews
          }
        ];
      }
    }

    if (this.state.fbReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Facebook",
          image: require("../images/facebook.png"),
          data: this.state.fbReviews
        }
      ];
    }
    if (this.state.yelpReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Yelp",
          image: require("../images/yelp.png"),
          data: this.state.yelpReviews
        }
      ];
    }
    if (this.state.foursquareReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Foursquare",
          image: require("../images/foursquare.png"),
          data: this.state.foursquareReviews
        }
      ];
    }
    if (this.state.appleReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Apple",
          image: require("../images/apple.png"),
          data: this.state.appleReviews
        }
      ];
    }
    if (this.state.citysearchReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Citysearch",
          image: require("../images/citysearch.jpg"),
          data: this.state.citysearchReviews
        }
      ];
    }
    if (this.state.zillowReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Zillow",
          image: require("../images/zillow.png"),
          data: this.state.zillowReviews
        }
      ];
    }
    if (this.state.tomtomReviews && this.state.tomtomReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Tomtom",
          image: require("../images/tomtom.png"),
          data: this.state.tomtomReviews
        }
      ];
    }
    if (this.state.avvoReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Avvo",
          image: require("../images/avvo.png"),
          data: this.state.avvoReviews
        }
      ];
    }
    if (this.state.zomatoReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Zomato",
          image: require("../images/zomato.png"),
          data: this.state.zomatoReviews
        }
      ];
    }

    // this.setState({pdf_data1,pdf_data2})

    //pdf data

    overAllReviewCount =
      fbReviews.length +
      yelpReviews.length +
      (googleReviews.totalReviewCount == undefined
        ? 0
        : googleReviews.totalReviewCount) +
      foursquareReviews.length +
      appleReviewCount +
      foursquareReviewCount +
      zillowReviewCount +
      tomtomReviewCount +
      avvoReviewCount +
      zomatoReviewCount;

    console.log("overAllReviewCount", overAllReviewCount);

    var FbAllReviews = [],
      j = 0;

    // fb
    FbAllReviews = this.state.fbReviews.map(rev => (
      <div className="whitebox" key={++j}>
        <div className="view_author">
          <img src={require("../images/re-1.jpg")} />
        </div>
        <div className="text_viewahor">
          <h4>
            {/* Katrina leave a 5 star review{" "} */}
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
            ""
          )}

          <p>{rev.review_text}</p>
        </div>
      </div>
    ));

    // instagram

    var instaAllComments = [];
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

    var yelpAllReviews = [];

    yelpAllReviews = this.state.yelpReviews.map(rev => (
      <div className="whitebox" key={rev.id}>
        <div className="view_author">
          <img src={rev.user.image_url} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.rating
              ? rev.user.name + " leave a " + rev.rating + " star review"
              : rev.user.name}
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

    // zillow

    var zillowAllReviews = [];

    zillowAllReviews = this.state.zillowReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={require("../images/zillow.png")} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.rating
              ? rev.reviewer + " leave a " + rev.rating + " star review"
              : rev.reviewer}
            <span>{rev.reviewDate}</span>
          </h4>
          <div className="reviewRating">
            <h4>Rating</h4>
            {rev.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.rating)}
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
          </div>
          <div className="reviewRating">
            <h4>Local Knowledge Rating</h4>
            {rev.localknowledgeRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.localknowledgeRating)}
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
          </div>
          <div className="reviewRating">
            <h4>Negotiation Skill Rating</h4>
            {rev.negotiationskillsRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.negotiationskillsRating)}
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
          </div>
          <div className="reviewRating">
            <h4>Responsiveness Rating</h4>
            {rev.responsivenessRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.responsivenessRating)}
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
          </div>

          <p>{rev.reviewSummary}</p>
          <br />
          <p>{rev.description}</p>
        </div>
      </div>
    ));

    // tomtom

    var tomtomAllReviews = [];

    if (this.state.tomtomReviews) {
      tomtomAllReviews = this.state.tomtomReviews.map(rev => (
        <div className="whitebox" key={rev.id}>
          <div className="view_author">
            <img src={require("../images/tomtom.png")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              <span>{rev.date}</span>
            </h4>

            <p>{rev.text}</p>
          </div>
        </div>
      ));
    }

    console.log("tomtomAllReviews", tomtomAllReviews);

    // avvo

    var avvoAllReviews = [];

    avvoAllReviews = this.state.avvoReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={require("../images/avvo.png")} alt="Avvo" width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {/* {rev.rating
              ? rev.review.user.name + " leave a " + rev.review.rating + " star review"
              : rev.review.user.name} */}
            <span>{rev.created_at}</span>
          </h4>
          <div>
            {rev.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.rating)}
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
          </div>
          <p>{rev.title}</p>
          <br />
          <p>{rev.body}</p>
        </div>
      </div>
    ));

    // zomato

    var zomatoAllReviews = [];

    zomatoAllReviews = this.state.zomatoReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={rev.review.user.profile_image} alt="Zomato" width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.review.rating
              ? rev.review.user.name +
                " leave a " +
                rev.review.rating +
                " star review"
              : rev.review.user.name}
            <span>{rev.review.review_time_friendly}</span>
          </h4>
          <div>
            {rev.review.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.review.rating)}
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
          </div>
          <p>{rev.review.review_text}</p>
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
    var googleAllReviews = [];
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

    var foursquareAllReviews = [];

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

    var appleAllReviews = [];
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

    var citysearchAllReviews = [];
    if (this.state.citysearchReviews) {
      citysearchAllReviews = this.state.citysearchReviews.map(rev => (
        <div className="whitebox" key={rev.children[0].value}>
          <div className="view_author">
            <img src={require("../images/citysearch.jpg")} width={150} />
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

    console.log("active_listing", active_listing);

    return (
      <div>
        {/* <div className="content-page"> */}

        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div className="main_content">
            <div className="rightside_title">
              <h1>Review Tracking</h1>
            </div>
            {active_listing.length != 0 ? (
              <div>
                <div className=" mb-30">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="rating-block tablediv">
                        <h4>Overall Rating</h4>
                        <h2 className="bold padding-bottom-7">
                          {overAllRating.toString().slice(0, 3)}{" "}
                          <small>/ 5</small>
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
                              5{" "}
                              <span className="glyphicon glyphicon-star"></span>
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
                                style={{
                                  width: (star_5 / total_count) * 100 + "%"
                                }}
                              >
                                <span className="sr-only">
                                  80% Complete (danger)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="pull-right"
                            style={{ marginLeft: "10px" }}
                          >
                            {((star_5 / total_count) * 100).toFixed(2)}%
                          </div>
                        </div>

                        <div className="pull-left bottomstar">
                          <div
                            className="pull-left"
                            style={{ width: "35px", " lineHeight": "1" }}
                          >
                            <div style={{ height: "12px", margin: "5px 0" }}>
                              4{" "}
                              <span className="glyphicon glyphicon-star"></span>
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
                                style={{
                                  width: (star_4 / total_count) * 100 + "%"
                                }}
                              >
                                <span className="sr-only">
                                  80% Complete (danger)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="pull-right"
                            style={{ marginLeft: "10px" }}
                          >
                            {((star_4 / total_count) * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="pull-left bottomstar">
                          <div
                            className="pull-left"
                            style={{ width: "35px", lineHeight: "1" }}
                          >
                            <div style={{ height: "12px", margin: "5px 0" }}>
                              3{" "}
                              <span className="glyphicon glyphicon-star"></span>
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
                                style={{
                                  width: (star_3 / total_count) * 100 + "%"
                                }}
                              >
                                <span className="sr-only">
                                  80% Complete (danger)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="pull-right"
                            style={{ marginLeft: "10px" }}
                          >
                            {((star_3 / total_count) * 100).toFixed(2)}%
                          </div>
                        </div>

                        <div className="pull-left bottomstar">
                          <div
                            className="pull-left"
                            style={{ width: "35px", lineHeight: "1" }}
                          >
                            <div style={{ height: "12px", margin: "5px 0" }}>
                              2{" "}
                              <span className="glyphicon glyphicon-star"></span>
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
                                style={{
                                  width: (star_2 / total_count) * 100 + "%"
                                }}
                              >
                                <span className="sr-only">
                                  80% Complete (danger)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="pull-right"
                            style={{ marginLeft: "10px" }}
                          >
                            {((star_2 / total_count) * 100).toFixed(2)}%
                          </div>
                        </div>

                        <div className="pull-left bottomstar">
                          <div
                            className="pull-left"
                            style={{ width: "35px", lineHeight: "1" }}
                          >
                            <div style={{ height: "12px", margin: "5px 0" }}>
                              1{" "}
                              <span className="glyphicon glyphicon-star"></span>
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
                                style={{
                                  width: (star_1 / total_count) * 100 + "%"
                                }}
                              >
                                <span className="sr-only">
                                  80% Complete (danger)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="pull-right"
                            style={{ marginLeft: "10px" }}
                          >
                            {((star_1 / total_count) * 100).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {most_helpful_review}
                  </div>
                </div>

                <div className="mt-30 viewallreview">
                  {/* <div className="box-space">
              <h1>View All Review</h1>
            </div> */}

                  <div className="box-space">
                    <div className="row d-flex">
                      <div className="col-md-8">
                        <h2>View All Review</h2>
                      </div>

                      <div className="col-md-4 text-right">
                        <PDFDownloadLink
                          document={this.Quixote(pdf_data1, pdf_data2)}
                          fileName="somename.pdf"
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? (
                              "Loading document..."
                            ) : (
                              <a className="report_btn">Download Report</a>
                            )
                          }
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </div>

                  {active_listing.length != 0 ? (
                    <ul
                      className="nav nav-tabs nav-tabs-dropdown"
                      role="tablist"
                    >
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

                      {active_listing.includes("Google") ? (
                        <li role="presentation">
                          <a
                            href="#Google"
                            aria-controls="city-search"
                            role="tab"
                            data-toggle="tab"
                          >
                            Google
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Instagram") ? (
                        <li role="presentation">
                          <a
                            href="#Instagram"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Instagram
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Foursquare") ? (
                        <li role="presentation">
                          <a
                            href="#Foursquare"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Foursquare
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Yelp") ? (
                        <li role="presentation">
                          <a
                            href="#Yelp"
                            aria-controls="yelp"
                            role="tab"
                            data-toggle="tab"
                          >
                            Yelp
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Facebook") ? (
                        <li role="presentation">
                          <a
                            href="#Facebook"
                            aria-controls="facebook"
                            role="tab"
                            data-toggle="tab"
                          >
                            Facebook
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Apple") ? (
                        <li role="presentation">
                          <a
                            href="#Apple"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Apple
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Citysearch") ? (
                        <li role="presentation">
                          <a
                            href="#Citysearch"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Citysearch
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Zillow") ? (
                        <li role="presentation">
                          <a
                            href="#Zillow"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Zillow
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Tomtom") ? (
                        <li role="presentation">
                          <a
                            href="#Tomtom"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Tomtom
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Avvo") ? (
                        <li role="presentation">
                          <a
                            href="#Avvo"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Avvo
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Zomato") ? (
                        <li role="presentation">
                          <a
                            href="#Zomato"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Zomato
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    <ul
                      className="nav nav-tabs nav-tabs-dropdown"
                      role="tablist"
                    >
                      <li role="presentation">
                        <a
                          aria-controls="all-interactions"
                          role="tab"
                          data-toggle="tab"
                        >
                          No listings are connected, please connect some
                          listings to see reviews
                        </a>
                      </li>
                    </ul>
                  )}
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
                      {zillowAllReviews}
                      {tomtomAllReviews}
                      {avvoAllReviews}
                      {zomatoAllReviews}
                    </div>

                    <div role="tabpanel" className="tab-pane" id="Google">
                      {googleAllReviews.length != 0 ? (
                        googleAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane" id="Instagram">
                      {instaAllComments.length != 0 ? (
                        instaAllComments
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Foursquare">
                      {foursquareAllReviews}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Yelp">
                      {yelpAllReviews.length != 0 ? (
                        yelpAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Apple">
                      {appleAllReviews.length != 0 ? (
                        appleAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Citysearch">
                      {citysearchAllReviews.length != 0 ? (
                        citysearchAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Zillow">
                      {zillowAllReviews.length != 0 ? (
                        zillowAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Tomtom">
                      {tomtomAllReviews.length != 0 ? (
                        tomtomAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Avvo">
                      {avvoAllReviews.length != 0 ? (
                        avvoAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Zomato">
                      {zomatoAllReviews.length != 0 ? (
                        zomatoAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* <div role="tabpanel" className="tab-pane " id="yellow-pages">
  <div className="whitebox">
  <h4>Comming soon</h4>
      </div>

  </div> */}
                    <div role="tabpanel" className="tab-pane " id="Facebook">
                      {FbAllReviews.length != 0 ? (
                        FbAllReviews
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
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
            ) : (
              <div className=" mt-30">
                <div className="analytics-whice">
                  <div className="box-space2">
                    <h4>Connect some listings to see Reviews</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* </div> */}
      </div>
    );
  }
}
