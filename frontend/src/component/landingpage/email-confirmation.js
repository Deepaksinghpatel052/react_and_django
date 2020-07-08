import React from 'react';
import Logo from './img/Logo.png';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';


class EmailConfirmation extends React.Component {
  constructor(props){
    super(props);
  }

  submitHandler(e){
    // e.preventDefault()
    var {username}=this.props.match.params;
    const data={
      "email_id":username
    }

    Axios.post('https://cors-anywhere.herokuapp.com/http://203.190.153.20:8000/account/send-varification-link',data).then(
      (res)=>{
        console.log(res);
        
        
  
      }
      )
    .catch((res)=>console.log("not send")
    )
  }
    

    render = () => {
      console.log(this.props.match.params)
        return (
            <div>

                <div className="login-logo">
                    <div className="container">
                        <Row>
                            <Col md={6}>
                                <div className="forgot-md-size">

                                    <form
                                        className="needs-validation"
                                        onSubmit={this.submitHandler()}
                                        noValidate
                                    >
                                        <img src={Logo} className="Alogo" alt="logo" />
                                        <h5 className="forgot-heading" style={{"marginTop":"5px"}}> You've got mail!</h5>
                                        <p class="colorgray">An email verification link has been sent to your inbox</p>
                                        <p class="colorgray">didn't get link</p><button type="submit"  >Send Again..</button>
                                        <div className="text-center email-img">
                                        <img src={require('./img/imaga-dropbox.png')} alt="imaga-dropbox.png"/>

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
              <i class="fa fa-youtube-play" aria-hidden="true"></i>

            </Link>
            <Link to="" className="ld-ic2">
              <i class="fa fa-linkedin" aria-hidden="true"></i>
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

export default EmailConfirmation;


