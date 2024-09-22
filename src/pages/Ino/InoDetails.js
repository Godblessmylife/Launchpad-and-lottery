import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import {
  Article,
  Assessment,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Language,
  LinkedIn,
  Mail,
  Telegram,
  Twitter,
  Verified,
  Web,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import NFTCard from "./components/NFTCard";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import localPools from "./data/poolsData";
import { getPoolDetails } from "actions/inoActions";
import Timer from "common/Timer";

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
      paddingTop: "5%",
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  imageWrapper: {
    // background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 20,
  },

  title: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#ffffff",
    textAlign: "left",
  },
  subheading: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#919191",
    textAlign: "left",
  },

  description: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#919191",
    textAlign: "left",
  },

  para: {
    fontWeight: 400,
    fontSize: 15,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "left",
  },
  li: {
    fontWeight: 400,
    fontSize: 13,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "left",
  },
  buttonWrapper: {
    marginTop: 10,
    width: "fit-content",
    padding: "2px 10px 2px 10px",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 14,
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
  aboutCard: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    minHeight: 200,
    height: "100%",
    padding: 10,
  },
  infoCard: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    minHeight: 200,
    height: "100%",
    padding: 10,
  },
  joinPoolButton: {
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 22,
    color: "#521B8F",
    padding: "6px 40px 6px 40px",
    backgroundColor: "white",
    textTransform: "none",
    marginTop: 15,
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  imageWrapper: {
    padding: 10,
    // width: 300,
    // height: 300,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    maxHeight: 200,
    maxWidth: 200,
    objectFit: "contain",
  },
}));

