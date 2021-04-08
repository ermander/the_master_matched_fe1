import React from 'react'
import { Modal, Row, Col, Button, Form, InputGroup, FormControl } from "react-bootstrap"

export default function DutcherFiltersModal({show, onHide}) {
    return (
        <Modal show={show} onHide={onHide}>
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
                                    type="date"/>
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <InputGroup>
                                    <FormControl 
                                    type="date" />
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
                                    type="date"/>
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <InputGroup>
                                    <FormControl 
                                    type="date" />
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
                                    type="text"
                                    placeholder="Quota Min."
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={5}>
                                <InputGroup>
                                    <FormControl 
                                    type="text"
                                    placeholder="Quota Max."
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
                    <Button variant="success">Salva</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button onClick={onHide} variant="secondary">Chiudi</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button onClick={onHide} variant="danger">Reset</Button>
                </Col>
            </Row>
        </Modal>
    )
}
