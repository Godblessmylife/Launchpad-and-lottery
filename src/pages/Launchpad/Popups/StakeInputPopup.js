//done
import React, { useEffect, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    height: "fit-content",
    padding: 10,
    minHeight: 420,
    maxWidth: 540,
    position: "relative",
    backgroundColor: "#140F16",
    border: "10px solid #6A55EA",

    zIndex: 11,
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 24,
    width: 24,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
    },
  },
  inputWrapper: {
    padding: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    border: "1px solid #757575",
    borderRadius: 18,
    width: "80%",
    padding: 6,
    outline: "none",
    color: "#212121",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontFamily: "Karla",
  },
  heading: {
    color: "#f9f9f9",
    textAlign: "center",
    fontSize: 28,
    lineHeight: "20%",
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },

  para: {
    color: "#bdbdbd",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 300,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
  },

  connectButton: {
    width: "fit-content",

    background: theme.palette.primary.main,
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 600,
    marginTop: 20,
    padding: "10px 40px 10px 40px",
    "&:hover": {
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },

  svgImage: {
    width: 100,
    [theme.breakpoints.down("md")]: {
      width: 70,
    },
  },

  iconWrapper: {
    marginRight: 10,
    backgroundColor: "#FF87FF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
  },
  icon: {
    width: 25,
    height: 25,
    color: "white",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: "0.02em",
    color: "#FFFFFF",
    textAlign: "left",
  },
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 10,
  },
}));

const StakeInputPopup = ({ resetPopup }) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="h-100 w-100">
          <div onClick={resetPopup}>
            <Close
              style={{ cursor: "pointer", color: "white" }}
              className={classes.closeIcon}
            />
          </div>
          <div className="d-flex flex-column justify-content-between h-100 mt-5">
            <div>
              <Typography
                variant="h4"
                className={classes.heading}
                fontWeight={700}
              >
                Stake Tokens
              </Typography>
            </div>
            <Box
              mt={4}
              mb={2}
              display="flex"
              flexDirection={"row"}
              justifyContent="space-between"
              alignItems="center"
              px={5}
            >
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box className={classes.imageWrapper}>
                  <img
                    src="https://polkabridge.org/images/symbol.png"
                    alt="PBR"
                    height="35px"
                  />{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    className={classes.cardTitle}
                    textAlign="left"
                    fontWeight={600}
                    ml={1}
                  >
                    PBR
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.para}
                    textAlign="left"
                    fontWeight={600}
                    ml={1}
                    style={{ fontWeight: 600, color: "#919191" }}
                  >
                    PolkaBridge
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  textAlign="left"
                  fontWeight={600}
                  ml={1}
                  style={{ fontSize: 28, color: "#e5e5e5" }}
                >
                  25%
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="left"
                  fontWeight={600}
                  ml={1}
                  style={{ fontSize: 18, color: "#919191", fontWeight: 600 }}
                >
                  APY
                </Typography>
              </Box>
            </Box>

            <Box
              mt={2}
              mb={2}
              display="flex"
              flexDirection={"row"}
              justifyContent="center"
              alignItems="center"
              px={5}
            >
              <Box>
                <Typography
                  variant="h6"
                  className={classes.para}
                  textAlign="left"
                  fontWeight={600}
                  style={{ fontWeight: 500, fontSize: 16, color: "#919191" }}
                >
                  Available tokens: <strong>1,232 PBR</strong>
                </Typography>
              </Box>
            </Box>
            <Box
              mt={2}
              mb={2}
              display="flex"
              flexDirection={"row"}
              justifyContent="center"
              alignItems="center"
              px={5}
            >
              <Input
                fullWidth
                placeholder="0.0"
                style={{
                  borderRadius: 10,
                  border: "1px solid #4A3F55",
                  padding: 7,
                  width: "90%",
                  color: "#919191",
                }}
              />
              <Button
                style={{
                  borderRadius: 10,
                  background: "#521B8F",
                  padding: "9px 20px 9px 20px",
                  color: "white",
                  marginLeft: 10,
                }}
              >
                MAX
              </Button>
            </Box>
            <Box px={2} mt={2} className="d-flex justify-content-evenly">
              <Button
                style={{
                  borderRadius: 10,
                  background: "#212121",
                  padding: "9px 20px 9px 20px",
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  borderRadius: 10,
                  background: "#521B8F",
                  padding: "9px 20px 9px 20px",
                  color: "white",
                }}
              >
                Confirm
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeInputPopup;
