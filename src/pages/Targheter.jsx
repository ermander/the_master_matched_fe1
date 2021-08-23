import React, { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS Styles
import "../styles/Targheter/_targheter.scss";
// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

// REDUX
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({});

function Targheter() {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  return (
    <>
      <div className="targheter-page">
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />
        <div
          className={
            sidebarStatus
              ? "targheter-container-collapsed"
              : "targheter-container"
          }
        >
          {" "}
          <div className="burger-menu-container">
            <button onClick={collapeSidebar} className="burger-menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="title-container">
            <ToolsTitle title="Targheter" />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Targheter);
