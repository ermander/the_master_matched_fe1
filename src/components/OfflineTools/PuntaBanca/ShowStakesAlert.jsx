import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    margin: "1rem",
  },
}));

export default function TransitionAlerts(props) {
  const classes = useStyles();
  const stake = props.stake === null ? 0 : parseFloat(props.stake.stake);
  const bonus = props.bonus === null ? 0 : parseFloat(props.bonus.bonus);
  const layStake = props.layStake === null ? 0 : parseFloat(props.layStake);

  return (
    <div className={classes.root}>
      <Collapse in={props.show}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                props.noShow();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="outlined"
          severity="success"
          className={classes.alert}
        >
          <p style={{ color: "white", margin: "0" }}>Punta {stake + bonus}€</p>
          <p style={{ color: "white", margin: "0" }}>Banca {layStake}€</p>
          <p style={{ color: "white", margin: "0" }}>
            Guadagnerai {props.profit}€
          </p>
        </Alert>
      </Collapse>
    </div>
  );
}
