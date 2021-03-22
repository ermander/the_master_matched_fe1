import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';

import "./login.css"

function Login() {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ show, setShow ] = useState(false)
    const history = useHistory()

    const handleLogin = async () => {
        try {
            console.log(email, password)
            const response = await fetch("https://the-master-matched-be-new.herokuapp.com/users/login",{
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                console.log(response)
                const parsedResponse = await response.json()
                localStorage.setItem("accessToken", parsedResponse.accessToken)
                localStorage.setItem("refreshToken", parsedResponse.refreshToken)
                history.push("/cashback-2-vie")
                // window.location.href = "http://localhost:3000/cashback-2-vie"
                
            }else{
                console.log(response)
                setShow(true)
            }     
        } catch (error) {
            console.log()
        }
    }

    return (
        <>
        <Alert variant="danger" style={{textAlign: "center"}} show={show}>
            Le tue credenziali di accesso non sono corrette! 
           <Alert.Link href="https://the-master-matched-fe1.herokuapp.com/login"> <span style={{color: "black"}}>Clicca qui per registrarti ora!</span></Alert.Link>
        </Alert>
        <Container fluid className="loginContainer">
            <Row className="no-gutters">
                <Col xs={12} className="mt-4">
                    <Container id="loginImageContainer">
                        <Image id="loginLogo" src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1615767803/photo_2021-03-15_01-12-53_nhmrr2.jpg" />
                    </Container>
                </Col>
            </Row>
            <Row className="mt-3 no-gutters">
                <Col xs={12}>
                    <Container style={{textAlign: "center"}}>
                        <Form.Group className="loginForm">
                            <Form.Label> </Form.Label>
                            <Form.Control type="email" placeholder="Inserire la email" onChange={e => setEmail(e.currentTarget.value)} />
                        </Form.Group>
                    </Container>                        
                </Col>
            </Row>
            <Row className="no-gutters">
                <Col xs={12}>
                    <Container style={{textAlign: "center"}}>
                        <Form.Group className="loginForm">
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="Inserire la password" onChange={e => setPassword(e.currentTarget.value)}/>
                        </Form.Group>
                    </Container>                        
                </Col>
            </Row>
            <Row className="no-gutters">
                <Col xs={12}>
                    <Container style={{textAlign: "center"}}>
                        <Button 
                            id="registrationButton" 
                            value="login" 
                            className="mt-3" 
                            variant="dark"
                            onClick={handleLogin}
                        >
                            Log In!
                        </Button>
                    </Container>
                </Col>
            </Row>   
        </Container>
        </>
    );
}

export default Login;