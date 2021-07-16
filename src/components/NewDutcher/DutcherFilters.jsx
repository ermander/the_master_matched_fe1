import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

// Components
import DutcherFiltersBody from "./DutcherFiltersBody";

export default function DutcherFilters(props, closeDutcherFilterModal) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    openModalButton: {
      color: "white",
      marginLeft: "10px",
      borderBottom: "1px solid white",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "10px white",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Button
        type="button"
        onClick={props.openDutcherFilterModal}
        className={classes.openModalButton}
      >
        Filtri
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showDutcherFilterModal}
        onClose={props.closeDutcherFilterModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showDutcherFilterModal}>
          <div className={classes.paper}>
            <DutcherFiltersBody
              handleClose={props.closeDutcherFilterModal}
              setFilters={() => props.setFilters}
              filterOdds={props.filterOdds}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
