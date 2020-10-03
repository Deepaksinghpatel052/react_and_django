import React, { Component } from "react";
import "./Flaticon.css";
import "./App.css";

import MainApp from "./component/main";

import InstagramLogin from "./component/instagramlogin";
import YelpLogin from "./component/yelplogin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/landingpage/home";
import Login from "./component/landingpage/login";
import Signup from "./component/landingpage/signup";
import Forgot from "./component/landingpage/forgot.js";
import FourSquareLogin from "./component/foursquarelogin";
import AppleLogin from "./component/applelogin";
import CitySearchLogin from "./component/citysearchlogin";
import HereLogin from "./component/herelogin";
import ZillowLogin from "./component/zillowlogin";
import TomtomLogin from "./component/tomtomlogin";
import ZomatoLogin from "./component/zomatologin";
import AvvoLogin from "./component/avvologin";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import PageNotFound from "./component/page-not-found";

import EmailConfirmation from "./component/landingpage/email-confirmation";
import PasswordReset from "./component/landingpage/password-reset";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <SideBar/> */}

        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login} />

            <Route
              path="/Login/:param1/:param2"
              render={props => <Login {...props} />}
            />
            <Route
              path="/password-reset/:param1/:param2"
              render={props => <PasswordReset {...props} />}
            />

            <Route path="/Signup" exact component={Signup} />
            <Route
              path="/email-confirmation/:username"
              exact
              component={EmailConfirmation}
            />
            <Route path="/forgot" exact component={Forgot} />
            <Route exact path="/instagramlogin" component={InstagramLogin} />
            <Route exact path="/yelplogin" component={YelpLogin} />
            <Route exact path="/foursquarelogin" component={FourSquareLogin} />
            <Route exact path="/applelogin" component={AppleLogin} />
            <Route exact path="/citysearchlogin" component={CitySearchLogin} />
            <Route exact path="/herelogin" component={HereLogin} />
            <Route exact path="/zillowlogin" component={ZillowLogin} />
            <Route exact path="/tomtomlogin" component={TomtomLogin} />
            <Route exact path="/zomatologin" component={ZomatoLogin} />
            <Route
              path="/avvologin"
              render={props => <AvvoLogin {...props} />}
            />

            <Route exact path="/linkedin" component={LinkedInPopUp} />

            <Route exact path="/dashboard" component={MainApp} />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
