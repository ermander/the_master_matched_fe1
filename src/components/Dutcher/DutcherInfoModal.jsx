import React, { Component } from 'react'

// React BootStrap
import { Modal, Row, Col, Button, Form } from "react-bootstrap"

import { logos } from "../Utils/bookmakersLogos"

// SCSS file
import "../../styles/_match-info-modal.scss"

export default class DutcherInfoModal extends Component {
    state={
        stake: "100",
        rating: "",
        odd_one: "",
        odd_two: "",
        controPunta: "",
        vincita: ""
    }

    betInfo = () => {
        const stake = this.state.stake === "100" ? 100 : parseFloat(this.state.stake)
        const odd_one = this.state.odd_one === "" ? parseFloat(this.props.matchInfo.odd_one) : parseFloat(this.state.odd_one)
        const odd_two = this.state.odd_two === "" ? parseFloat(this.props.matchInfo.odd_two) : parseFloat(this.state.odd_two)

        const controPunta = Math.round((stake * odd_one) / odd_two)

        const rawRating = 100 - ((((1 / odd_one) + (1 / odd_two)) * 100 - 100) * 2)
        const rating = rawRating.toFixed(2)

        const vincita = parseFloat(((stake * odd_one) - stake) - controPunta).toFixed(2)

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
                                <p className="teams-name">Quota: {this.props.matchInfo.odd_one}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src={logos[this.props.matchInfo.book_one]} alt=""/>
                            </div>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "1rem"}}>                          
                            <div className="first-row-cols">
                                <h4>{this.props.matchInfo.home} vs {this.props.matchInfo.away}</h4>
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
                                        <input type="number" placeholder={this.props.matchInfo.odd_one} onChange={e => this.setState({odd_one: e.currentTarget.value}, this.betInfo)}/>
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
                                        <input type="number" placeholder={this.props.matchInfo.odd_two} onChange={e => this.setState({odd_two: e.currentTarget.value}, this.betInfo)}/>
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
                                <p className="teams-name">Quota: {this.props.matchInfo.odd_two}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src={logos[this.props.matchInfo.book_two]} alt={this.props.matchInfo.book_two + " Logo" }/>
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
                                        <p className="match-info">{this.props.matchInfo.start_date}</p>
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
                                        <p className="match-info">{this.props.matchInfo.start_time}</p>
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
                                        <p className="match-info">{this.props.matchInfo.tournament}</p>
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
                                        <p className="match-info">{this.props.matchInfo.home} vs {this.props.matchInfo.away}</p>
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
                                        <p className="match-info">{this.props.matchInfo.market}</p>
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
                                        <p className="match-info">{this.props.matchInfo.tableRoi}%</p>
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

