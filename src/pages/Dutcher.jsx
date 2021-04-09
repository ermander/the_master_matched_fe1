import React, { Component } from 'react'

// Components
import NavBar from "../components/Navbar/Navbar"
import DataTablePage from "../components/Dutcher/DutcherTable"
import DutcherFiltersModal from "../components/Dutcher/DutcherFiltersModal"
import DutcherBookmakers from "../components/Dutcher/DutcherBookmakers"
import DutcherInfoModal from "../components/Dutcher/DutcherInfoModal"
import ToolsTitle from "../components/ToolsTitle"

// React Bootstrap
import { Row, Col, Button } from "react-bootstrap"

// SCSS file
import "../styles/_dutcher.scss"

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from "@fortawesome/free-solid-svg-icons"

// Odds
import oddss from "../components/Utils/dutcherOdds"

export default class Dutcher extends Component {
    state={
        showFilterModal: false,
        showBookmakersModal: false,
        showMatchInfoModal: false,
        odds: [],
        matchInfo: {}
    }

    // Filter Modals
    openfilterModal = () => this.setState({ showFilterModal: true })
    closeFilterModal = () => this.setState({ showFilterModal: false })

    // Bookmakers Modal
    openBookmakersModal = () => this.setState({ showBookmakersModal: true })
    closeBookmakersModal = () => this.setState({ showBookmakersModal: false })

    // Match Info Modal
    openMatchInfoModal = (odd) => this.setState({ showMatchInfoModal: true, matchInfo: odd })
    closeMatchInfoModal = () => this.setState({ showMatchInfoModal: false, matchInfo: {} })

    // Adding the button for opening the match info modal
    addButton = () => {
        const newOdds = oddss.map((odd) => {
            return ({
                ...odd,
                button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-match-info-modal-icon"/>
            })
        })        
        this.setState({odds: newOdds})
    }

    componentDidMount = () => {
        this.addButton()
    }

    render() {
        return (
            <div id="dutcher-container">
                <NavBar />
                <DutcherFiltersModal show={this.state.showFilterModal} onHide={this.closeFilterModal}/>
                <DutcherBookmakers show={this.state.showBookmakersModal} onHide={this.closeBookmakersModal}/>
                <DutcherInfoModal show={this.state.showMatchInfoModal} onHide={this.closeMatchInfoModal} matchInfo={this.state.matchInfo}/>
                <ToolsTitle title={"Dutcher"}/>
                <Row>
                    <Col xs={12} md={6} className="dutcher-settings-columns">
                        <Button variant="light" onClick={this.openfilterModal}>
                            <span>Opzioni Di Ricerca</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={6} className="dutcher-settings-columns">
                        <Button variant="light" onClick={this.openBookmakersModal}>
                            <span>Opzioni Bookmakers</span>
                        </Button>
                    </Col>
                </Row>
                <Row id="dutcher-table-row">
                    <Col xs={12}>
                        <DataTablePage odds={this.state.odds}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

