import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Close, OpenInNew } from "@mui/icons-material";
import { connect } from "react-redux";
import { logout } from "../actions/accountActions";
import {
  Box,
  Typography,
  useTheme,
  Grow,
  Backdrop,
  Dialog,
} from "@mui/material";
import useActiveWeb3React from "../hooks/useActiveWeb3React";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  // New CSs
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
    minHeight: 400,
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
  closeIcon: {
    position: "absolute",
    color: "white",
    top: 8,
    right: 10,
    height: 25,
    width: 25,
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
    color: "#e5e5e5",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 300,
    paddingTop: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
      paddingTop: 15,
    },
  },
  activateButton: {
    width: "fit-content",
    height: "50px",
    background: "#FF5AFF",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 700,

    padding: "12px 30px 12px 30px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  connectButton: {
    width: "fit-content",
    backgroundColor: theme.palette.buttonDark.bg,
    boxSizing: "border-box",
    border: "1px solid #212121",
    borderRadius: "15px",
    fontSize: 15,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 500,
    marginTop: 20,
    padding: "7px 30px 7px 30px",
    "&:hover": {
      backgroundColor: theme.palette.buttonDark.bg,
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
  logo: {
    width: 100,
    [theme.breakpoints.down("md")]: {
      width: 70,
    },
  },

  // Metamask card css
  para: {
    fontWeight: 400,
    fontSize: 15,
    letterSpacing: "0.02em",
    color: "#e5e5e5",
    textAlign: "center",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  buttonFirst: {
    width: "fit-content",
    color: "#212121",
    backgroundColor: "#eeeeee",
    padding: "12px 50px 12px 50px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: "pointer",
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "12px 50px 12px 50px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    cursor: "pointer",
  },

  cardTitle: {
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: "0.02em",
    color: "#FFFFFF",
    textAlign: "left",
  },
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 7,
  },
}));

const AccountDialog = ({
  open,
  handleClose,
  handleLogout,
  handleConnection,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { active, chainId, account } = useActiveWeb3React();

  const onSingOut = () => {
    localStorage.setItem(`logout${account}`, account);
    handleLogout();
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
      keepMounted={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth="lg"
      fullWidth={false}
      PaperProps={{ borderRadius: 10 }}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          {console.log(active)}
          {console.log(account)}

          {active && (
            <div className="h-100 w-100">
              <div className="d-flex justify-content-end" onClick={handleClose}>
                <Close
                  style={{ cursor: "pointer" }}
                  className={classes.closeIcon}
                />
              </div>
              <div className="d-flex flex-column justify-content-around">
                <div className="mt-1">
                  <Typography
                    variant="h4"
                    className={classes.heading}
                    fontWeight={700}
                  >
                    My Wallet
                  </Typography>
                </div>

                <div className="mt-5">
                  <div className="row">
                    <div className="col-md-4">
                      {" "}
                      <div className="text-center my-0">
                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/e-wallet-4802219-3998266.png"
                          className={classes.svgImage}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      {" "}
                      <div className="mt-1">
                        <Typography
                          variant="h6"
                          className={classes.heading}
                          textAlign="left"
                          style={{ textAlign: "left", fontSize: 15 }}
                        >
                          Address :
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.para}
                          fontWeight={400}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            marginTop: 6,
                          }}
                        >
                          <pre style={{ wordWrap: "break-word" }}>
                            {account}
                          </pre>
                        </Typography>
                      </div>
                      <div className="mt-3">
                        <Typography
                          variant="h6"
                          className={classes.heading}
                          fontWeight={600}
                          style={{
                            textAlign: "left",
                            fontSize: 15,
                            marginTop: 30,
                          }}
                        >
                          Balance :
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.para}
                          fontWeight={400}
                          style={{
                            textAlign: "left",
                            fontSize: 14,
                            marginTop: 6,
                          }}
                        >
                          <pre>1.2 ETH</pre>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-evenly">
                  <button className={classes.connectButton} onClick={null}>
                    View on explorer <OpenInNew />
                  </button>
                  <button className={classes.connectButton} onClick={onSingOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
          {!active && (
            <div className="h-100 w-100">
              <div className="d-flex justify-content-end" onClick={handleClose}>
                <Close
                  style={{ cursor: "pointer" }}
                  className={classes.closeIcon}
                />
              </div>
              <div className="d-flex flex-column justify-content-around">
                <div className="mt-1 mb-3">
                  <Typography
                    variant="h4"
                    className={classes.heading}
                    fontWeight={700}
                  >
                    Connect You Wallet
                  </Typography>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="flex-start"
                    alignItems="center"
                    onClick={() => handleConnection("injected")}
                    style={{
                      width: "100%",
                      maxWidth: 400,

                      border: "1px solid #4A3F55",
                      paddingTop: 7,
                      paddingBottom: 7,
                      paddingLeft: 20,
                      paddingRight: 20,
                      cursor: "pointer",
                      borderRadius: 10,
                    }}
                  >
                    <Box className={classes.imageWrapper}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                        alt="Metamask"
                        height="30px"
                      />{" "}
                    </Box>{" "}
                    <Box>
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                        textAlign="left"
                        fontWeight={600}
                        ml={2}
                      >
                        Metamask
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="flex-start"
                    alignItems="center"
                    onClick={() => handleConnection("unstoppable")}
                    style={{
                      width: "100%",
                      maxWidth: 400,

                      border: "1px solid #4A3F55",
                      paddingTop: 7,
                      paddingBottom: 7,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    <Box className={classes.imageWrapper}>
                      <img
                        src="https://avatars.githubusercontent.com/u/36172275?s=280&v=4"
                        alt="Unstoppable"
                        height="30px"
                        style={{ borderRadius: 20 }}
                      />{" "}
                    </Box>{" "}
                    <Box>
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                        textAlign="left"
                        fontWeight={600}
                        ml={2}
                      >
                        Unstoppable Domains
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="flex-start"
                    alignItems="center"
                    onClick={() => handleConnection("walletConnect")}
                    style={{
                      width: "100%",
                      maxWidth: 400,

                      border: "1px solid #4A3F55",
                      paddingTop: 7,
                      paddingBottom: 7,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    <Box className={classes.imageWrapper}>
                      <img
                        src="img/wc.png"
                        alt="Wallet-Connect"
                        height="30px"
                      />{" "}
                    </Box>{" "}
                    <Box>
                      <Typography
                        variant="h6"
                        className={classes.cardTitle}
                        textAlign="left"
                        fontWeight={600}
                        ml={2}
                      >
                        Wallet Connect
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className={classes.connectButton}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { logout })(AccountDialog);
