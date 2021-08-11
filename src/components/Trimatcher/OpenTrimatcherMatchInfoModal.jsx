import { React } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  showTrimatcherMatchInfoModal: (payload) =>
    dispatch({
      type: "SHOW_TRIMATCHER_MATCH_INFO_MODAL",
      payload: payload,
    }),
});

function OpenTrimatcherMatchInfoModal(props) {

  return (
    <FontAwesomeIcon
      icon={faInfoCircle}
      style={{ fontSize: "20px", cursor: "pointer" }}
      onClick={() => props.showTrimatcherMatchInfoModal(props.matchInfo)}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTrimatcherMatchInfoModal);
