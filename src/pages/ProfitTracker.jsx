import React, { Component } from 'react'
import NavBar from "../components/Navbar/Navbar"
import Title from "../components/ToolsTitle"
import SideBar from "../components/ProfitTracker/SideBar"
import { Row, Col } from "react-bootstrap"
import "../styles/_profit-tracker.scss"

export default class ProfitTracker extends Component {
    render() {
        return (
            <div>
                <NavBar />                
                <Title title={"Partite in corso"}/>
                <Row>
                    <Col xs={3}>
                        <SideBar />
                    </Col>
                    <Col xs={9}></Col>
                </Row>      
            </div>
        )
    }
}
