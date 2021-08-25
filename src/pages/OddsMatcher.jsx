import React, { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";
import FirstBookmakerSelectForm from "../components/Oddsmatcher/FirstBookmakerSelectForm";
import OddsmatcherTable from "../components/Oddsmatcher/OddsmatcherTable";
import OddsmatcherFilters from "../components/Oddsmatcher/OddsmatcherFilters";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS styles
import "../styles/OddsMatcher/_oddsmatcher.scss";

// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

// Functions
import { fetchOddsmatcherOdds } from "../components/Oddsmatcher/functions/fetchOddsmatcherOdds";

// REDUX

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchOddsmatcherOdds: () => dispatch(handleFetchOddsmatcherOdds()),
});

// Async Redux Functions
const handleFetchOddsmatcherOdds = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_ODDSMATCHER_MAIN_ODDS",
      payload: [],
    });
    dispatch({
      type: "SET_ODDSMATCHER_TEMPORARY_ODDS",
      payload: [],
    });
    const odds = await fetchOddsmatcherOdds();
    console.log(odds);
    dispatch({
      type: "SET_ODDSMATCHER_MAIN_ODDS",
      payload: odds,
    });
    dispatch({
      type: "SET_ODDSMATCHER_TEMPORARY_ODDS",
      payload: odds,
    });
  };
};

function OddsMatcher(props) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const refreshOddsmatcherOdds = async () => {
    return props.fetchOddsmatcherOdds();
  };

  useEffect(() => {
    props.fetchOddsmatcherOdds();
  }, []);

  return (
    <>
      <div className="oddsmatcher-page">
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />
        <div
          className={
            sidebarStatus
              ? "oddsmatcher-container-collapsed"
              : "oddsmatcher-container"
          }
        >
          <div className="burger-menu-container">
            <button onClick={collapeSidebar} className="burger-menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="title-container">
            <ToolsTitle title="Odds - Matcher" />
          </div>
          <div className="first-bookmaker-container">
            <FirstBookmakerSelectForm
              setFirstBookmaker={props.setFirstBookmaker}
            />
            <Button
              variant="outlined"
              color="primary"
              className="refresh-button"
              onClick={refreshOddsmatcherOdds}
            >
              Ricarica
              <RefreshIcon />
            </Button>
            <OddsmatcherFilters />
          </div>
          <div className="oddsmatcher-table-container">
            <OddsmatcherTable />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OddsMatcher);
