import React, { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";
import PuntaBancaCalcolatore from "../components/OfflineTools/PuntaBanca/PuntaBancaCalcolatore";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS Styles
import "../styles/PuntaBanca/_puntabanca.scss";

// REDUX
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({});

function PuntaBanca() {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  return (
    <>
      <div className="punta-banca-page">
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />
        <div
          className={
            sidebarStatus
              ? "punta-banca-container-collapsed"
              : "punta-banca-container"
          }
        >
          {" "}
          <div className="burger-menu-container">
            <button onClick={collapeSidebar} className="burger-menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="title-container">
            <ToolsTitle title="Punta - Banca" />
          </div>
          <PuntaBancaCalcolatore />
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PuntaBanca);
