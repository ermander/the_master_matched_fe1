import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

// FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  showDutcherMatchInfoModal: (payload) =>
    dispatch({
      type: "SHOW_DUTCHER_MATCH_INFO_MODAL",
      payload: payload,
    }),
});

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
    width: "80%",
    marginTop: "1.5rem",
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

function DutcherMatchInfoCard(props) {
  const [showStakes, setShowStakes] = useState(false);
  const handleSetShowStakes = () => {
    setShowStakes(true);
  };
  const classes = useStyles();
  const infoes = props.dutcher.matchInfo;

  useEffect(() => {
    console.log(props.dutcher.matchInfo);
  }, []);

  return (
    <>
      <div>
        <Button
          onClick={() => props.showDutcherMatchInfoModal({})}
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
          justifyContent: "center",
        }}
      >
        {" "}
        <Card className={classes.cardInfoesContainer} variant="outlined">
          {props.dutcher.matchInfo.roi !== undefined ? (
            <CardContent>
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
          <TextField
            className={classes.inputFields}
            id="standard-number"
            id="label"
            label="Stake Punta"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="100"
            onChange={() => {}}
          />
          <TextField
            className={classes.inputFields}
            id="standard-number"
            id="label"
            label={`Quota ${infoes.book_one}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={`${infoes.odd_one}`}
            onChange={() => {}}
          />
          <TextField
            className={classes.inputFields}
            id="standard-number"
            id="label"
            label={`Quota ${infoes.book_two}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={`${infoes.odd_two}`}
            onChange={() => {}}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => handleSetShowStakes()}
          >
            Calcola Importi
          </Button>
        </Card>
      </div>
      <div
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
        <p>
          Punta {}€ su {infoes.book_one}
        </p>
        <p>
          Punta {}€ su {infoes.book_two}
        </p>
      </div>
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
          onClick={() => props.showDutcherMatchInfoModal({})}
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
)(DutcherMatchInfoCard);
