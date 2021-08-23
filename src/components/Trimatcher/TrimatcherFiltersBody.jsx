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
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

// Components
import FirstBookmakerSelectForm from "../Trimatcher/FirstBookmakerSelectForm";
import FirstBookmakerAlert from "./FirstBookmakerAlert";

// SASS
import "../../styles/Trimatcher/_trimatcher-filters-body.scss";

// Functions
import { trimatcherFilterOdds } from "./functions/trimatcherFilterOdds";

// React Redux
import { connect } from "react-redux";

// Redux State
const mapStateToProps = (state) => state;

// Redux Dispatch
const mapDispatchToProps = (dispatch) => ({
  setFiltersToRedux: (payload) =>
    dispatch({
      type: "SET_TRIMATCHER_TEMPORARY_ODDS",
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

  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [minOdd, setMinOdd] = useState(null);
  const [maxOdd, setMaxOdd] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  let firstFinalDateSet = new Date();
  const currentMonth = firstFinalDateSet.getMonth();
  firstFinalDateSet.setMonth(currentMonth + 2);

  const setFilters = (options) => {
    // New Filter Method
    let odds;
    // Passing the filters and the odds to the filter function
    if (props.trimatcher.firstBookmaker !== null) {
      // Setting empy the Redux Store
      props.setFiltersToRedux([]);
      odds = trimatcherFilterOdds(
        options,
        props.trimatcher.odds,
        props.trimatcher.firstBookmaker.toLowerCase()
      );
      // UPDATING THE ODDS PROPS
      props.setFiltersToRedux(odds);
      props.handleShow();
    }
    if (props.trimatcher.firstBookmaker === null) {
      setShowAlert(true);
      setTimeout(function () {
        setShowAlert(false);
      }, 2500);
    }
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
        RESET ALL THE FILTERS
    */

  const resetFilters = () => {
    setInitialDate(new Date());
    setFinalDate(new Date());
    setMinOdd(null);
    setMaxOdd(null);
    props.setFiltersToRedux(props.trimatcher.odds);
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
      <FirstBookmakerAlert showAlert={showAlert} />
      <div>
        <Grid
          container
          justify="center"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <FirstBookmakerSelectForm />
        </Grid>
        <Grid container justify="center" className={classes.container}>
          <Button
            className={classes.button}
            onClick={() =>
              setFilters({
                initialDate,
                finalDate,
                minOdd,
                maxOdd,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrimatcherFiltersBody);
