import React, { useState } from "react";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";
import PuntaPuntaCalcolatore from "../components/OfflineTools/PuntaPunta/PuntaPuntaCalcolatore";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS Styles
import "../styles/PuntaPunta/_puntapunta.scss";

function PuntaPunta() {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  return (
    <>
      <div className="punta-punta-page">
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />{" "}
        <div
          className={
            sidebarStatus
              ? "punta-punta-container-collapsed"
              : "punta-punta-container"
          }
        >
          {" "}
          <div className="burger-menu-container">
            <button onClick={collapeSidebar} className="burger-menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="title-container">
            <ToolsTitle title="Punta - Punta" />
          </div>
          <PuntaPuntaCalcolatore />
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export default PuntaPunta;
