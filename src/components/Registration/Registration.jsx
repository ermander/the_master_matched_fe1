import React, { Component } from 'react'
// React Router Dom
import { Link } from "react-router-dom"
// Bootstrap
import { Row, Col, Button, Image, Alert } from "react-bootstrap"
// FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebook } from "@fortawesome/free-brands-svg-icons"
// SASS
import "../../styles/_registration.scss"

export default class Registration extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        show: false,
        showCreated: false
    }

    postNewUser = async () => {
        try {

            const data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }

            if(this.state.username === "" || this.state.email === "" || this.state.password === ""){
                console.log("An error occurred!")
                this.setState({ show: true })
                setTimeout( () => this.setState({ show: false }), 1500) 
            }else{
                const response = await fetch("https://the-master-matched-be-new.herokuapp.com/users/registration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                if(response.ok){
                    this.setState({ show: false })
                    setTimeout( () => this.setState({ showCreated: true }), 1500)  
                }     
            }                      
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <Row className="no-gutters registration-page-container">
                    <Col xs={4} className="left-side-registration-container">
                        <div className="image-container">
                            <Image src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623768881/Il%20Diaro%20Del%20Matched%20Bettista/loghi-mb-bianco-medio_josplc.png" alt="The Master Matched logo" />
                            <h5>Lorem Ipsum is simply dummy text of the <br/>printing and typesetting industry.</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Hic perspiciatis, voluptas esse quibusdam, nihil laboriosam quasi nisi, 
                                in magnam fugiat tempore. Reprehenderit nulla recusandae laboriosam fugiat odit
                                sit minus nobis.
                            </p>
                        </div>
                    </Col>
                    <Col xs={8} className="right-side-registration-container">
                        <Alert variant="danger" show={this.state.show}>Devi compilare tutti i campi correttamente!</Alert>
                        <Row className="no-gutters registration-form">
                            <Col xs={3}></Col>
                            <Col xs={6}>
                                <Row className="no-gutters small-screen-logo">
                                    <Col xs={12}>
                                        <Image src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623777903/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_2_e5ts6b.png" alt="The Master Matched logo" />
                                    </Col>
                                </Row>
                                <Row className="first-row no-gutters">
                                    <Col xs={12}>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                        <p>Registration</p>
                                    </Col>
                                </Row>
                                <Row className="inputs-row no-gutters">
                                    <Col xs={12}>
                                        <input 
                                            type="text"
                                            placeholder="Nickname..."
                                            onChange={e => this.setState({ username: e.currentTarget.value })}
                                        />
                                    </Col>
                                </Row>
                                <Row className="inputs-row no-gutters">
                                    <Col xs={12}>
                                        <input 
                                            type="text"
                                            placeholder="Email..."
                                            onChange={e => this.setState({ email: e.currentTarget.value })}
                                        />
                                    </Col>
                                </Row>
                                <Row className="inputs-row no-gutters">
                                    <Col xs={12}>
                                        <input 
                                            type="password"
                                            placeholder="Password..."
                                            onChange={e => this.setState({ password: e.currentTarget.value })}
                                        />
                                    </Col>
                                </Row>
                                <Row className="button-row no-gutters">
                                    <Col xs={12}>
                                        <Button onClick={this.postNewUser}>Registrati</Button>
                                    </Col>
                                </Row>
                                <Row className="alternative-registration no-gutters">
                                    <Col xs={12}>
                                        <p>Oppure registrati con</p>
                                        <span className="alternative-icons-container">
                                            <FontAwesomeIcon icon={faGooglePlusG} id="google-icon"/>
                                            <FontAwesomeIcon icon={faFacebook} id="facebook-icon"/>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}
