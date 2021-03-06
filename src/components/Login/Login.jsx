import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

// BootStrap
import { Row, Col, Button, Image, Alert } from "react-bootstrap";
// FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebook } from "@fortawesome/free-brands-svg-icons";

// SASS
import "../../styles/Login/_login.scss";

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
  setUserLogged: () => {
    // Action creator
    dispatch({
      type: "SET_USER",
    });
  },
});

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://the-master-matched-be-new.herokuapp.com/users/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        props.setUserLogged()
        const parsedResponse = await response.json();
        localStorage.setItem("accessToken", parsedResponse.accessToken);
        localStorage.setItem("refreshToken", parsedResponse.refreshToken);
        history.push("/dutcher");
      } else {
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="no-gutters login-page-container">
        <Col xs={4} className="left-side-login-container">
          <div className="image-container">
            <Image
              src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623768881/Il%20Diaro%20Del%20Matched%20Bettista/loghi-mb-bianco-medio_josplc.png"
              alt="Il Diaro Del Matched Bettista Logo"
            />
            <h5>
              Lorem Ipsum is simply dummy text of the <br />
              printing and typesetting industry.
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              perspiciatis, voluptas esse quibusdam, nihil laboriosam quasi
              nisi, in magnam fugiat tempore. Reprehenderit nulla recusandae
              laboriosam fugiat odit sit minus nobis.
            </p>
          </div>
        </Col>
        <Col xs={8} className="right-side-login-container">
          <Alert variant="danger" show={show}>
            Le tue credenziali di accesso non sono corrette!
          </Alert>
          <Row className="no-gutters login-form">
            <Col xs={3}></Col>
            <Col xs={6}>
              <Row className="no-gutters small-screen-logo">
                <Col xs={12}>
                  <Image
                    src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623777903/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_2_e5ts6b.png"
                    alt="Il Diario Del Matched Bettista Logo"
                  />
                </Col>
              </Row>
              <Row className="no-gutters first-row">
                <Col xs={12}>
                  <p>Login</p>
                  <Link to="/registration">Registration</Link>
                </Col>
              </Row>
              <Row className="no-gutters inputs-row">
                <Col xs={12}>
                  <input
                    type="text"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <Row className="no-gutters inputs-row">
                <Col xs={12}>
                  <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <Row className="no-gutters button-row">
                <Col xs={12}>
                  <Button onClick={handleLogin}>Login</Button>
                  <Link to="/restore-password">Password dimenticata?</Link>
                </Col>
              </Row>
              <Row className="no-gutters alternative-login">
                <Col xs={12}>
                  <p>Oppure accedi con</p>
                  <span className="alternative-icons-container">
                    <FontAwesomeIcon icon={faGooglePlusG} id="google-icon" />
                    <FontAwesomeIcon icon={faFacebook} id="facebook-icon" />
                  </span>
                </Col>
              </Row>
            </Col>
            <Col xs={3}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
