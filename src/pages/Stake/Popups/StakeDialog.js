import React, { useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  formatCurrency,
  fromWei,
  isNumber,
  resetCurrencyFormatting,
} from "../../../utils/helper";
import {
  minimumStakingAmount,
  poolId,
  tokenAddresses,
} from "../../../constants";
import BigNumber from "bignumber.js";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useTokenBalance } from "../../../hooks/useBalance";
import { useUserStakedInfo } from "../../../hooks/useUserStakedInfo";
import {
  Grow,
  Backdrop,
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  // New Css

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
    border: "1px solid #4A3F55",
    borderRadius: 15,
    width: "100%",
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

  cancelButton: {
    width: "fit-content",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    border: "1px solid #7825D5",
    borderRadius: "15px",
    fontSize: 15,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 500,
    marginTop: 20,
    marginRight: 10,
    padding: "7px 30px 7px 30px",
    "&:hover": {
      backgroundColor: "transparent",
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
    marginLeft: 10,
    padding: "7px 50px 7px 50px",
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
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 10,
  },

  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 50,
    border: "none",
    fontSize: 18,
    width: "70%",
    color: "white",
    padding: 10,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: 50,
      fontSize: 15,
    },
  },
  maxBtn: {
    backgroundColor: theme.palette.buttonDark.bg,
    color: theme.palette.buttonDark.color,
    padding: 0,
    padding: "10px 15px 10px 15px",
    fontSize: 12,
    borderRadius: 15,
    marginLeft: 10,
    outline: "none",
    height: 40,

    [theme.breakpoints.down("sm")]: {
      height: 30,
      marginTop: 10,
      marginRight: 5,
    },
  },

  /// OLd CSS
  // background: {
  //   backgroundColor: "#121827",
  //   color: "#f9f9f9",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: 380,
  //   minHeight: 350,
  //   [theme.breakpoints.down("sm")]: {
  //     width: 320,
  //     height: 350,
  //   },
  // },

  error: {
    alignSelf: "center",
    justifySelf: "center",
    paddingTop: 20,
  },
}));

