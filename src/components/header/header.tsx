import { Button, Typography, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

function Header(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-container">
      <Typography gutterBottom variant="h3" component="div">
        ART RATER
      </Typography>
      <Button
        sx={{
          color: "black",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Art overview
        </MenuItem>
        <MenuItem component={Link} to="/party" onClick={handleClose}>
          Party
        </MenuItem>
      </Menu>
    </div>
  );
}

export { Header };
