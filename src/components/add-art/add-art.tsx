import { Button, TextField, CircularProgress } from "@mui/material";
import React from "react";

import "./add-art.css";

function AddArt(props: any) {
  const [artId, setArtId] = React.useState<number>(27992);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const onIdChange = (e: any) => {
    setArtId(parseInt(e.target.value));
    e.target.value <= 0 ? setDisabled(true) : setDisabled(false);
  };

  const add = () => {
    props.add(artId);
  };
  return (
    <div className="add-art-container">
      <TextField
        error={disabled}
        type={"number"}
        variant="standard"
        onChange={onIdChange}
        value={artId}
        label="ART ID"
        id="art-id"
        helperText={disabled ? "Your id should be larger than zero" : ""}
        name="id"
      />
      <div className="button-container">
        <Button
          sx={{ color: "black", borderColor: "black" }}
          className="add-art-button"
          disabled={disabled}
          onClick={add}
          variant="outlined"
          color="primary"
        >
          {props.loading ? <CircularProgress /> : "Add"}
        </Button>
        <Button
          sx={{ color: "black", borderColor: "black" }}
          className="add-art-button"
          disabled={disabled}
          onClick={props.reset}
          variant="outlined"
          color="primary"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export { AddArt };
