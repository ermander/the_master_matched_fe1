import React, { Component } from 'react';
import { Modal, Form, Alert } from "react-bootstrap"
import { Button } from 'ui-neumorphism'
import "./new-cashback-bookmaker.css"

class NewCashBackBookmaker extends Component {

    state = {
        show: false,
        bookmakerName: "",
        cashback: "",
        showAlert: false
    }

    showModal = () => this.setState({show: true})
    hideModal = () => this.setState({show: false})

    postNewBookmaker = async () => {
        const data = {
            name: this.state.bookmakerName,
            cashback: this.state.cashback
        }
        if(this.state.bookmakerName == "" || this.state.cashback == ""){
            this.setState({showAlert: true})
            setTimeout(() => {  this.setState({showAlert: false}) }, 2000);

        }else{
            try {
                const response = await fetch("http://localhost:3004/cashback-bookmakers/post-new-bookmaker", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                console.log(response)
                this.hideModal()
            } catch (error) {
               console.log(error)
               this.hideModal()
            }
        }
    }

    render() {
        return (
            <>
            <Button className="mt-3" dark rounded onClick={() => this.showModal()}>
                <span style={{color: "white"}}>Aggiungi Bookmaker</span>
            </Button>
            <Modal show={this.state.show} onHide={() => this.hideModal()}>
                <Modal.Body style={{backgroundColor: "#2b2f34", borderColor: "#2b2f34", textAlign: "center", paddingBottom: "2.5rem"}}>
                    <h2 className="new-bookmaker-title">
                        Nuovo Bookmaker
                    </h2>                         
                    <Alert show={this.state.showAlert} variant="danger" style={{fontWeight: "bold", marginRight: "15%", marginLeft: "15%", borderRadius: "25px"}}>Non puoi inserire campi vuoti!</Alert>
                    <Form style={{paddingLeft: "15%", paddingRight: "15%", paddingBottom: "1.5rem"}}>
                        <Form.Group>
                            <Form.Label style={{fontWeight: "bold", color: "white"}}>Nome Bookmaker</Form.Label>
                            <Form.Control style={{borderRadius: "20px"}} type="text" placeholder="Inserisci il nome del bookmakers" onChange={(e) => this.setState({bookmakerName: e.currentTarget.value})}/>
                        </Form.Group>
                    </Form>
                    <Form style={{paddingLeft: "15%", paddingRight: "15%", paddingBottom: "1.5rem"}}>
                        <Form.Group>
                            <Form.Label style={{fontWeight: "bold", color: "white"}}>Percentuale Cashback %</Form.Label>
                            <Form.Control style={{borderRadius: "20px"}} type="number" placeholder="Inserisci la percentuale del cashback" onChange={(e) => this.setState({cashback: e.currentTarget.value})}/>
                        </Form.Group>
                    </Form>
                    <Button dark rounded style={{marginRight: "10px"}} onClick={() => this.postNewBookmaker()}>Salva</Button>
                    <Button dark rounded style={{marginLeft: "10px", backgroundColor: "#ff5252"}} onClick={() => this.hideModal()}>Chiudi</Button>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default NewCashBackBookmaker;