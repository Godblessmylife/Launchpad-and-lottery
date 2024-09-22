import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";

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
    height: "100%",
    padding: 10,
    minHeight: 360,
    maxHeight: 400,
    maxWidth: 540,
    position: "relative",
    backgroundColor: "#000000",
    border: "2px solid #7825D5",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 16,
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

  heading: {
    color: "#f9f9f9",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "0.02em",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 14,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontSize: 20,
    },
  },

  para: {
    color: "#e5e5e5",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    width: "80%",
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
  },

  connectButton: {
    width: "fit-content",
    height: "45px",
    background: "#6A55EA",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "10px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 700,
    marginTop: 20,
    padding: "12px 50px 12px 50px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },

  svgImage: {
    width: "100%",
    height: "fit-content",
    maxHeight: 130,
    objectFit: "contain",
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      maxHeight: 100,
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
}));

const TxPopup = ({ popupActive, disablePopup, txCase }) => {
  const classes = useStyles();

  const resetPopup = () => {
    disablePopup();
  };
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="h-100 w-100">
          <div className="d-flex justify-content-end">
            <IconButton>
              <Close style={{ color: "#f9f9f9", fontSize: 28 }} />
            </IconButton>
          </div>
          {txCase === 1 && (
            <div className="mb-sm-4" align="center">
              <div className="my-auto">
                <div className="text-center">
                  <img src="/img/wait.png" className={classes.svgImage} />
                </div>
              </div>

              <div className="my-auto">
                <h4 className={classes.heading}>Waiting for confirmation</h4>
                <h6 className={classes.para}>
                  PLEASE CONFIRM THIS TRANSACTION <br />
                  INTO METAMASK POPUPUP.
                </h6>
              </div>
            </div>
          )}
          {txCase === 2 && (
            <div className=" mb-sm-4" align="center">
              <div className="my-auto">
                <div className="text-center">
                  <img src="/img/submit.png" className={classes.svgImage} />
                </div>
              </div>
              <div className="my-auto">
                <h4 className={classes.heading}>Transaction Submitted</h4>
                <h6 className={classes.para}>
                  TRANSACTION HAS BEEN SUBMITTED AND <br />
                  WAITING FOR CONFIRMATION.
                </h6>
              </div>
            </div>
          )}
          {txCase === 3 && (
            <div className="mb-sm-4" align="center">
              <div className="my-auto">
                <div className="text-center">
                  <img src="/img/success.png" className={classes.svgImage} />
                </div>
              </div>
              <div className="my-auto">
                <h4 className={classes.heading}>Transaction Successful!</h4>
                <h6 className={classes.para}>
                  GREAT! TRANSACTION HAS BEEN CONFIRMED SUCCESSFULLY.
                </h6>
              </div>
            </div>
          )}

          {txCase === 4 && (
            <div className=" mb-sm-4" align="center">
              <div className="my-auto">
                <div className="text-center">
                  <img src="/img/fail.png" className={classes.svgImage} />
                </div>
              </div>
              <div className="my-auto">
                <h4 className={classes.heading}>Transaction Failed!</h4>
                <h6 className={classes.para}>
                  WE HAVE ENCOUNTERED AN ERROR IN THIS TRANSACTION. PLEASE TRY
                  AGAIN.
                </h6>
              </div>
            </div>
          )}

          {txCase === 5 && (
            <div className="mb-sm-4" align="center">
              <div className="my-auto">
                <div className="text-center">
                  <img
                    src="/img/success_purchase.png"
                    className={classes.svgImage}
                  />
                </div>
              </div>
              <div className="my-auto">
                <h4 className={classes.heading}>Transaction Successful!</h4>
                <h6 className={classes.para}>
                  GREAT! TRANSACTION HAS BEEN CONFIRMED SUCCESSFULLY.
                </h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TxPopup;
