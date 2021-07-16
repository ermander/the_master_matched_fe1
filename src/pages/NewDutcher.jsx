import React, { useState, useEffect } from "react";
// Redux
import { connect } from "react-redux";
// Components
import NewSidebar from "../components/NewSidebar/NewSidebar";
import DutcherTable from "../components/Dutcher/DutcherTable";
import FirstBookmakerSelectForm from "../components/NewDutcher/FirstBookmakerSelectForm";
import Disclaimer from "../components/Disclaimer";
import DutcherFilters from "../components/NewDutcher/DutcherFilters";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ChartJS
import { faBars } from "@fortawesome/free-solid-svg-icons";
// SASS
import "../styles/_new-dutcher.scss";
// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ToolsTitle from "../components/ToolsTitle";
// Functions
import {
  setBookmaker,
  fetchOdds,
} from "../components/NewDutcher/dutcherFunctions";

// REDUX
const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  openDutcherFilterModal: () => {
    dispatch({
      type: "OPEN_DUTCHER_FILTER_MODAL",
    });
  },

  closeDutcherFilterModal: (payload) => {
    // Action creator
    dispatch({
      type: "CLOSE_DUTCHER_FILTER_MODAL",
      payload: payload,
    });
  },
});

export const NewDutcher = (props) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [mainOdds, setOdds] = useState([]);
  const [temporaryOdds, setTemporaryOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  console.log(props)

  const handleFetchOdds = async () => {
    setLoading(true);
    setTemporaryOdds([]);
    setOdds([]);
    try {
      const odds = await fetchOdds();
      setOdds(odds);
      setTemporaryOdds(odds);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshOdds = async () => {
    return handleFetchOdds();
  };

  const handleSetBookmaker = (bookmaker) => {
    setTemporaryOdds([]);
    setLoading(true);
    const odds = setBookmaker(mainOdds, bookmaker);
    setTemporaryOdds(odds);
    setLoading(false);
  };

  const filterOdds = (options) => {
    setFilters(options);
  };

  const updateOddsWithFilter = (props) => {
    console.log(props + "props")
    let odds = mainOdds;

    // Filtering by min and max odd
    if (filters.minOdd) {
      odds = odds.filter((odd) => (parseFloat(odd.odd_one) > parseFloat(filters.minOdd)));
    }

    if (filters.maxOdd) {
      odds = odds.filter((odd) => (parseFloat(odd.odd_one) < parseFloat(filters.maxOdd)));
    }
    setTemporaryOdds(odds);
  };

  useEffect(() => {
    handleFetchOdds();
  }, []);

  useEffect(() => {
    setFilters(props.dutcherFilters);
  }, [props.dutcherFilters]);

  useEffect(() => {
    updateOddsWithFilter();
  }, [filters]);

  return (
    <>
      <div className="dutcher-page">
        <NewSidebar
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
          <div className="first-bookmaker-containter">
            <FirstBookmakerSelectForm setFirstBookmaker={handleSetBookmaker} />
            <Button
              variant="outlined"
              color="primary"
              className="refresh-button"
              onClick={refreshOdds}
            >
              Ricarica
              <RefreshIcon />
            </Button>
            <DutcherFilters
              setFilters={setFilters}
              openDutcherFilterModal={props.openDutcherFilterModal}
              showDutcherFilterModal={props.showDutcherFilterModal}
              closeDutcherFilterModal={props.closeDutcherFilterModal}
              filterOdds={filterOdds}
            />
          </div>
          <DutcherTable odds={temporaryOdds} />
          <Disclaimer />
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NewDutcher);
