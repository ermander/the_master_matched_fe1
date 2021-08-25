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
import UnbalancedBet from "./UnbalancedBet";
import AdvancedSwitch from "./AdvancedSwitch";

// Redux
import { connect } from "react-redux";

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

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setUnbalancedBet: () =>
    dispatch({
      type: "SET_PUNTA_UNBALANCED_BET",
      payload: 100,
    }),
  deleteUnbalancedBet: () =>
    dispatch({
      type: "DELETE_PUNTA_UNBALANCED_BET",
      payload: null,
    }),
});

function PuntaPuntaCalcolatore(props) {
  const [oddOne, setOddOne] = useState(null);
  const [oddTwo, setOddTwo] = useState(null);
  const [stake, setStake] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [value, setValue] = useState(null);
  const [coverBet, setCoverBet] = useState(null);
  const [profitOne, setProfitOne] = useState(null);
  const [profitTwo, setProfitTwo] = useState(null);
  const [alert, showAlert] = useState(false);
  const [stakesAlert, showStakesAlert] = useState(false);

  // State for the advanced bet mode switch
  const [switchState, setSwitchState] = useState(false);

  const handleSetSwitchState = () => {
    setSwitchState(!switchState);
    if (!switchState) {
      props.setUnbalancedBet();
    } else {
      props.deleteUnbalancedBet();
    }
  };
  const closeAlert = () => {
    showAlert(false);
  };
  const closeStakesAlert = () => {
    showStakesAlert(false);
  };
  const classes = useStyles();

  return (
    <>
      <div className="punta-punta-calcolatore-container">
        <Card className={classes.cardInfoesContainer} variant="outlined">
          <div className="punta-punta-switch-container">
            <AdvancedSwitch
              switchState={switchState}
              setSwitchState={handleSetSwitchState}
            />
          </div>
          <div className="form-container">
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Quota Punta 1"
                type="number"
                placeholder="@0.00"
                onChange={(e) => setOddOne({ odd: e.currentTarget.value })}
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
                label="Quota Punta 2"
                type="number"
                placeholder="@0.00"
                onChange={(e) => setOddTwo({ oddTwo: e.currentTarget.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </div>
          <div className="form-container">
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.inputFields}
                id="standard-number"
                id="label"
                label="Valore Puntata"
                type="number"
                placeholder="0€"
                onChange={(e) =>
                  setStake({
                    stake:
                      e.currentTarget.value === "" ? 0 : e.currentTarget.value,
                  })
                }
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
                label="Valore Bonus"
                type="number"
                placeholder="0€"
                onChange={(e) =>
                  setBonus({
                    bonus:
                      e.currentTarget.value === "" ? 0 : e.currentTarget.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
          </div>
          <div
            className={
              switchState
                ? "punta-banca-slider-container"
                : "punta-banca-slider-container-hide"
            }
          >
            <UnbalancedBet />
          </div>
          <div className="punta-punta-button-container">
            <Button
            //   onClick={() =>
            //     handleCalculateReturn({
            //       oddOne,
            //       oddTwo,
            //       stake,
            //       bonus,
            //       unbalancedBet: props.puntaBanca.unbalancedBet,
            //     })
            //   }
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
              coverBet={coverBet}
              profitOne={profitOne}
              profitTwo={profitTwo}
              show={stakesAlert}
              noshow={closeStakesAlert}
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PuntaPuntaCalcolatore);
