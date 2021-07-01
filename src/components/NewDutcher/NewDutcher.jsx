import React, { useState, useEffect } from 'react'
// Components
import NewSidebar from "../NewSidebar/NewSidebar";
import DutcherTable from "../Dutcher/DutcherTable";
import FirstBookmakerSelectForm from "./FirstBookmakerSelectForm";
import Disclaimer from "../Disclaimer"
import DutcherFilters from "./DutcherFilters"
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ChartJS
import { faBars } from "@fortawesome/free-solid-svg-icons";
// SASS
import "../../styles/_dutcher.scss";
// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ToolsTitle from "../ToolsTitle";
// Functions
import { setBookmaker, fetchOdds } from "./dutcherFunctions"

function NewDutcher() {
  const [sidebarStatus, setSidebarStatus] = useState(false)
  const [mainOdds, setOdds] = useState([])
  const [temporaryOdds, setTemporaryOdds] = useState([])
  const [loading, setLoading] = useState(true)

  const collapeSidebar = () => {
    setSidebarStatus(!sidebarStatus)
  };

  const handleFetchOdds = async () => {
    setLoading(true)
    setTemporaryOdds([])
    setOdds([])
    try {
      const odds = await fetchOdds()
      setOdds(odds)
      setTemporaryOdds(odds)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const refreshOdds = async () => {
    return handleFetchOdds();
  };

  const handleSetBookmaker = (bookmaker) => {
    setTemporaryOdds([])
    setLoading(true)
    const odds = setBookmaker(mainOdds, bookmaker)
    setTemporaryOdds(odds)
    setLoading(false)
  }

  const setFilters = (options) => {
    console.log(options.minOdd)
    console.log("porcodio")
  }

  useEffect(() => {
    handleFetchOdds()
  }, [])


  return (
    <>
    <div className="dutcher-page">
      <NewSidebar
        collapsed={sidebarStatus}
        className={sidebarStatus ? "sidebar-collapsed" : "sidebar"}
      />
      <div
        className={
          sidebarStatus
            ? "dutcher-container-collapsed"
            : "dutcher-container"
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
          <FirstBookmakerSelectForm setFirstBookmaker={handleSetBookmaker}/>
          <Button
            variant="outlined"
            color="primary"
            className="refresh-button"
            onClick={refreshOdds}
          >
            Ricarica
            <RefreshIcon />
          </Button>
          <DutcherFilters setFilters={setFilters}/>
        </div>
        <DutcherTable odds={temporaryOdds} />
        <Disclaimer />
      </div>
    </div>
  </>
  )
}

export default NewDutcher

