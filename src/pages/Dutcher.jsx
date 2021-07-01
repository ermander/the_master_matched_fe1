import React, { Component } from "react";

// Components
import NavBar from "../components/Navbar/Navbar";
import DataTablePage from "../components/Dutcher/DutcherTable";
import DutcherFiltersModal from "../components/Dutcher/DutcherFiltersModal";
import DutcherBookmakers from "../components/Dutcher/DutcherBookmakers";
import DutcherInfoModal from "../components/Dutcher/DutcherInfoModal";
import ToolsTitle from "../components/ToolsTitle";
import Disclaimer from "../components/Disclaimer";

// React Bootstrap
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";

// SCSS file
import "../styles/_dutcher.scss";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

// Logos
import { logos, bookmakerNames } from "../components/Utils/bookmakersLogos";


export default class Dutcher extends Component {
  state = {
    showFilterModal: false,
    showBookmakersModal: false,
    showMatchInfoModal: false,
    odds: [],
    temporaryOdds: [],
    matchInfo: {},
    isLoading: true,
    firstBookmaker: "",
    all: true,
    dc: false,
    uo: false,
    ggNg: false,
  };

  // Filter Modals
  openfilterModal = () => this.setState({ showFilterModal: true });
  closeFilterModal = () => this.setState({ showFilterModal: false });

  // Bookmakers Modal
  openBookmakersModal = () => this.setState({ showBookmakersModal: true });
  closeBookmakersModal = () => this.setState({ showBookmakersModal: false });

  // Match Info Modal
  openMatchInfoModal = (odd) =>
    this.setState({ showMatchInfoModal: true, matchInfo: odd });
  closeMatchInfoModal = () =>
    this.setState({ showMatchInfoModal: false, matchInfo: {} });