const StakeDialog = ({
  open,
  handleClose,
  type,
  tokenType,
  stakeTokens,
  unstakeTokens,
  transactionStatus,
  apy,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [inputTokens, setTokenValue] = useState("");
  // const [formattedInputTokens, setFormattedValue] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const { account, chainId } = useActiveWeb3React();

  const poolToken = useMemo(() => {
    return {
      symbol: tokenType,
      address: tokenAddresses?.[tokenType]?.[chainId],
    };
  }, [tokenType, chainId]);

  const userStakedInfo = useUserStakedInfo(poolId?.[tokenType], account);

  const poolTokenBalance = useTokenBalance(account, poolToken);

  const handleInputChange = (e) => {
    if (
      !isNumber(e.nativeEvent.data) &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      setError({ status: true, message: "Please enter numbers only!" });
      return;
    }
    setTokenValue(resetCurrencyFormatting(e.target.value));

    if (error.status) {
      setError({ status: false, message: "" });
    }
  };

  const onConfirm = async () => {
    let enteredTokens = inputTokens;
    const stakedTokens = fromWei(userStakedInfo?.staked)?.toString();
    const balanceTokens = fromWei(poolTokenBalance)?.toString();

    if (enteredTokens === "" || new BigNumber(enteredTokens).eq(0)) {
      setError({
        status: true,
        message: `Please enter some ${tokenType} to ${type} !`,
      });
      return;
    }

    if (type !== "stake" && enteredTokens > stakedTokens) {
      setError({
        status: true,
        message: `Maximum withdraw amount can not exceed ${formatCurrency(
          stakedTokens
        )} !`,
      });
      return;
    }

    if (type === "stake" && enteredTokens < minimumStakingAmount[tokenType]) {
      setError({
        status: true,
        message: `Minimum ${formatCurrency(
          minimumStakingAmount[tokenType]
        )} ${tokenType} required to stake!`,
      });
      return;
    }

    if (type === "stake" && enteredTokens > balanceTokens) {
      setError({
        status: true,
        message: `Can not stake more that ${formatCurrency(
          balanceTokens
        )} ${tokenType}!`,
      });
      return;
    }

    setError({});

    if (type === "stake") {
      if (parseFloat(enteredTokens) === parseFloat(fromWei(balanceTokens))) {
        enteredTokens -= 1;
      }

      await stakeTokens(enteredTokens.toString(), poolId?.[tokenType]);
    } else {
      await unstakeTokens(enteredTokens?.toString(), poolId?.[tokenType]);
    }
    handleClose();
  };

  const handleMax = () => {
    if (type === "stake") {
      setTokenValue(fromWei(poolTokenBalance));
    } else {
      setTokenValue(fromWei(userStakedInfo?.staked));
    }
  };

  const onClose = () => {
    handleClose();
    setTokenValue("");
    setError({});
  };

  const currentFormattedBalance = () => {
    if (tokenType === "PWAR") {
      return formatCurrency(fromWei(poolTokenBalance), false, 1, true);
    }

    return formatCurrency(fromWei(poolTokenBalance));
  };

  const currentFormattedStakedBal = () => {
    if (tokenType === "PWAR") {
      return formatCurrency(fromWei(userStakedInfo?.staked), false, 1, true);
    }

    return formatCurrency(fromWei(userStakedInfo?.staked));
  };
  return (
    <div>
      <Dialog
        onExited={onClose}
        open={open}
        disableBackdropClick
        TransitionComponent={Transition}
        keepMounted={false}
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
                    {type === "stake" ? "Stake tokens" : "Withdraw tokens"}
                  </Typography>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                  <Box
                    mb={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ maxWidth: 360, width: "100%" }}
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
                          ml={2}
                        >
                          {tokenType}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.para}
                          textAlign="left"
                          fontWeight={400}
                          ml={2}
                          fontSize={12}
                        >
                          PolkaBridge
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Typography
                        variant="h4"
                        textAlign="left"
                        fontWeight={600}
                        color={"#e5e5e5"}
                      >
                        {apy}%
                      </Typography>
                      <Typography
                        variant="h6"
                        className={classes.para}
                        textAlign="left"
                        fontWeight={400}
                        fontSize={12}
                      >
                        APY
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <Typography
                  variant="h6"
                  className={classes.para}
                  textAlign="center"
                  fontWeight={400}
                  fontSize={16}
                  color={"#bdbdbd"}
                >
                  {type === "stake" ? "Available" : "Staked"} tokens:{" "}
                  <strong>
                    {parseFloat(fromWei(poolTokenBalance)).toFixed(2)}
                    {" " + tokenType}
                  </strong>
                </Typography>

                <Box
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <Box
                    mt={3}
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems="center"
                    style={{ width: "100%", maxWidth: 360 }}
                  >
                    <Box className={classes.inputWrapper}>
                      <input
                        placeholder="0.0"
                        value={
                          inputTokens
                            ? formatCurrency(inputTokens, false, 0, true)
                            : ""
                        }
                        onChange={handleInputChange}
                        label={`Enter ${tokenType} tokens`}
                        className={classes.input}
                      />
                    </Box>
                    <Box style={{ width: "fit-content" }}>
                      <Button
                        style={{
                          backgroundColor: theme.palette.buttonDark.bg,
                          color: theme.palette.buttonDark.color,
                          padding: 0,
                          padding: "10px 15px 10px 15px",
                          fontSize: 12,
                          borderRadius: 15,
                          marginLeft: 10,
                          outline: "none",
                          height: 40,
                        }}
                        onClick={handleMax}
                      >
                        Max
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {error.status ? (
                  <span className={classes.error}>{error.message}</span>
                ) : (
                  ""
                )}

                <div className="d-flex justify-content-center">
                  <button className={classes.cancelButton} onClick={onClose}>
                    Cancel
                  </button>
                  <button className={classes.connectButton} onClick={onConfirm}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StakeDialog;
