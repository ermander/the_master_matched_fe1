import React, { Component } from 'react'

// React BootStrap
import { Modal, Row, Col, Button, Form } from "react-bootstrap"

// SCSS file
import "../../styles/_match-info-modal.scss"

export default class DutcherInfoModal extends Component {
    state={
        stake: "100",
        rating: "",
        quota1: "",
        quota2: "",
        controPunta: "",
        vincita: ""
    }

    betInfo = () => {
        const stake = this.state.stake === "100" ? 100 : parseFloat(this.state.stake)
        const quota1 = this.state.quota1 === "" ? parseFloat(this.props.matchInfo.punta1) : parseFloat(this.state.quota1)
        const quota2 = this.state.quota2 === "" ? parseFloat(this.props.matchInfo.punta2) : parseFloat(this.state.quota2)

        const controPunta = Math.round((stake * quota1) / quota2)

        const rawRating = 100 - ((((1 / quota1) + (1 / quota2)) * 100 - 100) * 2)
        const rating = rawRating.toFixed(2)

        const vincita = parseFloat(((stake * quota1) - stake) - controPunta)

        this.setState({rating: rating, controPunta: controPunta, vincita: vincita})
        console.log(this.state.rating, this.state.controPunta)
    }

    componentDidMount = () => {
        this.betInfo()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} className="dutcher-info-modal">
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                            <div className="first-row-cols">
                                <h4>Punta 1</h4>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Casa: {this.props.matchInfo.home}</p>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Tipo: {this.props.matchInfo.yes}</p>
                            </div>
                            <div className="team-name-container">                          
                                <p className="teams-name">Quota: {this.props.matchInfo.punta1}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src="https://acparma.it/wp-content/uploads/2018/06/unibet-logo.png" alt="unibet logo"/>
                            </div>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>                          
                            <div className="first-row-cols">
                                <h4>{this.props.matchInfo.evento}</h4>
                            </div>
                            <Row className="inputs-row">
                                <Col xs={12} md={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Stake</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder="Inserire stake" onChange={e => this.setState({stake: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={12} md={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Quota 1</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder={this.props.matchInfo.punta1} onChange={e => this.setState({quota1: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={12} md={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Quota 2</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder={this.props.matchInfo.punta2} onChange={e => this.setState({quota2: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                            <div className="first-row-cols">
                                <h4>
                                    Punta 2
                                </h4>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Ospite: {this.props.matchInfo.away}</p>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Tipo: {this.props.matchInfo.no}</p>
                            </div>
                            <div className="team-name-container">                          
                                <p className="teams-name">Quota: {this.props.matchInfo.punta2}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src="https://cdn1696.templcdn.com/wp-content/uploads/2018/10/Williamhill-logo.png" alt="William Hill Logo"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                            <div className="second-row-cols">
                                <h4>Match Info</h4>
                            </div>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Data: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.data}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Ora: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.ora}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Campionato: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.campionato}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Evento: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.evento}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Mercato: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.mercato}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Rating: </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.tableRating}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                            <div className="second-row-cols">
                                <h4>Stakes</h4>
                            </div>
                            <Row className="stakes-info-row" style={{marginTop: "1rem"}}>
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        <p className="stakes-info">Punta <span>{this.state.stake}€</span> a quota <span>#{this.props.matchInfo.punta1}</span> su <span>{this.props.matchInfo.book1}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="stakes-info-row" style={{marginTop: "1rem"}}>
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        <p className="stakes-info">Punta <span>{this.state.controPunta}€</span> a quota <span>#{this.props.matchInfo.punta2}</span> su <span>{this.props.matchInfo.book2}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="stakes-info-row" style={{marginTop: "1rem"}}>
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        {
                                            this.state.vincita >= 0 
                                            ?
                                            <p className="stakes-info">Guadagnerai <span>{this.state.vincita}€</span></p>
                                            :
                                            <p className="stakes-info">Perderai <span>{this.state.vincita}€</span></p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>
                            <div className="second-row-cols">
                                <h4>Salvataggio</h4>
                            </div>
                            <Row className="users-row" style={{marginTop: "1rem"}}>
                                <Col xs={12} md={6}>
                                    <div className="users-container">
                                        <p className="users-info">Utente Book 1</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="users-container">
                                        <select>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="users-row" style={{marginTop: "1rem"}}>
                                <Col xs={12} md={6}>
                                    <div className="users-container">
                                        <p className="users-info">Utente Book 2</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="users-container">
                                        <select>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                            <option value="Emanuele Bertuol">Emanuele Bertuol</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="users-row" style={{marginTop: "1rem"}}>
                                <Col xs={12}>
                                    <Button variant="light">Salva</Button>
                                </Col>
                            </Row>

                            <Row className="users-row">
                                <Col xs={12}>
                                    <Button className="close-button" variant="danger" onClick={this.props.onHide}>Chiudi</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}
