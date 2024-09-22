import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { getUserPurchasedPackages } from "actions/inoActions";
import PurchaseNftCard from "./components/PurchasedNftCard";
import PurchasedNftCard from "./components/PurchasedNftCard";
import Loader from "common/Loader";
import { Link, useParams, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",

    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",
      paddingLeft: "3%",
      paddingRight: "3%",
    },
  },
  buttonWrapper: {
    width: "fit-content",
    padding: "10px 10px 10px 10px",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  buttonCard: {
    width: "fit-content",
    padding: "10px 20px 10px 20px",
    color: "#f5f5f5",
    fontWeight: 500,
    [theme.breakpoints.down("md")]: {
      width: "fit-content",
      padding: "10px 10px 10px 10px",
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

export default function InoPurchases() {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const { active, account, chainId } = useActiveWeb3React();

  const [purchasedPackagesEth, setPurchasedPackagesEth] = useState([]);
  const [purchasedPackagesBsc, setPurchasedPackagesBsc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    if (active) {
      let userAddress = account;
      console.log(userAddress);
      let resultEth = await getUserPurchasedPackages(userAddress, [1, 4]);
      let resultBsc = await getUserPurchasedPackages(userAddress, [56, 97]);
      setPurchasedPackagesEth(resultEth);
      setPurchasedPackagesBsc(resultBsc);
      console.log(resultEth);
      console.log(resultBsc);
    }
    setLoading(false);
  }, [active]);

  return (
    <Box>
      <Box className={classes.background}>
        <Typography
          variant="body2"
          mb={2}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          fontWeight={600}
        >
          {"< "} Back
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"flex-start"}
          justifyContent="space-between"
        >
          <h3 variant="h1" className={classes.pageTitle}>
            My purchases
          </h3>{" "}
        </Box>

        <Container>
          {active && (
            <div>
              {loading && (
                <div className="text-center">
                  <Loader height={200} />
                </div>
              )}
              {!loading && (
                <div>
                  {" "}
                  {purchasedPackagesEth.length + purchasedPackagesBsc.length ===
                    0 && (
                    <div className={classes.messageCard}>
                      <div className="text-center mt-3">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2855/2855027.png"
                          height="140px"
                        />
                      </div>
                      <h1 className={classes.message}>
                        You did not yet participated in INO.
                      </h1>
                    </div>
                  )}
                  {purchasedPackagesEth.length + purchasedPackagesBsc.length !==
                    0 && (
                    <div className="row mt-4">
                      {console.log(purchasedPackagesEth)}
                      {console.log(purchasedPackagesBsc)}
                      {purchasedPackagesEth.map((singlePackageId) => (
                        <div className="col-12 col-md-4">
                          <PurchasedNftCard
                            packageId={singlePackageId}
                            chainIds={[1, 4]}
                            currency="ETH"
                          />
                        </div>
                      ))}
                      {purchasedPackagesBsc.map((singlePackageId) => (
                        <div className="col-12 col-md-4">
                          <PurchasedNftCard
                            packageId={singlePackageId}
                            chainIds={[56, 97]}
                            currency="BSC"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {!active && (
            <div className="text-center">
              <h4 style={{ color: "white" }}>Connect Your Wallet First</h4>
            </div>
          )}

          <Grid container display={"flex"} justifyContent="center">
            {/* {localPools.map((item) => {
              return (
                <Grid item md={6}>
                  <InoCard item={item} />
                </Grid>
              );
            })} */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
