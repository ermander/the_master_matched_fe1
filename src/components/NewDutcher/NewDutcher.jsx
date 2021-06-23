import React, { Component } from "react";
// Components
import NewSidebar from "../NewSidebar/NewSidebar";
import DutcherTable from "../Dutcher/DutcherTable";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ChartJS
import {
    faBars
  } from "@fortawesome/free-solid-svg-icons";

// Bootstrap
import { Row, Col } from "react-bootstrap";

export default class NewDutcher extends Component {
  state = {
    collapsed: false,
  };
  collapeSidebar = () => {
      this.setState({collapsed: !this.state.collapsed})
  }
  render() {
    return <>
    <div className="dutcher-container">
        <NewSidebar collapsed={this.state.collapsed}/>
        <div className={this.state.collapsed ? "burger-menu-container-collapsed" : "burger-menu-container"}>
            <button onClick={this.collapeSidebar} className={this.state.collapsed ? "burger-menu-collapsed" : "burger-menu"}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
        </div>
        <div className="dutcher-container-right-side">
          <DutcherTable />
        </div>
    </div>
    </>;
  }
}
