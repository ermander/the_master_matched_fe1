import React, { useState } from 'react'
import NavBar from "../components/Navbar/Navbar"
import ToolsTitle from "../components/ToolsTitle"
import { Row, Col, Button } from "react-bootstrap"
import odds from "../components/Utils/trimatcherOdds"
import DataTablePage from '../components/Trimatcher/TrimatcherTable'
import TrimatcherBookmakers from "../components/Trimatcher/TrimatcherBookmakers"
import TrimatcherFiltersModal from '../components/Trimatcher/TrimatcherFiltersModal'

export default function Trimatcher() {
    const [showFilterModal, setFilterModal] = useState(false)
    const [showBookmakersMoal, setBookmakersModal] = useState(false)
    
    const showFilters = () => setFilterModal(true)
    const closeFilters = () => setFilterModal(false)

    const showBookmakers = () => setBookmakersModal(true)
    const closeBookmakers = () => setBookmakersModal(false)

    return (
        <div id="trimatcher-container">
            <NavBar />
            <ToolsTitle title={"Trimatcher"} />
            <TrimatcherBookmakers show={showBookmakersMoal} onHide={closeBookmakers}/>
            <TrimatcherFiltersModal show={showFilterModal} onHide={closeFilters} />
            <Row>
                <Col xs={12} md={6} className="trimatcher-settings-columns">
                    <Button variant="light" onClick={showFilters}>
                        <span>Opzioni Di Ricerca</span>
                    </Button>
                </Col>
                <Col xs={12} md={6} className="trimatcher-settings-columns">
                    <Button variant="light" onClick={showBookmakers}>
                        <span>Opzioni Bookmakers</span>
                    </Button>
                </Col>
            </Row>

            <Row id="trimatcher-table-row">
                <Col xs={12}>
                    <DataTablePage odds={odds} />
                </Col>
            </Row>
        </div>
    )
}
