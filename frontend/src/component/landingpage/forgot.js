import React from 'react';
import Logo from './img/Logo.png';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';


class Login extends React.Component {
    state = {
        Email: '',
        error:""

    };

    submitHandler = event => {
        event.preventDefault();
        // event.target.className += ' was-validated';
        const data={
            "email_id":this.state.Email
        }
        if(this.state.Email){
        Axios.post('https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/get-link-of-forget-password',data).then(
    (res)=>{
      console.log(res);
      this.setState({error:""})
      alert("Reset Password link sent to your Mail")
    //   alert(res.data.messgae)
      
    }
        
     
      
    
    )
  .catch((res)=>{console.log("not active")
this.setState({error:"* Not registered email"})
}
  )
        }
        else{
          this.setState({error:"Email can't Be Empty"})
        }
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render = () => {
        console.log(this.state.Email);

        return (
            <div>

                <div className="login-logo">
                    <div className="container">
                        <Row>
                            <Col md={6}>
                                <div className="forgot-md-size">

                                    <form
                                        className="needs-validation"
                                        onSubmit={this.submitHandler}
                                        noValidate
                                    >
                                        <img src={Logo} className="Alogo" alt="logo" />
                                        <h5 className="forgot-heading"> Forgot your Password?</h5>
                                        <Row>
                                            <Col md="12" className="mb-3">
                                                <label
                                                    className="grey-text"
                                                ><h5>
                                                        Email
             </h5> </label>
                                                <input
                                                    value={this.state.Email}
                                                    name="Email"
                                                    onChange={this.changeHandler}
                                                    type="text"

                                                    className="form-control"
                                                    placeholder="email@email.com"
                                                    required
                                                />

                                            </Col>


                                        </Row>
                                        <div style={{color:'red'}}>{this.state.error}</div>
                                        <div className="col-btn">
                                            <Row>
                                                <Col md={12} >
                                                    
                                                        <button type="submit" className="sign-btn">
                                                            Reset Password
                                                        </button>
                                                    </Col>
                                            </Row>
                                        </div>
                                        <div className="forgot-text">
                                            <p>Don't have an account?<Link to="signup"> Register</Link> </p>
                                        </div>
       
                                    </form>
                                </div>
                            </Col>
                            <Col md={6}></Col>
                        </Row>
                    </div>
                </div>

                <div className="signin-footer1">
          <div className=" signin-footer-icon1">
            <Link to="" className="fb-ic2 ">
              <i className="fa fa-facebook-f" aria-hidden="true"> </i>
            </Link>
            <Link to="" className="tw-ic2">
              <i className="fa fa-twitter" aria-hidden="true"> </i>
            </Link>
            <Link to="" className="yt-ic2">
              <i className="fa fa-youtube-play" aria-hidden="true"></i>

            </Link>
            <Link to="" className="ld-ic2">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
          </div>





          <div className="signin-footer-features">
            <ul>
              <li><Link to="#">Coporate</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">Careers</Link> </li>
              <li><Link to="#">Term and Conditions</Link></li>
              <li><Link to="#">Accessibility </Link></li>
              <li><Link to="#">Privacy policy</Link></li>
              <li><Link to="#">Sitemap</Link></li>
            </ul>
          </div>

          <div className="signin-footer-copyright-link-2">
            <container fluid className="sign-date">
              &copy; {new Date().getFullYear()}<a href="#"> Deshify, All Rights Reserved</a>

            </container>
          </div>
        </div>

            </div>

        );
    }
}

export default Login;


