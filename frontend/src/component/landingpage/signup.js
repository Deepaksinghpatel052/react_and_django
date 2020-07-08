import React from "react";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
// import Button from 'react-bootstrap/Button';

// import Card from 'react-bootstrap/Card';

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    fname: "",
    lname: "",
    bname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    username_error: "",
    fname_error: "",
    lname_error: "",
    bname_error: "",
    password_error: "",
    address_error: "",
    city_error: "",
    state_error: "",
    zip_error: "",
    isRegister: false,
    error: "",
    loading: false
  };

  submitHandler = async event => {
    event.preventDefault();
    // event.target.className += ' was-validated';
    // localStorage.setItem('username',this.state.username);
    // localStorage.setItem("password",this.state.password);

    const data = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      username: this.state.username,
      password: this.state.password,
      Business_name: this.state.bname,
      City: this.state.city,
      State: this.state.state,
      Zip: this.state.zip,
      Address: this.state.address
    };

    await this.errorValue(data);

    this.setState({ loading: true });
    Axios.post(
      "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/register",
      data
    )
      .then(resp => {
        this.setState({ loading: false });
        console.log("resp", resp);
        if (resp.data.response == "Account create successfuly") {
          this.setState({
            isRegister: true
          });
        } else {
          this.setState({
            error: resp,
            isRegister: false
          });
          if (
            resp.data.username == "A user with that username already exists."
          ) {
            this.setState({ username_error: resp.data.username });
          }
          console.log("error1", resp);
        }
      })
      .catch(error => {
        this.setState({ error: error, isRegister: false, loading: false });
        console.log("error2", error);
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  errorValue = data => {
    let {
      username_error,
      fname_error,
      lname_error,
      bname_error,
      address_error,
      password_error,
      city_error,
      state_error,
      zip_error
    } = this.state;

    this.setState({
      username_error: "",
      fname_error: "",
      lname_error: "",
      bname_error: "",
      address_error: "",
      password_error: "",
      city_error: "",
      state_error: "",
      zip_error: ""
    });

    if (data.first_name == "") {
      this.setState({ fname_error: "*Enter your first name" });
    }
    if (data.last_name == "") {
      this.setState({ lname_error: "*Enter your last name" });
    }
    if (data.username == "") {
      this.setState({ username_error: "*Enter username" });
    }
    if (data.Business_name == "") {
      this.setState({ bname_error: "*Enter your Business name" });
    }
    if (data.City == "") {
      this.setState({ city_error: "*Enter your City" });
    }
    if (data.State == "") {
      this.setState({ state_error: "*Enter your State" });
    }
    if (data.Zip == "") {
      this.setState({ zip_error: "*Enter zipcode" });
    }
    if (data.Address == "") {
      this.setState({ address_error: "*Enter your address" });
    }
    if (data.password == "") {
      this.setState({ password_error: "*password can not be empty" });
    }
  };

  render() {
    if (this.state.isRegister) {
      return <Redirect to={"/email-confirmation/" + this.state.username} />;
    }

    return (
      <div>
        <div className="register-logo">
          <div className="container">
            <Row>
              <Col md={6}>
                <div className="signup-md-size">
                  <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                  >
                    <a href="/">
                      <img src={Logo} className="Alogo" alt="logo" />
                    </a>
                    <p className="signup-heading">Create an Account</p>
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={30}
                        width={30}
                        // timeout={3000} //3 secs
                      />
                    ) : (
                      ""
                    )}
                    <Row>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterNameEx"
                          className="grey-text"
                        >
                          First name
                        </label>
                        <input
                          value={this.state.fname}
                          name="fname"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.fname_error}
                        </div>
                      </Col>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterEmailEx2"
                          className="grey-text"
                        >
                          Last name
                        </label>
                        <input
                          value={this.state.lname}
                          name="lname"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.lname_error}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterNameEx"
                          className="grey-text"
                        >
                          Username
                        </label>
                        <input
                          value={this.state.username}
                          name="username"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="User Name"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.username_error}
                        </div>
                      </Col>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterEmailEx2"
                          className="grey-text"
                        >
                          Password
                        </label>
                        <input
                          value={this.state.password}
                          name="password"
                          onChange={this.changeHandler}
                          type="password"
                          className="form-control"
                          placeholder="* * * *"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.password_error}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterConfirmEx3"
                          className="grey-text"
                        >
                          Business Name
                        </label>
                        <input
                          value={this.state.bname}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="bname"
                          placeholder="Business Name"
                        />
                        <div style={{ color: "red" }}>
                          {this.state.bname_error}
                        </div>
                      </Col>
                      <Col md="6" className="mb-3">
                        <label className="grey-text">Address</label>
                        <input
                          value={this.state.address}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder=" Address"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.address_error}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterPasswordEx4"
                          className="grey-text"
                        >
                          City
                        </label>
                        <input
                          value={this.state.city}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="city"
                          placeholder="City"
                          required
                        />
                        {/* <div className="invalid-feedback">
                          Please provide a valid zip.
              </div> */}

                        <div style={{ color: "red" }}>
                          {this.state.city_error}
                        </div>
                      </Col>
                      <Col md="3" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterPasswordEx4"
                          className="grey-text"
                        >
                          State
                        </label>
                        <input
                          value={this.state.state}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="state"
                          placeholder="State"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.state_error}
                        </div>
                        {/* <div className="invalid-feedback">
                          Please provide a valid state.
              </div>
                         */}
                      </Col>
                      <Col md="3" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterPasswordEx4"
                          className="grey-text"
                        >
                          Zip
                        </label>
                        <input
                          value={this.state.zip}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="zip"
                          placeholder="Zip"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.zip_error}
                        </div>
                        {/* <div className="invalid-feedback">
                          Please provide a valid zip.
              </div>
                         */}
                      </Col>
                    </Row>
                    <div className="col-btn backbox">
                      <Row>
                        <Col md={6}>
                          <Link to="#">
                            <button className="sign-btn">Back</button>
                          </Link>
                        </Col>
                        <Col md={6}>
                          <input
                            type="submit"
                            value="Submit"
                            className="sign-btn"
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="signup-text">
                      <p>
                        Already have an account? <Link to="Login">Sign In</Link>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
        </div>

        <div className="signin-footer1">
          <div className=" signin-footer-icon1">
            <Link to="" className="fb-ic2 ">
              <i className="fa fa-facebook-f" aria-hidden="true">
                {" "}
              </i>
            </Link>
            <Link to="" className="tw-ic2">
              <i className="fa fa-twitter" aria-hidden="true">
                {" "}
              </i>
            </Link>
            <Link to="" className="yt-ic2">
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </Link>
            <Link to="" className="ld-ic2">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="signin-footer-features">
            <ul>
              <li>
                <Link to="#">Coporate</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>{" "}
              </li>
              <li>
                <Link to="#">Term and Conditions</Link>
              </li>
              <li>
                <Link to="#">Accessibility </Link>
              </li>
              <li>
                <Link to="#">Privacy policy</Link>
              </li>
              <li>
                <Link to="#">Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className="signin-footer-copyright-link-2">
            <container fluid className="sign-date">
              &copy; {new Date().getFullYear()}
              <a href="#"> Dashify, All Rights Reserved</a>
            </container>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
