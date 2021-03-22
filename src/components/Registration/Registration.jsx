import React, { Component } from 'react';
import { Container, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';

import "./registration.css"

class Login extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        show: true,
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
            }else{
                const response = await fetch("https://the-master-matched-be-new.herokuapp.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                if(response.ok){
                    this.setState({ show: false })
                    setTimeout( () => this.setState({ showCreated: true}), 1500)  
                }     
            }                      
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <>
            <Alert variant="secondary" style={{textAlign: "center"}} show={this.state.show}>
                Se possiedi già un account 
            <Alert.Link href="https://the-master-matched-fe1.herokuapp.com/login"> <span style={{color: "black"}}> clicca qui per effettuare il login!</span></Alert.Link>
            </Alert>

            <Alert variant="secondary" style={{textAlign: "center"}} show={this.state.showCreated}>
                Il tuo account è stato correttamente creato! 
            <Alert.Link href="https://the-master-matched-fe1.herokuapp.com/login"> <span style={{color: "black"}}> Clicca qui per effettuare subito il login!</span></Alert.Link>
            </Alert>


            <Container fluid className="registrationContainer">
                <Row className="no-gutters">
                    <Col xs={12} className="mt-4">
                        <Container id="registrationImageContainer">
                            <Image id="registrationLogo" src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1615767803/photo_2021-03-15_01-12-53_nhmrr2.jpg" />
                        </Container>
                    </Col>
                </Row>
                <Row className="mt-3 no-gutters">
                    <Col xs={12}>
                        <Container style={{textAlign: "center"}}>
                            <Form.Group className="registrationForm">
                                <Form.Label> </Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Inserire la email"
                                    onChange={e => this.setState({ email: e.currentTarget.value })}
                                />
                            </Form.Group>
                        </Container>                        
                    </Col>
                </Row>
                <Row className="no-gutters">
                    <Col xs={12}>
                        <Container style={{textAlign: "center"}}>
                            <Form.Group className="registrationForm">
                                <Form.Label> </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Inserire il nickname" 
                                    onChange={(e) => this.setState({ username: e.currentTarget.value })}
                                />
                            </Form.Group>
                        </Container>                        
                    </Col>
                </Row>
                <Row className="no-gutters">
                    <Col xs={12}>
                        <Container style={{textAlign: "center"}}>
                            <Form.Group className="registrationForm">
                                <Form.Label> </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Inserire la password" 
                                    onChange={e => this.setState({ password: e.currentTarget.value })}
                                />
                            </Form.Group>
                        </Container>                        
                    </Col>
                </Row>   
                <Row className="no-gutters">
                    <Col xs={12}>
                        <Container style={{textAlign: "center"}}>
                            <Form.Group className="registrationForm">
                                <Form.Label> </Form.Label>
                                <Form.Control type="password" placeholder="Ripeti la password" />
                            </Form.Group>
                        </Container>                        
                    </Col>
                </Row>  
                <Row className="no-gutters">
                    <Col xs={12}>
                        <Container style={{textAlign: "center"}}>
                            <Button 
                                id="registrationButton" 
                                className="mt-3" 
                                variant="dark"
                                onClick={this.postNewUser}
                            >
                                Registrati ora!
                            </Button>
                        </Container>
                    </Col>
                </Row>   
            </Container>
            </>
        );
    }
}

export default Login;