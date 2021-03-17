import React, { Component } from 'react';
import { Modal } from "react-bootstrap"

class ModifyBookmaker extends Component {
    componentDidMount = () => {
        console.log(this.props.bookmakerInfo)
    }
    render() {
        return (
            <Modal 
                show={this.props.show}
                onHide={this.props.closeModifyBookmakerModal}
            >
                <Modal.Body>
                    <h2>Modifica Informazioni Bookmaker</h2>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModifyBookmaker;