/* eslint-disable */

import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getArtwork, getImageUrl, postRating } from "../../ArtworkHandlers";
import "./art-item.css";
import { useSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";

function ArtItem(props: any) {
  const [voted, setVoted] = useState<boolean>(false);
  const [artwork, setArtwork] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [rating, setRating] = useState<any>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submit = () => {
    postRating(props.id, rating)
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
          enqueueSnackbar("Your rating was successfully submitted!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Your rating was not submitted", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`Something went wrong: ${err}`, {
          variant: "error",
        });
      });
  };

  const remove = () => {
    props.remove(props.id);
  };

  const updateRating = (rating: number) => {
    setRating(rating);
    setVoted(true);
  };

  const handleMouseOver = () => {
    setIsVisible(true);
  };
  const handleMouseOut = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    getArtwork(props.id)
      .then((r) => {
        setIsLoading(false);
        if (!r.ok) {
          throw new Error("art was not found");
        } else {
          return r.json();
        }
      })
      .then((json) => {
        setArtwork(json);
      })
      .catch((err) => {
        enqueueSnackbar(`There was a problem loading your art: ${err}`, {
          variant: "error",
        });
      });
  }, []);

  if (isLoading) return <CircularProgress />;

  return artwork ? (
    <div className="artwork-container">
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="artwork"
      >
        <img src={artwork != null ? getImageUrl(artwork.data.image_id) : ""} />
        <div
          className="overlay"
          style={{ visibility: isVisible ? "visible" : "hidden" }}
        >
          {submitted ? (
            <></>
          ) : (
            <div className="button-container">
              {[...Array(5)].map((item, index) => {
                index += 1;
                return (
                  <Button
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      width: "40px",
                      height: "40px",
                    }}
                    className={
                      "rating-button " + (rating === index ? "selected" : "")
                    }
                    variant="text"
                    color="primary"
                    key={index}
                    data-testid={`rating-${index}`}
                    onClick={() => updateRating(index)}
                  >
                    {index}
                  </Button>
                );
              })}
            </div>
          )}
          <div className="button-container">
            {submitted ? (
              <></>
            ) : (
              <Button
                variant="contained"
                color="success"
                data-testid="submit"
                disabled={!voted}
                onClick={submit}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              data-testid="delete"
              onClick={remove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="title">
        <Typography gutterBottom variant="body1" component="div">
          {artwork && artwork.data.title}
        </Typography>
      </div>
      <Typography
        sx={{ fontStyle: "italic" }}
        gutterBottom
        variant="body2"
        component="div"
      >
        {artwork && "- " + artwork.data.artist_title}
      </Typography>
    </div>
  ) : (
    <></>
  );
}

export { ArtItem };
