import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};
export default class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      storeCode: "",
      category: "",
      additionalCategories: "",

      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      website: "",
      phone: "",
      hours: [],

      monday: "",
      mondayStart1: "",
      mondayEnd1: "",
      mondayStart2: "",
      mondayEnd2: "",

      tuesday: "",
      tuesdayStart1: "",
      tuesdayEnd1: "",
      tuesdayStart2: "",
      tuesdayEnd2: "",

      wednesday: "",
      wednesdayStart1: "",
      wednesdayEnd1: "",
      wednesdayStart2: "",
      wednesdayEnd2: "",

      thursday: "",
      thursdayStart1: "",
      thursdayEnd1: "",
      thursdayStart2: "",
      thursdayEnd2: "",

      friday: "",
      fridayStart1: "",
      fridayEnd1: "",
      fridayStart2: "",
      fridayEnd2: "",

      saturday: "",
      saturdayStart1: "",
      saturdayEnd1: "",
      saturdayStart2: "",
      saturdayEnd2: "",

      sunday: "",
      sundayStart1: "",
      sundayEnd1: "",
      sundayStart2: "",
      sundayEnd2: "",

      about: "",
      Franchise_Location: "false",
      Do_not_publish_my_address: "true",
      ownerName: "",
      ownerEmail: "",
      yearOfIncorp: "",
      businessTagline: "",
      instagramProfile: "",
      twitterProfile: "",
      facebookProfile: "",
      paymentMethod: [],
      visa: false,
      maestro: false,
      discover: false,
      cirrus: false,
      americanExpress: false,
      BusinessLogo: "",
      BusinessCoverImage: "",
      otherImage: "",
      other_image0: "",
      other_image1: "",
      other_image2: "",
      businessCategories: [],
      countryCategories: [],
      stateCategories: [],
      loadBusinessCategories: false,
      loadCountryCategories: false,
      loadStateCategories: false,
      applyAll: false,
      isSuccess: false,

      locationName_error: "",
      storeCode_error: "",
      category_error: "",
      additionalCategories_error: "",

      address1_error: "",
      address2_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      zipCode_error: "",
      website_error: "",
      phone_error: "",
      hours_error: "",

      about_error: "",
      ownerName_error: "",
      ownerEmail_error: "",
      yearOfIncorp_error: "",
      businessTagline_error: "",
      instagramProfile_error: "",
      twitterProfile_error: "",
      facebookProfile_error: "",
      paymentMethod_error: "",

      error: "",
      loading: false
    };
  }
  submitHandler = async event => {
    event.preventDefault();

    await this.Other_images();

    var payment = {},
      i = 0;

    if (this.state.visa) {
      payment["" + i] = "Visa";
      i++;
    }
    if (this.state.cirrus) {
      payment["" + i] = "Cirrus";
      i++;
    }
    if (this.state.maestro) {
      payment["" + i] = "Maestro";
      i++;
    }
    if (this.state.discover) {
      payment["" + i] = "DiscoverNetwork";
      i++;
    }
    if (this.state.americanExpress) {
      payment["" + i] = "AmericanExpress";
      i++;
    }
    var franchise, donot;
    // if (this.state.FranchiseLocation) {
    //   franchise = "true";
    // } else {
    //   franchise = "false";
    // }
    // if (this.state.DoNotPublishMyAddress) {
    //   donot = "true";
    // } else {
    //   donot = "false";
    // }

    const data = {
      user_id: localStorage.getItem("UserId"),
      Store_Code: this.state.storeCode,
      Location_name: this.state.locationName,
      Business_category: this.state.category,
      Additional_catugory: this.state.additionalCategories,
      Address_1: this.state.address1,
      Address_2: this.state.address2,
      Country: this.state.country,
      State: this.state.state,
      City: this.state.city,
      Zipcode: this.state.zipCode,
      Phone_no: this.state.phone,
      Website: this.state.website,
      Franchise_Location: this.state.Franchise_Location,
      Do_not_publish_my_address: this.state.Do_not_publish_my_address,
      Business_Owner_Name: this.state.ownerName,
      Owner_Email: this.state.ownerEmail,
      Business_Tagline: this.state.businessTagline,
      Year_Of_Incorporation: this.state.yearOfIncorp,
      About_Business: this.state.about,
      Facebook_Profile: this.state.facebookProfile,
      Instagram_Profile: this.state.instagramProfile,
      Twitter_Profile: this.state.twitterProfile,
      payment_method: payment,
      Business_Logo: this.state.BusinessLogo,
      Business_Cover_Image: this.state.BusinessCoverImage,
      other_image: this.state.otherImage,
      open_houre: {
        "0": {
          Day: "Monday",
          Type: "Regular",
          Open_status: this.state.monday,
          start_time_1: this.state.mondayStart1,
          end_time_1: this.state.mondayEnd1,
          start_time_2: this.state.mondayStart2,
          end_time_2: this.state.mondayEnd2
        },
        "1": {
          Day: "Tuesday",
          Type: "Regular",
          Open_status: this.state.tuesday,
          start_time_1: this.state.tuesdayStart1,
          end_time_1: this.state.tuesdayEnd1,
          start_time_2: this.state.tuesdayStart2,
          end_time_2: this.state.tuesdayEnd2
        },
        "2": {
          Day: "Wednesday",
          Type: "Regular",
          Open_status: this.state.wednesday,
          start_time_1: this.state.wednesdayStart1,
          end_time_1: this.state.wednesdayEnd1,
          start_time_2: this.state.wednesdayStart2,
          end_time_2: this.state.wednesdayEnd2
        },
        "3": {
          Day: "Thursday",
          Type: "Regular",
          Open_status: this.state.thursday,
          start_time_1: this.state.thursdayStart1,
          end_time_1: this.state.thursdayEnd1,
          start_time_2: this.state.thursdayStart2,
          end_time_2: this.state.thursdayEnd2
        },
        "4": {
          Day: "Friday",
          Type: "Regular",
          Open_status: this.state.friday,
          start_time_1: this.state.fridayStart1,
          end_time_1: this.state.fridayEnd1,
          start_time_2: this.state.fridayStart2,
          end_time_2: this.state.fridayEnd2
        },
        "5": {
          Day: "Saturday",
          Type: "Regular",
          Open_status: this.state.saturday,
          start_time_1: this.state.saturdayStart1,
          end_time_1: this.state.saturdayEnd1,
          start_time_2: this.state.saturdayStart2,
          end_time_2: this.state.saturdayEnd2
        },
        "6": {
          Day: "Sunday",
          Type: "Regular",
          Open_status: this.state.sunday,
          start_time_1: this.state.sundayStart1,
          end_time_1: this.state.sundayEnd1,
          start_time_2: this.state.sundayStart2,
          end_time_2: this.state.sundayEnd2
        }
      }
    };

    this.setState({ loading: true });
    await this.errorValue(data);

    console.log("data", data);

    Axios.post(
      `/locations/add-location`,
      data,
      DjangoConfig
    )
      .then(res => {
        console.log("response", res);
        if (res.data.message == "Location Add successfully") {
          this.setState({
            isSuccess: true,
            loading: false
          });
        } else {
          this.setState({
            error: res,
            isSuccess: false,
            loading: false
          });
        }
      })
      .catch(res => {
        console.log("error in add location");
        this.setState({
          error: res,
          isSuccess: false,
          loading: false
        });
        console.log("error", res);
      });
  };

  errorValue = data => {
    let {
      locationName_error,
      storeCode_error,
      category_error,
      additionalCategories_error,
      address1_error,
      address2_error,
      city_error,
      state_error,
      country_error,
      zipCode_error,
      website_error,
      phone_error,
      hours_error,
      about_error,
      ownerName_error,
      ownerEmail_error,
      yearOfIncorp_error,
      businessTagline_error,
      instagramProfile_error,
      twitterProfile_error,
      facebookProfile_error,
      paymentMethod_error
    } = this.state;

    this.setState({
      locationName_error: "",
      storeCode_error: "",
      category_error: "",
      additionalCategories_error: "",
      address1_error: "",
      address2_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      zipCode_error: "",
      website_error: "",
      phone_error: "",
      hours_error: "",
      about_error: "",
      ownerName_error: "",
      ownerEmail_error: "",
      yearOfIncorp_error: "",
      businessTagline_error: "",
      instagramProfile_error: "",
      twitterProfile_error: "",
      facebookProfile_error: "",
      paymentMethod_error: ""
    });

    if (data.Location_name == "") {
      this.setState({ locationName_error: "*Location can not be empty" });
    }
    if (data.Store_Code == "") {
      this.setState({ storeCode_error: "*Store Code can not be empty" });
    }
    if (data.Business_category == "") {
      this.setState({ category_error: "*Please select Business category" });
    }
    if (data.Additional_catugory == "") {
      this.setState({
        additionalCategories_error: "*Additional categories can not be empty"
      });
    }
    if (data.Address_1 == "") {
      this.setState({ address1_error: "*Address can not be empty" });
    }
    if (data.Address_2 == "") {
      this.setState({ address2_error: "*Address 2 can not be empty" });
    }
    if (data.City == "") {
      this.setState({ city_error: "*City can not be empty" });
    }
    if (data.State == "") {
      this.setState({ state_error: "*Please select your state" });
    }
    if (data.Country == "") {
      this.setState({ country_error: "*Please select your country" });
    }
    if (data.Zipcode == "") {
      this.setState({ zipCode_error: "*Zipcode can not be empty" });
    }
    if (data.Website == "") {
      this.setState({ website_error: "*Website can not be empty" });
    }
    if (data.Phone_no == "") {
      this.setState({ phone_error: "*Phone No. can not be empty" });
    }
    // if (data.open_houre == "") {
    //   this.setState({ hours_error: "*password can not be empty" });
    // }
    if (data.About_Business == "") {
      this.setState({ about_error: "*Enter about your business" });
    }
    if (data.Business_Owner_Name == "") {
      this.setState({ ownerName_error: "*Owner name can not be empty" });
    }
    if (data.Owner_Email == "") {
      this.setState({ ownerEmail_error: "*Owner email can not be empty" });
    }
    if (data.Year_Of_Incorporation == "") {
      this.setState({
        yearOfIncorp_error: "*Year of Incorporation can not be empty"
      });
    }
    if (data.Business_Tagline == "") {
      this.setState({
        businessTagline_error: "*Business Tagline can not be empty"
      });
    }
    if (data.Instagram_Profile == "") {
      this.setState({
        instagramProfile_error: "*Instagram Profile can not be empty"
      });
    }
    if (data.Twitter_Profile == "") {
      this.setState({
        twitterProfile_error: "*Twitter Profile can not be empty"
      });
    }
    if (data.Facebook_Profile == "") {
      this.setState({
        facebookProfile_error: "*Facebook Profile can not be empty"
      });
    }
    if (data.payment_method == "") {
      this.setState({
        paymentMethod_error: "*Payment method can not be empty"
      });
    }
  };

  onUploadLogo = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ BusinessLogo: e.target.result });
    };
  };
  onUploadCover = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ BusinessCoverImage: e.target.result });
    };
  };

  onUploadOther = name => event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ [name]: e.target.result });
    };
  };

  Other_images = async () => {
    let otherImage = {
      0: this.state.other_image0,
      1: this.state.other_image1,
      2: this.state.other_image2
    };
    await this.setState({ otherImage: otherImage });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxHandler = event => {
    if (event.target.checked) {
      this.setState({ [event.target.name]: true });
    } else {
      this.setState({ [event.target.name]: false });
    }
  };

  allChanger = event => {
    if (event.target.checked) {
      this.setState({
        applyAll: true,
        tuesday: this.state.monday,

        tuesdayStart1: this.state.mondayStart1,
        tuesdayEnd1: this.state.mondayEnd1,
        tuesdayStart2: this.state.mondayStart2,
        tuesdayEnd2: this.state.mondayEnd2,

        wednesday: this.state.monday,
        wednesdayStart1: this.state.mondayStart1,
        wednesdayEnd1: this.state.mondayEnd1,
        wednesdayStart2: this.state.mondayStart2,
        wednesdayEnd2: this.state.mondayEnd2,

        thursday: this.state.monday,
        thursdayStart1: this.state.mondayStart1,
        thursdayEnd1: this.state.mondayEnd1,
        thursdayStart2: this.state.mondayStart2,
        thursdayEnd2: this.state.mondayEnd2,

        friday: this.state.monday,
        fridayStart1: this.state.mondayStart1,
        fridayEnd1: this.state.mondayEnd1,
        fridayStart2: this.state.mondayStart2,
        fridayEnd2: this.state.mondayEnd2,

        saturday: this.state.monday,
        saturdayStart1: this.state.mondayStart1,
        saturdayEnd1: this.state.mondayEnd1,
        saturdayStart2: this.state.mondayStart2,
        saturdayEnd2: this.state.mondayEnd2,

        sunday: this.state.monday,
        sundayStart1: this.state.mondayStart1,
        sundayEnd1: this.state.mondayEnd1,
        sundayStart2: this.state.mondayStart2,
        sundayEnd2: this.state.mondayEnd2
      });
    } else {
      this.setState({
        applyAll: false,

        tuesday: "",
        tuesdayStart1: "",
        tuesdayEnd1: "",
        tuesdayStart2: "",
        tuesdayEnd2: "",

        wednesday: "",
        wednesdayStart1: "",
        wednesdayEnd1: "",
        wednesdayStart2: "",
        wednesdayEnd2: "",

        thursday: "",
        thursdayStart1: "",
        thursdayEnd1: "",
        thursdayStart2: "",
        thursdayEnd2: "",

        friday: "",
        fridayStart1: "",
        fridayEnd1: "",
        fridayStart2: "",
        fridayEnd2: "",

        saturday: "",
        saturdayStart1: "",
        saturdayEnd1: "",
        saturdayStart2: "",
        saturdayEnd2: "",

        sunday: "",
        sundayStart1: "",
        sundayEnd1: "",
        sundayStart2: "",
        sundayEnd2: ""
      });
    }
  };

  _loadBusinessCategories = () => {
    this.setState({ loadBusinessCategories: true });
    Axios.get(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/dropdown-values/business-categoryes",
      DjangoConfig
    )
      .then(res => {
        this.setState({
          businessCategories: res.data.BusinessCategory,
          loadBusinessCategories: false
        });
      })
      .catch(res => {
        console.log("error in loading business categories");
      });
  };

  _loadCountryCategories = () => {
    this.setState({ loadCountryCategories: true });
    Axios.get(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/dropdown-values/counrty",
      DjangoConfig
    )
      .then(res => {
        this.setState({
          countryCategories: res.data.counrty,
          loadCountryCategories: false
        });
      })
      .catch(res => {
        console.log("error in loading country categories");
      });
  };

  _loadStateCategories = () => {
    this.setState({ loadStateCategories: true });
    Axios.get(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/dropdown-values/states",
      DjangoConfig
    )
      .then(res => {
        this.setState({
          stateCategories: res.data.status,
          loadStateCategories: false
        });
      })
      .catch(res => {
        console.log("error in loading state categories");
      });
  };

  componentDidMount() {
    this._loadBusinessCategories();
    this._loadCountryCategories();
    this._loadStateCategories();
  }

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/dashboard" />;
    }
    let {
      businessCategories,
      countryCategories,
      stateCategories,
      loadBusinessCategories,
      loadCountryCategories,
      loadStateCategories,
      locationName_error,
      storeCode_error,
      category_error,
      additionalCategories_error,
      address1_error,
      address2_error,
      city_error,
      state_error,
      country_error,
      zipCode_error,
      website_error,
      phone_error,
      hours_error,
      about_error,
      ownerName_error,
      ownerEmail_error,
      yearOfIncorp_error,
      businessTagline_error,
      instagramProfile_error,
      twitterProfile_error,
      facebookProfile_error,
      paymentMethod_error
    } = this.state;

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Add Location</h1>
            </div>

            <div className="mt-30">
              <div className="row">
                <div className="col-md-12">
                  <div className="analytics-whice">
                    <div className="box-space">
                      <h2 className="analytics_btnx">New Location </h2>
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 1</span> Location Information
                        </h4>

                        <div className="row addlocationboxs">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Store Code</label>
                              <input
                                type="text"
                                name="storeCode"
                                onChange={this.changeHandler}
                                placeholder="Please enter store code"
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>
                                {storeCode_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>
                                Location Name <span className="red">*</span>
                              </label>
                              <input
                                type="text"
                                name="locationName"
                                onChange={this.changeHandler}
                                placeholder="Enter Location Name"
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>
                                {locationName_error}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>
                                Business Category <span className="red">*</span>
                              </label>
                              {/* <select
                                name="category"
                                onChange={this.changeHandler}
                                className="form-control"
                                id="primaryCategory"
                                required
                              >
                                <option value="0" disabled="">
                                  Select A Business Category
                                </option>
                                <option value="1">3D Printing</option>
                              </select> */}

                              {loadBusinessCategories ? (
                                <h4>Loading.....</h4>
                              ) : (
                                <div>
                                  <select
                                    name="category"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    id="primaryCategory"
                                    required
                                  >
                                    <option value="0" disabled="">
                                      Select A Business Category
                                    </option>
                                    {businessCategories.map((b, i) => (
                                      <option
                                        key={`business-${i}`}
                                        value={b.id}
                                      >
                                        {b.Category_Name}
                                      </option>
                                    ))}
                                  </select>
                                  <div style={{ color: "red" }}>
                                    {category_error}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Additional Categories</label>
                              <textarea
                                name="additionalCategories"
                                onChange={this.changeHandler}
                                className="form-control height"
                              ></textarea>
                              <div style={{ color: "red" }}>
                                {additionalCategories_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <div className="form-group">
                              <label>Business Logo</label>
                              <div className="staresd margin-top0">
                                <div className="imgup">
                                  <i className="zmdi zmdi-image"></i>
                                </div>
                              </div>

                              <div className="upload_btnbox">
                                <button>Upload your logo</button>
                                <input
                                  type="file"
                                  onChange={this.onUploadLogo}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row addlocationboxs">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                address 1 <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="address1"
                                onChange={this.changeHandler}
                                placeholder="Colony / Street / Locality"
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>
                                {address1_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>address 2</label>
                              <input
                                type="text"
                                name="address2"
                                onChange={this.changeHandler}
                                placeholder="Flat / House No. / Floor / Building"
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>
                                {address2_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                City <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="city"
                                onChange={this.changeHandler}
                                placeholder="Enter City Name"
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>{city_error}</div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                Country <span>*</span>
                              </label>
                              {/* <select
                                name="country"
                                onChange={this.changeHandler}
                                id="country"
                                required
                                className="form-control"
                              >
                                <option value="0" disabled="">
                                  Select Country
                                </option>
                                <option value="1">Australia</option>
                              </select> */}

                              {loadCountryCategories ? (
                                <h4>Loading.....</h4>
                              ) : (
                                <div>
                                  <select
                                    name="country"
                                    onChange={this.changeHandler}
                                    id="country"
                                    required
                                    className="form-control"
                                  >
                                    <option value="0" disabled="">
                                      Select Country
                                    </option>
                                    {countryCategories.map((c, i) => (
                                      <option key={`country-${i}`} value={c.id}>
                                        {c.Country_Name}
                                      </option>
                                    ))}
                                  </select>
                                  <div style={{ color: "red" }}>
                                    {country_error}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                State <span>*</span>
                              </label>
                              {/* <select
                                name="state"
                                onChange={this.changeHandler}
                                id="state"
                                required
                                className="form-control"
                              >
                                <option value="0" disabled="">
                                  Select State
                                </option>
                                <option value="1">Auckland</option>
                              </select> */}

                              {this.state.country == "" ||
                              loadStateCategories ? (
                                <h4>Select Country</h4>
                              ) : (
                                <div>
                                  <select
                                    name="state"
                                    onChange={this.changeHandler}
                                    id="state"
                                    required
                                    className="form-control"
                                  >
                                    <option value="0" disabled="">
                                      Select State
                                    </option>
                                    {stateCategories.map((s, i) =>
                                      this.state.country == s.Country_Name ? (
                                        <option key={`stste-${i}`} value={s.id}>
                                          {s.State_name}
                                        </option>
                                      ) : (
                                        ""
                                      )
                                    )}
                                  </select>
                                  <div style={{ color: "red" }}>
                                    {state_error}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                Zipcode <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="zipCode"
                                onChange={this.changeHandler}
                                id="state"
                                required
                                className="form-control"
                              />
                              <div style={{ color: "red" }}>
                                {zipCode_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="tel"
                                name="phone"
                                onChange={this.changeHandler}
                                className="form-control"
                                placeholder="Enter your number"
                              />
                              <div style={{ color: "red" }}>{phone_error}</div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Website</label>
                              <input
                                name="website"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter your website"
                              />
                              <div style={{ color: "red" }}>
                                {website_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group checkboxadd">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    this.state.Franchise_Location == "true"
                                      ? true
                                      : false
                                  }
                                  name="Franchise_Location"
                                  value={
                                    this.state.Franchise_Location == "true"
                                      ? false
                                      : true
                                  }
                                  onChange={this.changeHandler}
                                  id="CheckboxGroup1_0"
                                />
                                Franchise Location?
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    this.state.Do_not_publish_my_address ==
                                    "true"
                                      ? true
                                      : false
                                  }
                                  name="Do_not_publish_my_address"
                                  value={
                                    this.state.Do_not_publish_my_address ==
                                    "true"
                                      ? false
                                      : true
                                  }
                                  onChange={this.changeHandler}
                                  id="CheckboxGroup1_1"
                                />
                                Do not publish my address
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 2</span> Business and Operational
                          Information
                        </h4>

                        <div className="row addlocationboxs">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Business Owner Name</label>
                              <input
                                name="ownerName"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                id="ownerName"
                                placeholder="Enter Business Owner Name"
                              ></input>
                              <div style={{ color: "red" }}>
                                {ownerName_error}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Owner Email</label>
                              <input
                                name="ownerEmail"
                                onChange={this.changeHandler}
                                type="email"
                                className="form-control"
                                id="ownerEmail"
                                placeholder="Enter Owner Email"
                              ></input>
                              <div style={{ color: "red" }}>
                                {ownerEmail_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Business Tagline</label>
                              <input
                                name="businessTagline"
                                onChange={this.changeHandler}
                                className="form-control"
                                id="businessTagline"
                                placeholder="Enter Business Tagline"
                              ></input>
                              <div style={{ color: "red" }}>
                                {businessTagline_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Year of Incorporation</label>
                              <input
                                name="yearOfIncorp"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                id="yearOfIncorp"
                                placeholder="Enter Year of Incorporation"
                              ></input>
                              <div style={{ color: "red" }}>
                                {yearOfIncorp_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>
                                About The Business <span>*</span>
                              </label>
                              <textarea
                                name="about"
                                onChange={this.changeHandler}
                                className="form-control businessh"
                              ></textarea>
                              <div style={{ color: "red" }}>{about_error}</div>
                            </div>
                            <div className="form-group">
                              <label>Facebook Profile</label>
                              <input
                                name="facebookProfile"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Facbook Profile"
                              />
                              <div style={{ color: "red" }}>
                                {facebookProfile_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Instagram Profile</label>
                              <input
                                name="instagramProfile"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Instagram Profile"
                              />
                              <div style={{ color: "red" }}>
                                {instagramProfile_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Twitter Profile</label>
                              <input
                                name="twitterProfile"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Twitter Profile"
                              />
                              <div style={{ color: "red" }}>
                                {twitterProfile_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Operating Hours </label>

                              <div className="timebox">
                                <div className="form-day">MONDAY</div>
                                <select
                                  name="monday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.monday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="mondayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="mondayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.monday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="mondayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="mondayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="mondayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="mondayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <input
                                type="checkbox"
                                name="applyAll"
                                onChange={this.allChanger}
                              />
                              <label>Apply To All</label>

                              <div className="timebox">
                                <div className="form-day">TUESDAY </div>
                                <select
                                  name="tuesday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.tuesday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="tuesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="tuesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.tuesday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="tuesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="tuesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="tuesdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="tuesdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="timebox">
                                <div className="form-day">WEDNESDAY</div>
                                <select
                                  name="wednesday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.wednesday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="wednesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="wednesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.wednesday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="wednesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="wednesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="wednesdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="wednesdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="timebox">
                                <div className="form-day"> THURSDAY</div>
                                <select
                                  name="thursday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.thursday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="thursdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="thursdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.thursday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="thursdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="thursdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="thursdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="thursdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="timebox">
                                <div className="form-day"> FRIDAY</div>
                                <select
                                  name="friday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.friday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="fridayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.friday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="fridayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="timebox">
                                <div className="form-day">SATURDAY</div>
                                <select
                                  name="saturday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.saturday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="saturdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.saturday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="saturdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="timebox">
                                <div className="form-day">SUNDAY</div>
                                <select
                                  name="sunday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.sunday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="sundayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.sunday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="sundayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="mathedbox">
                                <h4>Payment Methods</h4>
                                <div className="paymentbox">
                                  <ul>
                                    <li>
                                      <input
                                        name="visa"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                      />{" "}
                                      <img
                                        src={require("../images/visa.jpg")}
                                        alt="visa"
                                      />
                                    </li>

                                    <li>
                                      <input
                                        name="maestro"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/master-1.jpg")}
                                        alt="visa"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="discover"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/descover.jpg")}
                                        alt="visa"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="cirrus"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/cirrus.jpg")}
                                        alt="visa"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="americanExpress"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/am.jpg")}
                                        alt="visa"
                                      />
                                    </li>
                                  </ul>
                                  <div style={{ color: "red" }}>
                                    {paymentMethod_error}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 3</span> Business Images & Media
                        </h4>

                        <div className="row addlocationboxs">
                          <div className="col-md-4">
                            <label>Business Cover Image</label>
                            <div className="coverimgupload">
                              <div className="coverocn">
                                <i className="zmdi zmdi-image"></i>
                                <h4>Attatch a image</h4>
                                <input
                                  type="file"
                                  onChange={this.onUploadCover}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-8">
                            <label>Starred Business images</label>
                            <div className="row">
                              <div className="col-md-3">
                                <div className="staresd">
                                  <div className="imgup">
                                    <i className="zmdi zmdi-image"></i>
                                    <input
                                      type="file"
                                      onChange={this.onUploadOther(
                                        "other_image0"
                                      )}
                                      name="other_image0"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="staresd">
                                  <div className="imgup">
                                    <i className="zmdi zmdi-image"></i>
                                    <input
                                      type="file"
                                      onChange={this.onUploadOther(
                                        "other_image1"
                                      )}
                                      name="other_image1"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="staresd">
                                  <div className="imgup">
                                    <i className="zmdi zmdi-image"></i>
                                    <input
                                      type="file"
                                      onChange={this.onUploadOther(
                                        "other_image2"
                                      )}
                                      name="other_image2"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-30">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="business-cover text-center"
                    style={{ padding: "25px" }}
                  >
                    <p>Great! Your Business Location setup is complete</p>
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : this.state.isSuccess ? (
                      "Location added succesfully"
                    ) : (
                      ""
                    )}
                    <div className="upload_btnbox">
                      <button type="submit">Add New Location</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
