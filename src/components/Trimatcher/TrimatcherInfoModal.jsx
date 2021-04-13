import React, { Component } from 'react'

// React BootStrap
import { Row, Col, Modal, Button } from "react-bootstrap"

// Book logos
import { logos } from "../Utils/bookmakersLogos"

export default class TrimatcherInfoModal extends Component {
    state = {
        stake: "",
        controPunta: "",
        vincita: ""
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={3} style={{marginTop: "0.5rem"}}>
                            <div className="first-row-cols">
                                <h4>Punta 1</h4>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Vittoria {this.props.matchInfo.home}</p>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Tipo: 1</p>
                            </div>
                            <div className="team-name-container">                          
                                <p className="teams-name">Quota: #{this.props.matchInfo.odd_one}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src={logos[this.props.matchInfo.book_one]} alt={this.props.matchInfo.book_one}/>
                            </div>
                        </Col>
                        <Col xs={12} md={3} style={{marginTop: "0.5rem"}}>
                            <div className="first-row-cols">
                                <h4>Punta X</h4>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Pareggio</p>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Tipo: X</p>
                            </div>
                            <div className="team-name-container">                          
                                <p className="teams-name">Quota: #{this.props.matchInfo.odd_two}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src={logos[this.props.matchInfo.book_two]} alt={this.props.matchInfo.book_two}/>
                            </div>
                        </Col>
                        <Col xs={12} md={3} style={{marginTop: "0.5rem"}}>
                            <div className="first-row-cols">
                                <h4>Punta 2</h4>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Vittoria {this.props.matchInfo.away}</p>
                            </div>
                            <div className="team-name-container">
                                <p className="teams-name">Tipo: 2</p>
                            </div>
                            <div className="team-name-container">                          
                                <p className="teams-name">Quota: #{this.props.matchInfo.odd_three}</p>                            
                            </div>
                            <div className="team-name-container">
                                <img src={logos[this.props.matchInfo.book_three]} alt={this.props.matchInfo.book_three}/>
                            </div>
                        </Col>
                        <Col xs={12} md={3} style={{marginTop: "0.5rem"}}>                          
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
                                        <input type="number" placeholder={this.props.matchInfo.odd_one} onChange={e => this.setState({quota1: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={12} md={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Quota X</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder={this.props.matchInfo.odd_two} onChange={e => this.setState({quota2: e.currentTarget.value}, this.betInfo)}/>
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
                                        <input type="number" placeholder={this.props.matchInfo.odd_three} onChange={e => this.setState({quota2: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} style={{marginTop: "0.5rem"}}>
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
                                        <p className="match-info">{this.props.matchInfo.event}</p>
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
                                        <p className="match-info">{this.props.matchInfo.roi}%</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} style={{marginTop: "0.5rem"}}>
                            <div className="second-row-cols">
                                <h4>Stakes</h4>
                            </div>
                            <Row className="stakes-info-row">
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        <p className="stakes-info">Punta <span>{this.state.stake}€</span> a quota <span>#{this.props.matchInfo.odd_one}</span> su <span>{this.props.matchInfo.book1}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="stakes-info-row">
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        <p className="stakes-info">Punta <span>{this.state.controPunta}€</span> a quota <span>#{this.props.matchInfo.odd_two}</span> su <span>{this.props.matchInfo.book2}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="stakes-info-row">
                                <Col xs={12}>
                                    <div className="stakes-info-container">
                                        <p className="stakes-info">Punta <span>{this.state.controPunta}€</span> a quota <span>#{this.props.matchInfo.odd_three}</span> su <span>{this.props.matchInfo.book2}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="stakes-info-row">
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
                        <Col xs={12} md={4} style={{marginTop: "0.5rem"}}>
                            <div className="second-row-cols">
                                <h4>Salvataggio</h4>
                            </div>
                            <Row className="users-row">
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
                            <Row className="users-row">
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
                            <Row className="users-row">
                                <Col xs={12} md={6}>
                                    <div className="users-container">
                                        <p className="users-info">Utente Book 3</p>
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
                            <Row className="users-row" style={{marginTop: "0.5rem"}}>
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
