import React, { Component } from "react";
import Axios from "axios";

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <div className="foursquer-logo">
          <img
            src={require("../images/upset-emoji.png")}
            alt="Page Not Found"
          />
        </div>
        <div className="login_form text-center">
          <h1>
            404
            <br />
            Page not found
          </h1>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
