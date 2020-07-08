
import React, { Component } from 'react';



export default class CampaignPart2 extends Component {

    render() {




        return (<div>


            <div className="main_content">
                <div className="rightside_title">
                    <h1>Enter campaign details</h1>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="step2">
                            <ul>
                                <li>
                                    <a href="#">Step 02</a>
                                </li>

                            </ul>
                            <div className="ratingemail">
                                <h2>Ratings Email And SMS 
                                <a href="#" className="close-section"><i className="zmdi zmdi-close"></i>Close Section</a>
                                </h2>

                            </div>

                            <div className="formbox">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>From Email</label>
                                            <input type="text" className="form-control" placeholder="Campaign Name" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Customer first name</label>
                                            <input type="text" className="form-control" placeholder="Me. Devid" />
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Customer last name</label>
                                            <input type="text" className="form-control" placeholder="Me. Devid" />
                                        </div>

                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Customer Email/Phone number</label>
                                            <input type="text" className="form-control" placeholder="customerone12@gmail.com" />
                                        </div>

                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <button className="add_btn">
                                                <img src={require('../images/plus.png')} /> Add another Customer

</button>

                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>

                        <div className="step2 topspace">
                            <div className="formbox">
                                <div className="d-flex">
                                    <div className="csv">
                                        <img src={require('../images/csv.png')} alt="csv" />
                                    </div>
                                    <div className="csv-text">
                                        <h3>Uploading Your CSV containing Customer Email/ Phone Numbers</h3>

                                        <button className="download_btn">
                                            Download Simple

</button>
                                        <div className="uploadbox">
                                            <button className="upload_btn">Upload CSV</button>
                                            <input type="file" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="step2 mt-30">
                        <div className="formbox">
                        <div className="row">
                            <div className="col-md-6">
                            <button className="gen_btn">
                        Create a new review generation

                        </button>
                            </div>
                            <div className="col-md-6">
                        <button className="lunch_btn">Launch Campaign</button>
</div>
                        </div>

                        </div>

                        </div>

                    </div>
                </div>

            </div>



        </div>);
    }

}