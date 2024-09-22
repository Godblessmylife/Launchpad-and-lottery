import * as React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import packagesEth from "../data/packagesEth";
import packagesBsc from "../data/packagesBsc";
import packages from "../data/poolsData";
import {
  Card,
  Button,
  Dialog,
  Slide,
  Backdrop,
  Box,
  Typography,
} from "@mui/material/";
import Timer from "../../../common/Timer";
import { useWeb3React } from "@web3-react/core";
import { userPurchaseDetails } from "actions/inoActions";
import TxPopup from "common/popups/TxPopup";
import { inoContract } from "inoUtils/connections";
import Web3 from "web3";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import Loader from "common/Loader";

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
    fontWeight: 600,
    fontSize: 22,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PurchasedNftCard = ({ packageId, chainIds, currency }) => {
  const classes = useStyles();

  const [userPurchaseDetail, setUserPurchaseDetail] = useState(null);
  const [popup, setPopup] = useState(false);
  const [claimCase, setClaimCase] = useState(0);

  const { active, account, chainId } = useActiveWeb3React();

  const actualPackages = currency === "ETH" ? packagesEth : packagesBsc;

  useEffect(async () => {
    let userPurchaseResult = await userPurchaseDetails(
      packageId,
      account,
      chainIds
    );

    console.log(userPurchaseResult);
    setUserPurchaseDetail(userPurchaseResult);
  }, []);

  const claimPopup = async () => {
    setPopup(true);
    setClaimCase(3);

    const response = await inoContract.methods
      .claimPool(packageId)
      .send({ from: account }, async function (error, transactionHash) {
        if (transactionHash) {
          setClaimCase(5);
        } else {
          setClaimCase(4);
        }
      })
      .on("receipt", async function (receipt) {
        setClaimCase(7);
      })
      .on("error", async function (error) {
        setClaimCase(6);
      });
  };

  const resetPopup = () => {
    setPopup(false);
    setClaimCase(0);
  };

  const enableClaim = () => {
    let date = actualPackages[packageId].claimTime;
    const date1 = new Date(date).getTime(); // Claim Time
    const date2 = Date.now(); // Current Time

    const diffTime = date1 - date2;
    if (diffTime > 0) {
      return false;
    } else {
      return true;
    }
  };

  const formatDate = (timestamp) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date(parseInt(timestamp) * 1000);
    console.log(date);
    let dateString =
      date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();

    return dateString;
  };
  return (
    <div>
      <div className={classes.filterCard}>
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
              style={{
                maxHeight: 155,
                height: "100%",
                width: "100%",
                borderRadius: 15,
              }}
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
          </Box>

          <Box mt={2}>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                color="#919191"
              >
                Total cost:
              </Typography>
              {userPurchaseDetail !== null ? (
                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="center"
                  fontWeight={600}
                  fontSize={14}
                >
                  {parseFloat(
                    Web3.utils.fromWei(
                      userPurchaseDetail.TotalETHPurchase,
                      "ether"
                    )
                  ).toFixed(3)}
                </Typography>
              ) : (
                <div>--</div>
              )}
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                color="#919191"
              >
                Quantity:
              </Typography>

              {userPurchaseDetail !== null ? (
                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="center"
                  fontWeight={600}
                  fontSize={14}
                >
                  {userPurchaseDetail.PurchasedItemCount}
                </Typography>
              ) : (
                <div>--</div>
              )}
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                color="#919191"
              >
                Claim:
              </Typography>

              {userPurchaseDetail !== null ? (
                <Typography
                  variant="body2"
                  className={classes.para}
                  textAlign="center"
                  fontWeight={600}
                  fontSize={14}
                >
                  {actualPackages[packageId].claimTime}
                </Typography>
              ) : (
                <div>--</div>
              )}
            </Box>
          </Box>
          <Box>
            {userPurchaseDetail ? (
              <div>
                {enableClaim() && (
                  <div className="mt-3 px-2">
                    {userPurchaseDetail.IsClaimed && (
                      <div className="text-center mt-3">
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 10,
                            background: "#521B8F",
                            padding: "9px 20px 9px 20px",
                            color: "white",
                            minWidth: 180,
                          }}
                        >
                          You've Claimed
                        </Button>
                      </div>
                    )}
                    {!userPurchaseDetail.IsClaimed && (
                      <div className="text-center mt-3">
                        {" "}
                        {packages[packageId].claimType === "AUTO" && (
                          <Button
                            variant="contained"
                            style={{
                              borderRadius: 10,
                              background: "#521B8F",
                              padding: "9px 20px 9px 20px",
                              color: "white",
                              minWidth: 180,
                            }}
                            onClick={claimPopup}
                          >
                            Claim Your NFT
                          </Button>
                        )}
                        {packages[packageId].claimType === "MANUAL" && (
                          <a
                            href={actualPackages[packageId].claimUrl}
                            target="_blank"
                          >
                            <Button
                              variant="contained"
                              style={{
                                borderRadius: 10,
                                background: "#521B8F",
                                padding: "9px 20px 9px 20px",
                                color: "white",
                                minWidth: 180,
                              }}
                            >
                              View Your NFT
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {!enableClaim() && (
                  <div className="mt-3 px-2">
                    <div className="text-center mt-3">
                      <div className={classes.detailTitle}>Time in claim</div>
                      <div className="mt-1">
                        <Timer endTime={actualPackages[packageId].claimTime} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Loader height={100} />
              </div>
            )}
          </Box>
        </Box>
      </div>

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
          {claimCase !== 1 && (
            <TxPopup txCase={claimCase} resetPopup={resetPopup} />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default PurchasedNftCard;
