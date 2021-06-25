import React from "react";
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#23242d",
    },
    text: {
      primary: "#cacacc",
      disabled: "#cacacc",
    },
    action: {
      disabled: "#cacacc",
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "white",
      borderColor: "white",
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

function getStyles(name, personName) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        {" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">
            Seleziona Bookmaker
          </InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={personName}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </ThemeProvider>
  );
}
