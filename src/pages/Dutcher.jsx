import React from 'react'
import { useState } from "react"
import NavBar from "../components/Navbar/Navbar"
import ToolsTitle from "../components/ToolsTitle"
import { Row, Col, Button } from "react-bootstrap"
import DataTablePage from "../components/Dutcher/DutcherTable"
import DutcherFiltersModal from "../components/Dutcher/DutcherFiltersModal"
import DutcherBookmakers from "../components/Dutcher/DutcherBookmakers"
import "../styles/_dutcher.scss"
import odds from "../components/Utils/dutcherOdds"

export default function Dutcher() {
    const [showFilterModal, setFilterModal] = useState(false)
    const [showBookmakersMoal, setBookmakersModal] = useState(false)
    
    const showFilters = () => setFilterModal(true)
    const closeFilters = () => setFilterModal(false)

    const showBookmakers = () => setBookmakersModal(true)
    const closeBookmakers = () => setBookmakersModal(false)

    return (
        <div id="dutcher-container">
            <NavBar />
            <DutcherFiltersModal show={showFilterModal} onHide={closeFilters}/>
            <DutcherBookmakers show={showBookmakersMoal} onHide={closeBookmakers}/>
            <ToolsTitle title={"Dutcher"}/>
            <Row>
                <Col xs={12} md={6} className="dutcher-settings-columns">
                    <Button variant="light" onClick={showFilters}>
                        <span>Opzioni Di Ricerca</span>
                    </Button>
                </Col>
                <Col xs={12} md={6} className="dutcher-settings-columns">
                    <Button variant="light" onClick={showBookmakers}>
                        <span>Opzioni Bookmakers</span>
                    </Button>
                </Col>
            </Row>
            <Row id="dutcher-table-row">
                <Col xs={12}>
                    <DataTablePage 
                    odds={odds}/>
                </Col>
            </Row>
        </div>
    )
}
