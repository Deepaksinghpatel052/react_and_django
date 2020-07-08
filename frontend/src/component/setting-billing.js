
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';




export default class SettingBilling extends Component {

    render() {




        return (
            <div>

                {/* <div className="content-page"> */}

                <div className="main_content">
                    <div className="rightside_title">
                        <h1>Profile Settings</h1>
                    </div>
                    <div className="tablediv mb-30">


                    <div className="col-md-3">
                            <div className="leftmenu">
                                <ul>
                                    <li><NavLink to="/setting-main/setting-accounts">Accounts</NavLink></li>
                                    <li><NavLink to="/a">People</NavLink></li>
                                    <li><NavLink to="/b">Notification Setting</NavLink></li>
                                    <li><NavLink exact to="/setting-main/setting-billing" className="active">Billing</NavLink></li>
                                    <li><NavLink to="/c">Integrations</NavLink></li>
                                    <li><NavLink to="/d">Agency Settings</NavLink></li>


                                </ul>

                            </div>

                        </div>
                        
                        <div className="col-md-6">
                            <div className="blue_box">
                                <div className="premium">
                                    <ul>
                                        <li>Subscription</li>
                                        <li>Premium Monthly</li>
                                    </ul>
                                    <a className="active_btn" href="#">Active</a>

                                </div>

                                <div className="perloction">
                                    <div className="col-md-4">
                                        <div className="white_bg">
                                            <div className="month">
                                                $8 <span>/Month</span>

                                            </div>
                                            <p>Per Location</p>

                                            <p>Billed Monthly</p>

                                        </div>

                                    </div>
                                    <div className="start">
                                        <p>
                                            Start Date : 30 Jan 2020<br></br>
Valid Till : 30 Jan 2021<br></br>
Min. Commitemnt : 60 Location /Monthy<br></br>

Currently added : 637 Locations<br></br>
Next Billing amount : $5103, 94 On 29 Feb 2020

</p>

                                    </div>

                                </div>



                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="payment_box">
                                <div className="box_payment">
                                    <div className="card_box">
                                        <img src={require('../images/master-card.jpg')} />


                                    </div>
                                    <div className="keybox">
                                        <input type="password" placeholder="**** **** **** 7056" />
                                        <input type="text" placeholder="04/21" />


                                    </div>

                                </div>
                            </div>

                            <div className="paypal_box">
                                <div className="paypal_icon">
                                    <img src={require('../images/paypal.jpg')} />

                                </div>
                                <div className="paypal_text">
                                    <input type="text" placeholder="recepegncashan@outlook.com" />

                                </div>

                            </div>

                            <div className="add_payment">
                                <a href="#">Add a payment method</a>

                            </div>

                        </div>

                    </div>




                </div>


                {/* </div> */}




            </div>);
    }

}