  // Sets Filters
  setFilters = (options) => {
    console.log(options);
    let odds = this.state.odds;
    console.log("prima" + odds.length + "options" + options.uo)
    
    this.setState({ isLoading: true, temporaryOdds: odds });
    for(let i = 0; i<200; i++){
      console.log(odds[i].market)
    }
    // Filter based on market

    const allStatus = options.all
    const dcStatus = options.dc
    const uoStatus = options.uo
    const ggNgStatus = options.ggNg

    // Start to filter the odds only if the all market options is not true
    if(allStatus === false){
      console.log("Entro nel filtro per all")
      // If the DC filter is false, we filter out all the DC odds.
      // If it's false, the user do not want to see them, soo we mantain only the other odds.
      if(dcStatus === false){
        console.log("Entro nel filtro per la DC")
        for(let i = 0; i < odds.length; i++){
          //odds[i].market === "DC" ? odds.slice(i) : odds[i].market = odds[i].market
        }
      }
      if(uoStatus === false){
        odds = odds.filter((odd) => odd.market !== "U/O")
      }
      if(ggNgStatus === false){
        odds = odds.filter((odd) => odd.market !== "GG/NG")
      }
    }

    console.log("dopo" + odds.length)

    // Date informations
    let startYear =
      options.startDate !== ""
        ? parseInt(options.startDate.split("-")[0])
        : NaN;
    let startMonth =
      options.startDate !== ""
        ? parseInt(options.startDate.split("-")[1])
        : NaN;
    let startDay =
      options.startDate !== ""
        ? parseInt(options.startDate.split("-")[2])
        : NaN;
    let endYear =
      options.endDate !== "" ? parseInt(options.endDate.split("-")[0]) : NaN;
    let endMonth =
      options.endDate !== "" ? parseInt(options.endDate.split("-")[1]) : NaN;
    let endDay =
      options.endDate !== "" ? parseInt(options.endDate.split("-")[2]) : NaN;
    let startHour =
      options.startTime !== ""
        ? parseInt(options.startTime.split(":")[0])
        : NaN;
    let startMinute =
      options.startTime !== ""
        ? parseInt(options.startTime.split(":")[1])
        : NaN;
    let endHour =
      options.endTime !== "" ? parseInt(options.endTime.split(":")[0]) : NaN;
    let endMinute =
      options.endTime !== "" ? parseInt(options.endTime.split(":")[1]) : NaN;

    // FILTERING ODDS BASE ON START/END OPTIONS
    // Deleting odds with no data or time specified
    odds = odds.filter(
      (odd) => odd.start_date !== undefined && odd.start_time !== undefined
    );
    // Start Date
    if (!isNaN(startYear) && !isNaN(startMonth) && !isNaN(startDay)) {
      odds = odds.filter(
        (odd) =>
          parseInt(odd.start_date.split("/")[0]) >= startDay &&
          parseInt(odd.start_date.split("/")[1]) >= startMonth &&
          parseInt(odd.start_date.split("/")[2]) >= startYear
      );
    }
    // Start Time
    if (!isNaN(startHour) && !isNaN(startMinute)) {
      odds = odds.filter(
        (odd) => parseInt(odd.start_time.split(":")[0]) >= startHour
        //&&
        //parseInt(odd.start_time.split(":")[1]) >= startMinute
      );
      // odds = odds.filter((odd) =>
      //     parseInt(odd.start_time.split(":")[1]) >= startMinute
      // )
    }

    // End Date
    if (!isNaN(endYear) && !isNaN(endMonth) && !isNaN(endDay)) {
      odds = odds.filter(
        (odd) =>
          parseInt(odd.start_date.split("/")[0]) <= endDay &&
          parseInt(odd.start_date.split("/")[1]) <= endMonth &&
          parseInt(odd.start_date.split("/")[2]) <= endYear
      );
    }
    // End Time
    if (!isNaN(endHour) && !isNaN(endMinute)) {
      odds = odds.filter(
        (odd) => parseInt(odd.start_time.split(":")[0]) <= endHour
        // &&
        // parseInt(odd.start_time.split(":")[1]) <= startMinute
      );
    }

    // Filter odds based on Min and Max odd
    if (
      this.state.firstBookmaker !== "" ||
      this.state.firstBookmaker !== "Bookmaker Principale"
    ) {
      // Min Odd
      if (!isNaN(options.minOdd)) {
        odds = odds.filter(
          (odd) =>
            (odd.book_one === bookmakerNames[this.state.firstBookmaker] &&
              parseFloat(odd.odd_one) >= options.minOdd) ||
            (odd.book_two === bookmakerNames[this.state.firstBookmaker] &&
              parseFloat(odd.odd_two) >= options.minOdd)
        );
      }
      // Max Odd
      if (!isNaN(options.maxOdd)) {
        odds = odds.filter(
          (odd) =>
            (odd.book_one === bookmakerNames[this.state.firstBookmaker] &&
              parseFloat(odd.odd_one) <= options.maxOdd) ||
            (odd.book_two === bookmakerNames[this.state.firstBookmaker] &&
              parseFloat(odd.odd_two) <= options.minOdd)
        );
      }
      console.log(logos);
    }
    this.setState({
      temporaryOdds: odds,
      isLoading: false,
      showFilterModal: false,
    });
    console.log(odds);
  };

