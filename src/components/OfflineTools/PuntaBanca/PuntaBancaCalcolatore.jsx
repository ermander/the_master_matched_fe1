import React, { useState } from "react";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { calculateReturn } from "./calculateReturn"

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
                placeholder="5.00%"
                onChange={(e) =>
                  setCommissions({ commissions: e.currentTarget.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </div>
          <div className="punta-banca-button-container">
            <Button
              onClick={() =>
                calculateReturn({
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
        </Card>
      </div>
    </>
  );
}

export default PuntaBancaCalcolatore;
