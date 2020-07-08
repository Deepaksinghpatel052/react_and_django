import React from 'react';
import Logo from './img/Logo.png';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';



class PasswordReset extends React.Component {
  state = {
    
    Password: '',
    ConfirmPassword:'',
    isSuccessLogin:false,
    wrong:'',
    isPasswordShown: false

  };


 
  submitHandler = event => {
    event.preventDefault();
    // event.target.className += ' was-validated';
    

   
    var cal=false;
    if(this.state.ConfirmPassword=='' && this.state.Password==''){
      this.setState({wrong:"Enter password and confirm Password both"});
    }
    else if(this.state.ConfirmPassword==''){
      this.setState({wrong:"Enter Confirm Password"});
    }
    else if(this.state.Password==''){
      this.setState({wrong:"Enter Password"});
    }
    else if(this.state.Password==this.state.ConfirmPassword){
      
      cal=true;
    }
    else{
        this.setState({wrong:" Password Mismatch"});
    }

    if(cal){

    var {param1,param2}=this.props.match.params;
    const data={
      "pera_1":param1,
      "pera_2":param2,
      "password":this.state.Password
    }

    
    Axios.post('https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/reset-password',data).then(
    (res)=>{
      console.log(res);
      
    }
    )
  .catch((res)=>console.log("not reset password")
  )

    
}
   
    

    
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  togglePasswordVisibilty = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown })
  }

  render = () => {
      console.log(this.state.ConfirmPassword)
    const { isPasswordShown } = this.state;
    console.log(this.props.match.params);

    var {param1,param2}=this.props.match.params;
    console.log(param2);
    

console.log(this.state.wrong);
    
    if(this.state.isSuccessLogin){
      return <Redirect to="/dashboard"/>
    }
    return (
      <div>
       

        <div className="login-logo" >
          <div className="container">
            <Row>
              <Col md={6}>
                <div className="login-md-size">

                  <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                  >
                    <a href="/"><img src={Logo} className="Alogo" alt="logo" /></a>
                    <h5 className="signin-heading">Set Up Your New Password</h5>
                    <Row>
                      <Col md="12" className="mb-3">
                        <label
                          className="grey-text"
                        ><h5>
                            Please Enter your New Password
             </h5> </label>
                        <input
                          value={this.state.Password}
                          name="Password"
                          onChange={this.changeHandler}
                          type="password"

                          className="form-control"
                          placeholder="* * * * * *"
                          required
                        />

                      </Col>
                      <Col md="12" className="mb-3">
                        <label
                          className="grey-text"
                        ><h5>
                            Re-enter your Password
             </h5> </label>
                        <input
                          value={this.state.ConfirmPassword}
                          name="ConfirmPassword"
                          onChange={this.changeHandler}
                          type={(isPasswordShown) ? "text" : "Password"}

                          className="form-control"
                          placeholder="* * * * * * * * * "
                          required

                        />
                        <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye "} password-icon`}
                          onClick={this.togglePasswordVisibilty} ></i>

                      </Col>
                    </Row>
                    
                    <div className="col-btn">

                      <Row>
                        <Col md={12} >
                          
                            <button type="submit" className="sign-btn">
                              Change Password
          </button>
                         </Col>

                      </Row>
                    </div>
                   
                    
                    
                    <div style={{color:"red"}}>
                      *{this.state.wrong}
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

export default PasswordReset;
