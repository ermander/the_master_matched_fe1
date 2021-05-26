import React, { Component } from 'react'
import { Modal, Row, Col, Button, Form, InputGroup, FormControl } from "react-bootstrap"

export default class DutcherFiltersModal extends Component {
    state = {
        minOdd: "",
        maxOdd: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: ""
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Body>
                <div id="title">
                    <h3>Opzioni Di Ricerca</h3>
                </div>
            </Modal.Body>
            <Row id="filters-titles">
                <Col xs={2}>
                    <div className="forms-cols">
                        <h4>Sports</h4>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>Tutti</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>Calcio</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>Tennis</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>Basket</span>
                            </Form.Check>
                        </div>
                    </div>
                </Col>
                <Col xs={2}>
                    <div className="forms-cols">
                    <h4>Mercati</h4>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>Tutti</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>DC</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>U/O</span>
                            </Form.Check>
                        </div>
                        <div>
                            <Form.Check inline></Form.Check>
                            <Form.Check inline>
                                <span>GG/NG</span>
                            </Form.Check>
                        </div>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="forms-cols">
                        <h4>Data, Ora e Quote</h4>
                        <Row>
                            <Col xs={2}>
                                <strong>Inizio:</strong>
                            </Col>
                            <Col xs={7}>
                                <InputGroup>
                                    <FormControl
                                        type="date"
                                        onChange={(e) => this.setState({startDate: e.currentTarget.value})}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <InputGroup>
                                    <FormControl 
                                        type="time" 
                                        onChange={(e) => this.setState({startTime: e.currentTarget.value})}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <strong>Fine:</strong>
                            </Col>
                            <Col xs={7}>
                                <InputGroup>
                                    <FormControl
                                        type="date"
                                        onChange={(e) => this.setState({endDate: e.currentTarget.value})}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <InputGroup>
                                    <FormControl 
                                        type="time" 
                                        onChange={(e) => this.setState({endTime: e.currentTarget.value})}    
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <strong>Quota:</strong>
                            </Col>
                            <Col xs={5}>
                                <InputGroup>
                                    <FormControl 
                                    type="number"
                                    placeholder="Quota Min."
                                    onChange={(e) => {this.setState({minOdd: e.currentTarget.value})}}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={5}>
                                <InputGroup>
                                    <FormControl 
                                    type="number"
                                    placeholder="Quota Max."
                                    onChange={(e) => {this.setState({maxOdd: e.currentTarget.value})}}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={2}>
                    <div className="forms-cols">
                        <h4>% Rimborso</h4>
                        <Row>
                            <Col xs={12}>                                
                                <InputGroup>
                                    <FormControl 
                                    type="text"
                                    placeholder="Stake Punta €"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>                                
                                <InputGroup>
                                    <FormControl 
                                    type="text"
                                    placeholder="Rimborso %"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Button variant="light">Ordina</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row className="filters-footer">
                <Col xs={12} md={4}>
                    <Button 
                        variant="success" 
                        onClick={() => this.props.setFilters({
                            minOdd: parseFloat(this.state.minOdd),
                            maxOdd: parseFloat(this.state.maxOdd),
                            startDate: this.state.startDate,
                            endDate: this.state.endDate,
                            startTime: this.state.startTime,
                            endTime: this.state.endTime
                        })}>
                            Salva
                    </Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button onClick={this.props.onHide} variant="secondary">Chiudi</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button onClick={this.props.reSetOdds} variant="danger">Reset</Button>
                </Col>
            </Row>
        </Modal>
        )
    }
}

