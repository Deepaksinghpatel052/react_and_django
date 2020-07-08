import React, { Component } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";

import Card from "react-bootstrap/Card";
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
// import Image from 'react-bootstrap/Image';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
// import Emailtem from './Emailtem';S
import { Link } from "react-router-dom";
// import Particles from 'react-particles-js';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="home-banner">
          <h1 className="destop-h1">
            <span>
              {" "}
              One Place, <b>All Business</b>
            </span>
          </h1>

          <img src={require("./img/background-4.jpg")} />
          <div className="banner-box">
            <div className="container">
              <div className="banner-text font-stylebox">
                <h1>
                  <span>
                    {" "}
                    One Place,
                    <br /> <b>All Business</b>
                  </span>
                </h1>
                <p>
                  {" "}
                  Having everything in one place means organization, simplifying
                  business and more time spent on the important stuff Dashify
                  organize, update and keep track of all your information and
                  social pages from one convenient dashboard. Effortlessly.{" "}
                </p>
                <div className="home-banner-btnn">
                  <Button variant="outline2">Book A Demo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="txt-area font-stylebox">
          <h1>
            <span>
              <b>CHECK HOW YOUR BUSINESS APPEARS ONLINE SCAN YOUR TOOL</b>
            </span>
            <strong className="border-button"></strong>
          </h1>
          <div className="txt-subarea">
            <div className="container">
              <Row>
                <Col md={2}>
                  <Form.Group controlId="formGridState">
                    <Form.Control as="select">
                      <option>Choose country</option>
                      <option>USA</option>
                      <option>South America</option>
                      <option>australia</option>
                      <option>india</option>
                      <option>pakistan</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="formGridState">
                    <Form.Control as="select">
                      <option>Business Name</option>
                      <option>Online shop</option>
                      <option> Cloth shop</option>
                      <option>Software Company</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formGridState" className="scan-input">
                    <Form.Control
                      as="input"
                      className="from-control-txt"
                      placeholder="Business Name"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formGridState" className="scan-input">
                    <Form.Control
                      as="input"
                      className="from-control-txt"
                      placeholder="Business Type"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button variant="outline-info">Scan Now</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <section className="font-stylebox">
          <div className="container">
            <div className="heading-title">
              <h2>
                <b>What Oasis Features</b>
              </h2>
            </div>

            <div className="columbox">
              <div className="col-box">
                <div className="col-box-pading">
                  <img src={require("./img/icon-5.png")} />
                  <div className="col-box-text">
                    <h3>
                      <span>Management</span>
                    </h3>
                    <h5 className="col-box-subtext">
                      <span>Keep It Streamlined</span>
                    </h5>
                    <p>
                      Manage everything effortlessly from one place at any time.
                      Dashify was designed with streamlined simplicity in mind.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-box">
                <div className="col-box-pading2">
                  <img src={require("./img/icon-1.png")} />
                  <div className="col-box-text1">
                    <h3>
                      <span>Review Tracker</span>
                    </h3>
                    <h5 className="col-box-subtext">
                      <span>Who Said That?</span>
                    </h5>

                    <p>
                      {" "}
                      Was it good? Was it bad? Whatever they thought, see it
                      instantly by tracking business reviews and keeping an eye
                      on who said what.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-box">
                <div className="col-box-pading">
                  <img src={require("./img/icon-3.png")} />
                  <div className="col-box-text2">
                    <h3>
                      <span>Promotion</span>
                    </h3>
                    <h5 className="col-box-subtext">
                      <span>Making Business Louder</span>
                    </h5>

                    <p>
                      {" "}
                      Promoting can make or break a business. Get yours seen,
                      heard and clicked with the right promotion, all from the
                      convenience of one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="columbox1">
              <div className="col-box col-box-border">
                <div className="col-box-pading">
                  <img src={require("./img/icon-2.png")} />
                  <div className="col-box-text1">
                    <h3>
                      <span> Notification Feed</span>
                    </h3>
                    <h5 className="col-box-subtext">
                      <span>Instant Interaction</span>
                    </h5>

                    <p>
                      {" "}
                      Interact with your target audience, customers and clients
                      instantly by keeping on top<br></br> of all notifications
                      on every platform. You’ll never miss another ding
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-box col-box-border">
                <div className="col-box-pading">
                  <img src={require("./img/icon-4.png")} />
                  <div className="col-box-text2">
                    <h3>
                      <span>Analytics</span>
                    </h3>
                    <h5 className="col-box-subtext">
                      <span>Prioritize Performance</span>
                    </h5>

                    <p>
                      {" "}
                      Performance is paramount, and Dashify keep an eye on it
                      for you. With complete precision, monitor how well you’re
                      doing at any time with astute and accurate analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-box-btn">
              <Button variant="outline-info">Learn more</Button>
            </div>
          </div>
        </section>

        <div className="home-banner2 font-stylebox ">
          <div className="heading-title2">
            <h1>
              <span>
                <b> Connect your Business</b>
              </span>
              <strong className="border-button"></strong>
            </h1>
            <div className="home-banner2-img">
              <img src={require("./img/a (1).png")} />
            </div>
          </div>
        </div>

        <div className="home-banner3 font-stylebox ">
          <div className="container">
            <div className="heading-title3">
              <h2>
                <span>
                  <b>Trusted By Companies</b>
                </span>
                <strong className="border-button3"></strong>
              </h2>
            </div>
            <div className="client-logo">
              <div className="container">
                <ul>
                  <li className="fluff-logo">
                    <Link to="">
                      <img src={require("./img/Fluffup.png")} />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img src={require("./img/paypal.png")} />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img src={require("./img/237.png")} />{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img src={require("./img/perceptra.png")} />{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img src={require("./img/Disney.png")} />
                    </Link>
                  </li>
                </ul>
                <div className="client-logo-text">
                  <p>
                    {" "}
                    with our mission if perfect answers everyuwhere we are
                    leaeding barnds into the futuer of seacrh{" "}
                  </p>
                  <Link to="">
                    <p>SEE CUSTOMER STORIES</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-banner4 font-stylebox">
          <div className="container">
            <div className="banner-text2">
              <h4>
                <span>
                  <b>SPECIALIZING IN BRAND AWARENESS</b>
                </span>
                <strong className="border-button4"></strong>
              </h4>
              <p>
                {" "}
                Restaurants, Hotels, Retail, Healthcare, Home Improvement
                Automative, Fincanical, Many More
              </p>
            </div>

            <Row className="columbox2">
              <Col md={4} className="colum-padding">
                <Link to="" className="coloum-link">
                  {" "}
                  <h5 className="col-title">
                    Retail
                    <strong className="banner-button1"></strong>
                  </h5>
                  <img src={require("./img/image-1.png")} />
                  <div className="overlay"></div>
                </Link>
              </Col>

              <Col md={4} className="colum-padding">
                <Link to="">
                  {" "}
                  <h5 className="col-title">
                    Restaurant
                    <strong className="banner-button1"></strong>
                  </h5>
                  <img src={require("./img/image-2.png")} />
                  <div className="overlay"></div>
                </Link>
              </Col>

              <Col md={4} className="colum-padding">
                <Link to="">
                  {" "}
                  <h5 className="col-title">
                    Financial services
                    <strong className="banner-button1"></strong>
                  </h5>
                  <img src={require("./img/image-3.png")} />
                  <div className="overlay"></div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>

        <div className="home-banner5 font-stylebox">
          <div className="container">
            <div className="banner5-text">
              <h2>
                <span>
                  <b>BLOG</b>
                </span>
                <strong className="border-button5"></strong>
              </h2>
              <p>
                {" "}
                Lorem ipsum dolor sit amet,cansectet adipiscing elit, sed do
                eiumod tempor idcididentet lobare et dolor magne aliqua. ut enim
                ad minim veniam quis nostrud execitation, ullamco laboris nisi
                ut aliquip ex ea commode cansequt
              </p>
            </div>
            <div className="banner-img">
              <Row>
                <Col md={3}>
                  <Card>
                    <Card.Img src={require("./img/1.png")} />
                    <Card.Body className="body-text">
                      <Card.Title>Lorem IPUSM</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Img src={require("./img/2.png")} />

                    <Card.Body className="body-text">
                      <Card.Title>Lorem IPUSM</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Img src={require("./img/3.png")} />

                    <Card.Body className="body-text">
                      <Card.Title>Lorem IPUSM</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Img src={require("./img/4.png")} />

                    <Card.Body className="body-text">
                      <Card.Title>Lorem IPUSM</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="item active">
              <img src={require("./img/background-2.jpg")} alt="First slide" />
              <div className="carousel-caption">
                <div className="banner-text3">
                  <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
                  <p>
                    Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
                    <span>
                      {" "}
                      sed do eiumod tempor idcididentet lobare et dolor magne
                      aliqua.
                    </span>{" "}
                  </p>
                  <p>
                    ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
                    <span> laboris nisi ut aliquip ex ea commode cansequt</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="item">
              <img src={require("./img/background-2.jpg")} alt="First slide" />
              <div className="carousel-caption">
                <div className="banner-text3">
                  <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
                  <p>
                    Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
                    <span>
                      {" "}
                      sed do eiumod tempor idcididentet lobare et dolor magne
                      aliqua.
                    </span>{" "}
                  </p>
                  <p>
                    ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
                    <span> laboris nisi ut aliquip ex ea commode cansequt</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <img src={require("./img/background-2.jpg")} alt="First slide" />
              <div className="carousel-caption">
                <div className="banner-text3">
                  <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
                  <p>
                    Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
                    <span>
                      {" "}
                      sed do eiumod tempor idcididentet lobare et dolor magne
                      aliqua.
                    </span>{" "}
                  </p>
                  <p>
                    ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
                    <span> laboris nisi ut aliquip ex ea commode cansequt</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
export default Home;
