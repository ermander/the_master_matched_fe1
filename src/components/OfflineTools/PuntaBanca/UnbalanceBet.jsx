import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = useState(100);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Copertura: {value}%
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <RemoveIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            min={80}
            max={120}
            defaultValue={100}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <AddIcon />
        </Grid>
      </Grid>
    </div>
  );
}
