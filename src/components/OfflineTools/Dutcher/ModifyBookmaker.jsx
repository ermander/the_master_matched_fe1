import React, { Component } from 'react';
import { Modal, Form, Alert } from "react-bootstrap"
import { Button } from 'ui-neumorphism'
import authAxios from "../../Utils/http"

class ModifyBookmaker extends Component {
    
    state = {
        nomeBookmaker: "",
        cashback: "",
        showAlert: false
    }

    modifyBookmaker = async () => {

        
        try {
            if(this.state.nomeBookmaker == "" && this.state.cashback == ""){
                console.log("Devi modificare almeno uno dei due valori!")
                this.setState({showAlert: true})
                setTimeout(() => { this.setState({showAlert: false}) }, 2000);
            }else{            
                const data = {
                    _id: this.props.bookmakerInfo._id,
                    name: this.state.nomeBookmaker == "" ? this.props.bookmakerInfo.name : this.state.nomeBookmaker,
                    cashback: this.state.cashback == "" ? parseFloat(this.props.bookmakerInfo.cashback) : parseFloat(this.state.cashback)
                }
                const reponse = await authAxios({
                    method: "post",
                    url: "/cashback-bookmakers/modify-bookmaker",
                    data: data
                })
                console.log(reponse)
                this.props.closeModifyBookmakerModal()
                this.props.reFetchBookmakers()
            }
        } catch (error) {
            console.log(error)
            this.props.closeModifyBookmakerModal()
        }
    }

    componentDidMount = () => {
        console.log(this.props.bookmakerInfo)
    }
    render() {
        return (
            <Modal 
                show={this.props.show}
                onHide={this.props.closeModifyBookmakerModal}
            >
                <Modal.Body style={{backgroundColor: "#2b2f34", textAlign: "center"}}>
                    <h3 style={{color: "white", paddingBottom: "1.5rem", paddingTop: "2.5rem"}}>Modifica Informazioni Bookmaker</h3>
                    <Alert show={this.state.showAlert} variant="danger" style={{fontWeight: "bold", marginRight: "15%", marginLeft: "15%", borderRadius: "25px"}}>Non puoi inserire campi vuoti!</Alert>
                    <Form style={{paddingLeft: "15%", paddingRight: "15%"}}>
                        <Form.Group>
                            <Form.Label 
                                style={{color: "white", fontWeight: "bold"}}
                                >
                                    Nome: {this.props.bookmakerInfo.name}
                                </Form.Label>
                            <Form.Control 
                                style={{borderRadius: "20px"}} 
                                type="text" 
                                placeholder="Modifica nome bookmaker"
                                onChange={(e) => this.setState({ nomeBookmaker: e.currentTarget.value })}
                            />
                        </Form.Group>
                    </Form>
                    <Form style={{paddingLeft: "15%", paddingRight: "15%", paddingTop: "1.5rem"}}>
                        <Form.Group>
                            <Form.Label
                                style={{color: "white", fontWeight: "bold"}}
                            >
                                Cashback Attuale: {this.props.bookmakerInfo.cashback}%
                            </Form.Label>
                            <Form.Control
                                style={{borderRadius: "20px"}} 
                                type="number" 
                                placeholder="Modifica percentuale cashback"
                                onChange={(e) => this.setState({cashback: e.currentTarget.value})}
                                >                                    
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button 
                        dark 
                        rounded 
                        style={{marginRight: "10px", marginTop: "1.5rem", marginBottom: "1.5rem"}}
                        onClick={this.modifyBookmaker}
                    >
                        Salva
                    </Button>
                    <Button 
                        dark 
                        rounded 
                        style={{marginLeft: "10px", backgroundColor: "#ff5252", marginTop: "1.5rem"}} 
                        onClick={this.props.closeModifyBookmakerModal}
                    >
                        Chiudi
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModifyBookmaker;