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
    all_users: [],
    username: "",
    password: "",
    fname: "",
    lname: "",
    bname: "",
    country: "",
    phone: "",
    confirm_password: "",
    username_error: "",
    fname_error: "",
    lname_error: "",
    bname_error: "",
    password_error: "",
    country_error: "",
    phone_error: "",
    confirm_password_error: "",
    isRegister: false,
    terms_condition: false,
    error: "",
    loading: false,
    any_error: false
  };

  componentDidMount = () => {
    Axios.get("https://dashify.biz/account/get-all-user")
      .then(res => {
        this.setState({
          all_users: res.data.user_info
        });
        console.log("all users", res.data.user_info);
      })
      .catch(res => {
        console.log("error in loading all users");
      });
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
      Company_name: this.state.bname,
      Country: this.state.country,
      Phone: this.state.phone,
      Zip: "123"
    };

    await this.errorValue(data);

    if (this.state.any_error == false && this.state.terms_condition == true) {
      this.setState({ loading: true });
      Axios.post("https://dashify.biz/account/register", data)
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
            alert("something went wrong");
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
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == "confirm_password") {
      this.is_password_match(event.target.value);
    }
    if (event.target.name == "username") {
      this.is_username_present(event.target.value);
    }
  };

  errorValue = data => {
    let {
      username_error,
      fname_error,
      lname_error,
      bname_error,
      country_error,
      password_error,
      phone_error,
      confirm_password_error
    } = this.state;

    this.setState({
      username_error: "",
      fname_error: "",
      lname_error: "",
      bname_error: "",
      country_error: "",
      password_error: "",
      phone_error: "",
      confirm_password_error: "",
      any_error: false
    });

    let any_error = false;

    if (data.first_name == "") {
      this.setState({ fname_error: "*Enter your first name" });
      any_error = true;
    }
    if (data.last_name == "") {
      this.setState({ lname_error: "*Enter your last name" });
      any_error = true;
    }
    if (data.username == "") {
      this.setState({ username_error: "*Enter username" });
      any_error = true;
    }
    if (data.Company_name == "") {
      this.setState({ bname_error: "*Enter your Company name" });
      any_error = true;
    }
    if (data.Country == "") {
      this.setState({ city_error: "*Enter your City" });
      any_error = true;
    }
    if (data.Phone == "") {
      this.setState({ state_error: "*Enter your State" });
      any_error = true;
    }
    if (data.password == "") {
      this.setState({ password_error: "*password can not be empty" });
      any_error = true;
    }
    if (data.password != this.state.confirm_password) {
      this.setState({ confirm_password_error: "*Not matched" });
      any_error = true;
    }
    this.setState({ any_error });
  };

  is_password_match = data => {
    let { password } = this.state;
    this.setState({ confirm_password_error: "" });

    if (password != data) {
      this.setState({ confirm_password_error: "*Not matched" });
    }
  };

  is_username_present = data => {
    this.setState({ username_error: "" });
    if (this.state.all_users.includes(data)) {
      this.setState({ username_error: "*Email already registered" });
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
                          Email
                        </label>
                        <input
                          value={this.state.username}
                          name="username"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.username_error}
                        </div>
                      </Col>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterPasswordEx4"
                          className="grey-text"
                        >
                          Phone
                        </label>
                        <input
                          value={this.state.phone}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Phone"
                          required
                        />
                        {/* <div className="invalid-feedback">
                          Please provide a valid zip.
              </div> */}

                        <div style={{ color: "red" }}>
                          {this.state.phone_error}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterConfirmEx3"
                          className="grey-text"
                        >
                          Company Name
                        </label>
                        <input
                          value={this.state.bname}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="bname"
                          placeholder="Company Name"
                        />
                        <div style={{ color: "red" }}>
                          {this.state.bname_error}
                        </div>
                      </Col>
                      <Col md="6" className="mb-3">
                        <label className="grey-text">Country</label>
                        <input
                          value={this.state.country}
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          name="country"
                          placeholder="Country"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.country_error}
                        </div>
                      </Col>
                    </Row>
                    <Row>
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

                      <Col md="6" className="mb-3">
                        <label
                          htmlFor="defaultFormRegisterPasswordEx4"
                          className="grey-text"
                        >
                          Confirm password
                        </label>
                        <input
                          value={this.state.confirm_password}
                          onChange={this.changeHandler}
                          type="password"
                          className="form-control"
                          name="confirm_password"
                          placeholder="Confirm password"
                          required
                        />
                        {/* <div className="invalid-feedback">
                          Please provide a valid zip.
              </div> */}

                        <div style={{ color: "red" }}>
                          {this.state.confirm_password_error}
                        </div>
                      </Col>
                    </Row>

                    <div className="checkbox-text">
                      <input
                        type="checkbox"
                        onClick={() =>
                          this.setState({
                            terms_condition: !this.state.terms_condition
                          })
                        }
                      />
                      <span></span> Accept terms and conditions {/* </label> */}
                    </div>

                    <div className="col-btn backbox">
                      <Row>
                        <Col md={6}>
                          <Link to="/Login">
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
