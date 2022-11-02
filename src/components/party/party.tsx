import React from "react";

import "./party.css";
const epicpartytime = require("./epicsaxguy.mp3");

function Party(props: any) {
  return (
    <>
      <audio controls autoPlay>
        <source src={epicpartytime} type="audio/mpeg" />
      </audio>
      <div className="App-logo"></div>
    </>
  );
}

export { Party };
