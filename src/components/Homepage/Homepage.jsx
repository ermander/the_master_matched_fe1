import React, { Component } from 'react';
import { Row, Col, Container, Image, Button } from "react-bootstrap"
import { Link  } from "react-router-dom";
import "./homepage.css"

class Homepage extends Component {
    render() {
        return (
            <Container className="homepageContainer" fluid>
                <Row className="no-gutters">
                    <Col xs={12} className="mt-4">
                        <Container id="homepageImageContainer">
                            <Image id="homepageLogo" src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1615767803/photo_2021-03-15_01-12-53_nhmrr2.jpg" />
                        </Container>
                    </Col>
                </Row>
                <Row className="no-gutters mt-5 loginRegisterButtons">
                    <Col xs={12}>
                        <Row className="no-gutters mt-3">
                            <Col xs={12}>
                                <Link to="/login">
                                    <Button className="homepageButtons" variant="dark">Log In</Button>
                                </Link>
                            </Col>
                        </Row>                        
                        <Row className="no-gutters mt-3">
                            <Col xs={12}>
                                <Link to="/registration">
                                    <Button className="homepageButtons" variant="dark">Registrati</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Homepage;