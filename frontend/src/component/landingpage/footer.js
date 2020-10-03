import React from "react";
import { Link } from 'react-router-dom';




const Footer = () => {
  return (

    

    <div className=" footer-color">

      <div className="container">
        <div className="text-center logo-new">
          <Link to="/"> < img src={require('./img/logo-white.png')} /></Link>

        </div>
        <div className="footer-icon">
          <ul>
            < li><Link to="" className="fb-ic " >
              <i className="fa fa-facebook-f" aria-hidden="true"> </i>
            </Link>
            </li>
            <li>
              <Link to="" className="tw-ic ">
                <i className="fa fa-twitter" aria-hidden="true"> </i>
              </Link></li>
            <li>
              <Link to="" className="tw-ic">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </Link>
            </li>
            <li>
              <Link to="" className="tw-ic">
                <i className="fa fa-instagram" aria-hidden="true "> </i>
              </Link>
            </li>

          </ul>
        </div>

        <div className="footer-copyright-link">
          <container fluid>
            <a href="">copyright  &copy;Dashify, All Rights Reserved</a>
          </container>
        </div>

      </div>
    </div>
  );
}

export default Footer;