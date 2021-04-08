import React from 'react'
import { Modal, Row, Col, Button, FormControl, InputGroup } from "react-bootstrap"

export default function TrimatcherFiltersModal({show, onHide}) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Body>
                <div id="title">
                    <h3>Opzioni Di Ricerca</h3>
                </div>            
            </Modal.Body>            
            <Row id="filters-titles">
                <Col xs={12}>
                    <div className="forms-col">
                        <h4>Data e Ora:</h4>
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
