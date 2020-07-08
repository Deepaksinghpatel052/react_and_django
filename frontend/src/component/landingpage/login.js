import React from "react";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
// import setAuthToken from '../utils/setAuthToken';

class Login extends React.Component {
  state = {
    Email: "",
    Password: "",
    isSuccessLogin: false,
    isAlreadyLogin: false,
    RememberMe: false,
    Email_error: "",
    Password_error: "",
    wrong: "",
    isPasswordShown: false,
    loading: false
  };

  componentDidMount = async () => {
    await this.isAlreadyLogin();

    console.log("props and param", this.props.match.params.param1);

    if (this.props.match.params.param1) {
      // console.log("ins");
      var { param1, param2 } = this.props.match.params;
      const data = {
        pera_1: param1,
        pera_2: param2
      };

      Axios.post(
        "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/account-activate",
        data
      )
        .then(res => {
          console.log("account activation", res);
          alert(res.data.messgae);

          // setAuthToken(res.data.Token)

          // this.setState({isSuccessLogin:true})
        })
        .catch(res => console.log("not active"));
    }
  };

  isAlreadyLogin = () => {
    console.log(
      "remember_me and user_token",
      localStorage.getItem("RememberMe") == "true",
      localStorage.getItem("UserToken") != null
    );
    localStorage.getItem("UserToken") != null &&
    localStorage.getItem("RememberMe") == "true"
      ? this.setState({ isAlreadyLogin: true })
      : this.setState({ isAlreadyLogin: false });
  };

  submitHandler = event => {
    event.preventDefault();
    // event.target.className += ' was-validated';

    // if (
    //   (localStorage.getItem("username")==this.state.Email)
    //    &&
    //     (localStorage.getItem("password")==this.state.Password)
    //     &&
    //     (this.state.Email!=''))
    //     {
    //   this.setState({isSuccessLogin:true})
    // }
    this.setState({ Email_error: "", Password_error: "", wrong: "" });

    var cal = false;
    if (this.state.Email == "" && this.state.Password == "") {
      this.setState({
        Email_error: "Enter Email",
        Password_error: "Enter Password"
      });
    } else if (this.state.Email == "") {
      this.setState({ Email_error: "Enter Email" });
    } else if (this.state.Password == "") {
      this.setState({ Password_error: "Enter Password" });
    } else {
      cal = true;
    }

    if (cal) {
      const data = {
        username: this.state.Email,
        password: this.state.Password
      };

      this.setState({ loading: true });

      Axios.post(
        "https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/login",
        data
      )
        .then(async res => {
          console.log(res);
          await localStorage.setItem("RememberMe", this.state.RememberMe);
          await localStorage.setItem("UserToken", res.data.Token);
          await localStorage.setItem("UserId", res.data.user_info[0].id);
          await localStorage.setItem(
            "UserName",
            res.data.user_info[0].first_name +
              " " +
              res.data.user_info[0].last_name
          );
          // setAuthToken(res.data.Token)
          await this.setState({ isSuccessLogin: true, loading: false });
        })
        .catch(res =>
          this.setState({ wrong: "Wrong credentials", loading: false })
        );
    }
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  togglePasswordVisibilty = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render = () => {
    const { isPasswordShown } = this.state;
    console.log("props", this.props.match.params);

    var { param1, param2 } = this.props.match.params;
    console.log("param", param2);

    if (this.state.isSuccessLogin) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.isAlreadyLogin) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <div className="login-logo">
          <div className="container">
            <Row>
              <Col md={6}>
                <div className="login-md-size">
                  <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                  >
                    <a href="/">
                      <img src={Logo} className="Alogo" alt="logo" />
                    </a>
                    <h5 className="signin-heading">Sign In</h5>

                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : (
                      <div style={{ color: "red" }}>{this.state.wrong}</div>
                    )}

                    <Row>
                      <Col md="12" className="mb-3">
                        <label className="grey-text">
                          <h5>Email</h5>{" "}
                        </label>
                        <input
                          value={this.state.Email}
                          name="Email"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="email@email.com"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.Email_error}
                        </div>
                      </Col>
                      <Col md="12" className="mb-3">
                        <label className="grey-text">
                          <h5>Password</h5>{" "}
                        </label>
                        <input
                          value={this.state.Password}
                          name="Password"
                          onChange={this.changeHandler}
                          type={isPasswordShown ? "text" : "Password"}
                          className="form-control"
                          placeholder="* * * * * * * * * "
                          required
                        />
                        <i
                          className={`fa ${
                            isPasswordShown ? "fa-eye-slash" : "fa-eye "
                          } password-icon`}
                          onClick={this.togglePasswordVisibilty}
                        ></i>
                        <div style={{ color: "red" }}>
                          {this.state.Password_error}
                        </div>
                      </Col>
                    </Row>
                    <div className="checkbox-text">
                      <ul>
                        <li>
                          <label>
                            <input
                              type="checkbox"
                              onClick={() =>
                                this.setState({
                                  RememberMe: !this.state.RememberMe
                                })
                              }
                            />
                            <span></span> Remember Me{" "}
                          </label>
                        </li>
                        <li className="for-color">
                          <Link to="Forgot">Forgot Password ? </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-btn">
                      <Row>
                        <Col md={12}>
                          <button type="submit" className="sign-btn">
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </div>
                    <div className="signin-text">
                      <p>
                        Don't have an account?<Link to="signup"> Register</Link>{" "}
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
              <a href="#"> Deshify, All Rights Reserved</a>
            </container>
          </div>
        </div>
      </div>
    );
  };
}

export default Login;
