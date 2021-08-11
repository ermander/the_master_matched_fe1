import React, { useState, useEffect } from "react";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// React Redux
import { connect } from "react-redux";

// FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Bookmakers Links
import { links } from "../Utils/bookmakersLinks";

// Functions
import { calcBettingStakes } from "./functions/calcBettingStakes";
import { firstCalcBettingStakes } from "./functions/firstCalcBettingStakes"

// Redux State
const mapStateToProps = (state) => state;

// Redux Dispatch
const mapDispatchToProps = (dispatch) => ({
  showTrimatcherMatchInfoModal: (payload) =>
    dispatch({
      type: "SHOW_TRIMATCHER_MATCH_INFO_MODAL",
      payload: payload,
    }),
});

// MaterialUI Styles
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
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardInfoesContainer: {
    width: "50%",
    border: "1px solid black",
    color: "white",
    backgroundColor: "#3a3b44",
    borderRadius: "0",
    marginRight: "5px",
    fontSize: "15px",
  },
  cartInputContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: "#3a3b44",
    color: "white",
    border: "1px solid black",
    borderRadius: "0",
    marginLeft: "5px",
    padding: "16px",
  },
  inputFields: {
    width: "45%",
    marginTop: "1.5rem",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  inputFieldsOdds: {
    width: "95%",
    marginTop: "1.5rem",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  button: {
    marginTop: "1.5rem",
    color: "white",
    border: "none",
    borderBottom: "1px solid white",
    borderRadius: "0",
    "&:hover": {
      border: "none",
      borderBottom: "1px solid white",
      borderRadius: "0",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
});

function TrimatcherMatchInfoCard(props) {
  const [showStakes, setShowStakes] = useState(false);
  // Stake forms
  // 1
  const [stakeLay1, setStakeLay1] = useState("");
  const [bonusLay1, setBonusLay1] = useState("");
  // X
  const [stakeLayX, setStakeLayX] = useState("");
  const [bonusLayX, setBonusLayX] = useState("");
  // 2
  const [stakeLay2, setStakeLay2] = useState("");
  const [bonusLay2, setBonusLay2] = useState("");
  // Odd 1 value
  const [odd1, setOdd1] = useState("");
  // Odd X value
  const [oddX, setOddX] = useState("");
  // Odd 2 value
  const [odd2, setOdd2] = useState("");
  // Stake shown to the user
  const [stakeBook1, setStakeBook1] = useState(null);
  const [stakeBookX, setStakeBookX] = useState(null);
  const [stakeBook2, setStakeBook2] = useState(null);
  // Profit/Loss
  const [profit, setProfit] = useState("");

  const handleSetShowStakes = () => {
    setShowStakes(true);
  };

  // CALCULATING STAKES
  const handleCalcBettingStakes = (options) => {
    const bettingInfoes = calcBettingStakes(options);

    // if (bonusCalc === 0) {
    //   const stakeBookTwo = (stakeCalc * oddOneCalc) / oddTwoCalc;
    //   const profit = stakeCalc * oddOneCalc - stakeBookTwo - stakeCalc;
    //   setProfit(profit.toFixed(2));
    //   setStakeBookOne(stakeCalc);
    //   setStakeBookTwo(parseFloat(stakeBookTwo.toFixed(0)));
    // }
    // if (bonusCalc !== 0) {
    //   const stakeBookTwo = ((stakeCalc + bonusCalc) * oddOneCalc) / oddTwoCalc;
    //   const profit =
    //     (stakeCalc + bonusCalc) * oddOneCalc - stakeBookTwo - stakeCalc;

    // setProfit(profit.toFixed(2));
    // setStakeBookOne(stakeCalc);
    // setStakeBookTwo(parseFloat(stakeBookTwo.toFixed(0)));
  };

  const classes = useStyles();
  const infoes = props.trimatcher.matchInfo;

  useEffect(() => {
    console.log(props.trimatcher.matchInfo);
    firstCalcBettingStakes(infoes.odd_one, infoes.odd_two, infoes.odd_three)
  }, []);

  return (
    <>
      <div>
        <Button
          onClick={() => props.showTrimatcherMatchInfoModal({})}
          style={{
            position: "relative",
            top: "0px",
            left: "95%",
            marginBottom: "0.7rem",
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px" }} />{" "}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {" "}
        <Card className={classes.cardInfoesContainer} variant="outlined">
          {props.trimatcher.matchInfo.roi !== undefined ? (
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>
                Squadra Casa:{" "}
                <strong style={{ marginLeft: "10px" }}>{infoes.home}</strong>
              </p>
              <p>
                Squadra Ospite:{" "}
                <strong style={{ marginLeft: "10px" }}>{infoes.away}</strong>
              </p>
              <p>
                Data ed Ora d'Inizio:{" "}
                <strong style={{ marginLeft: "10px" }}>
                  {infoes.start_date}, {infoes.start_time}
                </strong>
              </p>
              <p>
                Paese:{" "}
                <strong style={{ marginLeft: "10px" }}>{infoes.nation}</strong>
              </p>
              <p>
                Camptionato:{" "}
                <strong style={{ marginLeft: "10px" }}>
                  {infoes.tournament}
                </strong>
              </p>
              <p>
                Mercato:{" "}
                <strong style={{ marginLeft: "10px" }}>{infoes.market}</strong>
              </p>
              <p>
                Rating:
                <strong style={{ marginLeft: "10px" }}>
                  {infoes.roi.toFixed(2)}%
                </strong>{" "}
              </p>
            </CardContent>
          ) : (
            /* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */
            <></>
          )}
        </Card>
        <Card className={classes.cartInputContainer} variant="outlined">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Punta 1"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="100"
              onChange={(e) =>
                setStakeLay1({
                  stakeLay1:
                    e.currentTarget.value === ""
                      ? 100
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Bonus 1"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="0"
              onChange={(e) =>
                setBonusLay1({
                  bonusLay1:
                    e.currentTarget.value === ""
                      ? 0
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
          </div>

          <TextField
            className={classes.inputFieldsOdds}
            id="standard-number"
            id="label"
            label={`Quota ${infoes.book_one}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={`${infoes.odd_one}`}
            onChange={(e) =>
              setOdd1({
                odd1:
                  e.currentTarget.value === ""
                    ? parseFloat(infoes.odd_one)
                    : parseFloat(e.currentTarget.value),
              })
            }
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Punta X"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="100"
              onChange={(e) =>
                setStakeLayX({
                  stakeLayX:
                    e.currentTarget.value === ""
                      ? 100
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Bonus X"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="0"
              onChange={(e) =>
                setBonusLayX({
                  bonusLayX:
                    e.currentTarget.value === ""
                      ? 0
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
          </div>
          <TextField
            className={classes.inputFieldsOdds}
            id="standard-number"
            id="label"
            label={`Quota ${infoes.book_two}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={`${infoes.odd_two}`}
            onChange={(e) =>
              setOddX({
                oddX:
                  e.currentTarget.value === ""
                    ? parseFloat(infoes.odd_two)
                    : parseFloat(e.currentTarget.value),
              })
            }
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Punta 2"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="100"
              onChange={(e) =>
                setStakeLay2({
                  stakeLay2:
                    e.currentTarget.value === ""
                      ? 100
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
            <TextField
              className={classes.inputFields}
              id="standard-number"
              id="label"
              label="Stake Bonus 2"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="0"
              onChange={(e) =>
                setBonusLay2({
                  bonusLay2:
                    e.currentTarget.value === ""
                      ? 0
                      : parseFloat(e.currentTarget.value),
                })
              }
            />
          </div>
          <TextField
            className={classes.inputFieldsOdds}
            id="standard-number"
            id="label"
            label={`Quota ${infoes.book_three}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={`${infoes.odd_three}`}
            onChange={(e) =>
              setOdd2({
                odd2:
                  e.currentTarget.value === ""
                    ? parseFloat(infoes.odd_two)
                    : parseFloat(e.currentTarget.value),
              })
            }
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() =>
              handleCalcBettingStakes({
                stakeLay1,
                bonusLay1,
                stakeLayX,
                bonusLayX,
                stakeLay2,
                bonusLay2,
                odd1,
                oddX,
                odd2,
                odd_one: infoes.odd_one,
                odd_two: infoes.odd_two,
                odd_three: infoes.odd_three,
              })
            }
          >
            Calcola Importi
          </Button>
        </Card>
      </div>
      {/* <div
        style={
          showStakes
            ? {
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                textAlign: "center",
                color: "white",
              }
            : {
                display: "none",
              }
        }
      >
        {infoes.book_one !== undefined ? (
          <>
            <p>
              Punta
              <strong> {stakeBookOne}€ </strong>
              su{" "}
              <strong>
                {" "}
                <a href={links[infoes.book_one.toLowerCase()]} target="_blank">
                  {infoes.book_one}
                </a>
              </strong>
            </p>
            <p>
              Punta <strong>{stakeBookTwo}€</strong> su
              <strong>
                {" "}
                <a href={links[infoes.book_two.toLowerCase()]} target="_blank">
                  {infoes.book_two}
                </a>
              </strong>
            </p>
            <p>
              Guadagnerai{" "}
              {profit >= 0 ? (
                <strong style={{ color: "green" }}>{profit}</strong>
              ) : (
                <strong style={{ color: "red" }}>{profit}</strong>
              )}
              €
            </p>
          </>
        ) : (
          <></>
        )}
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.showTrimatcherMatchInfoModal({})}
          className={classes.button}
          style={{ marginRight: "5px" }}
        >
          Chiudi
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          className={classes.button}
          stule={{ marginLeft: "5px" }}
        >
          Salva
        </Button>
      </div>
    </>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrimatcherMatchInfoCard);
