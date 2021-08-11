import React, { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Components
import Sidebar from "../components/Sidebar/Sidebar";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";
import DutcherTable from "../components/Dutcher/DutcherTable";
import FirstBookmakerSelectForm from "../components/Dutcher/FirstBookmakerSelectForm";
import DutcherFilters from "../components/Dutcher/DutcherFilters";
import DutcherMatchInfoModal from "../components/Dutcher/DutcherMatchInfoModal";


// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS Styles
import "../styles/Dutcher/_dutcher.scss";

// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

// Functions
import { fetchOdds } from "../components/Dutcher/dutcherFunctions";

// REDUX
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setFirstBookmaker: (payload) =>
    dispatch({
      type: "SET_FIRST_BOOKMAKER",
      payload: payload,
    }),
  // FETCH ODDS
  fetchOdds: () => dispatch(handleFetchOdds()),
});

const handleFetchOdds = () => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_MAIN_ODDS",
      payload: [],
    });
    dispatch({
      type: "ADD_TEMPORARY_ODDS",
      payload: [],
    });
    const odds = await fetchOdds();
    dispatch({
      type: "ADD_MAIN_ODDS",
      payload: odds,
    });
    dispatch({
      type: "ADD_TEMPORARY_ODDS",
      payload: odds,
    });
  };
};

export const Dutcher = (props) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const refreshOdds = async () => {
    return props.fetchOdds();
  };

  useEffect(() => {
    props.fetchOdds();
  }, []);
  return (
    <>
      <div className="dutcher-page">
        <DutcherMatchInfoModal />
        <Sidebar
          collapsed={sidebarStatus}
          className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
        />
        <div
          className={
            sidebarStatus ? "dutcher-container-collapsed" : "dutcher-container"
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
              onClick={refreshOdds}
            >
              Ricarica
              <RefreshIcon />
            </Button>
            <DutcherFilters />
          </div>
          <DutcherTable />
          <Disclaimer />
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Dutcher);
