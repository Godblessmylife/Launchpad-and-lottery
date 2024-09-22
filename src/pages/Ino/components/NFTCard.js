import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Slide,
  Backdrop,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import packagesEth from "./../data/packagesEth";
import packagesBsc from "../data/packagesBsc";
import {
  getPackageDetails,
  getRemainINOToken,
  userPurchaseDetails,
} from "actions/inoActions";
import Timer from "common/Timer";
import ProgressStatsBar from "common/ProgressStatsBar";
import TxPopup from "common/popups/TxPopup";
import Web3 from "web3";
import { inoContract } from "inoUtils/connections";
import PurchasePopup from "./PurchasePopup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  filterCard: {
    marginTop: 15,
    marginBottom: 15,
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
    fontWeight: 400,
    fontSize: 10,
    letterSpacing: "0.02em",
    color: "#919191",
    textAlign: "center",
  },

  para: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#e5e5e5",
    textAlign: "center",
  },
  cardTitle: {
    paddingTop: 5,
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: "0.02em",
    color: "#FFFFFF",
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

  imageWrapper: {
    background: `url(
      'https://miro.medium.com/max/1400/1*wKoQqhuPZG5Zq6LFZ7pU8g.jpeg'
    )`,
    height: 140,
    width: "100%",
    backgroundSize: "cover",
    padding: 5,
    borderRadius: 5,
  },
}));

