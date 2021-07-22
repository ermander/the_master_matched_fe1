import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    svg: {
      color: "white",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white",
  },
  button: {
    color: "white",
    borderBottom: "1px solid white",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  dialog: {
    backgroundColor: "#3a3b44",
    color: "white",
  },
  input: {
    color: "white",
  },
  select: {
    border: "none",
  },
}));

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  saveFirstBookmaker: (payload) =>
    dispatch({
      type: "SAVE_FIRST_BOOKMAKER",
      payload: payload,
    }),
});

function FirstBookmakerSelectForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bookmaker, setBookmaker] = React.useState("");

  const handleChange = (event) => {
    setBookmaker(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setFirstBookmaker = (firstBookmaker) => {
    let odds = props.dutcher.odds;
    if (firstBookmaker !== "") {
      if (firstBookmaker.toLowerCase() === "golgol") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "golgol" ||
            odd.book_two.toLowerCase() === "golgol"
        );
      }
      if (firstBookmaker.toLowerCase() === "eurobet") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "eurobet" ||
            odd.book_two.toLowerCase() === "eurobet"
        );
      }
      if (firstBookmaker.toLowerCase() === "lopoca") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "lopoca" ||
            odd.book_two.toLowerCase() === "lopoca"
        );
      }
      if (firstBookmaker.toLowerCase() === "marathonbet") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "marathonbet" ||
            odd.book_two.toLowerCase() === "marathonbet"
        );
      }
      if (firstBookmaker.toLowerCase() === "overplus") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "overplus" ||
            odd.book_two.toLowerCase() === "overplus"
        );
      }
      if (firstBookmaker.toLowerCase() === "planetwin") {
        odds = odds.filter(
          (odd) => odd.book_one === "planetwin" || odd.book_two === "planetwin"
        );
      }
      if (firstBookmaker.toLowerCase() === "sisal") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "sisal" ||
            odd.book_two.toLowerCase() === "sisal"
        );
      }
      if (firstBookmaker.toLowerCase() === "starcasino") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "starcasino" ||
            odd.book_two.toLowerCase() === "starcasino"
        );
      }
      if (firstBookmaker.toLowerCase() === "vincitu") {
        odds = odds.filter(
          (odd) =>
            odd.book_one.toLowerCase() === "vincitu" ||
            odd.book_two.toLowerCase() === "vincitu"
        );
      }
      props.setFirstBookmaker(odds);
      props.saveFirstBookmaker(firstBookmaker);
      handleClose();
    }
  };
  return (
    <div>
      <Button onClick={handleClickOpen} className={classes.button}>
        Bookmaker
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.dialog}>
          Seleziona il bookmaker
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="demo-dialog-select-label"
                className={classes.input}
              >
                Book...
              </InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={bookmaker}
                onChange={handleChange}
                input={<Input />}
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"GolGol"}>GolGol</MenuItem>
                <MenuItem value={"Eurobet"}>Eurobet</MenuItem>
                <MenuItem value={"Lopoca"}>Lopoca</MenuItem>
                <MenuItem value={"MarathonBet"}>MarathonBet</MenuItem>
                <MenuItem value={"OverPlus"}>OverPlus</MenuItem>
                <MenuItem value={"PlanetWin365"}>PlanetWin365</MenuItem>
                <MenuItem value={"Sisal"}>Sisal</MenuItem>
                <MenuItem value={"StarCasino"}>StarCasino</MenuItem>
                <MenuItem value={"VinciTu"}>VinciTu</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setFirstBookmaker(bookmaker)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstBookmakerSelectForm);
