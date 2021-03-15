import { Container } from 'react-bootstrap';
import React, { Component } from 'react';
import Navbar from "../../Navbar/Navbar"
import "./trimatcher.css"

class Dutcher extends Component {
    render() {
        return (
            <>
                <Container id="offline3VieMainContainer" fluid>
                    <Navbar />
                    <Container fluid id="cashback3VieTitleContainer">
                        <h1 id="cashback3VieTitle">Cashback 3 Vie</h1>
                    </Container>
                </Container>
            </>
        );
    }
}

export default Dutcher;