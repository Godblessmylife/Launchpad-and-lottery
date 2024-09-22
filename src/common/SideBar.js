import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Button,
  InputAdornment,
  Paper,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateMenuTabIndex } from "../actions/uiActions";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "white",
  },
  inputRoot: {
    backgroundColor: "#6F6F6F",
    height: "100%",
  },
  input: {
    border: "2px solid #bdbdbd",
    outline: "none",

    "&:active": {
      outline: "none",
    },
  },
  menuTitle: {
    fontWeight: 600,
    fontSize: 15,

    color: "white",
    [theme.breakpoints.down("md")]: {
      fontWeight: 500,
      fontSize: 13,
    },
  },
  logo: {
    height: "100%",
    maxHeight: 45,
    maxWidth: 120,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

const SideBar = ({}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();

  const [filterValue, setFilterValue] = useState("");
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { menuTabIndex } = store.ui;

  let menuTabs = ["Home", "Stake", "Launchpad", "INO", "Swap"];

  useEffect(() => {
    let value = localStorage.getItem("tab");
    dispatch(updateMenuTabIndex(value));
  }, []);

  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      bgcolor={"#270E44"}
      display="flex"
      flexDirection="column"
      height="100%"
      width="14vw"
      style={{
        position: "fixed",
        top: 40,
        bottom: 0,
        position: "-webkit-fixed",
        position: "fixed",
      }}
    >
      {console.log("pathname", location.pathname)}
      <Box>
        <Box py={2}>
          <Typography variant="body2" pb={1}>
            <img
              src="https://launchpad.polkabridge.org/img/logo-white.png"
              className={classes.logo}
            />
          </Typography>
        </Box>

        <Box pt={5}>
          <Paper
            onClick={() => dispatch(updateMenuTabIndex(0))}
            key={0}
            sx={{
              boxShadow: 0,

              bgcolor:
                parseInt(menuTabIndex) === 0
                  ? `rgba(130, 71, 229, 0.3)`
                  : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            <img
              src="./home_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              Home
            </Typography>
          </Paper>

          <Paper
            onClick={() => dispatch(updateMenuTabIndex(1))}
            key={1}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                parseInt(menuTabIndex) === 1
                  ? `rgba(130, 71, 229, 0.3)`
                  : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="./stake_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              Stake
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(updateMenuTabIndex(2))}
            key={2}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                parseInt(menuTabIndex) === 2
                  ? `rgba(130, 71, 229, 0.3)`
                  : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="./launchpad_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              Launchpad
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(updateMenuTabIndex(3))}
            key={3}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                parseInt(menuTabIndex) === 3
                  ? `rgba(130, 71, 229, 0.3)`
                  : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="./ino_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              INO
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(updateMenuTabIndex(4))}
            key={4}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                menuTabIndex === 4 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="./Swap_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              Swap
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(updateMenuTabIndex(5))}
            key={5}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                parseInt(menuTabIndex) === 5
                  ? `rgba(130, 71, 229, 0.3)`
                  : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="./Farm_icon.png"
              className={classes.logo}
              style={{ marginRight: 10, color: "white" }}
            />
            <Typography variant="title1" className={classes.menuTitle}>
              Farm
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
