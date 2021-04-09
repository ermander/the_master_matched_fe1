import React, { Component } from 'react'

// React BootStrap
import { Modal, Row, Col, Button } from "react-bootstrap"

// SCSS file
import "../../styles/_match-info-modal.scss"

export default class DutcherInfoModal extends Component {
    state={
        stake: "",
        rating: "",
        quota1: "",
        quota2: "",
        controPunta: ""
    }

    betInfo = () => {
        const stake = this.state.stake === "" ? 0 : parseFloat(this.state.stake)
        const quota1 = this.state.quota1 === "" ? parseFloat(this.props.matchInfo.punta1) : parseFloat(this.state.quota1)
        const quota2 = this.state.quota2 === "" ? parseFloat(this.props.matchInfo.punta2) : parseFloat(this.state.quota2)

        const controPunta = Math.round((stake * quota1) / quota2)

        const rawRating = 100 - ((((1 / quota1) + (1 / quota2)) * 100 - 100) * 2)
        const rating = rawRating.toFixed(2)

        this.setState({rating: rating, controPunta: controPunta})
        console.log(this.state.rating, this.state.controPunta)
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} className="dutcher-info-modal">
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={4}>
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
                                <img src="https://lh3.googleusercontent.com/proxy/3CNapF_vH2i1H83rPQRWDkyeI3Fb56iXTNgGTcwPL09kb8sP4ZbyUX6T4GPJONuMKX6rd7yhjukX8gpB-pO1eJM9U6pdmj1WxjBr3Iw9YpCmEdlNk9u0EiKCB9TkoKlfWS-91ZUMfmwLpHJAQfL7Xifv" alt="unibet logo"/>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>                          
                            <div className="first-row-cols">
                                <h4>{this.props.matchInfo.evento}</h4>
                            </div>
                            <Row className="inputs-row">
                                <Col xs={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Stake</p>
                                    </div>
                                </Col>
                                <Col xs={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder="Inserire stake" onChange={e => this.setState({stake: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Quota 1</p>
                                    </div>
                                </Col>
                                <Col xs={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder={this.props.matchInfo.punta1} onChange={e => this.setState({quota1: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={6}>
                                    <div className="inputs-container">
                                        <p className="inputs">Quota 2</p>
                                    </div>
                                </Col>
                                <Col xs={6}>                                    
                                    <div className="inputs-container">
                                        <input type="number" placeholder={this.props.matchInfo.punta2} onChange={e => this.setState({quota2: e.currentTarget.value}, this.betInfo)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="inputs-row">
                                <Col xs={12}>
                                    <Button variant="light">Salva nel gestionale</Button>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
                            <div className="second-row-cols">
                                <h4>Match Info</h4>
                            </div>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Data: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.data}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Ora: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.ora}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Campionato: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.campionato}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Evento: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.evento}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Mercato: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.mercato}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="match-info-row">
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">Rating: </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="match-info-container">
                                        <p className="match-info">{this.props.matchInfo.tableRating}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="second-row-cols">
                                <h4>Stakes</h4>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="second-row-cols">
                                <h4>Guadagni/Perdite</h4>
                            </div>
                            <p>{this.state.controPunta}</p>
                            <p>{this.state.rating}</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

