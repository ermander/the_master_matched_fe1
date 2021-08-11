import React, { useState, useEffect } from "react";

// MaterialUI
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
// SASS
import "../../styles/Dutcher/_dutcher-filters-body.scss";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setFiltersToRedux: (payload) =>
    dispatch({
      type: "ADD_TEMPORARY_ODDS",
      payload: payload,
    }),
});

function TrimatcherFiltersBody(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#3a3b44",
    },
    container: {
      color: "white",
      backgroundColor: "#3a3b44",
    },
    form: {
      margin: "10px 10px",
    },
    button: {
      margin: "5px",
      color: "white",
      borderBottom: "1px solid white",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "10px white",
      },
    },
    sportSwitch: {
      color: "white",
    },
  }));

  const classes = useStyles();
  // The first commit of Material-UI
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [minOdd, setMinOdd] = useState(null);
  const [maxOdd, setMaxOdd] = useState(null);
  const [sportStatus, setSportStatus] = useState({
    checkedAllSports: true,
    checkedCalcio: false,
    checkedBasket: false,
    checkedTennis: false,
  });
  const [marketStatus, setMarketStatus] = useState({
    checkedAllMarkets: true,
    checkedDoppiaChance: false,
    checkedUnderOver: false,
    checkedGoalNoGoal: false,
  });

  let firstFinalDateSet = new Date();
  const currentMonth = firstFinalDateSet.getMonth();
  firstFinalDateSet.setMonth(currentMonth + 2);

  const setFilters = (options) => {
    let odds = props.dutcher.odds;
    props.setFiltersToRedux([]);
    // FILTERING BY MIN AND MAX ODD
    if (options.minOdd !== null) {
      odds = odds.filter(
        (odd) => parseFloat(odd.odd_one) >= parseFloat(options.minOdd)
      );
    }
    if (options.maxOdd !== null) {
      odds = odds.filter(
        (odd) => parseFloat(odd.odd_one) <= parseFloat(options.maxOdd)
      );
    }

    // FILTERING BY SPORT

    // FILTERING BT MARKET
    if (options.marketStatus.checkedAllMarkets === false) {
      if (options.marketStatus.checkedDoppiaChance === false) {
        odds = odds.filter((odd) => odd.market !== "DC");
      }
      if (options.marketStatus.checkedUnderOver === false) {
        odds = odds.filter((odd) => odd.market !== "U/O");
      }
      if (options.marketStatus.checkedGoalNoGoal === false) {
        odds = odds.filter((odd) => odd.market !== "GG/NG");
      }
    }
    // FILTERING BY DATE
    // Deleting odds with no data or time specified
    odds = odds.filter(
      (odd) => odd.start_date !== undefined || odd.start_time !== undefined
    );
    const initialDate = new Date(options.initialDate);
    const finalDate = new Date(options.finalDate);
    // Creating a valid date format
    odds = odds.map((odd) => {
      let date = new Date();
      date.setFullYear(
        parseInt(odd.start_date.split("/")[2]),
        parseInt(odd.start_date.split("/")[1] - 1),
        parseInt(odd.start_date.split("/")[0])
      );
      date.setHours(parseInt(odd.start_time.split(":")[0]));
      date.setMinutes(parseInt(odd.start_time.split(":")[0]));
      return {
        ...odd,
        date,
      };
    });
    // Filtering by start date
    odds = odds.filter((odd) => odd.date.valueOf() >= initialDate.valueOf());
    // Filtering by end date
    odds = odds.filter((odd) => odd.date.valueOf() <= finalDate.valueOf());

    // If the user as select a first bookmaker, filtering based on first bookmaker selection
    if (props.dutcher.firstBookmaker !== null) {
      odds = odds.filter(
        (odd) =>
          odd.book_one.toLowerCase() ===
            props.dutcher.firstBookmaker.toLowerCase() ||
          odd.book_two.toLowerCase() ===
            props.dutcher.firstBookmaker.toLowerCase()
      );
    }

    // UPDATING THE ODDS PROPS
    props.setFiltersToRedux(odds);
    props.handleShow();
  };

  const handleInitialDateChange = (date) => {
    setInitialDate(date);
  };

  const handleFinalDateChange = (date) => {
    setFinalDate(date);
  };

  const handleMinOddChange = (odd) => {
    setMinOdd(parseFloat(odd));
  };

  const handleMaxOddChange = (odd) => {
    setMaxOdd(parseFloat(odd));
  };

  /*
    SETTING SPORT FILTER STATUS
  */

  const handleSportStatus = (event) => {
    if (event.target.name === "checkedAllSports") {
      sportStatus.checkedAllSports === true
        ? setSportStatus({
            checkedAllSports: false,
            checkedCalcio: true,
            checkedBasket: true,
            checkedTennis: true,
          })
        : setSportStatus({
            checkedAllSports: true,
            checkedCalcio: false,
            checkedBasket: false,
            checkedTennis: false,
          });
    }
    if (event.target.name === "checkedCalcio") {
      sportStatus.checkedCalcio === true
        ? setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedCalcio: false,
          })
        : setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedCalcio: true,
          });
    }
    if (event.target.name === "checkedBasket") {
      sportStatus.checkedBasket === true
        ? setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedBasket: false,
          })
        : setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedBasket: true,
          });
    }
    if (event.target.name === "checkedTennis") {
      sportStatus.checkedTennis === true
        ? setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedTennis: false,
          })
        : setSportStatus({
            ...sportStatus,
            checkedAllSports: false,
            checkedTennis: true,
          });
    }
  };

  /*
    SETTING MARKET FILTER STATUS
*/

  const handleMarketStatus = (event) => {
    if (event.target.name === "checkedAllMarkets") {
      marketStatus.checkedAllMarkets === true
        ? setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedDoppiaChance: true,
            checkedUnderOver: true,
            checkedGoalNoGoal: true,
          })
        : setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: true,
            checkedDoppiaChance: false,
            checkedUnderOver: false,
            checkedGoalNoGoal: false,
          });
    }
    if (event.target.name === "checkedDoppiaChance") {
      marketStatus.checkedDoppiaChance === true
        ? setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedDoppiaChance: false,
          })
        : setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedDoppiaChance: true,
          });
    }
    if (event.target.name === "checkedUnderOver") {
      marketStatus.checkedUnderOver === true
        ? setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedUnderOver: false,
          })
        : setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedUnderOver: true,
          });
    }
    if (event.target.name === "checkedGoalNoGoal") {
      marketStatus.checkedGoalNoGoal === true
        ? setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedGoalNoGoal: false,
          })
        : setMarketStatus({
            ...marketStatus,
            checkedAllMarkets: false,
            checkedGoalNoGoal: true,
          });
    }
  };

  /*
        RESET ALL THE FILTERS
    */

  const resetFilters = () => {
    setInitialDate(new Date());
    setFinalDate(new Date());
    setMinOdd(null);
    setMaxOdd(null);
    setSportStatus({
      checkedAllSports: true,
      checkedCalcio: false,
      checkedBasket: false,
      checkedTennis: false,
    });
    setMarketStatus({
      checkedAllMarkets: true,
      checkedDoppiaChance: false,
      checkedUnderOver: false,
      checkedGoalNoGoal: false,
    });
    props.setFiltersToRedux(props.dutcher.odds);
    props.handleShow();
  };

  useEffect(() => {
    setFinalDate(firstFinalDateSet);
  }, []);
  return (
    <>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.paper}>
          <Grid container justify="space-around" className={classes.container}>
            <KeyboardDatePicker
              className={classes.form}
              margin="normal"
              id="date-picker-dialog"
              label="Data d'iniziale"
              format="MM/dd/yyyy"
              value={initialDate}
              onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              className={classes.form}
              margin="normal"
              id="time-picker"
              label="Ora iniziale"
              value={initialDate}
              onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around" className={classes.container}>
            <KeyboardDatePicker
              className={classes.form}
              margin="normal"
              id="date-picker-dialog"
              label="Data finale"
              format="MM/dd/yyyy"
              value={finalDate}
              onChange={handleFinalDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              className={classes.form}
              margin="normal"
              id="time-picker"
              label="Ora finale"
              value={finalDate}
              onChange={handleFinalDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <Grid container justify="space-around" className={classes.container}>
          <TextField
            id="standard-number"
            label="Quota Minima"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="1.5"
            style={{ width: "calc(50% - 20px)" }}
            onChange={(e) => handleMinOddChange(e.currentTarget.value)}
          />

          <TextField
            id="standard-number"
            label="Quota massima"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="3.5"
            style={{ width: "calc(50% - 20px)" }}
            onChange={(e) => handleMaxOddChange(e.currentTarget.value)}
          />
        </Grid>
      </div>
      <Grid container justify="flex-start" className={classes.container}>
        <dvi style={{ width: "calc(50% - 20px)", margin: "0px 10px" }}>
          <h6 style={{ margin: "10px 0" }}>Sports</h6>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={sportStatus.checkedAllSports}
                  onChange={handleSportStatus}
                  name="checkedAllSports"
                />
              }
              label="Tutti gli sport"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={sportStatus.checkedCalcio}
                  onChange={handleSportStatus}
                  name="checkedCalcio"
                />
              }
              label="Calcio"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={sportStatus.checkedBasket}
                  onChange={handleSportStatus}
                  name="checkedBasket"
                />
              }
              label="Basket"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={sportStatus.checkedTennis}
                  onChange={handleSportStatus}
                  name="checkedTennis"
                />
              }
              label="Tennis"
            />
          </FormGroup>
        </dvi>
        <dvi style={{ width: "calc(50% - 20px)", margin: "0px 10px" }}>
          <h6 style={{ margin: "10px 0" }}>Mercati</h6>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={marketStatus.checkedAllMarkets}
                  onChange={handleMarketStatus}
                  name="checkedAllMarkets"
                />
              }
              label="Tutti i mercati"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={marketStatus.checkedDoppiaChance}
                  onChange={handleMarketStatus}
                  name="checkedDoppiaChance"
                />
              }
              label="Doppia Chance"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={marketStatus.checkedUnderOver}
                  onChange={handleMarketStatus}
                  name="checkedUnderOver"
                />
              }
              label="Under/Over"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              className={classes.sportSwitch}
              control={
                <Switch
                  style={{ color: "#7267d3" }}
                  checked={marketStatus.checkedGoalNoGoal}
                  onChange={handleMarketStatus}
                  name="checkedGoalNoGoal"
                />
              }
              label="Goal/NoGoal"
            />
          </FormGroup>
        </dvi>
      </Grid>

      <div>
        <Grid container justify="center" className={classes.container}>
          <Button
            className={classes.button}
            onClick={() =>
              setFilters({
                initialDate,
                finalDate,
                minOdd,
                maxOdd,
                sportStatus,
                marketStatus,
              })
            }
          >
            Applica
          </Button>
          <Button className={classes.button} onClick={resetFilters}>
            Resetta
          </Button>
          <Button className={classes.button} onClick={props.handleShow}>
            Chiudi
          </Button>
        </Grid>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TrimatcherFiltersBody);
