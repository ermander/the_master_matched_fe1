import React, { Component } from 'react'
import { Row, Col, Modal, Button, Form } from "react-bootstrap"

export default class CasinoNewTrackModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} id="casino_new_track_modal_body">
                                <div>
                                    <h3>Inserire una nuova giocata</h3>
                                </div>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form>
                                <Form.Group>
                                    <Form.Label style={{color: "black"}}>Seleziona il conto gioco</Form.Label>
                                    <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Form.Control>
                                </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form>
                                <Form.Group>
                                    <Form.Label style={{color: "black"}}>Seleziona il tipo di movimento</Form.Label>
                                    <Form.Control as="select">
                                    <option>Casino Live</option>
                                    <option>Casino Offline</option>
                                    <option>RTP+</option>
                                    <option>Altro</option>
                                    </Form.Control>
                                </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Inserisci l'importo</Form.Label>
                                    <Form.Control type="email" placeholder="Importo € ..." />
                                </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} id="casino_new_track_modal_footer">
                                <Button>Salva</Button>
                                <Button onClick={this.props.onHide}>Chiudi</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
