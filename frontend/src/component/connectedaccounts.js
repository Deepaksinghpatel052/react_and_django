import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class ConnectedAccounts extends Component {
  state = {
    loading: false,
    isUrl: false,

    all_pages: []
  };

  componentDidMount = () => {
    const fb_accessToken = localStorage.getItem("fb_token");

    Axios.get(
      "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
        fb_accessToken
    ).then(res => {
      console.log("facebook response", res.data.data);
      this.setState({ all_pages: res.data.data });
    });
  };

  onSubmit = index => e => {
    e.preventDefault();
    this.setState({ loading: true });

    const fb_data = JSON.parse(localStorage.getItem("fb_data"));

    const data = {
      location_id: fb_data.location_id,
      Platform: "Facebook",
      Token: localStorage.getItem("fb_token"),
      Username: fb_data.Username,
      Email: fb_data.Email,
      Password: "",
      Connect_status: "Connect",
      Other_info: this.state.all_pages[index].id
    };

    Axios.post(
      "https://dashify.biz/social-platforms/add-account",
      data,
      DjangoConfig
    )
      .then(resp => {
        console.log("facebook page response", resp);
        // this.setState({
        //   fbIsLoggedIn: true,

        //   fbName: response.name,

        //   fbToken: response.accessToken,
        //   fbId: resp.data.data.conect_to_location_id
        // });
        this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ loading: false });
      });
  };

  render() {
    var link;
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/locations/" +
            localStorage.getItem("locationId") +
            this.props.location.state.redirect_to
          }
        />
      );
    }

    const allPages = this.state.all_pages.map((p, i) => {
      return (
        <form onSubmit={this.onSubmit(i)}>
          <div className="listdata" key={p.id}>
            <div className="row d-flex">
              <div className="col-md-3">
                <div className="authordata ">
                  <div className="authordatatext">
                    <h3>{p.name}</h3>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center address">
                  <h4>{p.category}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center phonenumber">
                  {p.category_list.map(data => (
                    <h4>{data.name}</h4>
                  ))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="action">
                  <button type="submit">connect</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    });

    return (
      <div>
        <div className="rightside_title">
          <div className="foursquer-logo">
            <img src={require("../images/facebook.png")} alt="Facebook" />
          </div>
          <h1>Facebook Pages</h1>
        </div>
        <div className="tablediv">
          <div className="border-bottom">
            <div className="dataview nametop">
              <div className="titledivb">
                <div className="row">
                  <div className="col-md-3">
                    <div className="company-name text-left">Page Name</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Category</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">
                      Category list
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.all_pages.length == 0 ? (
            <Spinner />
          ) : (
            <div>{allPages}</div>
          )}
        </div>
      </div>
    );
  }
}

export default ConnectedAccounts;
