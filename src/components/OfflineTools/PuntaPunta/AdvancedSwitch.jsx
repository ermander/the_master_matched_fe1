import React, { useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels(props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.switchState}
            onChange={props.setSwitchState}
            name="checkedA"
          />
        }
        label={
          props.switchState === true
            ? "Modalità avanzata attiva"
            : "Modalità avanzata disattivata"
        }
      />
    </FormGroup>
  );
}
