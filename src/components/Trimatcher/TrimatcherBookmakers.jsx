import React from 'react'
import { Modal, Row, Col, Button, Form } from "react-bootstrap"

export default function TrimatcherBookmakers({show, onHide}) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Body>
                <h3 id="title">Opzioni Bookmakers</h3>
            </Modal.Body>
            <Row className="bookmakers-list">
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>MarathonBet</strong>
                        </Form.Check>
                    </div>
                </Col>
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>Eurobet</strong>
                        </Form.Check>
                    </div>
                </Col>
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>Sisal</strong>
                        </Form.Check>
                    </div>
                </Col>                
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>Snai</strong>
                        </Form.Check>
                    </div>
                </Col>                
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>Lopoca</strong>
                        </Form.Check>
                    </div>
                </Col>                
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>OverPlus</strong>
                        </Form.Check>
                    </div>
                </Col>
            </Row>
            <Row className="bookmakers-list">
                <Col xs={2}>
                    <div>
                        <Form.Check inline></Form.Check>
                        <Form.Check inline>
                            <strong>Vincitu</strong>
                        </Form.Check>
                    </div>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>
            </Row>
            <Row id="bookmakers-modal-buttons">
                <Col xs={4}>
                    <Button variant="success" onClick={onHide}>Applica Modifiche</Button>
                </Col>
                <Col xs={4}>
                    <Button variant="warning">Seleziona Tutti</Button>
                </Col>
                <Col xs={4}>
                    <Button variant="danger">Deleseziona Tutti</Button>
                </Col>
            </Row>
        </Modal>
    )
}
