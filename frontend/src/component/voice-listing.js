
import React, { Component } from 'react';





export default class VoiceListing extends Component {

    render() {




        return (
            <div>

                
                {/* <div className="content-page"> */}
                    

                    <div className="main_content">
                        <div className="rightside_title">
                            <h1>Voice Listing</h1>
                        </div>
                        <div className="tablediv">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="listingdetails">
                                        <div className="d-flex">

                                            <div className="viewimg">
                                                <img src={require('../images/dol.jpg')} />

                                            </div>
                                            <div className="viewlisting-text">
                                                <h2>Dolce Vita Hair Salon</h2>
                                                <p>Orland best styles</p>
                                                <h3>ADDRESS AND CONTACT</h3>
                                                <p>801 N Orange AVE rando, FL 32801</p>
                                                <p>P:407-650-1811</p>
                                                <div className="edit-icon">
                                                    <span><i className="zmdi  zmdi-edit"></i></span>

                                                    <a href="#" className="showmore">Show More informations</a>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="business-box">
                                        <ul>
                                            <li>
                                                <img src={require('../images/b-1.jpg')} />
                                            </li>
                                            <li>
                                                <img src={require('../images/b-2.jpg')} />
                                            </li>
                                            <li>
                                                <img src={require('../images/b-3.jpg')} />
                                            </li>
                                            <li>
                                                <img src={require('../images/b-4.jpg')} />
                                            </li>
                                            <li>
                                                <img src={require('../images/b-5.jpg')} />
                                            </li>
                                        </ul>
                                        <div className="viewlisting-text">
                                            <h3>BUSINESS DISCRIPTION</h3>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className=" mt-30">

                          <div className="googleass">
                            <div className="google-asst">
                              <div className="google-icon">
                                  <img src={require('../images/google-assistant.png')}/>
                                  </div> 
                                  <div className="google-text">
                                    <h2>Google Assistant</h2>
                                    <a href="#" className="optimize">Optimize</a>

                                  </div>

                                </div> 


                                <div className="google-asst">
                              <div className="google-icon">
                                  <img src={require('../images/alexa.png')}/>
                                  </div> 
                                  <div className="google-text">
                                    <h2>Amazon Alexa</h2>
                                    <a href="#" className="progressb"><i className="zmdi zmdi-check-circle"></i>Optimization in progress</a>

                                  </div>

                                </div> 

                                <div className="google-asst">
                              <div className="google-icon">
                                  <img src={require('../images/siri.png')}/>
                                  </div> 
                                  <div className="google-text">
                                    <h2>Apple Siri</h2>
                                    <a href="#" className="progressb"><i className="zmdi zmdi-check-circle"></i>Optimization in progress</a>

                                  </div>

                                </div> 

                                <div className="google-asst">
                              <div className="google-icon">
                                  <img src={require('../images/cortana.png')}/>
                                  </div> 
                                  <div className="google-text">
                                    <h2>Microsoft Cortana</h2>
                                    <a href="#" className="progressb"><i className="zmdi zmdi-check-circle"></i>Optimization in progress</a>

                                  </div>

                                </div> 

                                <div className="google-asst">
                              <div className="google-icon">
                                  <img src={require('../images/bixby.png')}/>
                                  </div> 
                                  <div className="google-text">
                                    <h2>Samsung bixby</h2>
                                    <a href="#" className="progressb"><i className="zmdi zmdi-check-circle"></i>Optimization in progress</a>

                                  </div>

                                </div> 



                              
                              </div>  


                        </div>


                        <div className="update-account voices mt-30">
                            <div className="box-space">
                                <div className="row d-flex">
                                    <div className="col-md-8">
                                        <h2>Voice FAQs</h2>
                                        <p>Add FAQs that will help you to customize your location to appear in voice search</p>

                                    </div>
                                    <div className="col-md-4 text-right">
                                        <a href="#" className="add_faq">+ Add FAQs</a>
                                        <a href="#" className="wedgets">Install edgets</a>


                                    </div>


                                </div>
                            </div>


                            <div className=" connect-box">

                                <div className="conntend">
                                    <div className="row d-flex ">
                                        <div className="col-md-10">
                                            <div className="faq-title"><h4>Q : who is the best partener Near me ?</h4></div>
                                            <div className="faq-descrition">
                                                <p>A : Power Bar and Coffiee</p>
                                            </div>
                                        </div>



                                        <div className="col-md-2">
                                            <a href="#" className="delete"><i className="zmdi zmdi-delete"></i></a>
                                            <a href="#" className="edit"><i className="zmdi zmdi-edit"></i></a>

                                        </div>

                                    </div>
                                </div>

                                <div className="conntend">
                                    <div className="row d-flex ">
                                        <div className="col-md-10">
                                            <div className="faq-title"><h4>Q : who is the best partener Near me ?</h4></div>
                                            <div className="faq-descrition">
                                                <p>A : Power Bar and Coffiee</p>
                                            </div>
                                        </div>



                                        <div className="col-md-2">
                                            <a href="#" className="delete"><i className="zmdi zmdi-delete"></i></a>
                                            <a href="#" className="edit"><i className="zmdi zmdi-edit"></i></a>

                                        </div>

                                    </div>
                                </div>
                                <div className="conntend">
                                    <div className="row d-flex ">
                                        <div className="col-md-10">
                                            <div className="faq-title"><h4>Q : who is the best partener Near me ?</h4></div>
                                            <div className="faq-descrition">
                                                <p>A : Power Bar and Coffiee</p>
                                            </div>
                                        </div>



                                        <div className="col-md-2">
                                            <a href="#" className="delete"><i className="zmdi zmdi-delete"></i></a>
                                            <a href="#" className="edit"><i className="zmdi zmdi-edit"></i></a>

                                        </div>

                                    </div>
                                </div>
                                <div className="conntend">
                                    <div className="row d-flex ">
                                        <div className="col-md-10">
                                            <div className="faq-title"><h4>Q : who is the best partener Near me ?</h4></div>
                                            <div className="faq-descrition">
                                                <p>A : Power Bar and Coffiee</p>
                                            </div>
                                        </div>



                                        <div className="col-md-2">
                                            <a href="#" className="delete"><i className="zmdi zmdi-delete"></i></a>
                                            <a href="#" className="edit"><i className="zmdi zmdi-edit"></i></a>

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