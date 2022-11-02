/* eslint-disable */

import React from "react";
import { useSnackbar } from "notistack";
import { Artwork } from "../../interfaces/artwork";
import { ArtworkList } from "../../ArtworkList";
import { ArtItem } from "../art-item/art-item";
import { AddArt } from "../add-art/add-art";
import { getArtwork } from "../../ArtworkHandlers";
import { Grid } from "@mui/material";

function ArtContainer() {
  const [artworks, setArtworks] = React.useState<Artwork[]>(ArtworkList);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);

  const add = (id: number) => {
    if (artworks.some((art) => art.id === id)) {
      enqueueSnackbar("This art was already added", {
        variant: "error",
      });
    } else {
      setLoading(true);
      getArtwork(id).then((r) => {
        if (!r.ok) {
          setLoading(false);
          enqueueSnackbar("Art not found", {
            variant: "error",
          });
        } else {
          setLoading(false);
          setArtworks([...artworks, { id: id, disabled: false }]);
          enqueueSnackbar("Art was added", {
            variant: "success",
          });
        }
      });
    }
  };

  const remove = (id: number) => {
    setArtworks(artworks.filter((art) => art.id !== id));
    enqueueSnackbar(`Art with id:${id} was removed`, {
      variant: "success",
    });
  };

  const reset = () => {
    setArtworks(ArtworkList);
    enqueueSnackbar(`Successfully rest your art list`, {
      variant: "success",
    });
  };

  return (
    <Grid
      sx={{
        width: "80%",
        marginTop: "45px",
      }}
      className="grid"
      alignItems="center"
      justifyContent="center"
      container
      spacing={1}
    >
      {artworks.map((art, index) => {
        if (!art.disabled)
          return (
            <Grid key={index} justifyContent="center" item xs={6}>
              <ArtItem
                className="item"
                remove={remove}
                key={art.id}
                id={art.id}
              ></ArtItem>
            </Grid>
          );
      })}
      <Grid item xs={12}>
        <AddArt reset={reset} loading={loading} add={add}></AddArt>
      </Grid>
    </Grid>
  );
}

export { ArtContainer };
