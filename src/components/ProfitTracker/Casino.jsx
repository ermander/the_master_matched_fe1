import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import Title from "../ToolsTitle";
import SideBar from "../ProfitTracker/SideBar";
import CasinoNewTrackModal from "./CasinoNewTrackModal";

export default class Casino extends Component {
  state = {
    show: false,
  };

  openCasinoNewTrackModal = () => {
      this.setState({show: true})
  }

  closeCasinoNewTrackModal = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <div>
        <NavBar />
        <Title title={"Casino"} />
        <Row>
          <Col xs={1} id="sidebar_col">
            <SideBar />
          </Col>
          <Col xs={11} id="casino_section_container">
            <div id="casino_button_container">
              <Button onClick={this.openCasinoNewTrackModal}>Nuova Giocata</Button>
              <CasinoNewTrackModal show={this.state.show} onHide={this.closeCasinoNewTrackModal}/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
