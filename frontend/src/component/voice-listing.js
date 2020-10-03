import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import GoogleLogin from "react-google-login";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class NewFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: "",
      ans: ""
    };
  }

  handler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="conntend">
        <div className="row d-flex ">
          <div className="col-md-8">
            <div className="faq-title">
              <h4>
                Question :{" "}
                <input
                  type="text"
                  className="form-group"
                  name="que"
                  onChange={this.handler}
                />
              </h4>
            </div>
            <div className="faq-title">
              <h4>
                Answer :{" "}
                <input
                  type="text"
                  name="ans"
                  className="form-group"
                  onChange={this.handler}
                />
              </h4>
            </div>
          </div>

          <div className="col-md-2">
            <button
              onClick={this.props.submit(this.state.que, this.state.ans)}
              className="btn"
            >
              Save
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={this.props.cancel} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class UpdateFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: "",
      ans: ""
    };
  }

  handler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    console.log("update");
    var data = {
      faq_id: this.props.faqid
    };

    Axios.post(
      "https://dashify.biz/voice-faq/get-faqs-by-id",
      data,
      DjangoConfig
    ).then(resp => {
      console.log(resp);
      this.setState({
        que: resp.data.all_faqs.question,
        ans: resp.data.all_faqs.answer
      });
    });

    console.log(this.props.faqid);
  }

  render() {
    return (
      <div className="conntend">
        <div className="row d-flex ">
          <div className="col-md-8">
            <div className="faq-title">
              <h4>
                Question :{" "}
                <input
                  type="text"
                  className="form-group"
                  name="que"
                  value={this.state.que}
                  onChange={this.handler}
                />
              </h4>
              <div style={{ color: "red" }}>{this.props.error.que_error}</div>
            </div>
            <div className="faq-title">
              <h4>
                Answer :{" "}
                <input
                  type="text"
                  name="ans"
                  className="form-group"
                  value={this.state.ans}
                  onChange={this.handler}
                />
              </h4>
              <div style={{ color: "red" }}>{this.props.error.ans_error}</div>
            </div>
          </div>

          <div className="col-md-2">
            <button
              onClick={this.props.update(
                this.state.que,
                this.state.ans,
                this.props.faqid
              )}
              className="btn"
            >
              update
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={this.props.cancel} className="btn">
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default class VoiceListing extends Component {
  state = {
    loader: true,
    logo: "",
    state: "",
    category: "",
    name: "",
    address: "",
    phone: "",
    about: "",
    city: "",
    postalCode: "",

    new: false,
    allFaq: [],

    update: false,
    faqid: "",

    htmlc: "",
    javac: "",
    allListings: [],
    googleLoggedIn: false,
    yelpIsLoggedIn: false,
    foursquareIsLoggedIn: false,
    appleIsLoggedIn: false,
    yelpAlexa: false,
    fourBixby: false,
    googleOptimized: false,
    appleOptimized: false,

    redirect_to_google_connectedaccounts: false,
    google_redirect_data: "",
    que_error: "",
    ans_error: ""
  };

  updateFaq = (que, ans, id) => event => {
    event.preventDefault();
    console.log("update but");

    console.log("he");
    console.log(que);
    var data = {
      Location_id: this.props.match.params.locationId,
      question: que,
      answer: ans,
      faq_id: id
    };
    console.log(data);
    console.log(this.state.allFaq);

    this.setState({ que_error: "", ans_error: "" });

    let is_que = false,
      is_ans = false;

    if (que) {
      is_que = true;
    } else {
      this.setState({ que_error: "Question can not be empty" });
    }

    if (ans) {
      is_ans = true;
    } else {
      this.setState({ ans_error: "Answer can not be empty" });
    }

    if (is_ans && is_que) {
      Axios.post(
        "https://dashify.biz/voice-faq/edit-faq",
        data,
        DjangoConfig
      ).then(resp => {
        console.log(resp);
        Axios.get(
          "https://dashify.biz/voice-faq/get-all-faqs",
          DjangoConfig
        ).then(resp => {
          console.log(resp);
          this.setState({ allFaq: resp.data.all_faqs, update: false });
        });
      });
    }
  };

  editFaq = id => {
    console.log("edit");

    this.setState({ faqid: id, update: true });
  };

  deleteFaq = nameid => {
    alert("You are going to delete this FAQ");

    console.log(" delete");

    var data = {
      faq_id: nameid
    };

    Axios.post(
      "https://dashify.biz/voice-faq/delete-faq",
      data,
      DjangoConfig
    ).then(resp => {
      console.log(resp);
      Axios.get(
        "https://dashify.biz/voice-faq/get-all-faqs",
        DjangoConfig
      ).then(resp => {
        console.log(resp);
        this.setState({ allFaq: resp.data.all_faqs });
      });
    });
  };

  submitFaq = (que, ans) => event => {
    event.preventDefault();

    this.setState({ new: false });
    console.log("he");
    console.log(que);
    var data = {
      Location: this.props.match.params.locationId,
      question: que,
      answer: ans
    };

    console.log(this.state.allFaq);
    Axios.post(
      "https://dashify.biz/voice-faq/add",
      data,
      DjangoConfig
    ).then(resp => {
      console.log(resp);
      Axios.get(
        "https://dashify.biz/voice-faq/get-all-faqs",
        DjangoConfig
      ).then(resp => {
        console.log(resp);
        this.setState({ allFaq: resp.data.all_faqs });
      });
    });
  };

  submitCancel = e => {
    this.setState({ new: false });
  };
  updateCancel = e => {
    this.setState({ update: false });
  };

  addFaq = e => {
    this.setState({ new: true });
    console.log("add");
  };
  installWedget = e => {
    var dynadiv = "";
    var dynaJs = "";
    if (this.state.allFaq.length > 0) {
      this.state.allFaq.map(r => {
        dynadiv +=
          "<div class='faq'> <div class='faq-question'> <span class='faq-question-label'>Q.</span> <span class='faq-value'>" +
          r.question +
          "</span> </div><div> <span class='faq-answer-label'>A.</span> <span class='faq-value'>" +
          r.answer +
          "</span> </div></div>";
        dynaJs +=
          '{"@type":"Question","name":"' +
          r.question +
          '","acceptedAnswer":{"@type":"Answer","text":"' +
          r.answer +
          '"}},';
      });

      this.setState({
        htmlc:
          "<style>body{background: #e9ecee; padding: 2%;}​ .faq{margin-top: 2%;}.faq-question{background: whitesmoke font-weight: bold;}​ .faq-question-label{font-size: large;}​ .faq-answer-label{font-size: large;}.faq-value{font-size: large; margin-left: 1%;}</style> " +
          dynadiv,

        javac:
          '<script type="application/ld+json">{"@context":"http://schema.org","@type":"FAQPage","mainEntity":[' +
          dynaJs +
          "]]}</script>"
      });
    }
  };

  componentDidMount() {
    const data = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "https://dashify.biz/locations/get-location-by-id",
      data,
      DjangoConfig
    ).then(resp => {
      console.log("hi");
      this.setState({ state: "Loading....", category: "Loading...." });
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

    var datal = {
      location_id: this.props.match.params.locationId
    };

    Axios.post(
      "https://dashify.biz/voice-faq/get-all-faqs-by-location-id",
      datal,
      DjangoConfig
    ).then(resp => {
      console.log(resp);
      this.setState({ allFaq: resp.data.all_faqs });
    });

    const Yelpconfig = {
      headers: {
        Authorization:
          "bearer XkjWF9GSy19xRS_yytCtISMaViqsPuXGmQiTzzAdcRHHNJmISD9bnHisRb8tgF5H7xVuMnbcybxOvEHHM7o91yTFKcGO7KrERhOSMS9NtRiPQNq9tCxMl61oD10pXnYx",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost"
      }
    };

    Axios.post(
      "https://dashify.biz/locations/get-all-connection-of-one-location",
      data,
      DjangoConfig
    )
      .then(resp => {
        console.log("get all connections", resp);
        this.setState({ allListings: resp.data.data });

        if (this.state.allListings) {
          this.state.allListings.map(l => {
            if (l.Social_Platform.Platform == "Google") {
              const GoogleConfig = {
                headers: { Authorization: "Bearer " + l.Social_Platform.Token }
              };

              let locationIdGoogle = l.Social_Platform.Other_info;

              Axios.get(
                "https://mybusiness.googleapis.com/v4/" + locationIdGoogle,
                GoogleConfig
              ).then(res => {
                console.log("google location details", res.data);
                this.setState({ googleLoggedIn: true });

                if (
                  res.data.primaryCategory &&
                  res.data.regularHours.periods &&
                  res.data.websiteUrl &&
                  res.data.locationName &&
                  res.data.address &&
                  res.data.primaryPhone
                ) {
                  if (
                    res.data.primaryCategory.categoryId &&
                    res.data.regularHours.periods.length > 0 &&
                    res.data.address.regionCode &&
                    res.data.address.postalCode &&
                    res.data.address.locality &&
                    res.data.address.administrativeArea
                  ) {
                    this.setState({
                      googleOptimized: true
                    });
                  }
                }
              });
            }

            if (l.Social_Platform.Platform == "Foursquare") {
              console.log("yes four");
              var fourUrl = l.Social_Platform.Other_info.split(",")[0]
                .slice(7)
                .split("/")[5];
              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
                  fourUrl +
                  "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
              ).then(res => {
                console.log("foursquare data", res.data.response.venue);
                var fouro = res.data.response.venue;
                if (
                  fouro.categories &&
                  fouro.hours.dayData &&
                  fouro.name &&
                  fouro.location.city &&
                  fouro.location.country &&
                  fouro.location.state
                ) {
                  if (
                    fouro.categories.length > 0 &&
                    fouro.hours.dayData.length > 0
                  ) {
                    this.setState({
                      fourBixby: true
                    });
                  }
                }
              });
              this.setState({
                foursquareIsLoggedIn: true
              });
            }

            if (l.Social_Platform.Platform == "Yelp") {
              console.log("yes yelp");
              var yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
                  yelpUrl.slice(25),
                Yelpconfig
              ).then(resp => {
                console.log("hii");
                console.log("yelpDetails", resp.data);

                if (
                  resp.data.categories &&
                  resp.data.alias &&
                  resp.data.display_phone &&
                  resp.data.hours[0].open &&
                  resp.data.location.address1 &&
                  resp.data.location.city &&
                  resp.data.location.country
                ) {
                  if (
                    resp.data.categories.length > 0 &&
                    resp.data.hours[0].open.length > 0
                  ) {
                    this.setState({
                      yelpAlexa: true
                    });
                  }
                }
              });
              this.setState({
                yelpIsLoggedIn: true
              });
            }

            if (l.Social_Platform.Platform == "Apple") {
              console.log("yes Apple");
              var appleUrl = l.Social_Platform.Other_info.split(",")[0]
                .slice(7)
                .split("/")[6]
                .slice(2);

              Axios.get(
                "https://itunes.apple.com/in/rss/customerreviews/id=" +
                  appleUrl +
                  "/sortBy=mostRecent/json"
              ).then(res => {
                console.log("apple data in json", res.data);
              });
              this.setState({
                appleIsLoggedIn: true
              });
            }
          });
        }
        this.setState({ loader: false });
      })
      .catch(res => {
        console.log("error in voice listing", res);
        this.setState({ loader: false });
      });
  }

  htmlcopy = e => {
    e.preventDefault();
    document.querySelector("#htmlcode").select();
    document.execCommand("copy");
  };

  javacopy = e => {
    e.preventDefault();
    document.querySelector("#javascriptcode").select();
    document.execCommand("copy");
  };

  responseErrorGoogle = response => {
      console.log(response);
      alert("try again");
    };

  responseGoogle = async response => {
    console.log("google response", response);

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      redirect_to: "/voice-listing"
    };
    this.setState({
      redirect_to_google_connectedaccounts: true,
      google_redirect_data: state
    });
  };

  render() {
    console.log(this.state);

    if (this.state.redirect_to_google_connectedaccounts) {
      return (
        <Redirect
          to={{
            pathname: "/google-connectedaccounts",
            state: this.state.google_redirect_data
          }}
        />
      );
    }

    if (this.state.otherImage) {
      var otherIma = (
        <ul>
          {this.state.otherImage.map((img, i) => (
            <li>
              <img src={img.Image} height="100" width="100" />
            </li>
          ))}
        </ul>
      );
    }

    if (this.state.allFaq.map) {
      var AllFaq = this.state.allFaq.map(r => {
        var nameid = r.id;

        return (
          <div className="conntend">
            <div className="row d-flex ">
              <div className="col-md-10">
                <div className="faq-title">
                  <h4>Q : {r.question} ?</h4>
                </div>
                <div className="faq-descrition">
                  <p>A : {r.answer}</p>
                </div>
              </div>

              <div className="col-md-2">
                <a className="delete" onClick={() => this.deleteFaq(nameid)}>
                  <i className="zmdi zmdi-delete"></i>
                </a>
                <a onClick={() => this.editFaq(nameid)} className="edit">
                  <i className="zmdi zmdi-edit"></i>
                </a>
              </div>
            </div>
          </div>
        );
      });
    }

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
              <h1>Voice Listing</h1>
            </div>
            <div className="tablediv">
              <div className="row">
                <div className="col-md-6">
                  <div className="listingdetails">
                    <div className="d-flex">
                      <div className="viewimg">
                        <img
                          src={
                            this.state.logo
                              ? this.state.logo
                              : require("../images/Logo2.png")
                          }
                          height="150"
                          width="150"
                        />
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

                          <a
                            href={
                              "/dashboard#/locations/" +
                              localStorage.getItem("locationId") +
                              "/view-location"
                            }
                            className="showmore"
                          >
                            Show More informations
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="business-box">
                    {otherIma}
                    <div className="viewlisting-text">
                      <h3>BUSINESS DESCRIPTION</h3>
                      <p>{this.state.about}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-30">
              <div className="googleass">
                <div className="google-asst">
                  <div className="google-icon">
                    <img src={require("../images/google-assistant.png")} />
                  </div>
                  <div className="google-text">
                    <h2>Google Assistant</h2>

                    {this.state.googleLoggedIn ? (
                      this.state.googleOptimized ? (
                        <a className="progressb">
                          <i className="zmdi zmdi-check-circle"></i>Optimization
                          in progress
                        </a>
                      ) : (
                        <p style={{ color: "red" }}>can't optimise</p>
                      )
                    ) : (
                      <GoogleLogin
                        //for localhost
                        clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                        //for server
                        // clientId="759599444436-5litbq8gav4ku8sj01o00uh6lsk8ebr0.apps.googleusercontent.com"
                        buttonText="Optimize"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseErrorGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    )}
                  </div>
                </div>

                <div className="google-asst">
                  <div className="google-icon">
                    <img src={require("../images/alexa.png")} />
                  </div>
                  <div className="google-text">
                    <h2>Amazon Alexa</h2>
                    {this.state.yelpIsLoggedIn ? (
                      this.state.yelpAlexa ? (
                        <a className="progressb">
                          <i className="zmdi zmdi-check-circle"></i>Optimization
                          in progress
                        </a>
                      ) : (
                        <p style={{ color: "red" }}>can't optimise</p>
                      )
                    ) : (
                      <a href="/yelplogin" className="optimize">
                        Optimize
                      </a>
                    )}
                  </div>
                </div>

                <div className="google-asst">
                  <div className="google-icon">
                    <img src={require("../images/siri.png")} />
                  </div>
                  <div className="google-text">
                    <h2>Apple Siri</h2>

                    {this.state.appleIsLoggedIn ? (
                      this.state.appleOptimized ? (
                        <a className="progressb">
                          <i className="zmdi zmdi-check-circle"></i>Optimization
                          in progress
                        </a>
                      ) : (
                        <p style={{ color: "red" }}>can't optimise</p>
                      )
                    ) : (
                      <a href="/applelogin" className="optimize">
                        Optimize
                      </a>
                    )}
                  </div>
                </div>

                <div className="google-asst">
                  <div className="google-icon">
                    <img src={require("../images/cortana.png")} />
                  </div>
                  <div className="google-text">
                    <h2>Microsoft Cortana</h2>
                    <a href="#" className="optimize">
                      Optimize
                    </a>
                  </div>
                </div>

                <div className="google-asst">
                  <div className="google-icon">
                    <img src={require("../images/bixby.png")} />
                  </div>
                  <div className="google-text">
                    <h2>Samsung bixby</h2>
                    {this.state.foursquareIsLoggedIn ? (
                      this.state.fourBixby ? (
                        <a className="progressb">
                          <i className="zmdi zmdi-check-circle"></i>Optimization
                          in progress
                        </a>
                      ) : (
                        <p style={{ color: "red" }}>can't optimize</p>
                      )
                    ) : (
                      <a href="/foursquarelogin" className="optimize">
                        Optimize
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="update-account voices mt-30">
              <div className="box-space">
                <div className="row d-flex">
                  <div className="col-md-8">
                    <h2>Voice FAQs</h2>
                    <p>
                      Add FAQs that will help you to customize your location to
                      appear in voice search
                    </p>
                  </div>
                  <div className="col-md-4 text-right">
                    <button onClick={this.addFaq} className="add_faq">
                      + Add FAQs
                    </button>
                    <a
                      href="#"
                      onClick={this.installWedget}
                      data-toggle="modal"
                      data-target="#myModal"
                      className="wedgets"
                    >
                      Install Wedgets
                    </a>
                  </div>
                </div>
              </div>

              <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form className="needs-validation" noValidate>
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <i className="zmdi zmdi-close"></i>
                        </button>
                        <h4
                          className="modal-title"
                          style={{ textAlign: "center" }}
                        >
                          Add FAQs to your website
                        </h4>
                        <p>
                          Follow the steps below to optimize your website for
                          voice search
                        </p>
                      </div>
                      <div className="modal-body" style={{ paddingTop: "0px" }}>
                        <div className="form-group enterpost">
                          <p>Step 01 </p>
                          <br />
                          <div>
                            Copy the generated html below and paste it into any
                            section of any page on your website. Feel free to
                            modify the CSS if you wish to.
                          </div>
                          <br />
                          <textarea
                            className="codearea"
                            name="htmlcode"
                            id="htmlcode"
                            value={this.state.htmlc}
                            readOnly
                          ></textarea>
                          <br />

                          <button onClick={this.htmlcopy}>Copy Code</button>

                          <br />
                          <br />
                          <br />

                          <p>Step 02 </p>
                          <br />
                          <div>
                            Copy the Javascript snippet below and paste it into
                            the head tag of your website.
                          </div>
                          <br />
                          <textarea
                            className="codearea"
                            name="javascriptcode"
                            id="javascriptcode"
                            value={this.state.javac}
                            readOnly
                          ></textarea>
                          <br />

                          <button onClick={this.javacopy}>Copy Code</button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className=" connect-box">
                {this.state.new ? (
                  <NewFaq submit={this.submitFaq} cancel={this.submitCancel} />
                ) : (
                  ""
                )}

                {this.state.update ? (
                  <UpdateFaq
                    update={this.updateFaq}
                    faqid={this.state.faqid}
                    cancel={this.updateCancel}
                    error={{
                      ans_error: this.state.ans_error,
                      que_error: this.state.que_error
                    }}
                  />
                ) : (
                  ""
                )}

                {AllFaq}
              </div>
            </div>
          </div>
        )}

        {/* </div> */}
      </div>
    );
  }
}
