import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useMemo } from "react";
import { BigNumber } from "bignumber.js";
import {
  Card,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import CustomButton from "./CustomButton";
import {
  formatCurrency,
  formatLargeNumber,
  fromWei,
  toWei,
} from "../utils/helper";
import { connect } from "react-redux";
import {
  confirmAllowance,
  getUserStakedData,
  getPoolInfo,
} from "../actions/stakeActions";
import { getAccountBalance } from "../actions/accountActions";
import {
  claimTokens,
  poolId,
  unsupportedStaking,
  tokenInfo,
  tokenLogo,
  tokenName,
  LABS,
  CORGIB,
  tokenAddresses,
  STAKE_ADDRESSES,
} from "../constants";
import Loader from "./../common/Loader";
import DotCircle from "./../common/DotCircle";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useTokenContract } from "../hooks/useContract";
import { useTokenAllowance } from "../hooks/useAllowance";
import { usePoolStakedInfo } from "../hooks/usePoolStakedInfo";
import { useUserStakedInfo } from "../hooks/useUserStakedInfo";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useStakeCallback } from "../hooks/useStakeCallback";
import StakeDialog from "../pages/Stake/Popups/StakeDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "95%",
    paddingTop: 30,
    paddingBottom: 30,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    backgroundColor: "#140F16",
    border: "3px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  cardHeader: {
    paddingTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cardContents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
  },
  avatar: {
    height: "35px",
  },
  cardHeading: {
    fontSize: 18,
  },
  cardText: {
    fontSize: 14,
    alignSelf: "start",
    marginLeft: 60,
    margin: 0,
  },

  buttons: {
    marginTop: 20,
    marginBottom: 20,
  },
  numbers: {
    color: "#E0077D",
    fontSize: 26,
  },
  hint: {
    paddingTop: 4,
    fontSize: 10,
    fontWeight: 400,
    color: "#919191",
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  bitePool: {
    marginBottom: 20,
    alignSelf: "start",
  },
  poolItemText: {
    fontSize: 12,
    marginLeft: 60,
    margin: 0,
    marginTop: 2,
  },
  stakeButtons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap-reverse",
  },
  stakeButton: {
    marginTop: 5,
    alignSelf: "center",
    justifySelf: "center",
  },
  logoWrapper: {
    height: 45,
    width: 45,
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  tokenTitle: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
    paddingBottom: 3,
    color: "#e5e5e5",
  },
  tokenTitleTvl: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 600,
    color: "#e5e5e5",
    // backgroundColor: "#C80C81",
    border: "1px solid rgba(224, 7, 125, 0.6)",

    borderRadius: 14,
  },
  tokenSubtitle: {
    fontWeight: 300,
    padding: 0,
    paddingLeft: 10,
    fontSize: 12,
    color: "#bdbdbd",
  },
  tokenAmount: {
    fontWeight: 700,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: "#C80C81",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenAmountTvl: {
    fontWeight: 700,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: "#e5e5e5",
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 12,
    [theme.breakpoints.down("sm")]: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
  },
  earn: {
    textAlign: "center",
    color: "#bdbdbd",
    fontSize: 10,
  },
  desktop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
    },
  },
  borderButton: {
    background: `transparent`,
    color: "white",
    width: "fit-content",
    height: 32,
    textTransform: "none",
    borderRadius: 30,
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
    border: "1px solid rgba(224, 7, 125, 0.3)",
    padding: "5px 20px 5px 20px",
    "&:hover": {
      background: "rgba(224, 7, 125, 0.7)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
      fontSize: 13,
    },
  },
  borderButtonRegister: {
    background: "rgba(224, 7, 125, 0.7)",
    color: "white",
    width: "fit-content",
    height: 32,
    textTransform: "none",
    borderRadius: 30,
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
    border: "1px solid rgba(224, 7, 125, 0.3)",
    padding: "5px 20px 5px 20px",
    "&:hover": {
      background: "rgba(224, 7, 125, 0.7)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
      fontSize: 13,
    },
  },

  // New CSS

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
    fontSize: 15,
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