export default function InoDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const { active, account, chainId } = useActiveWeb3React();
  const navigate = useNavigate();

  const [saleCase, setSaleCase] = useState(0);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [poolDetailsLocal, setPoolDetailsLocal] = useState(null);
  const [poolDetail, setPoolDetail] = useState(null);
  const [timeToCalc, setTimeToCalc] = useState(Date.now());

  useEffect(async () => {
    let poolDataObj = localPools[parseInt(id) - 1];

    setPoolDetailsLocal(poolDataObj);
    let result = await getPoolDetails(poolDataObj.id, poolDataObj.chainIds);
    console.log(result);
    setPoolDetail(result);
  }, []);

  useEffect(() => {
    if (poolDetail) {
      calculateSaleCase();
    }
  }, [poolDetail]);

  const calculateSaleCase = () => {
    let poolDataObj = localPools[parseInt(id) - 1];
    if (poolDataObj) {
      let date = poolDataObj.startDate;

      const date1 = new Date(date).getTime(); // Begin Time
      const date2 = Date.now(); // Current Time

      console.log(date);
      console.log(date2);
      const diffTime = date1 - date2;

      if (diffTime > 0) {
        console.log("Sale not started");
        setTimeToCalc(date1);
        setSaleCase(0);
      } else {
        console.log("Sale started");

        let timeToEnd = poolDetail.End * 1000 - Date.now();
        if (timeToEnd < 0) {
          setSaleCase(2);
          setTimeToCalc(poolDetail.End * 1000);
        } else {
          setSaleCase(1);
          setTimeToCalc(poolDetail.End * 1000);
        }
      }
    }
  };
  return (
    <Box>
      {poolDetailsLocal && (
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
            display="flex"
            flexDirection={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box className={classes.imageWrapper}>
                <img
                  src={poolDetailsLocal.logo}
                  alt="Company Logo"
                  className={classes.logo}
                />{" "}
              </Box>
              <Button
                style={{
                  height: 26,
                  marginTop: 10,
                  width: "fit-content",
                  fontSize: 10,
                  borderRadius: 10,
                  background: "#7825D5",
                  padding: "2px 15px 2px 15px",
                  color: "white",
                }}
              >
                <Verified style={{ color: "#81c784", padding: 3 }} /> FCFS
              </Button>
            </Box>
            <Box ml={5} style={{ width: "60%" }}>
              <Typography
                variant="h6"
                className={classes.title}
                textAlign="left"
                fontWeight={600}
              >
                {poolDetailsLocal.title}
              </Typography>
              <Typography
                variant="h6"
                className={classes.subheading}
                textAlign="left"
                fontWeight={600}
              >
                {poolDetailsLocal.summary}
              </Typography>
              {saleCase === 0 && (
                <Box
                  display={"flex"}
                  justifyContent="flex-start"
                  className={classes.buttonWrapper}
                >
                  <Box
                    className={classes.buttonCard}
                    style={{ color: "#31B22F" }}
                  >
                    Presale Starts in:{" "}
                  </Box>
                  <Divider
                    light
                    variant="fullWidth"
                    orientation="vertical"
                    style={{ color: "white", height: "100%", width: 1 }}
                  />
                  <Box className={classes.buttonCard}>
                    {console.log(timeToCalc)}
                    <Timer endTime={timeToCalc} type={"normal"} />
                  </Box>
                </Box>
              )}
              {saleCase === 1 && (
                <Box
                  display={"flex"}
                  justifyContent="flex-start"
                  className={classes.buttonWrapper}
                >
                  <Box
                    className={classes.buttonCard}
                    style={{ color: "#31B22F" }}
                  >
                    Sale ends in:
                  </Box>
                  <Divider
                    light
                    variant="fullWidth"
                    orientation="vertical"
                    style={{ color: "white", height: "100%", width: 1 }}
                  />
                  <Box className={classes.buttonCard}>
                    {console.log(timeToCalc)}
                    <Timer endTime={timeToCalc} type={"normal"} />
                  </Box>
                </Box>
              )}
              {saleCase === 2 && (
                <Box
                  display={"flex"}
                  justifyContent="flex-start"
                  className={classes.buttonWrapper}
                >
                  <Box
                    className={classes.buttonCard}
                    style={{ color: "#FF5252" }}
                  >
                    Sale ended
                  </Box>
                  <Divider
                    light
                    variant="fullWidth"
                    orientation="vertical"
                    style={{ color: "white", height: "100%", width: 1 }}
                  />
                </Box>
              )}
              <Box mt={2}>
                <Button
                  onClick={() => setVisibleAbout(!visibleAbout)}
                  style={{
                    borderRadius: 10,
                    background: "transparent",
                    padding: "5px 20px 5px 20px",
                    border: "1px solid #521B8F",
                    color: "#f9f9f9",
                    width: "fit-content",
                    fontSize: 14,
                  }}
                >
                  {!visibleAbout ? (
                    <span>
                      View Project Details <KeyboardArrowDown />
                    </span>
                  ) : (
                    <span>
                      Hide Project Details <KeyboardArrowUp />
                    </span>
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
          {visibleAbout && (
            <Container className="mt-5">
              <Box className={classes.aboutCard}>
                <Box mb={1}>
                  <Typography
                    mb={2}
                    variant="h6"
                    textAlign="left"
                    fontSize={20}
                    fontWeight={600}
                    ml={1}
                    color="#f9f9f9"
                  >
                    About Project
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.description}
                    textAlign="left"
                    fontWeight={400}
                    color="#919191"
                    ml={1}
                  >
                    {poolDetailsLocal.description}
                  </Typography>

                  <Box display={"flex"} justifyContent="flex-start" mt={2}>
                    <a href={poolDetailsLocal.whitepaper}>
                      {" "}
                      <IconButton>
                        <Article style={{ color: "#7825D5" }} />
                      </IconButton>
                    </a>
                    <a href={poolDetailsLocal.website}>
                      {" "}
                      <IconButton>
                        <Language style={{ color: "#7825D5" }} />
                      </IconButton>
                    </a>
                    <a href={poolDetailsLocal.twitter}>
                      <IconButton>
                        <Twitter style={{ color: "#7825D5" }} />
                      </IconButton>
                    </a>
                    <a href={poolDetailsLocal.telegram}>
                      {" "}
                      <IconButton>
                        <Telegram style={{ color: "#7825D5" }} />
                      </IconButton>
                    </a>
                  </Box>
                  <Grid
                    container
                    display={"flex"}
                    justifyContent="center"
                    mt={1}
                  >
                    <Grid item md={6}>
                      <Typography
                        mb={2}
                        variant="h6"
                        textAlign="left"
                        fontSize={20}
                        fontWeight={600}
                        ml={1}
                        color="#7825D5"
                      >
                        Rules
                      </Typography>

                      <ul>
                        <li className={classes.li}>
                          You can participate in this INO pool by paying the
                          amount of NFTs.
                        </li>
                        <li className={classes.li}>
                          Once NFTs listed on official platform, you can
                          sell/transfer to anywhere.
                        </li>
                        <li className={classes.li}>
                          For more information visit our telegram group.
                        </li>
                      </ul>
                    </Grid>
                    <Grid item md={6}>
                      {" "}
                      <Typography
                        mb={1}
                        variant="h6"
                        textAlign="left"
                        fontSize={20}
                        fontWeight={600}
                        ml={1}
                        color="#7825D5"
                      >
                        NFT Utilities
                      </Typography>
                      <Typography
                        mb={1}
                        variant="body2"
                        textAlign="left"
                        fontSize={14}
                        fontWeight={400}
                        ml={1}
                        color="#f9f9f9"
                      >
                        Why you should hold these NFTs
                      </Typography>
                      <ul>
                        {poolDetailsLocal.utilities.map((utility) => {
                          return <li className={classes.li}>{utility}</li>;
                        })}
                      </ul>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          )}
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Container className="mt-5">
              <Typography
                variant="h6"
                color={"#f9f9f9"}
                textAlign="left"
                fontWeight={600}
                fontSize={24}
              >
                NFTs on sale
              </Typography>
              <Grid container display={"flex"} justifyContent="start">
                {poolDetail &&
                  poolDetail.PackageIds.map((packageId, index) => {
                    return (
                      <Grid item md={4}>
                        <NFTCard
                          poolDetailsLocal={poolDetailsLocal}
                          packageId={packageId}
                          endTime={poolDetail.End}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </Box>
  );
}
