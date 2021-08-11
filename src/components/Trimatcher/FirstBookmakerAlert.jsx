import React, { useState } from "react";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

// MaterialUI Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginTop: "1rem"}}>
      <Collapse in={props.showAlert} >
        <Alert variant="outlined" severity="error" style={{color: "white"}}>
          Devi selezionare un bookmaker!
        </Alert>
      </Collapse>
    </div>
  );
}
