import React, { Component } from "react";

export default class PromotionalPostSorry extends Component {
  render() {
    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <div className="rightside_title">
            <h1>Review Generation Stats </h1>
          </div>
          <div className="mb-30">
            <div className="row">
              <div className="col-md-12">
                <div className="analytics-whice">
                  <div className="box-space ">
                    <h2 className="analytics_btnx">
                      Campaign list
                      <div className="camgianbox">
                        <a href="#" className="camaign">
                          <i className="zmdi zmdi-plus"></i> Create new campaign
                        </a>
                        <div className="dropdown">
                          <a
                            href="#"
                            className="last_btn dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <i className="zmdi zmdi-calendar"></i>
                            This Week
                            <span className="zmdi zmdi-caret-down"></span>
                          </a>
                          <div className="dropdown-menu">
                            <ul>
                              <li>Last Week</li>
                            </ul>
                          </div>
                        </div>
                        <a href="#" className="settings">
                          <i className="zmdi zmdi-settings"></i>
                        </a>
                      </div>
                    </h2>
                  </div>
                  <div className="promotional-box text-center selectedbx">
                    <img src={require("../images/campain-img.jpg")} />
                    <h2>Sorry!</h2>
                    <p>
                      No Review Campaigns Available for the selected time
                      Pericod
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <i className="zmdi zmdi-close"></i>
                </button>
                <h4 className="modal-title">Additional Promotional post</h4>
                <p>
                  Wite your post <span>100-150 Characters</span>
                </p>
              </div>
              <div className="modal-body" style={{ paddingTop: "0px" }}>
                <div className="form-group enterpost">
                  <textarea placeholder="Enter your post Content here..."></textarea>
                </div>

                <div className="makepost">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="addpost">
                        <h4>Make your post stand out with a pic</h4>
                        <div className="uploadimg">
                          <img
                            src={require("../images/upload-img.png")}
                            alt=""
                          />
                          <div className="attatchfile">
                            <a>
                              <i className="zmdi zmdi-image"></i> Attatch a
                              image
                            </a>
                            <input type="file" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="addacta">
                        <ul>
                          <li>
                            <a href="#" className="active">
                              <i className="zmdi zmdi-check-circle"></i> Add a
                              CTA
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="zmdi zmdi-check-circle"></i> Post an
                              event
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="zmdi zmdi-check-circle"></i> Make
                              this post a promotional
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="zmdi zmdi-check-circle"></i> Report
                              this post after expairy
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row top-15">
                    <div className="col-md-6">
                      <div className="savepost">
                        <a href="#">Save as Draft</a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="confirompost">
                        <a href="#">Confirm Post</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
