import React, { Component } from 'react'

// Boostrap
import { Row, Col, Button, Image } from 'react-bootstrap'

// SASS
import "../../styles/_restore-password.scss"

export default class RestorePassword extends Component {
    render() {
        return (
            <>
                <Row className="no-gutters restore-password-container">
                    <Col xs={4}></Col>
                    <Col xs={4}>
                        <div className="image-container">
                            <Image src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623859634/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_4_qsfzqv.png" alt="Il Diario Del Matched Bettista Logo" />
                        </div>
                        <div className="form-container">
                            <h4>Recupero Password</h4>
                            <p>Inserisci la tua mail nell'apposito form<br/>per recuperare la tua password</p>
                            <input 
                                type="text" 
                                placeholder="Email..."
                            />
                            <Button>Invia il link di reset</Button>
                        </div>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
            </>
        )
    }
}
