import React, { Component } from 'react'; 
// import ResponsiveMenu from 'react-responsive-navbar';
import { Link} from 'react-router-dom';
import Logo from './img/Logo.png';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../../App.css';

class Navber extends Component {

  state = {
    isAlreadyLogin : false,
    name:""
  }

  componentDidMount = () => {
    this.isAlreadyLogin();
  }

  isAlreadyLogin = () => {
    console.log(
      "remember_me and user_token",
      localStorage.getItem("RememberMe") == "true",
      localStorage.getItem("UserToken") != null
    );
    localStorage.getItem("UserToken") != null &&
    localStorage.getItem("RememberMe") == "true"
      ? this.setState({ isAlreadyLogin: true,name:localStorage.getItem("UserName") })
      : this.setState({ isAlreadyLogin: false });
  };

    render()  {
      let {name,isAlreadyLogin} = this.state
  return (

<div>

<div className="navbar navbar-default navbar-fixed-top" role="navigation">
  <div className="container">
    <div className="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#"><img src={Logo} className="App-logo" alt="logo" /></a>
    </div>
    <div className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
        <li ><a href="#">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#portfolio">Features</a></li>
        <li><a href="#contact">Pricing</a></li>
        <li><a href="#contact">Support</a></li>
  <li><a href="Login">{isAlreadyLogin?name:"Sign in"}</a></li>
        <li className="demo"><a href="#">Book A Demo</a></li>
      </ul>
    </div>
  </div>
</div>

</div>



  );
    }
}
export default Navber;