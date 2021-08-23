import React, { useState, useEffect } from "react";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// React Redux
import { connect } from "react-redux";

// Components
import TrimatcherMatchInfoCard from "./TrimatcherMatchInfoCard";

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
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  paper: {
    backgroundColor: "#3a3b44",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",
  },
}));

function TrimatcherMatchInfoModal(props) {
  const classes = useStyles();

  useEffect(() => {
  }, []);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.trimatcher.showTrimatcherMatchInfoModal}
        onClose={() => props.showTrimatcherMatchInfoModal({})}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.trimatcher.showTrimatcherMatchInfoModal}>
          <div className={classes.paper}>
            <TrimatcherMatchInfoCard />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrimatcherMatchInfoModal);
