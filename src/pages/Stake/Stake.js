import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useMemo } from "react";
import SingleStakeCard from "../../components/SingleStakeCard";
import { connect } from "react-redux";
import { supportedStaking, unsupportedStaking } from "../../constants";
import { CHANGE_NETWORK, CONNECT_WALLET } from "../../actions/types";
import store from "../../store";
import { getCurrentNetworkName } from "../../utils/helper";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { Container, Grid } from "@mui/material";

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
}));

const Home = ({ account: { error, currentChain } }) => {
  const classes = useStyles();

  const { active, account, chainId } = useActiveWeb3React();

  useEffect(() => {
    if (!chainId || !active) {
      // check if there is existing cached selected network other wise select ethereum chain by default

      const cachedChain = localStorage.getItem("cachedChain");
      if (!cachedChain) {
        localStorage.setItem("cachedChain", 1);
      }

      const _network = getCurrentNetworkName(cachedChain || 1);
      console.log("setting cached chain to select chain id ", cachedChain || 1);

      store.dispatch({
        type: CHANGE_NETWORK,
        payload: { network: _network, chain: cachedChain || 1 },
      });

      return;
    }

    const _network = getCurrentNetworkName(chainId);

    store.dispatch({
      type: CONNECT_WALLET,
      payload: account,
    });
    store.dispatch({
      type: CHANGE_NETWORK,
      payload: { network: _network, chain: chainId },
    });
  }, [chainId, active, account]);

  useEffect(() => {
    async function onNetworkChangeUpdate() {
      if (typeof window.web3 !== "undefined") {
        window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts.length === 0) {
            localStorage.connected = "none";
            return;
          }
        });

        window.ethereum.on("disconnect", (error) => {
          console.log("disconnected ", error);
          localStorage.connected = "none";
        });
      }
    }
    onNetworkChangeUpdate();
  }, []);

  useEffect(() => {
    if (!currentChain) {
      return;
    }
    console.log("chain changed ", currentChain);
    const cachedChain = localStorage.getItem("cachedChain");

    if (cachedChain && currentChain?.toString() !== cachedChain) {
      localStorage.setItem("cachedChain", currentChain?.toString());

      window.location.reload();
    } else if (!cachedChain) {
      localStorage.setItem("cachedChain", currentChain?.toString());
    }
  }, [currentChain]);

  useEffect(() => {
    if (JSON.stringify(error).includes("-32000")) {
      alert(
        `You don't have enough balance to pay gas fee for the transaction!`
      );
    } else if (JSON.stringify(error).includes("User rejected transaction")) {
      alert(`Transaction cancelled`);
    }
  }, [JSON.stringify(error)]);

  const supportedStakingPools = useMemo(
    () =>
      Object.keys(supportedStaking).includes(currentChain?.toString())
        ? supportedStaking?.[currentChain]
        : !currentChain
        ? supportedStaking[1]
        : [],
    [currentChain]
  );
  const unSupportedStakingPools = useMemo(
    () =>
      Object.keys(unsupportedStaking).includes(currentChain?.toString())
        ? unsupportedStaking?.[currentChain]
        : !currentChain
        ? unsupportedStaking[1]
        : [],
    [currentChain]
  );

  return (
    <div>
      <div className={classes.background}>
        {supportedStakingPools.length === 0 && (
          <div style={{ textAlign: "center", color: "white" }}>
            No Staking pool available.
          </div>
        )}

        {supportedStakingPools.length > 0 && (
          <div>
            <h3 variant="h1" className={classes.pageTitle}>
              Active Pools
            </h3>
            <Container>
              <Grid container display={"flex"} justifyContent="flex-start">
                {supportedStakingPools.map((token) => (
                  <Grid item md={4}>
                    <div className={classes.card}>
                      <SingleStakeCard tokenType={token} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        )}

        {unSupportedStakingPools.length > 0 && (
          <div className="mt-5">
            <h3 variant="h1" className={classes.pageTitle}>
              Ended Pools
            </h3>
            <Container>
              <Grid container display={"flex"} justifyContent="flex-start">
                {unSupportedStakingPools.map((token) => (
                  <Grid item md={4}>
                    <div className={classes.card}>
                      <SingleStakeCard tokenType={token} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        )}
        {supportedStakingPools.length === 0 && (
          <div style={{ textAlign: "center", color: "white" }}></div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, {})(Home);
