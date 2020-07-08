
import React, { Component } from 'react';
import { HashRouter, Route, NavLink  } from 'react-router-dom';

import SettingBilling from './setting-billing';
import SettingAccounts from './setting-accounts';




export default class SettingMain extends Component {

    render() {




        return (
            
               

             

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
                                    <li><NavLink  to="/setting-main/setting-billing" >Billing</NavLink></li>
                                    <li><NavLink to="/c">Integrations</NavLink></li>
                                    <li><NavLink to="/d">Agency Settings</NavLink></li>


                                </ul>

                            </div>

                        </div>
                       
                        <div className="col-md-9">

                        <div className="content">
            
            
           
            
            
             
          </div>
                            

                        </div>

                    </div>




                </div>


               



               
            );
    }

}