const Staking = ({
  stake: { stake },
  account: { currentChain },
  tokenType,
  confirmAllowance,
  stopped = false,
}) => {
  const classes = useStyles();
  const { chainId, active, account } = useActiveWeb3React();

  const [dialog, setDialog] = React.useState({
    open: false,
    type: null,
    tokenType: null,
  });

  const [txStatus, setTxStatus] = React.useState(false);

  const onStake = (tokenType) => {
    setDialog({ open: true, type: "stake", tokenType: tokenType });
  };

  const onUnStake = (tokenType) => {
    setDialog({ open: true, type: "unstake", tokenType: tokenType });
  };

  const handleClose = () => {
    setDialog({ open: false, type: null });
  };

  const tokenContract = useTokenContract(
    tokenAddresses?.[tokenType]?.[chainId]
  );

  const poolToken = useMemo(() => {
    return {
      symbol: tokenType,
      address: tokenAddresses?.[tokenType]?.[chainId],
    };
  }, [tokenType, chainId]);

  const currentTokenAllowance = useTokenAllowance(
    poolToken,
    account,
    STAKE_ADDRESSES?.[chainId]
  );

  const poolStakedInfo = usePoolStakedInfo(
    poolId?.[tokenType],
    poolToken,
    currentChain
  );

  const userStakedInfo = useUserStakedInfo(
    tokenType,
    poolId?.[tokenType],
    account
  );

  const handleApprove = useCallback(() => {
    const tokenWeiAmountToApprove =
      tokenType === CORGIB
        ? "999999999999999999999999999999999999"
        : toWei("999999999");
    confirmAllowance(
      tokenWeiAmountToApprove,
      tokenType,
      tokenContract,
      account,
      chainId
    );
  }, [tokenContract, chainId]);

  const poolTokenPrice = useTokenPrice(poolToken);

  const [transactionStatus, stakeTokens, unstakeTokens] =
    useStakeCallback(tokenType);

  const handleClaim = async (tokenType) => {
    setTxStatus(true);
    const tokensToClaim = claimTokens;
    await unstakeTokens(tokensToClaim, poolId?.[tokenType]);
    setTxStatus(false);
  };

  const claimDisableStatus = useMemo(() => {
    return userStakedInfo?.staked === 0;
  }, userStakedInfo);

  const stakeDisableStatus = useMemo(() => {
    if (unsupportedStaking?.[chainId]?.includes(tokenType)) {
      return true;
    }

    return false;
  }, [tokenType, chainId]);

  const withdrawDisableStatus = (_tokenType) => {
    return false;
  };

  const approveDisableStatus = (_tokenType) => {
    return false;
  };

  const totalValueLocked = useMemo(() => {
    return formatLargeNumber(
      new BigNumber(fromWei(poolStakedInfo?.staked))
        .multipliedBy(poolTokenPrice ? poolTokenPrice : 0)
        .toString()
    );
  }, [poolStakedInfo, poolTokenPrice]);

  return (
    <div>
      <div className={classes.card}>
        <StakeDialog
          open={dialog.open}
          type={dialog.type}
          tokenType={dialog.tokenType}
          handleClose={handleClose}
          stakeTokens={stakeTokens}
          unstakeTokens={unstakeTokens}
          transactionStatus={transactionStatus}
          apy={formatCurrency(poolStakedInfo?.apy, false, 1, true)}
        />
        {/* {transactionStatus?.status === "pending" && (
          <div className="text-center">
            <Loader height={300} />
          </div>
        )} */}
        <Box pt={0} px={2}>
          <Box
            mb={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box className={classes.imageWrapper}>
                <img
                  src={tokenLogo[tokenType]}
                  alt="Pool_logo"
                  height="35px"
                  style={{ maxWidth: 50 }}
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
                  {tokenName[tokenType]}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  style={{ marginTop: 4 }}
                >
                  <Button
                    style={{
                      marginLeft: 5,
                      height: 24,
                      width: "fit-content",
                      fontSize: 9,
                      borderRadius: 10,
                      background: "transparent",
                      border: "1px solid #6A55EA",
                      padding: "2px 4px 2px 4px",
                      color: "#6A55EA",
                    }}
                  >
                    Buy
                  </Button>
                  <Button
                    style={{
                      marginLeft: 5,
                      height: 24,
                      width: "fit-content",
                      fontSize: 9,
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "2px 4px 2px 4px",
                      color: "white",
                    }}
                  >
                    Info
                  </Button>{" "}
                </Box>
              </Box>
            </Box>

            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography
                variant="h4"
                textAlign="left"
                fontWeight={600}
                color={"#e5e5e5"}
              >
                {formatCurrency(poolStakedInfo?.apy, false, 1, true)}%
              </Typography>
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#757575"}
                fontSize={10}
              >
                APY Returns
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box mt={2}>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Locked value:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                $ {totalValueLocked}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Staked:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                {formatLargeNumber(fromWei(poolStakedInfo?.staked))}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Claimed:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                {formatLargeNumber(fromWei(poolStakedInfo?.claimed))}
              </Typography>
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            style={{ height: 100 }}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="flex-start"
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="left"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                <span style={{ color: "#E0077D" }}>PBR</span> Earned
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={32}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                {" "}
                {tokenType === "PWAR"
                  ? formatCurrency(
                      fromWei(userStakedInfo?.pending),
                      false,
                      1,
                      true
                    )
                  : formatCurrency(fromWei(userStakedInfo?.pending))}{" "}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              mt={3}
            >
              <Button
                hidden={stopped}
                disabled={claimDisableStatus}
                onClick={() => handleClaim(tokenType)}
                style={{
                  borderRadius: 10,
                  background: "#521B8F",
                  padding: "10px 30px 10px 30px",
                  color: "white",
                }}
              >
                CLAIM{" "}
                {/* {txStatus && (
                  <CircularProgress
                    color="info"
                    size={25}
                    style={{ marginLeft: 5 }}
                  />
                )} */}
              </Button>
            </Box>
          </Box>
          <Divider
            light
            variant="fullWidth"
            style={{ color: "white", marginTop: 10 }}
          />
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={400}
                ml={1}
                color="#919191"
              >
                Your Stake
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={22}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                {" "}
                {tokenType === "PWAR"
                  ? formatCurrency(
                      fromWei(userStakedInfo?.staked),
                      false,
                      1,
                      true
                    )
                  : formatCurrency(fromWei(userStakedInfo?.staked))}{" "}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={400}
                ml={1}
                color="#919191"
              >
                You Claimed
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={22}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                {" "}
                {tokenType === "PWAR"
                  ? formatCurrency(
                      fromWei(userStakedInfo?.claimed),
                      false,
                      1,
                      true
                    )
                  : formatCurrency(fromWei(userStakedInfo?.claimed))}{" "}
              </Typography>
            </Box>
          </Box>
          <Box px={2} mt={2} className="d-flex justify-content-around">
            <Button
              disabled={stakeDisableStatus}
              hidden={stopped}
              onClick={() => onStake(tokenType)}
              style={{
                borderRadius: 10,
                background: "#521B8F",
                padding: "9px 20px 9px 20px",
                color: "white",
              }}
            >
              Stake
            </Button>
            <Button
              disabled={withdrawDisableStatus(tokenType)}
              onClick={() => onUnStake(tokenType)}
              style={{
                borderRadius: 10,
                background: "#521B8F",
                padding: "9px 20px 9px 20px",
                color: "white",
              }}
            >
              Unstake
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stake: state.stake,
  account: state.account,
});

export default connect(mapStateToProps, {
  getUserStakedData,
  confirmAllowance,
  getPoolInfo,
  getAccountBalance,
})(Staking);
