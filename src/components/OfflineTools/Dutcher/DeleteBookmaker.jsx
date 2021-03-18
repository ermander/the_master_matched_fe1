import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import { Modal, Row, Col, Button } from "react-bootstrap"

class DeleteBookmaker extends Component {
    render() {
        return (
            <Container fluid>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header>

                    </Modal.Header>
                </Modal>

            </Container>
        );
    }
}

export default DeleteBookmaker;