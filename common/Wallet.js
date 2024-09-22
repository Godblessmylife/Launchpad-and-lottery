import { Button, Box, CircularProgress, Hidden } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import useActiveWeb3React from "../hooks/useActiveWeb3React";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    background: "transparent",

    color: "white",
    border: "1px solid rgba(224, 7, 125, 0.7)",

    padding: 7,
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 20,
    fontWeight: 500,
    letterSpacing: 0.4,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  item: {
    marginLeft: 10,
    marginRight: 10,
  },
  navbarButton: {
    background: "linear-gradient(to right, #C80C81,purple)",
    color: "white",
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    fontWeight: 500,
    letterSpacing: 0.4,
    textTransform: "none",
    filter: "drop-shadow(0 0 0.5rem #414141)",
    "&:hover": {
      background: "#C80C81",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  numbers: {
    color: "#eeeeee",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  numbersMobile: {
    color: "#eeeeee",
    fontSize: 14,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  networkIcon: {
    width: 25,
    marginRight: 5,
    height: "auto",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  // New Css
  loginButton: {
    color: "white",
    minWidth: 160,
    backgroundColor: theme.palette.primary.main,
    padding: "7px 15px 7px 15px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    "&:hover": {
      background: theme.palette.primary.light,
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
      minWidth: 80,

      width: "fit-content",
      letterSpacing: -0.2,
    },
  },
  connectedButton: {
    color: "white",
    padding: "7px 5px 7px 10px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    "&:hover": {
      background: "#e5e5e5",
    },
  },
  connectedAddress: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: "4px 18px 4px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
}));

const Wallet = ({ onWalletClick }) => {
  const { active, account } = useActiveWeb3React();

  const classes = useStyles();

  return (
    <div>
      {!active ? (
        <div>
          <button className={classes.loginButton} onClick={onWalletClick}>
            {false ? (
              <span>
                {" "}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress
                    color="info"
                    size={25}
                    style={{ marginRight: 15 }}
                  />{" "}
                </Box>
              </span>
            ) : (
              <span style={{ color: "white", fontWeight: 500 }}>
                Connect <Hidden mdDown> Wallet</Hidden>
              </span>
            )}
          </button>
        </div>
      ) : (
        <Box mb={3} mt={3}>
          <Button
            onClick={onWalletClick}
            style={{
              color: "white",
              padding: "3px 5px 3px 10px",
              border: "none",
              borderRadius: 10,
              fontWeight: 400,
              letterSpacing: 0.4,
              textTransform: "none",
              fontSize: 15,
              background: "#eeeeee",
            }}
          >
            <Hidden mdDown>
              <span
                style={{
                  color: "#212121",
                  height: "100%",
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: "-0.02em",
                  color: "#414141",
                  textAlign: "center",
                  lineHeight: 1.5,
                  paddingRight: 10,
                }}
              >
                1.2 ETH
              </span>{" "}
            </Hidden>
            <span className={classes.connectedAddress}>
              {account.slice(0, 4)}...{account.slice(-4)}
            </span>
          </Button>
        </Box>
      )}
    </div>
  );
};

export default React.memo(Wallet);
