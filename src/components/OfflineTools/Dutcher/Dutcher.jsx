import { Container, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { Switch, TextField, Button } from 'ui-neumorphism'
import Navbar from "../../Navbar/Navbar"
import CashbackTable from "../Dutcher/CashbackTable"
import 'ui-neumorphism/dist/index.css'
import "./dutcher.css"

class Dutcher extends Component {

    state = {
        bookmakers: [],
        loadingBookmakers: true
    }

    fetchBookmakers = async () => {
        const response = await fetch("http://localhost:3004/cashback-bookmakers/get-bookmakers")
        const bookmakers = await response.json()
        this.setState({bookmakers: bookmakers})
        this.setState({loadingBookmakers: false})
    }

    componentDidMount = () => {
        this.fetchBookmakers()
    }

    render() {
        return (
            <>
                <Container id="offlineDutcherMainContainer" fluid>
                    <Navbar />
                    <Container fluid id="cashback2VieTitleContainer">
                        <h1 id="cashback2VieTitle">Cashback 2 Vie</h1>
                    </Container>
                    <Row className="no-gutters">
                        <Col xs={7}>
                            <Container className="calcolatore2vieContainer">
                                <Row className="no-gutters pt-3">
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Switch 
                                            color='var(--error)' 
                                            checked 
                                            label='Cashback Book 1'
                                            style={{color: "white"}}
                                        />
                                    </Col>
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Switch 
                                            color='var(--error)' 
                                                checked 
                                                label='Cashback Book 2' 
                                        />
                                    </Col>
                                </Row>
                                <Row className="no-gutters pt-3">
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <label style={{fontWeight: "bold", color: "white"}}>Inserire quota book 1</label>
                                        <TextField
                                            style={{margin: "0", display: "block"}}
                                            className='my-3'
                                            dense
                                            rounded
                                            type="number"
                                            autocomplete="off"
                                        ></TextField>
                                    </Col>
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <label style={{fontWeight: "bold", color: "white"}}>Inserire quota book 2</label>
                                        <TextField
                                            style={{margin: "0", display: "block"}}
                                            className='my-3'
                                            dense
                                            rounded
                                            type="number"
                                            autocomplete="off"
                                        ></TextField>
                                    </Col>
                                </Row>
                                <Row className="no-gutters pt-3">
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <label style={{fontWeight: "bold", color: "white"}}>Inserire stake</label>
                                        <TextField style={{margin: "0", display: "block"}}
                                            className='my-3'
                                            dense
                                            rounded
                                            type="number"
                                            autocomplete="off"
                                        ></TextField>
                                    </Col>
                                    <Col xs={4}></Col>
                                </Row>
                                <Row className="no-gutters py-5">
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Button dark rounded>
                                            <span style={{color: "white"}}>Calcola ROI</span>
                                        </Button>
                                        </Col>
                                    <Col xs={4}></Col>
                                </Row>                        
                            </Container>                            
                        </Col>
                        <Col xs={5}>
                            <Container className="calcolatore2vieContainer2 pb-5">
                            
                                <CashbackTable
                                    className="dutcher-table"
                                    loadingBookmakers={this.state.loadingBookmakers}
                                    bookmakers={this.state.bookmakers}
                                />
                            </Container>
                        </Col>
                    </Row>                    
                </Container>
            </>
        );
    }
}

export default Dutcher;