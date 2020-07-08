
import React, { Component } from 'react';




export default class PromotioalGenerationStats extends Component {

    render() {




        return (
            <div>

                {/* <div className="content-page"> */}

                <div className="main_content">
                <div className="rightside_title">
                        <h1 className="reviewboxtitle">Promotional Generation Stats


                        <div className="camgianbox">
                                <a href="#" className="camaign"><i className="zmdi zmdi-plus"></i> Create new campaign</a>
                                <div className="dropdown">
                                        <a href="#" className="last_btn dropdown-toggle" data-toggle="dropdown">
                                            <i className="zmdi zmdi-calendar"></i>
                                     This Week
                                     <span className="zmdi zmdi-caret-down"></span></a>
                                        <div className="dropdown-menu">
                                            <ul>
                                                <li><a href="#">Last Week</a></li>
                                                


                                            </ul>
                                        </div>


                                    </div>
                                    <a href="#" className="settings"><i className="zmdi zmdi-settings"></i></a>
                                    </div>

                        </h1>
                    </div>

                    <div className="mt-30">
                        
<div className="row">
    <div className="col-md-8">
    <div className="viewallreview">
        <div className="border-bottom d-online-flex">
    <ul className="review_weekly">
  <li  className="active"><a href="#">Daily</a></li>
  <li ><a href="#">Weekly</a></li>
  <li><a href="#">Monthly</a></li>
  <li><a href="#">Yearly</a></li>
 
</ul>
<div className="onlineshow">
    <span>
<input type="checkbox" id="online" name="fruit-1" value="online" defaultChecked/>
  <label htmlFor="online">Online</label>
  </span>
  <span>
  <input type="checkbox" id="store" name="fruit-1" value="store"/>
  <label htmlFor="store">store</label>
  </span>
</div>
</div>

<div className="line-chart">
 <img src={require('../images/chart-line.jpg')} alt="" />   
</div>

    </div>
</div>

<div className="col-md-4">
<div className="viewallreview traffic-chartbox">
<h3>Traffic Chart</h3>
<div className="text-center mt-30">

<img src={require('../images/pie-chart-2.jpg')}/>
</div>

<div className="stats-box">
<div className="countboxpie">

<div className="col-md-4">
<div className="facpie facebook_div">
<h2>63%</h2>
<span>Facebook</span>

</div>

</div>
<div className="col-md-4">
<div className="facpie whatsaapbox">
<h2>15%</h2>
<span>Whats app</span>

</div>

</div>

<div className="col-md-4">
<div className="facpie sitebox">
<h2>22%</h2>
<span>Others site</span>

</div>

</div>

 
</div>

</div>
    
</div>

</div>
                        </div>
                   

                    </div>


                   
                    <div className="mt-30">
                        <div className="analytics-whice">
                            <div className="box-space ">
                                <h2 className="analytics_btnx">camaign list</h2>

                            </div>

                            <div className="total_ant">
                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="totl-listing">
                                            <div className="icon">
                                                <img src={require('../images/c-1.jpg')} />
                                            </div>
                                            <div className="icon-text">
                                                <h2>31</h2>
                                                <h3>Total camaign</h3>

                                            </div>

                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                        <div className="totl-listing">
                                            <div className="icon">
                                                <img src={require('../images/c-2.jpg')} />
                                            </div>
                                            <div className="icon-text">
                                                <h2>4.01  <div className="dropdown parsent red">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">

                                                        0.52%
                                     <span className="zmdi zmdi-caret-down"></span></a>
                                                    <div className="dropdown-menu">
                                                        <ul>
                                                            <li>0.52%</li>
                                                            <li>0.52%</li>


                                                        </ul>
                                                    </div>


                                                </div>

                                                </h2>
                                                <h3>Overall Rating</h3>

                                            </div>

                                        </div>
                                    </div>



                                    <div className="col-md-3">
                                        <div className="totl-listing">
                                            <div className="icon">
                                                <img src={require('../images/c-3.jpg')} />
                                            </div>
                                            <div className="icon-text">
                                                <h2>679  <div className="dropdown parsent">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">

                                                        1.34%
                                     <span className="zmdi zmdi-caret-down"></span></a>
                                                    <div className="dropdown-menu">
                                                        <ul>
                                                            <li>170%</li>
                                                            <li>180%</li>


                                                        </ul>
                                                    </div>


                                                </div>

                                                </h2>
                                                <h3>Number of reviews</h3>

                                            </div>

                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                        <div className="totl-listing">
                                            <div className="icon">
                                                <img src={require('../images/c-4.jpg')} />
                                            </div>
                                            <div className="icon-text">
                                                <h2 className="bo25">25 <span><i className="zmdi zmdi-email"></i></span>25 <span><i className="zmdi zmdi-comment-more"></i></span></h2>
                                                <h3>Invites sent</h3>

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
