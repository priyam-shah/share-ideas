import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";

//importing styles file -> styles.js
import useStyles from "./styles.js";

import { useDispatch } from "react-redux";
import decode from "jwt-decode";

// img
import ideas from "../../images/ideas.png";

import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  // getting user details returned from google login
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    // check for the token
    const token = user?.token;

    // token expired log-out
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      {/* <Link to="/" className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          disableUnderline={true}
        >
          Share Ideas
        </Typography>
        <img className={classes.image} src={ideas} alt="icon" height="40px" />
      </Link> */}

      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Share Ideas
        </Typography>

        <img className={classes.image} src={ideas} alt="icon" height="40px" />
      </div>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} varient="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