  // Fetching odds and adding the button
  fetchOdds = async () => {
    this.setState({ isLoading: true });
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
        };
      });

      for (let i = 0; i < odds.length; i++) {
        console.log(odds[i].market);
        if (odds[i].book_one === "overplus" && odds[i].odd_one >= 2) {
          const odd_one = parseFloat(odds[i].odd_one);
          const odd_two = parseFloat(odds[i].odd_two);

          const layStake = Math.floor((odd_one * 100) / odd_two);
          const rawRoi = 100 * odd_one - layStake - 100 + 2.5;
          const rawAbsoluteRoi = rawRoi.toFixed(2);
          const absoluteRoi = parseFloat(rawAbsoluteRoi);

          const initialValue = 100 + layStake;
          const finalValue = initialValue + absoluteRoi;
          const percentageRoi = (
            ((finalValue - initialValue) / initialValue) *
            100
          ).toFixed(2);
          odds[i] = {
            ...odds[i],

            tablePercentageRoi: percentageRoi + "%",
            percentageRoi: percentageRoi,
            button: (
              <FontAwesomeIcon
                icon={faPercentage}
                onClick={() => this.openMatchInfoModal(odds[i])}
                id="open-dutcher-match-info-modal-icon"
              />
            ),
          };
        } else if (odds[i].book_two === "overplus" && odds[i].odd_two >= 2) {
          const odd_one = parseFloat(odds[i].odd_one);
          const odd_two = parseFloat(odds[i].odd_two);

          const layStake = Math.floor((odd_two * 100) / odd_one);
          const rawRoi = 100 * odd_two - layStake - 100 + 2.5;
          const rawAbsoluteRoi = rawRoi.toFixed(2);
          const absoluteRoi = parseFloat(rawAbsoluteRoi);

          const initialValue = 100 + layStake;
          const finalValue = initialValue + absoluteRoi;
          const percentageRoi = (
            ((finalValue - initialValue) / initialValue) *
            100
          ).toFixed(2);
          odds[i] = {
            ...odds[i],

            tablePercentageRoi: percentageRoi + "%",
            percentageRoi: percentageRoi,
            button: (
              <FontAwesomeIcon
                icon={faPercentage}
                onClick={() => this.openMatchInfoModal(odds[i])}
                id="open-dutcher-match-info-modal-icon"
              />
            ),
          };
        } else if (odds[i].book_one === "golgol" && odds[i].odd_one >= 2) {
          const odd_one = parseFloat(odds[i].odd_one);
          const odd_two = parseFloat(odds[i].odd_two);

          const layStake = Math.floor((odd_one * 100) / odd_two);
          const rawRoi = 100 * odd_one - layStake - 100 + 2;
          const rawAbsoluteRoi = rawRoi.toFixed(2);
          const absoluteRoi = parseFloat(rawAbsoluteRoi);

          const initialValue = 100 + layStake;
          const finalValue = initialValue + absoluteRoi;
          const percentageRoi = (
            ((finalValue - initialValue) / initialValue) *
            100
          ).toFixed(2);
          odds[i] = {
            ...odds[i],

            tablePercentageRoi: percentageRoi + "%",
            percentageRoi: percentageRoi,
            button: (
              <FontAwesomeIcon
                icon={faPercentage}
                onClick={() => this.openMatchInfoModal(odds[i])}
                id="open-dutcher-match-info-modal-icon"
              />
            ),
          };
        } else if (odds[i].book_two === "golgol" && odds[i].odd_two >= 2) {
          const odd_one = parseFloat(odds[i].odd_one);
          const odd_two = parseFloat(odds[i].odd_two);

          const layStake = Math.floor((odd_two * 100) / odd_one);
          const rawRoi = 100 * odd_two - layStake - 100 + 2;
          const rawAbsoluteRoi = rawRoi.toFixed(2);
          const absoluteRoi = parseFloat(rawAbsoluteRoi);

          const initialValue = 100 + layStake;
          const finalValue = initialValue + absoluteRoi;
          const percentageRoi = (
            ((finalValue - initialValue) / initialValue) *
            100
          ).toFixed(2);
          odds[i] = {
            ...odds[i],

            tablePercentageRoi: percentageRoi + "%",
            percentageRoi: percentageRoi,
            button: (
              <FontAwesomeIcon
                icon={faPercentage}
                onClick={() => this.openMatchInfoModal(odds[i])}
                id="open-dutcher-match-info-modal-icon"
              />
            ),
          };
        } else if (
          odds[i].book_one === "golgol" &&
          odds[i].book_two === "overplus" &&
          (odds[i].odd_one >= 2 || odds[i].odd_two >= 2)
        ) {
          if (odds[i].odd_one >= 2 && odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const layStakeCashBack = (layStake / 100) * 2.5;
            const rawRoi =
              100 * odd_one - layStake - 100 + 2 + layStakeCashBack;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (odds[i].odd_one >= 2 && !odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const rawRoi = 100 * odd_one - layStake - 100 + 2;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (!odds[i].odd_one >= 2 && odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_two * 100) / odd_one);
            const rawRoi = 100 * odd_one - layStake - 100 + 2.5;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (!odds[i].odd_one >= 2 && !odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const rawRoi = 100 * odd_one - layStake - 100;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);
            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
        } else if (
          odds[i].book_one === "overplus" &&
          odds[i].book_two === "golgol" &&
          (odds[i].odd_one >= 2 || odds[i].odd_two >= 2)
        ) {
          if (odds[i].odd_one >= 2 && odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const layStakeCashBack = (layStake / 100) * 2;
            const rawRoi =
              100 * odd_one - layStake - 100 + 2.5 + layStakeCashBack;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (!odds[i].odd_one >= 2 && odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_two * 100) / odd_one);
            const rawRoi = 100 * odd_two - layStake - 100 + 2.5;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (odds[i].odd_one >= 2 && !odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const rawRoi = 100 * odd_one - layStake - 100 + 2.5;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);

            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
          if (!odds[i].odd_one >= 2 && !odds[i].odd_two >= 2) {
            const odd_one = parseFloat(odds[i].odd_one);
            const odd_two = parseFloat(odds[i].odd_two);
            const layStake = Math.floor((odd_one * 100) / odd_two);
            const rawRoi = 100 * odd_one - layStake - 100;
            const rawAbsoluteRoi = rawRoi.toFixed(2);
            const absoluteRoi = parseFloat(rawAbsoluteRoi);
            const initialValue = 100 + layStake;
            const finalValue = initialValue + absoluteRoi;
            const percentageRoi = (
              ((finalValue - initialValue) / initialValue) *
              100
            ).toFixed(2);
            odds[i] = {
              ...odds[i],

              tablePercentageRoi: percentageRoi + "%",
              percentageRoi: percentageRoi,
              button: (
                <FontAwesomeIcon
                  icon={faPercentage}
                  onClick={() => this.openMatchInfoModal(odds[i])}
                  id="open-dutcher-match-info-modal-icon"
                />
              ),
            };
          }
        } else {
          const odd_one = parseFloat(odds[i].odd_one);
          const odd_two = parseFloat(odds[i].odd_two);
          const layStake = Math.floor((odd_one * 100) / odd_two);
          const rawRoi = 100 * odd_one - layStake - 100;
          const rawAbsoluteRoi = rawRoi.toFixed(2);
          const absoluteRoi = parseFloat(rawAbsoluteRoi);
          const initialValue = 100 + layStake;
          const finalValue = initialValue + absoluteRoi;
          const percentageRoi = (
            ((finalValue - initialValue) / initialValue) *
            100
          ).toFixed(2);
          odds[i] = {
            ...odds[i],

            tablePercentageRoi: percentageRoi + "%",
            percentageRoi: percentageRoi,
            button: (
              <FontAwesomeIcon
                icon={faPercentage}
                onClick={() => this.openMatchInfoModal(odds[i])}
                id="open-dutcher-match-info-modal-icon"
              />
            ),
          };
        }
      }
      odds.sort((a, b) => {
        return b.percentageRoi - a.percentageRoi;
      });
      this.setState({ odds: odds, temporaryOdds: odds, isLoading: false });
      console.log(odds);
    } catch (error) {
      console.log(error);
    }
  };

  // Refresh odds
  refreshOdds = async () => {
    this.setState({ isLoading: true });
    try {
      this.setState({ odds: [] });
      const response = await fetch(
        "https://the-master-matched-be-new.herokuapp.com/google-odds/dutcher-odds"
      );
      const parsedResponse = await response.json();
      const rawOdds = parsedResponse.map((odd) => {
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
        };
      });
      let odds = rawOdds.map((odd) => {
        return {
          ...odd,
          button: (
            <FontAwesomeIcon
              icon={faPercentage}
              onClick={() => this.openMatchInfoModal(odd)}
              id="open-dutcher-match-info-modal-icon"
            />
          ),
        };
      });
      this.setState({ odds: odds, temporaryOdds: odds, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  // ReSet Odds
  reSetOdds = () => {
    this.setState({
      temporaryOdds: this.state.odds,
      all: true,
      dc: false,
      uo: false,
      ggNg: false,
    });
  };

  // First Bookmaker filter
  firstBookmakerFilter = () => {
    let odds = this.state.odds;
    let input = this.state.firstBookmaker;
    this.setState({ isLoading: true });

    // First checks if there is any main bookmaker selected
    if (input === "" || input === "Bookmaker Principale")
      this.setState({ temporaryOdds: odds });
    if (input === "golgol")
      odds = odds.filter(
        (odd) => odd.book_one === "golgol" || odd.book_two === "golgol"
      );
    if (input === "eurobet")
      odds = odds.filter(
        (odd) => odd.book_one === "eurobet" || odd.book_two === "eurobet"
      );
    if (input === "lopoca")
      odds = odds.filter(
        (odd) => odd.book_one === "lopoca" || odd.book_two === "lopoca"
      );
    if (input === "marathonbet")
      odds = odds.filter(
        (odd) =>
          odd.book_one === "marathonbet" || odd.book_two === "marathonbet"
      );
    if (input === "overplus")
      odds = odds.filter(
        (odd) => odd.book_one === "overplus" || odd.book_two === "overplus"
      );
    if (input === "planetwin")
      odds = odds.filter(
        (odd) => odd.book_one === "planetwin" || odd.book_two === "planetwin"
      );
    if (input === "sisal")
      odds = odds.filter(
        (odd) => odd.book_one === "sisal" || odd.book_two === "sisal"
      );
    if (input === "starcasino")
      odds = odds.filter(
        (odd) => odd.book_one === "starcasino" || odd.book_two === "starcasino"
      );
    if (input === "vincitu")
      odds = odds.filter(
        (odd) => odd.book_one === "vincitu" || odd.book_two === "vincitu"
      );

    this.setState({ temporaryOdds: odds, isLoading: false });
  };

  componentDidMount = () => {
    this.fetchOdds();
  };

  render() {
    return (
      <div id="dutcher-container">
        <NavBar />
        <DutcherFiltersModal
          show={this.state.showFilterModal}
          onHide={this.closeFilterModal}
          setFilters={this.setFilters}
          reSetOdds={this.reSetOdds}
        />
        <DutcherBookmakers
          show={this.state.showBookmakersModal}
          onHide={this.closeBookmakersModal}
        />
        <DutcherInfoModal
          show={this.state.showMatchInfoModal}
          onHide={this.closeMatchInfoModal}
          matchInfo={this.state.matchInfo}
        />
        <ToolsTitle title={"Dutcher"} />
        <Row>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Button variant="light" onClick={this.openfilterModal}>
              <span>Opzioni Di Ricerca</span>
            </Button>
          </Col>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Button variant="light" onClick={this.openBookmakersModal}>
              <span>Opzioni Bookmakers</span>
            </Button>
          </Col>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Form>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    this.setState(
                      { firstBookmaker: e.currentTarget.value.toLowerCase() },
                      this.firstBookmakerFilter
                    )
                  }
                >
                  <option>Bookmaker Principale</option>
                  <option>GolGol</option>
                  <option>Eurobet</option>
                  <option>Lopoca</option>
                  <option>MarathonBet</option>
                  <option>OverPlus</option>
                  <option>PlanetWin365</option>
                  <option>Sisal</option>
                  <option>StarCasino</option>
                  <option>VinciTu</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Button className="refresh-button">
              <strong>Filtra Per Rating</strong>
            </Button>
          </Col>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Button className="refresh-button">
              <strong>Filtra Per ROI</strong>
            </Button>
          </Col>
          <Col xs={12} md={2} className="dutcher-settings-columns">
            <Button className="refresh-button" onClick={this.refreshOdds}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </Button>
          </Col>
        </Row>
        <Row id="dutcher-table-row">
          <Col xs={12}>
            {this.state.isLoading ? (
              <Spinner animation="grow" />
            ) : (
              <DataTablePage odds={this.state.temporaryOdds} />
            )}
          </Col>
        </Row>
        <Disclaimer />
      </div>
    );
  }
}
