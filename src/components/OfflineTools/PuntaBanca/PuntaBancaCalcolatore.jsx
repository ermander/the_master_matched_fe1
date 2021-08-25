import React, { useState } from "react";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Components
import MissingInfoesAlert from "./MissingInfoesAlert";
import ShowStakesAlert from "./ShowStakesAlert";
import UnbalanceBet from "./UnbalanceBet";

import { calculateReturn } from "./calculateReturn";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#3a3b44",
    color: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  cardInfoesContainer: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#3a3b44",
    borderRadius: "0",
    fontSize: "15px",
  },
  inputFields: {
    width: "80%",
    marginTop: "1.5rem",
    color: "white",
    textAlign: "center",
  },
  cardContent: {
    textAlign: "center",
  },
});
function PuntaBancaCalcolatore() {
  const [odd, setOdd] = useState(null);
  const [lay, setLay] = useState(null);
  const [stake, setStake] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [commissions, setCommissions] = useState(null);
  const [value, setValue] = useState(null);
  const [layStake, setLayStake] = useState(null);
  const [profit, setProfit] = useState(null);
  const [alert, showAlert] = useState(false);
  const [stakesAlert, showStakesAlert] = useState(false);

  const closeAlert = () => {
    showAlert(false);
  };
  const closeStakesAlert = () => {
    showStakesAlert(false);
  };

  const handleCalculateReturn = (options) => {
    console.log(options);

    const infoes = calculateReturn({
      odd: options.odd,
      lay: options.lay,
      stake: options.stake,
      bonus: options.bonus,
      commissions: options.commissions,
    });
    console.log(infoes);
    if (infoes.value !== undefined) {
      setValue(infoes.value);
      showAlert(true);
      setTimeout(() => {
        showAlert(false);
      }, 3000);
    } else {
      setLayStake(infoes.layStake);
      setProfit(infoes.profit);
      showStakesAlert(true);
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className="punta-banca-calcolatore-container">
        {" "}
        <Card className={classes.cardInfoesContainer} variant="outlined">
          <div className="form-container">
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Quota Punta"
                type="number"
                placeholder="0.00"
                onChange={(e) => setOdd({ odd: e.currentTarget.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>{" "}
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Valore Puntata"
                type="number"
                placeholder="0€"
                onChange={(e) => setStake({ stake: e.currentTarget.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Valore Bonus"
                type="number"
                placeholder="0€"
                onChange={(e) => setBonus({ bonus: e.currentTarget.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Quota Banca"
                type="number"
                placeholder="0.00"
                onChange={(e) => setLay({ lay: e.currentTarget.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Commissione %"
                type="number"
                placeholder="Es. 0.05%"
                onChange={(e) =>
                  setCommissions({ commissions: e.currentTarget.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </div>
          <div className="punta-banca-slider-container">
            <UnbalanceBet />
          </div>
          <div className="punta-banca-button-container">
            <Button
              onClick={() =>
                handleCalculateReturn({
                  odd,
                  lay,
                  stake,
                  bonus,
                  commissions,
                })
              }
            >
              Calcola
            </Button>
          </div>

          <div className="show-profit">
            <MissingInfoesAlert
              show={alert}
              value={value}
              noShow={closeAlert}
            />
            <ShowStakesAlert
              stake={stake}
              bonus={bonus}
              layStake={layStake}
              profit={profit}
              show={stakesAlert}
              noshow={closeStakesAlert}
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export default PuntaBancaCalcolatore;