export default function NFTCard({ packageId, endTime, poolDetailsLocal }) {
  const classes = useStyles();
  const theme = useTheme();

  const { active, account, chainId } = useActiveWeb3React();

  const actualPackages =
    poolDetailsLocal.currency === "ETH" ? packagesEth : packagesBsc;

  const [remainToken, setRemainToken] = useState(null);
  const [packageDetail, setPackageDetail] = useState(null);
  const [userPurchaseDetail, setUserPurchaseDetail] = useState(null);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [popup, setPopup] = useState(false);
  const [purchaseCase, setPurchaseCase] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [end, setEnd] = useState(false);
  const [quantityBought, setQuantityBought] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);

  useEffect(async () => {
    let packageResponse = await getPackageDetails(
      packageId,
      poolDetailsLocal.chainIds
    );
    setPackageDetail(packageResponse);

    let remainTokenResponse = await getRemainINOToken(
      packageId,
      poolDetailsLocal.chainIds
    );
    setRemainToken(remainTokenResponse);
    if (account) {
      let userPurchaseResult = await userPurchaseDetails(
        packageId,
        account,
        poolDetailsLocal.chainIds
      );
      setQuantityBought(parseInt(userPurchaseResult.PurchasedItemCount));
      setUserPurchaseDetail(userPurchaseResult);
      setIsPurchased(parseInt(userPurchaseResult.PurchasedItemCount) > 0);
      setIsClaimed(userPurchaseResult.IsClaimed);

      let timeToEnd = endTime * 1000 - Date.now();
      if (timeToEnd < 0) {
        setEnd(true);
      }
      setLoading(false);
    }
  }, [active, account, refetch]);

  const disablePurchase = () => {
    if (actualPackages[packageId]) {
      let date = actualPackages[packageId].startDate;

      const date1 = new Date(date).getTime(); // Begin Time
      const date2 = Date.now(); // Current Time

      const diffTime = date1 - date2;

      if (diffTime > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handlePurchasePopup = () => {
    setPopup(true);
    setPurchaseCase(1);
  };

  const progressPercentage = () => {
    if (!packageDetail) {
      return "--";
    }
    return parseFloat(
      (packageDetail.TotalSoldCount * 100) / packageDetail.TotalItemCount
    ).toFixed(2);
  };

  const resetPopup = () => {
    setPopup(false);
    setPurchaseCase(0);
  };

  const handlePurchase = async () => {
    setPopup(true);
    setPurchaseCase(1);

    // Contract instance based on Chain Id
    let contractInstance = await inoContract(poolDetailsLocal.chainIds);

    // Price of one item in ETH
    let priceInEth =
      1 / parseFloat(Web3.utils.fromWei(packageDetail.RatePerETH, "ether"));

    //Total amount of all quantity
    let totalAmount = parseInt(quantity) * priceInEth;
    console.log(totalAmount);

    let finalValue = Web3.utils.toWei(totalAmount.toString(), "ether");
    const response = await contractInstance.methods
      .purchaseINO(packageId, quantity)
      .send(
        {
          from: account,
          value: finalValue.toString(),
        },
        async function (error, transactionHash) {
          if (transactionHash) {
            setPurchaseCase(2);
          } else {
            setPurchaseCase(4);
          }
        }
      )
      .on("receipt", async function (receipt) {
        setPurchaseCase(5);
        setRefetch(refetch + 1);
      })
      .on("error", async function (error) {
        console.log(error);
        setPurchaseCase(4);
      });
  };

  return (
    <Box>
      <div className={classes.filterCard}>
        {poolDetailsLocal && (
          <Box pt={0} px={3}>
            <div
              style={{
                height: 160,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <img
                src={actualPackages[packageId].image}
                style={{ height: 155, width: "fit-content", borderRadius: 15 }}
              />
            </div>
            <Box>
              <Typography
                variant="h6"
                className={classes.cardTitle}
                textAlign="center"
                fontWeight={600}
              >
                {actualPackages[packageId].title}
              </Typography>
              <Typography
                variant="h6"
                className={classes.subheading}
                textAlign="center"
                fontWeight={600}
              >
                {actualPackages[packageId].poolName}
              </Typography>
              {quantityBought > 0 && (
                <Box display={"flex"} justifyContent="center" mb={2}>
                  <div
                    style={{
                      borderRadius: 10,
                      background: "#521B8F",
                      padding: "5px 20px 5px 20px",
                      color: "white",
                      width: "fit-content",
                      fontSize: 14,
                    }}
                  >
                    Owned NFTs: <strong>{quantityBought}</strong>
                  </div>
                </Box>
              )}
            </Box>
            <Box mt={1}>
              {actualPackages[packageId] && (
                <Typography
                  variant="body2"
                  textAlign="left"
                  fontSize={13}
                  fontWeight={400}
                  color="#f9f9f9"
                >
                  {actualPackages[packageId].description}
                </Typography>
              )}
            </Box>

            <Typography
              variant="body2"
              textAlign="left"
              fontWeight={400}
              fontSize={12}
              color="#bdbdbd"
              pb={1}
              mt={2}
            >
              Progress ({progressPercentage()}%)
            </Typography>

            <div htmlFor="power" className={classes.powerWrapper}>
              <ProgressStatsBar
                value={packageDetail ? packageDetail.TotalSoldCount : 0}
                maxValue={packageDetail ? packageDetail.TotalItemCount : 100}
              />
            </div>

            <Box display={"flex"} justifyContent="space-between">
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                fontSize={12}
                color="#bdbdbd"
                pb={1}
              >
                0
              </Typography>
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                fontSize={12}
                color="#bdbdbd"
                pb={1}
              >
                Max: {packageDetail && packageDetail.TotalItemCount}
              </Typography>
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
                  color="#919191"
                >
                  Price per NFT
                </Typography>
                {actualPackages[packageId] && (
                  <Typography
                    variant="body2"
                    className={classes.para}
                    textAlign="right"
                    fontWeight={600}
                    fontSize={14}
                    ml={1}
                    width={"fit-content"}
                  >
                    {actualPackages[packageId].price}{" "}
                    {actualPackages[packageId].currency}
                  </Typography>
                )}
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} mb={1}>
                <Typography
                  variant="h6"
                  textAlign="left"
                  fontSize={13}
                  fontWeight={600}
                  ml={1}
                  color="#919191"
                  width={"fit-content"}
                  minWidth={70}
                >
                  Remaining
                </Typography>

                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="right"
                  fontWeight={600}
                  fontSize={14}
                  ml={1}
                  width={"fit-content"}
                >
                  {remainToken}
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} mb={1}>
                <Typography
                  variant="h6"
                  textAlign="left"
                  fontSize={13}
                  fontWeight={600}
                  ml={1}
                  color="#919191"
                  width={"fit-content"}
                  minWidth={70}
                >
                  Network
                </Typography>

                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="right"
                  fontWeight={600}
                  fontSize={14}
                  ml={1}
                  width={"fit-content"}
                >
                  {poolDetailsLocal.network}
                </Typography>
              </Box>
            </Box>

            <Box
              px={2}
              mt={2}
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <div className="mt-3 px-2">
                {active && (
                  <div className="text-center mt-3">
                    {poolDetailsLocal.chainIds.includes(chainId) ? (
                      <div>
                        {disablePurchase() ? (
                          <div className="mt-3 px-2">
                            <div className="text-center mt-3">
                              <div className="mt-1">
                                <div
                                  style={{
                                    color: "white",
                                    paddingBottom: 4,
                                  }}
                                >
                                  Sell starts in
                                </div>
                                <Timer
                                  endTime={actualPackages[packageId].startDate}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 px-3">
                            {!end && (
                              <Button
                                style={{
                                  borderRadius: 10,
                                  background: "#521B8F",
                                  padding: "9px 20px 9px 20px",
                                  color: "white",
                                  minWidth: 240,
                                  textTransform: "none",
                                }}
                                onClick={handlePurchasePopup}
                              >
                                Purchase Now
                              </Button>
                            )}
                          </div>
                        )}

                        {end && !isClaimed && !isPurchased && (
                          <Button
                            variant="contained"
                            style={{
                              borderRadius: 10,
                              background: "rgba(82, 27, 143,0.4)",
                              padding: "9px 20px 9px 20px",
                              color: "white",
                              minWidth: 240,
                              textTransform: "none",
                            }}
                          >
                            Sell Ended
                          </Button>
                        )}
                        {end && isPurchased && (
                          <Link to="/profile">
                            <Button
                              variant="contained"
                              style={{
                                borderRadius: 10,
                                background: "#521B8F",
                                padding: "9px 20px 9px 20px",
                                color: "white",
                                minWidth: 240,
                                textTransform: "none",
                              }}
                            >
                              View Your NFTs
                            </Button>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <Button
                          style={{
                            borderRadius: 10,
                            background: "rgba(82, 27, 143,0.4)",
                            padding: "9px 20px 9px 20px",
                            color: "white",
                            minWidth: 240,
                            textTransform: "none",
                          }}
                        >
                          Wrong Network
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {!active && (
                  <div className="text-center mt-3">
                    <Button
                      style={{
                        borderRadius: 10,
                        background: "#521B8F",
                        padding: "9px 20px 9px 20px",
                        color: "white",
                        minWidth: 240,
                        textTransform: "none",
                      }}
                    >
                      Connect Wallet First
                    </Button>
                  </div>
                )}
              </div>
            </Box>

            <Dialog
              className={classes.modal}
              open={popup}
              TransitionComponent={Transition}
              keepMounted={false}
              onClose={() => setPopup(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              PaperProps={{
                style: {
                  borderRadius: 10,
                  backgroundColor: "black",
                  border: "4px solid #212121",
                },
              }}
            >
              <div
                style={{
                  backgroundColor: "black",
                  borderRadius: 3,
                  overflowX: "hidden",
                }}
              >
                {purchaseCase === 1 && (
                  <PurchasePopup
                    purchasePackage={handlePurchase}
                    currentPackage={actualPackages[packageId]}
                    resetPopup={resetPopup}
                    setQuantity={setQuantity}
                    maxPurchase={
                      packageDetail.TotalItemCount -
                      packageDetail.TotalSoldCount
                    }
                    minQuantity={packageDetail.MinimumTokenSoldout}
                  />
                )}

                {purchaseCase > 1 && (
                  <TxPopup txCase={purchaseCase} resetPopup={resetPopup} />
                )}
              </div>
            </Dialog>
          </Box>
        )}
      </div>
    </Box>
  );
}
