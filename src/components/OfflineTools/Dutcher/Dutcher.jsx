import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import Navbar from "../../Navbar/Navbar"
import "./dutcher.css"

class Dutcher extends Component {
    render() {
        return (
            <>
                <Container id="offlineDutcherMainContainer" fluid>
                    <Navbar />
                    <Container fluid id="cashback2VieTitleContainer">
                        <h1 id="cashback2VieTitle">Cashback 2 Vie</h1>
                    </Container>
                    <Container style={{marginTop: "3vh", backgroundColor: "#202020"}}>
                        <Form>
                        <Form.Group controlId="formBasicCheckbox" style={{color: "#c2c0c0"}}>
                            <Form.Check type="checkbox" label="Cashback book punta 1" />
                        </Form.Group>
                        </Form>
                    </Container>
                </Container>
            </>
        );
    }
}

export default Dutcher;