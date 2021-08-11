import React, { useState, useEffect } from "react";

// Redux
import { connect } from "react-redux";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";
import TrimatcherFilters from "../components/Trimatcher/TrimatcherFilters";
import TrimatcherTable from "../components/Trimatcher/TrimatcherTable";

// SASS Styles
import "../styles/Trimatcher/_trimatcher.scss";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

// Functions
import { fetchTrimatcherOdds } from "../components/Trimatcher/functions/fetchTrimatcherOdds";

// Redux State
const mapStateToProps = (state) => state;

// Redux Dispatch
const mapDispatchToProps = (dispatch) => ({
  fetchTrimatcherOdds: () => dispatch(handleFetchTrimatcherOdds()),
});

// Async Redux Functions
const handleFetchTrimatcherOdds = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_TRIMATCHER_MAIN_ODDS",
      payload: [],
    });
    dispatch({
      type: "SET_TRIMATCHER_TEMPORARY_ODDS",
      payload: [],
    });
    const odds = await fetchTrimatcherOdds();
    console.log(odds);
    dispatch({
      type: "SET_TRIMATCHER_MAIN_ODDS",
      payload: odds,
    });
    dispatch({
      type: "SET_TRIMATCHER_TEMPORARY_ODDS",
      payload: odds,
    });
  };
};

function Trimatcher(props) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const refreshTrimatcherOdds = async () => {
    return props.fetchTrimatcherOdds();
  };

  useEffect(() => {
    props.fetchTrimatcherOdds();
  }, []);
  return (
    <>
      <div className="trimatcher-page">
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />
        <div
          className={
            sidebarStatus
              ? "trimatcher-container-collapsed"
              : "trimatcher-container"
          }
        >
          <div className="burger-menu-container">
            <button onClick={collapeSidebar} className="burger-menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="title-container">
            <ToolsTitle title="Tri - Matcher" />
          </div>
          <div className="first-bookmaker-container">
            <Button
              variant="outlined"
              color="primary"
              className="refresh-button"
              onClick={refreshTrimatcherOdds}
            >
              Ricarica
              <RefreshIcon />
            </Button>
            <TrimatcherFilters />
          </div>
          <TrimatcherTable />
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Trimatcher);
