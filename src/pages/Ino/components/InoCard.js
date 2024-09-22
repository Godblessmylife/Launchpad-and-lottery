import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {
  getInitialBalanceOfPool,
  getIsWhitelisted,
  getRemainingQuantityOfPool,
} from "actions/inoActions";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import ProgressStatsBar from "common/ProgressStatsBar";

const useStyles = makeStyles((theme) => ({
  filterCard: {
    marginTop: 15,
    marginBottom: 15,
    minHeight: 400,
    height: "100%",
    width: "92%",
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    backgroundColor: "#140F16",
    border: "3px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  subheading: {
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#919191",
    textAlign: "left",
  },

  para: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#e5e5e5",
    textAlign: "center",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: "0.02em",
    color: "#FFFFFF",
    textAlign: "left",
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

  imageWrapper: {
    padding: 10,
    width: 100,
    height: 100,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    maxHeight: 80,
    maxWidth: 80,
    objectFit: "contain",
  },
  powerWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "grey",
    fontSize: 12,
  },
}));

export default function InoCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();

  const { active, account, chainId } = useActiveWeb3React();

  const [isWhitelist, setIsWhitelist] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [initial, setInitial] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    if (!item) {
      return 0;
    }

    let activeChainIds = item.chainIds;

    let poolId = item.id;
    let remainingQuantity = await getRemainingQuantityOfPool(
      poolId,
      activeChainIds
    );

    let initialQuantity = await getInitialBalanceOfPool(poolId, activeChainIds);

    if (active) {
      let whitelistResult = await getIsWhitelisted(
        poolId,
        account,
        activeChainIds
      );
      setIsWhitelist(whitelistResult);
    }
    setInitial(initialQuantity);
    setRemaining(remainingQuantity);
    setLoading(false);
  }, [item, active]);

  const percentageSell = () => {
    let numerator = initial - remaining;

    let fraction = numerator / initial;

    return (fraction * 100).toFixed(1);
  };

  return (
    <Box>
      <div className={classes.filterCard}>
        <Box pt={0} px={3}>
          <Box
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
                  src={item.logo}
                  alt=" Logo"
                  height="40px"
                  className={classes.logo}
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
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.subheading}
                  textAlign="left"
                  fontWeight={600}
                  ml={2}
                >
                  {item.summary}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              textAlign="left"
              fontSize={13}
              fontWeight={500}
              color="#bdbdbd"
              minHeight={70}
            >
              {item.description.slice(0, 160) +
                (item.description.length > 160 ? "..." : "")}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            fontSize={14}
            color="#bdbdbd"
            pt={2}
          >
            Progress (
            {isNaN(parseFloat(percentageSell())) ? "--" : percentageSell()}%)
          </Typography>
          <div htmlFor="power" className={classes.powerWrapper}>
            <ProgressStatsBar
              value={
                isNaN(parseFloat(percentageSell())) ? 0 : initial - remaining
              }
              maxValue={isNaN(parseFloat(percentageSell())) ? 100 : initial}
            />
          </div>
          {/* <div class="containered">
              <div class="progress2 progress-moved">
                <div class="progress-bar2"></div>
              </div>
            </div> */}
          <Divider />
          <Box mt={2}>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Start Date:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={600}
                ml={1}
                fontSize={14}
              >
                {item.startDate}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Total NFTs on Sell
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={600}
                ml={1}
                fontSize={14}
              >
                {item.quantity}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Remaining Quantity
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                fontWeight={600}
                ml={1}
                fontSize={14}
              >
                {!loading ? remaining : "--"}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Price range
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={600}
                ml={1}
                fontSize={14}
              >
                {item.priceRange} {item.currency}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Network
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                fontWeight={600}
                ml={1}
                fontSize={14}
              >
                {item.network}
              </Typography>
            </Box>
          </Box>

          <Box
            my={2}
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
            style={{
              border: "1px solid #4A3F55",
              padding: 5,
              borderRadius: 20,
            }}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              mt={2}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Total raise
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={32}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                ${item.totalRaiseAmount}
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                <span style={{ color: "#E0077D" }}>
                  IN {item.currency.toUpperCase()}
                </span>
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              mt={2}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                Min price
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={32}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                ${item.minPrice}
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                <span style={{ color: "#E0077D" }}>PER NFT</span>
              </Typography>
            </Box>
          </Box>

          <Box
            px={2}
            mt={2}
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <Link to={`/view-ino/${item.poolId}`}>
              {" "}
              <Button
                style={{
                  borderRadius: 10,
                  background: "#521B8F",
                  padding: "9px 20px 9px 20px",
                  color: "white",
                  minWidth: 240,
                }}
              >
                View
              </Button>
            </Link>{" "}
          </Box>
        </Box>
      </div>
    </Box>
  );
}
