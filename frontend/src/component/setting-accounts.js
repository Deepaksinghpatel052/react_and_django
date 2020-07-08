
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';




export default class SettingAccounts extends Component {

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
                                    <li><NavLink to="/setting-main/setting-accounts"  className="active">Accounts</NavLink></li>
                                    <li><NavLink to="/a">People</NavLink></li>
                                    <li><NavLink to="/b">Notification Setting</NavLink></li>
                                    <li><NavLink exact to="/setting-main/setting-billing" >Billing</NavLink></li>
                                    <li><NavLink to="/c">Integrations</NavLink></li>
                                    <li><NavLink to="/d">Agency Settings</NavLink></li>


                                </ul>

                            </div>

                        </div>
                      
                        

                        <div className="col-md-9">
                            <div className="viewallreview profile-setting">
                        <ul className="nav nav-tabs nav-tabs-dropdown" role="tablist">
  <li role="presentation" className="active"><a href="#myprofile" aria-controls="myprofile" role="tab" data-toggle="tab">My Profile</a></li>
  <li role="presentation"><a href="#companyprofile" aria-controls="companyprofile" role="tab" data-toggle="tab">Company Profile</a></li>
  
</ul>
<div className="tab-content">
<div role="tabpanel" className="tab-pane active" id="myprofile">
<div className="basicinfo">
     <h4>Basic Info</h4>

     <div className="profilebox">
<div className="profile-icon">
<img src={require('../images/profile-icon.jpg')}/>

</div>

     </div>

     <div className="profile-text">
    
<h5>Abdul Rahman</h5>
<div className="profile-textbox">
<div className="emailbox">
    Email:
</div>
<div className="text-box">
info@oasismedia.co

</div>

</div>

<div className="profile-textbox">
<div className="emailbox">
   Role:
</div>
<div className="text-box">
Admin

</div>

</div>

<div className="profile-textbox">
<div className="emailbox">
   Password:
</div>
<div className="text-box">
<a href="#">Change</a>

</div>

</div>

   

     </div>

      </div>

</div>
<div role="tabpanel" className="tab-pane" id="companyprofile">
<div className="basicinfo">
     <h4>Basic Info</h4>

     <div className="profilebox">
<div className="profile-icon">
<img src={require('../images/profile-icon.jpg')}/>

</div>

     </div>

     <div className="profile-text">
    
<h5>Abdul Rahman</h5>
<div className="profile-textbox">
<div className="emailbox">
    Email:
</div>
<div className="text-box">
info@oasismedia.co

</div>

</div>

<div className="profile-textbox">
<div className="emailbox">
   Support email:
</div>
<div className="text-box">
info@oasismedia.co

</div>

</div>



   

     </div>

      </div>

</div>

</div>
</div>
                        </div>

                    </div>




                </div>


                {/* </div> */}




            </div>);
    }

}