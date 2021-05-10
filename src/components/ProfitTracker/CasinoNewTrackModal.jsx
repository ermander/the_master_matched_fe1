import React, { Component } from 'react'
import { Row, Col, Modal, Button } from "react-bootstrap"

export default class CasinoNewTrackModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Body>
                        <Row id="casino_new_track_modal_footer">
                            <Col xs={12}></Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
