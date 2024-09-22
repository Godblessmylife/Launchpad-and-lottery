import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { formatCurrency, fromWei } from "../../../utils/helper";
import {
  tokenLogo,
  tokenName,
  supportedStaking,
  CORGIB,
  tokenAddresses,
} from "../../../constants";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useCurrencyBalances } from "../../../hooks/useBalance";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    height: "100%",
    minHeight: 360,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 30,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    backgroundColor: "#140F16",
    border: "3px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingLeft: "3%",
    paddingRight: "3%",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
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
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 10,
  },
}));
function BalancesCard() {
  const classes = useStyles();

  const { chainId, account } = useActiveWeb3React();

  const tokens = useMemo(() => {
    return supportedStaking?.[chainId]?.map((_symbol) => {
      return { symbol: _symbol, address: tokenAddresses?.[_symbol]?.[chainId] };
    });
  }, [chainId]);
  const balances = useCurrencyBalances(account, tokens);

  return (
    <div className={classes.card} elevation={10}>
      <div className="mt-1 mb-3">
        <Typography variant="h4" textAlign={"center"} fontWeight={700}>
          My Balances
        </Typography>
      </div>

      {tokens?.map(function (token, index) {
        return (
          <div className="mt-3 d-flex justify-content-center">
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="space-between"
              alignItems="center"
              style={{
                width: "100%",
                background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.01) 26.45%, rgba(215, 86, 236, 0.05) 69.5%)`,
                border: "1px solid #212121",
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 20,
                paddingRight: 20,
                cursor: "pointer",
                borderRadius: 20,
              }}
            >
              <Box display="flex" justifyContent="flex-start">
                <Box className={classes.imageWrapper}>
                  <img
                    src={tokenLogo?.[token?.symbol]}
                    alt="PBR"
                    height="30px"
                    style={{ maxWidth: 30, width: "100%" }}
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
                    {token?.symbol}
                  </Typography>
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    ml={1}
                    fontSize={14}
                  >
                    {tokenName?.[token?.symbol]}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-start">
                <Box>
                  <Typography
                    variant="h6"
                    className={classes.cardTitle}
                    textAlign="left"
                    fontWeight={600}
                    ml={1}
                  >
                    {token?.symbol === CORGIB
                      ? formatCurrency(fromWei(balances?.[index]))
                      : formatCurrency(
                          fromWei(balances?.[index]),
                          false,
                          1,
                          true
                        )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
        );
      })}

      {/* <div className="mt-4">
        {tokens?.map(function (token, index) {
          return (
            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start">
                <div className={classes.logoWrapper}>
                  <img
                    src={tokenLogo?.[token?.symbol]}
                    className={classes.logo}
                  />
                </div>
                <div>
                  <div className={classes.tokenTitle}>{token?.symbol}</div>
                  <div className={classes.tokenSubtitle}>
                    {tokenName?.[token?.symbol]}
                  </div>
                </div>
              </div>
              <div className={classes.tokenAmount}>
                {token?.symbol === CORGIB
                  ? formatCurrency(fromWei(balances?.[index]))
                  : formatCurrency(fromWei(balances?.[index]), false, 1, true)}
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default React.memo(BalancesCard);
