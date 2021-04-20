import React, { Component } from 'react'

// Components
import ToolsTitle from "../components/ToolsTitle"
import NavBar from "../components/Navbar/Navbar"
import DataTablePage from '../components/Trimatcher/TrimatcherTable'
import TrimatcherBookmakers from "../components/Trimatcher/TrimatcherBookmakers"
import TrimatcherFiltersModal from '../components/Trimatcher/TrimatcherFiltersModal'
import TrimatcherInfoModal from "../components/Trimatcher/TrimatcherInfoModal"

// React BootStrap
import { Row, Col, Button } from "react-bootstrap"

//SCSS 
import "../styles/_trimatcher.scss"

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons"

// Logos
import { logos } from "../components/Utils/bookmakersLogos"

export default class Trimatcher extends Component {
    state = {
        showBookmakersMoal: false,
        showFilterModal: false,
        showMatchInfoModal: false,
        odds: [],
        matchInfo: {}
    }    

    // Filter modal
    openFilterModal = () => this.setState({showFilterModal: true})
    closeFilterModal = () => this.setState({showFilterModal: false})

    // Bookmaker filter modal
    openBookmakerModal = () => this.setState({showBookmakersMoal: true})
    closeBookmakerModal = () => this.setState({showBookmakersMoal: false})

    // Match Info Modal
    openMatchInfoModal = (odd) => this.setState({ showMatchInfoModal: true, matchInfo: odd })
    closeMatchInfoModal = () => this.setState({ showMatchInfoModal: false, matchInfo: {} })

    // Fetch odds
    fetchOdds = async () => {
        try {
            const response = await fetch("https://the-master-matched-be-new.herokuapp.com/google-odds/trimatcher-odds")
            const parsedResponse = await response.json()
            const rawOdds = parsedResponse.map((odd) => {
                return ({
                    ...odd,
                    event: odd.home + " vs " + odd.away,
                    roi: odd.roi.toFixed(2),
                    tableRoi: odd.roi.toFixed(2) + "%",
                    book_one_image: <img src={logos[odd.book_one]} alt={logos[odd.book_one]} />, 
                    book_two_image: <img src={logos[odd.book_two]} alt={logos[odd.book_two]} />,
                    book_three_image: <img src={logos[odd.book_three]} alt={logos[odd.book_three]} />
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-trimatcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds})
        } catch (error) {
            console.log(error)
        }
    }

    // Refresh Odds
    refreshOdds = async () => {
        try {
            this.setState({odds: []})
            const response = await fetch("https://the-master-matched-be-new.herokuapp.com/google-odds/trimatcher-odds")
            const parsedResponse = await response.json()
            const rawOdds = parsedResponse.map((odd) => {
                return ({
                    ...odd,
                    event: odd.home + " vs " + odd.away,
                    roi: odd.roi.toFixed(2),
                    tableRoi: odd.roi.toFixed(2) + "%",                          
                    book_one_image: <img src={logos[odd.book_one]} alt={logos[odd.book_one]} />, 
                    book_two_image: <img src={logos[odd.book_two]} alt={logos[odd.book_two]} />,
                    book_three_image: <img src={logos[odd.book_three]} alt={logos[odd.book_three]} />              
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-trimatcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = () => {
        this.fetchOdds()
    }

    render() {
        return (
            <div id="trimatcher-container">
                <NavBar />
                <ToolsTitle title={"Trimatcher"} />
                <TrimatcherBookmakers show={this.state.showBookmakersMoal} onHide={this.closeBookmakerModal}/>
                <TrimatcherFiltersModal show={this.state.showFilterModal} onHide={this.closeFilterModal} />
                <TrimatcherInfoModal show={this.state.showMatchInfoModal} onHide={this.closeMatchInfoModal} matchInfo={this.state.matchInfo}/>
                <Row>
                    <Col xs={12} md={5} className="trimatcher-settings-columns">
                        <Button variant="light" onClick={this.openFilterModal}>
                            <span>Opzioni Di Ricerca</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={5} className="trimatcher-settings-columns">
                        <Button variant="light" onClick={this.openBookmakerModal}>
                            <span>Opzioni Bookmakers</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={2} className="trimatcher-settings-columns">
                        <Button className="refresh-button" onClick={this.refreshOdds}>
                            <FontAwesomeIcon icon={faSyncAlt} ></FontAwesomeIcon>
                        </Button>
                    </Col>
                </Row>

                <Row id="trimatcher-table-row">
                    <Col xs={12}>
                        <DataTablePage odds={this.state.odds} />
                    </Col>
                </Row>
            </div>
        )
    }
}

