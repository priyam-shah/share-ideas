import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.css";

// material ui styles
import { makeStyles } from "@material-ui/core/styles";

// material ui components
import { CircularProgress, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: "0 1rem",
    "@media screen and (max-width: 800px)": {
      height: "0",
    },
  },
  fbText: {
    color: "rgb(84, 95, 246)",
    margin: "3rem",
    fontSize: "2.5rem",
    "@media screen and (max-width: 800px)": {
      fontSize: "1.7rem",
    },
  },
  goHomeButton: {
    padding: "1.2rem",
    margin: "1rem auto",
    border: "1px solid black",
    borderRadius: "25px",
    "&:hover": {
      color: "white",
      backgroundColor: "#ffa500",
      borderRadius: "25px",
    },
    "@media screen and (max-width: 800px)": {
      padding: "0.8rem",
      margin: "0.8rem auto",
      borderRadius: "20px",
    },
  },
}));

function Feedback() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={styles.Feedback}>
      <div className={styles.text_fb}>
        <Typography
          allign="center"
          variant="h4"
          gutterBottom
          className={classes.fbText}
        >
          App is under build
        </Typography>
        <CircularProgress
          align="center"
          variant="indeterminate"
          color="secondary"
          className={classes.loader}
          size={100}
          thickness={7}
        />
      </div>
      <Typography
        className={classes.fbText}
        align="center"
        variant="h4"
        gutterBottom
      >
        We accept your feedback Let us know @ priyam.share.ideas@gmail.com
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        className={classes.goHomeButton}
        onClick={() => {
          history.push("/");
        }}
      >
        <Typography variant="h5">Go Home</Typography>
      </Button>
    </div>
  );
}

export default Feedback;
