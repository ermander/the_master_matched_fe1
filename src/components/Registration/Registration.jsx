import React, { Component, useState } from "react";
// React Router Dom
import { useHistory, Link } from "react-router-dom";
// Bootstrap
import { Row, Col, Button, Image, Alert } from "react-bootstrap";
// FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebook } from "@fortawesome/free-brands-svg-icons";
// SASS
import "../../styles/_registration.scss";

function Registration() {
  // States and functions
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  const createNewUser = async () => {
    try {
      if (email === "" || nickname === "" || password === "") {
        console.log("An error occurred!");
        setShow(true);
      } else {
        const response = await fetch(
          "https://the-master-matched-be-new.herokuapp.com/users/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              username: nickname,
              password: password,
            }),
          }
        );
        if (response.ok) {
          setShow(false)
          history.push("/dutcher")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="no-gutters registration-page-container">
        <Col xs={4} className="left-side-registration-container">
          <div className="image-container">
            <Image
              src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623768881/Il%20Diaro%20Del%20Matched%20Bettista/loghi-mb-bianco-medio_josplc.png"
              alt="The Master Matched logo"
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
        <Col xs={8} className="right-side-registration-container">
          <Alert variant="danger" show={show}>
            Devi compilare tutti i campi correttamente!
          </Alert>
          <Row className="no-gutters registration-form">
            <Col xs={3}></Col>
            <Col xs={6}>
              <Row className="no-gutters small-screen-logo">
                <Col xs={12}>
                  <Image
                    src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623777903/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_2_e5ts6b.png"
                    alt="The Master Matched logo"
                  />
                </Col>
              </Row>
              <Row className="first-row no-gutters">
                <Col xs={12}>
                  <Link to="/login">Login</Link>
                  <p>Registration</p>
                </Col>
              </Row>
              <Row className="inputs-row no-gutters">
                <Col xs={12}>
                  <input
                    type="text"
                    placeholder="Nickname..."
                    onChange={(e) => setNickname(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <Row className="inputs-row no-gutters">
                <Col xs={12}>
                  <input
                    type="text"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <Row className="inputs-row no-gutters">
                <Col xs={12}>
                  <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <Row className="button-row no-gutters">
                <Col xs={12}>
                  <Button onClick={createNewUser}>Registrati</Button>
                </Col>
              </Row>
              <Row className="alternative-registration no-gutters">
                <Col xs={12}>
                  <p>Oppure registrati con</p>
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

export default Registration;
