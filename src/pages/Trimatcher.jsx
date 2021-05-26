import React, { Component } from 'react'

// Components
import ToolsTitle from "../components/ToolsTitle"
import NavBar from "../components/Navbar/Navbar"
import DataTablePage from '../components/Trimatcher/TrimatcherTable'
import TrimatcherBookmakers from "../components/Trimatcher/TrimatcherBookmakers"
import TrimatcherFiltersModal from '../components/Trimatcher/TrimatcherFiltersModal'
import TrimatcherInfoModal from "../components/Trimatcher/TrimatcherInfoModal"

// React BootStrap
import { Row, Col, Button, Form, Spinner } from "react-bootstrap"

//SCSS 
import "../styles/_trimatcher.scss"

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons"

// Logos
import { logos, bookmakerNames } from "../components/Utils/bookmakersLogos"

export default class Trimatcher extends Component {
    state = {
        showBookmakersMoal: false,
        showFilterModal: false,
        showMatchInfoModal: false,
        odds: [],
        temporaryOdds: [],
        matchInfo: {},
        firstBookmaker: "",
        isLoading: true
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
        this.setState({isLoading: true})
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
                    book_three_image: <img src={logos[odd.book_three]} alt={logos[odd.book_three]} />,
                    book_one: odd.book_one.toLowerCase(),
                    book_two: odd.book_two.toLowerCase(),
                    book_three: odd.book_three.toLowerCase()
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-trimatcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds, temporaryOdds: odds, isLoading: false})
        } catch (error) {
            console.log(error)
        }
    }

    // Refresh Odds
    refreshOdds = async () => {
        this.setState({isLoading: true})
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
                    book_three_image: <img src={logos[odd.book_three]} alt={logos[odd.book_three]} />,
                    book_one: odd.book_one.toLowerCase(),
                    book_two: odd.book_two.toLowerCase(),
                    book_three: odd.book_three.toLowerCase()           
                })
            })
            const odds = rawOdds.map((odd) => {
                return({
                    ...odd,
                    button: <FontAwesomeIcon icon={faPercentage} onClick={() => this.openMatchInfoModal(odd)} id="open-trimatcher-match-info-modal-icon"/>
                })
            })            
            this.setState({odds: odds, temporaryOdds: odds, isLoading: false})
        } catch (error) {
            console.log(error)
        }
    }

    // ReSet Odds
    reSetOdds = () => {
        this.setState({
            temporaryOdds: this.state.odds
        })
    }

    // First Bookmaker filter
    firstBookmakerFilter = () => {
        let odds = this.state.odds
        let input = this.state.firstBookmaker
        this.setState({isLoading: true})

        // First checks if there is any main bookmaker selected
        if(input === "" || input === "Bookmaker Principale"){
            this.setState({temporaryOdds: odds})        }

        if(input === "golgol"){
            odds = odds.filter((odd) => odd.book_one === "golgol" || odd.book_two === "golgol" || odd.book_three === "golgol")
        }
        if(input === "eurobet"){
            odds = odds.filter((odd) => odd.book_one === "eurobet" || odd.book_two === "eurobet" || odd.book_three === "eurobet")
        }
        if(input === "lopoca"){
            odds = odds.filter((odd) => odd.book_one === "lopoca" || odd.book_two === "lopoca" || odd.book_three === "lopoca")
        }
        if(input === "marathonbet"){
            odds = odds.filter((odd) => odd.book_one === "marathonbet" || odd.book_two === "marathonbet" || odd.book_three === "marathonbet")
        }
        if(input === "overplus"){
            odds = odds.filter((odd) => odd.book_one === "overplus" || odd.book_two === "overplus" || odd.book_three === "overplus")
        }
        if(input === "planetwin"){
            odds = odds.filter((odd) => odd.book_one === "planetwin" || odd.book_two === "planetwin" || odd.book_three === "planetwin")
        }
        if(input === "sisal"){
            odds = odds.filter((odd) => odd.book_one === "sisal" || odd.book_two === "sisal" || odd.book_three === "sisal")
        }
        if(input === "starcasino"){
            odds = odds.filter((odd) => odd.book_one === "starcasino" || odd.book_two === "starcasino" || odd.book_three === "starcasino")
        }
        if(input === "vincitu"){
            odds = odds.filter((odd) => odd.book_one === "vincitu" || odd.book_two === "vincitu" || odd.book_three === "vincitu")
        }
        this.setState({temporaryOdds: odds, isLoading: false})
    }

    // Set Filters
    setFilters = (options) => {
        this.setState({isLoading: true})
        console.log(options)

        // Date informations
        let odds = this.state.odds
        let startYear = options.startDate !== "" ? parseInt(options.startDate.split("-")[0]) : NaN
        let startMonth = options.startDate !== "" ? parseInt(options.startDate.split("-")[1]) : NaN
        let startDay = options.startDate !== "" ? parseInt(options.startDate.split("-")[2]) : NaN
        let endYear = options.endDate !== "" ? parseInt(options.endDate.split("-")[0]) : NaN
        let endMonth = options.endDate !== "" ? parseInt(options.endDate.split("-")[1]) : NaN
        let endDay = options.endDate !== "" ? parseInt(options.endDate.split("-")[2]) : NaN
        let startHour = options.startTime !== "" ? parseInt(options.startTime.split(":")[0]) : NaN
        let startMinute = options.startTime !== "" ? parseInt(options.startTime.split(":")[1]) : NaN
        let endHour = options.endTime !== "" ? parseInt(options.endTime.split(":")[0]) : NaN
        let endMinute = options.endTime !== "" ? parseInt(options.endTime.split(":")[1]) : NaN

        // FILTERING ODDS BASE ON START/END OPTIONS
        // Deleting odds with no data or time specified
        odds = odds.filter((odd) => odd.start_date !== undefined && odd.start_time !== undefined)
        // Start Date
        if(!isNaN(startYear) && !isNaN(startMonth) && !isNaN(startDay)){
            odds = odds.filter((odd) => 
                parseInt(odd.start_date.split("/")[0]) >= startDay &&
                parseInt(odd.start_date.split("/")[1]) >= startMonth &&
                parseInt(odd.start_date.split("/")[2]) >= startYear
            )
        }
        // Start Time
        if(!isNaN(startHour) && !isNaN(startMinute)){
            odds = odds.filter((odd) => 
                parseInt(odd.start_time.split(":")[0]) >= startHour 
                //&&
                //parseInt(odd.start_time.split(":")[1]) >= startMinute
            )
            // odds = odds.filter((odd) => 
            //     parseInt(odd.start_time.split(":")[1]) >= startMinute
            // )
        }

        // End Date
        if(!isNaN(endYear) && !isNaN(endMonth) && !isNaN(endDay)){
            odds = odds.filter((odd) => 
                parseInt(odd.start_date.split("/")[0]) <= endDay &&
                parseInt(odd.start_date.split("/")[1]) <= endMonth &&
                parseInt(odd.start_date.split("/")[2]) <= endYear
            )
        }
        // End Time
        if(!isNaN(endHour) && !isNaN(endMinute)){
            odds = odds.filter((odd) => 
                parseInt(odd.start_time.split(":")[0]) <= endHour
                // &&
                // parseInt(odd.start_time.split(":")[1]) <= startMinute   
            )
        }

        // Filter odds based on Min and Max odd
        if(this.state.firstBookmaker !== "" || this.state.firstBookmaker !== "Bookmaker Principale"){
            // Min Odd
            if(!isNaN(options.minOdd)){
                odds = odds.filter((odd) => 
                    (
                        odd.book_one === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_one) >= options.minOdd
                    )
                    ||
                    (
                        odd.book_two === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_two) >= options.minOdd
                    )
                    ||
                    (
                        odd.book_three === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_three) >= options.minOdd
                    )
                ) 
            }
            // Max Odd
            if(!isNaN(options.maxOdd)){
                odds = odds.filter((odd) => 
                    (
                        odd.book_one === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_one) <= options.maxOdd
                    )
                    ||
                    (
                        odd.book_two === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_two) <= options.maxOdd
                    )
                    ||
                    (
                        odd.book_three === bookmakerNames[this.state.firstBookmaker] 
                        && 
                        parseFloat(odd.odd_three) <= options.maxOdd
                    )
                ) 
            }
        }

        this.setState({
            temporaryOdds: odds,
            isLoading: false,
            showFilterModal: false
        })
    }

    componentDidMount = () => {
        this.fetchOdds()
    }

    render() {
        return (
            <div id="trimatcher-container">
                <NavBar />
                <ToolsTitle title={"Trimatcher"} />
                <TrimatcherBookmakers 
                    show={this.state.showBookmakersMoal} 
                    onHide={this.closeBookmakerModal}
                />
                <TrimatcherFiltersModal 
                    show={this.state.showFilterModal} 
                    onHide={this.closeFilterModal} 
                    setFilters={this.setFilters}
                    reSetOdds={this.reSetOdds}
                />
                <TrimatcherInfoModal 
                    show={this.state.showMatchInfoModal} 
                    onHide={this.closeMatchInfoModal} 
                    matchInfo={this.state.matchInfo}
                />
                <Row>
                    <Col xs={12} md={4} className="trimatcher-settings-columns">
                        <Button variant="light" onClick={this.openFilterModal}>
                            <span>Opzioni Di Ricerca</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={4} className="trimatcher-settings-columns">
                        <Button variant="light" onClick={this.openBookmakerModal}>
                            <span>Opzioni Bookmakers</span>
                        </Button>
                    </Col>
                    <Col xs={12} md={2} className="trimatcher-settings-columns">
                    <Form>
                        <Form.Group>
                            <Form.Control as="select" onChange={(e) => this.setState({firstBookmaker: e.currentTarget.value.toLowerCase()}, this.firstBookmakerFilter)}>
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
                    <Col xs={12} md={2} className="trimatcher-settings-columns">
                        <Button className="refresh-button" onClick={this.refreshOdds}>
                            <FontAwesomeIcon icon={faSyncAlt} ></FontAwesomeIcon>
                        </Button>
                    </Col>
                </Row>

                <Row id="trimatcher-table-row">
                    <Col xs={12}>
                        {
                            this.state.isLoading ?
                            (
                                <Spinner animation="grow" />
                            )
                            :
                            (
                                <DataTablePage odds={this.state.temporaryOdds} />                                
                            )
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

