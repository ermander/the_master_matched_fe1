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
          severity="error"
          className={classes.alert}
        >
          <p style={{ color: "white", margin: "0" }}>{props.value}</p>
        </Alert>
      </Collapse>
    </div>
  );
}
