import React, { Component } from "react";

import TodoApp from "./pagination";
import { Route, HashRouter, NavLink } from "react-router-dom";
import CampaignPart2 from "./campaignpart2";
import ReviewGenerationCampaign from "./review-generation-campaign";
import ReviewTracking from "./review-tracking";
import ViewAListing from "./view-listing";
import VoiceListing from "./voice-listing";

import ReviewAnalytics from "./review-analytics";
import Topbarmenu from "./topbarmenu";

import SettingMain from "./setting-main";
import SettingAccounts from "./setting-accounts";
import SettingBilling from "./setting-billing";
import SideBar from "./sidebar";
import PromotionalPost from "./promotional-post";
import PromotionalPostSorry from "./promotional-post-sorry";
import ViewLocations from "./view-locations";
import LocationManager from "./location-manager";
import ProfileAnalytics from "./profile-analytics";
import ViewListing from "./view-listing";
import Overview from "./overview";
import PromotioalGenerationStats from "./promotional-generation-stats";
import AddLocation from "./add-location";
// import ConnectedAccounts from "./connectedaccounts";

export default class MainApp extends Component {
  render() {
    console.log(localStorage.getItem("locationId"));

    return (
      <div>
        <Topbarmenu />
	<SideBar />
        <HashRouter>
          

          <div className="content-page">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="breadcrumb-menu">
                    <ul>
                      {/* <li>
                        <NavLink
                          to={"/pagination"}
                          className="underline-from-left"
                        >
                          Pagination
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/overview"
                          }
                          className="underline-from-left"
                        >
                          Overview
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/review-analytics"
                          }
                          className="underline-from-left"
                        >
                          Analytics
                        </NavLink>
                        <ul>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/profile-analytics"
                              }
                            >
                              Profile Analytics
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-analytics"
                              }
                            >
                              Review Analytics
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <NavLink
                          to="/location-manager"
                          className="underline-from-left"
                        >
                          Location Manager
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/review-tracking"
                          }
                          className="underline-from-left"
                        >
                          Review
                        </NavLink>
                        <ul>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-generation-campaign"
                              }
                            >
                              Generation
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-tracking"
                              }
                            >
                              Tracking
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/b">Wedgets</NavLink>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/view-listing"
                          }
                          className="underline-from-left"
                        >
                          Listing
                        </NavLink>
                        <ul>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/view-listing"
                              }
                            >
                              View Listing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/view-location"
                              }
                            >
                              View Location
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/voice-listing"
                              }
                            >
                              Voice Listing
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/promotional"
                          }
                          className="underline-from-left"
                        >
                          Promotional
                        </NavLink>

                        <ul>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/promotional"
                              }
                            >
                              Promotional Post
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/promotional-generation-stats"
                              }
                            >
                              Promotional Generation Stats
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              {/* <Route
                exact
                path="/pagination"
                render={props => <TodoApp {...props} />}
              /> */}
              <Route
                exact
                path="/locations/:locationId/overview"
                render={props => <Overview {...props} />}
              />
              <Route exact path="/campaignpart2" component={CampaignPart2} />
              <Route
                exact
                path="/locations/:locationId/review-generation-campaign"
                render={props => <ReviewGenerationCampaign {...props} />}
              />
              <Route
                exact
                path="/locations/:locationId/review-tracking"
                render={props => <ReviewTracking {...props} />}
              />
              <Route exact path="/" component={LocationManager} />
              <Route
                exact
                path="/locations/:locationId/view-listing"
                render={props => <ViewListing {...props} />}
              />
              <Route
                exact
                path="/locations/:locationId/voice-listing"
                render={props => <VoiceListing {...props} />}
              />
              <Route
                exact
                path="/locations/:locationId/view-location"
                render={props => <ViewLocations {...props} />}
              />
              <Route
                exact
                path="/location-manager"
                component={LocationManager}
              />

              <Route
                exact
                path="/locations/:locationId/review-analytics"
                render={props => <ReviewAnalytics {...props} />}
              />
              <Route
                exact
                path="/locations/:locationId/profile-analytics"
                render={props => <ProfileAnalytics {...props} />}
              />

              <Route
                exact
                path="/locations/:locationId/promotional"
                render={props => <PromotionalPost {...props} />}
              />
              <Route
                exact
                path="/promotional-sorry"
                component={PromotionalPostSorry}
              />
              <Route
                exact
                path="/locations/:locationId/promotional-generation-stats"
                render={props => <PromotioalGenerationStats {...props} />}
              />
              <Route exact path="/add-location" component={AddLocation} />

              <Route exact path="/setting-main" component={SettingMain} />
              <Route
                path="/setting-main/setting-accounts"
                component={SettingAccounts}
              />
              <Route
                exact
                path="/setting-main/setting-billing"
                component={SettingBilling}
              />
             {/* <Route path="/connectedaccounts" component={ConnectedAccounts} /> */}
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
