import React, { Component } from "react";
// Components
import NewSidebar from "../NewSidebar/NewSidebar";
import DutcherTable from "../Dutcher/DutcherTable";
import FirstBookmakerSelectForm from "./FirstBookmakerSelectForm";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ChartJS
import { faBars } from "@fortawesome/free-solid-svg-icons";

// SASS
import "../../styles/_dutcher.scss";

import { logos } from "../Utils/bookmakersLogos";

// MaterialUI
import { Button } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';


export default class NewDutcher extends Component {
  state = {
    collapsed: false,
    odds: [],
    temporaryOdds: [],
    isLoading: true,
  };

  collapeSidebar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  fetchOdds = async () => {
    this.setState({ isLoading: true, temporaryOdds: [] });
    try {
      const response = await fetch(
        "https://the-master-matched-be-new.herokuapp.com/google-odds/dutcher-odds"
      );
      const parsedResponse = await response.json();
      let odds = parsedResponse.map((odd) => {
        return {
          ...odd,
          event: odd.home + " vs " + odd.away,
          roi: odd.roi.toFixed(2),
          tableRoi: odd.roi.toFixed(2) + "%",
          book_one_image: (
            <img
              src={logos[odd.book_one]}
              alt={logos[odd.book_one] + " logo"}
            />
          ),
          book_two_image: (
            <img
              src={logos[odd.book_two]}
              alt={logos[odd.book_two] + " logo"}
            />
          ),
          book_one: odd.book_one.toLowerCase(),
          book_two: odd.book_two.toLowerCase(),
          match_start: odd.start_date + ", " + odd.start_time,
        };
      });

      odds.sort((a, b) => {
        return b.percentageRoi - a.percentageRoi;
      });
      this.setState({ odds: odds, temporaryOdds: odds, isLoading: false });
      console.log(odds);
    } catch (error) {
      console.log(error);
    }
  };

  refreshOdds = async() => {
    return this.fetchOdds()
  }

  componentDidMount = () => {
    this.fetchOdds();
  };
  render() {
    return (
      <>
        <div className="dutcher-page">
          <NewSidebar
            collapsed={this.state.collapsed}
            className={this.state.collapsed ? "sidebar-collapsed" : "sidebar"}
          />
          <div
            className={
              this.state.collapsed
                ? "dutcher-container-collapsed"
                : "dutcher-container"
            }
          >
            <div className="burger-menu-container">
              <button onClick={this.collapeSidebar} className="burger-menu">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="buttons-container">
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
              <Button variant="outlined" color="primary">
                {" "}
                Filtri{" "}
              </Button>
            </div>
            <div className="first-bookmaker-containter">
              <FirstBookmakerSelectForm />
              <RefreshIcon id="refresh-icon" onClick={this.refreshOdds}/>
            </div>
            <DutcherTable odds={this.state.temporaryOdds} />
          </div>
        </div>
      </>
    );
  }
}
