import "date-fns";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
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
// SASS
import "../../styles/_dutcher-filters-body.scss";

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

export default function DutcherFiltersBody({ handleClose, setFilters }) {
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
    handleClose()
  };

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
          <Button className={classes.button} onClick={setFilters({
              initialDate: initialDate,
              finalDate: finalDate,
              minOdd: minOdd,
              maxOdd: maxOdd,
              sportStatus: sportStatus,
              marketStatus: marketStatus
          }, handleClose)}>Applica</Button>
          <Button className={classes.button} onClick={resetFilters}>
            Resetta
          </Button>
          <Button className={classes.button} onClick={handleClose}>
            Chiudi
          </Button>
        </Grid>
      </div>
    </>
  );
}
