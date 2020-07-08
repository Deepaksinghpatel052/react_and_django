import React, { Component } from 'react';
import './Flaticon.css';
import './App.css';

import MainApp from './component/main';


import YelpLogin from './component/yelplogin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './component/landingpage/home';
import Login from './component/landingpage/login';
import Signup from './component/landingpage/signup';
import Forgot from './component/landingpage/forgot.js';
import FourSquareLogin from './component/foursquarelogin';
import EmailConfirmation from './component/landingpage/email-confirmation';
import PasswordReset from './component/landingpage/password-reset';




class App extends Component  {

  render(){
  return (
    <div className="App">
     
            

            <BrowserRouter>
                <Switch>

 <Route path="/" exact component={Home} />
      <Route path="/Login" exact component={Login} />  

      <Route path="/Login/:param1/:param2"  render={props =><Login {...props}/>} /> 
      <Route path="/password-reset/:param1/:param2" render={props =><PasswordReset {...props}/>} />

      <Route path="/Signup" exact component={Signup} />
      <Route path="/email-confirmation/:username" exact component={EmailConfirmation} />
      <Route path="/forgot" exact component={Forgot} />
 <Route exact path="/yelplogin" component={YelpLogin} />
 <Route exact path="/foursquarelogin" component={FourSquareLogin} />
 <Route exact path="/dashboard" component={MainApp}/>

</Switch>
            </BrowserRouter>

            
    
    </div>
  );
}
}

export default App;