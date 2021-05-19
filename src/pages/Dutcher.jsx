import React, { Component } from 'react'

// Components
import NavBar from "../components/Navbar/Navbar"
import DataTablePage from "../components/Dutcher/DutcherTable"
import DutcherFiltersModal from "../components/Dutcher/DutcherFiltersModal"
import DutcherBookmakers from "../components/Dutcher/DutcherBookmakers"
import DutcherInfoModal from "../components/Dutcher/DutcherInfoModal"
import ToolsTitle from "../components/ToolsTitle"

// React Bootstrap
import { Row, Col, Button, Form } from "react-bootstrap"

// SCSS file
import "../styles/_dutcher.scss"

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons"

// Logos
import { logos } from "../components/Utils/bookmakersLogos"

export default class Dutcher extends Component {
    state={
        showFilterModal: false,
        showBookmakersModal: false,
        showMatchInfoModal: false,
        odds: [],
        matchInfo: {},
        firstBookmaker: "Bookmaker Principale"
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

    // Fetching odds and adding the button
    fetchOdds = async () => {
        try {
            const response = await fetch("https://the-master-matched-be-new.herokuapp.com/google-odds/dutcher-odds")
            const parsedResponse = await response.json()
            const rawOdds = parsedResponse.map((odd) => {
                return ({
                    ...odd,
                    event: odd.home + " vs " + odd.away,
                    roi: odd.roi.toFixed(2),
                    tableRoi: odd.roi.toFixed(2) + "%",
                    book_one_image: <img src={logos[odd.book_one]} alt={logos[odd.book_one] + " logo"}/>,
                    book_two_image: <img src={logos[odd.book_two]} alt={logos[odd.book_two] + " logo"}/>,
                    book_one: odd.book_one.toLowerCase(),
                    book_two: odd.book_two.toLowerCase()
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-dutcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds})
        } catch (error) {
            console.log(error)
        }
    }

    // Refresh odds
    refreshOdds = async () => {
        try {
            this.setState({odds: []})
            const response = await fetch("https://the-master-matched-be-new.herokuapp.com/google-odds/dutcher-odds")
            const parsedResponse = await response.json()
            const rawOdds = parsedResponse.map((odd) => {
                return ({
                    ...odd,
                    event: odd.home + " vs " + odd.away,
                    roi: odd.roi.toFixed(2),
                    tableRoi: odd.roi.toFixed(2) + "%",    
                    book_one_image: <img src={logos[odd.book_one]} alt={logos[odd.book_one] + " logo"}/>,
                    book_two_image: <img src={logos[odd.book_two]} alt={logos[odd.book_two] + " logo"}/>                
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-dutcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds})
        } catch (error) {
            console.log(error)
        }
    }

    // First Bookmaker filter
    firstBookmakerFilter = () => {
        let odds = this.state.odds
        let input = this.state.firstBookmaker

        if(input === "" || input === "Bookmaker Principale"){
            this.setState({odds: odds})
        }

        if(input === "GolGol"){
            odds = odds.filter((odd) => odd.book_one)
        }
        if(input === "Eurobet"){
            
        }
        if(input === "Lopoca"){
            
        }
        if(input === "MarathonBet"){
            
        }
        if(input === "OverPlus"){
            
        }
        if(input === "PlanetWin365"){
            
        }
        if(input === "Sisal"){
            
        }
        if(input === "StarCasino"){
            
        }
        if(input === "VinciTu"){
            
        }
    } 

    componentDidMount = () => {
        this.fetchOdds()
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
                    <Col xs={12} md={4} className="dutcher-settings-columns">
                        <Button variant="light" onClick={this.openfilterModal}>
                            <span>Opzioni Di Ricerca</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={4} className="dutcher-settings-columns">
                        <Button variant="light" onClick={this.openBookmakersModal}>
                            <span>Opzioni Bookmakers</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={2} className="dutcher-settings-columns">
                        <Form>
                        <Form.Group>
                            <Form.Control as="select" onChange={(e) => console.log(e.currentTarget.value)}>
                            <option>Bookmaker Principale</option>
                            <option>GolGol</option>
                            <option>Eurobet</option>
                            <option>Lopoca</option>
                            <option>MarathonBet</option>
                            <option>OverPlus</option>
                            <option>PlanetWin365</option>
                            <option>Sisal</option>
                            <option>StarCasino</option>
                            <option>VinciTu</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} md={2} className="dutcher-settings-columns">
                        <Button className="refresh-button" onClick={this.refreshOdds}>
                            <FontAwesomeIcon icon={faSyncAlt}/>
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

