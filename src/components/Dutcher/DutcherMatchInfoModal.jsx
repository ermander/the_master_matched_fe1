import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";

// Components
import DutcherMatchInfoCard from "./DutcherMatchInfoCard";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  showDutcherMatchInfoModal: (payload) =>
    dispatch({
      type: "SHOW_DUTCHER_MATCH_INFO_MODAL",
      payload: payload,
    }),
});
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

function DutcherMatchInfoModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.dutcher.showDutcherMatchInfoModal}
        onClose={() => props.showDutcherMatchInfoModal({})}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.dutcher.showDutcherMatchInfoModal}>
          <div className={classes.paper}>
            <DutcherMatchInfoCard />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DutcherMatchInfoModal);
