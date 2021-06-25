import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#23242d",
    color: "#ffffff",
  },
  formControl: {
    minWidth: 200,
    maxWidth: 300,
    color: "red",
  },
  chip: {
    margin: 2,
    color: "#ffffff",
  },
  icon: {
    color: "#ffffff",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "GolGol",
  "Eurobet",
  "Lopoca",
  "MarathonBet",
  "OverPlus",
  "Planetwin365",
  "Sisal",
  "StarCasino",
  "VinciTu",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  return (
    <FormControl
      className={classes.formControl}
      style={{ backgroundColor: "#23242d" }}
    >
      <InputLabel
        id="demo-mutiple-name-label"
        style={{ color: "white", zIndex: "1000" }}
      >
        Seleziona Bookmaker
      </InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        multiple
        value={personName}
        input={<Input />}
        MenuProps={MenuProps}
        style={{ backgroundColor: "#23242d" }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={{ backgroundColor: "#23242d" }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
