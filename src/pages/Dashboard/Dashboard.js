import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { supportedStaking, unsupportedStaking } from "../../constants";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import PBRStats from "./components/PBRStats";
import BalancesCard from "./components/BalancesCard";
import { getPbrStats } from "./../../actions/apiActions";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",

      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },

  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { menuTabIndex } = store.ui;

  let [stats, setStats] = useState({
    usd: 0.0,
    usd_24h_change: 0,
    usd_market_cap: 0,
  });

  const { active, account, chainId } = useActiveWeb3React();

  useEffect(() => {
    async function asyncFn() {
      let data = await getPbrStats();
      if (data.polkabridge) {
        setStats(data.polkabridge);
      }
    }
    asyncFn();
  }, []);

  return (
    <Box className={classes.background}>
      <h3 variant="h1" className={classes.pageTitle}>
        Dashboard
      </h3>
      <div className="row">
        <div className="col-md-8 mb-2">
          <PBRStats stats={stats} />
        </div>
        <div className="col-md-4 mb-2">
          <div>
            <BalancesCard tokens={supportedStaking[chainId]} />
          </div>
        </div>
      </div>
    </Box>
  );
}
