import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Divider,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import { Verified } from "@mui/icons-material";
import ClaimSection from "./components/ClaimSection";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
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
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 20,
  },

  title: {
    fontWeight: 600,
    fontSize: 36,
    letterSpacing: "0.02em",
    color: "#ffffff",
    textAlign: "left",
  },
  subheading: {
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: "0.02em",
    color: "#919191",
    textAlign: "left",
  },

  description: {
    fontWeight: 400,
    fontSize: 15,
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
  purchaseCard: {
    borderRadius: 25,
    minWidth: 500,
    maxWidth: 700,
    width: "100%",
    minHeight: 200,
    height: "100%",
    padding: "3%",
    backgroundColor: "#140F16",
    border: "3px solid rgba(255, 255, 255, 0.2)",
  },
  inputCard: {
    border: "1px solid #4A3F55",
    borderRadius: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
  },
  holdingCard: {
    border: "1px solid #4A3F55",
    borderRadius: 20,
    padding: 15,
    display: "flex",
    justifyContent: "center",
  },
  activityCard: {
    border: "1px solid #4A3F55",
    borderRadius: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
    minWidth: 500,
    maxWidth: 700,
    width: "100%",
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
}));

export default function LaunchpadPurchase() {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const [saleStatus, setSaleStatus] = useState(true);

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
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box className={classes.imageWrapper}>
                <img
                  src="https://launchpad.polkabridge.org/img/tokens/arcade.png"
                  alt="Company Logo"
                  height="70px"
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
                  padding: "2px 10px 2px 10px",
                  color: "white",
                }}
              >
                <Verified style={{ color: "#81c784", padding: 3 }} /> Guaranteed
              </Button>
            </Box>
            <Box ml={5} style={{ width: "100%", minWidth: 500 }}>
              <Typography
                variant="h6"
                className={classes.title}
                textAlign="left"
                fontWeight={600}
                fontSize={24}
                letterSpacing={"0.02em"}
                color={"#f9f9f9"}
              >
                Arcade Network
              </Typography>
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={500}
                fontSize={14}
                color={"#9e9e9e"}
              >
                Metaverse Gaming Platform
              </Typography>

              <Box className="w-100 mt-4">
                <div>
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    fontSize={14}
                    color="#f9f9f9"
                    pb={1}
                  >
                    Progress (21%)
                  </Typography>
                  <div class="containered">
                    <div class="progress2 progress-moved">
                      <div class="progress-bar2"></div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
          <Box
            my={2}
            style={{
              backgroundColor: "rgba(16,6,26,0.3)",
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 25,
              paddingRight: 25,
              borderRadius: 10,
              border: "1px solid #313131",
            }}
          >
            <Typography
              variant="body2"
              className={classes.para}
              fontWeight={400}
              fontSize={14}
              letterSpacing={"0.02em"}
              color={"#f9f9f9"}
              textAlign="left"
            >
              Your staked amount:{" "}
              <strong style={{ color: "#7825D5" }}>0.00 PBR</strong>
            </Typography>
            <Typography
              variant="body2"
              className={classes.para}
              fontWeight={400}
              fontSize={14}
              letterSpacing={"0.02em"}
              color={"#f9f9f9"}
              textAlign="left"
              mt={1}
            >
              Your max purchase:{" "}
              <strong style={{ color: "#7825D5" }}>0 BNB</strong>
            </Typography>
          </Box>
        </Box>
        <Divider
          my={3}
          variant="fullWidth"
          orientation="horizontal"
          style={{
            backgroundColor: "white",
            height: 1,
            border: 0,
            marginTop: 15,
            marginBottom: 15,
          }}
        />
        <Container>
          <Box display={"flex"} justifyContent="center">
            <Box className={classes.purchaseCard} mt={3}>
              <Box className={classes.inputCard}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="space-around"
                  alignItems={"flex-start"}
                >
                  <Box>
                    {" "}
                    <Typography
                      variant="h6"
                      className={classes.para}
                      textAlign="left"
                      fontWeight={600}
                      fontSize={16}
                      letterSpacing={"0.02em"}
                      color={"#e0e0e0"}
                    >
                      From:
                    </Typography>
                  </Box>
                  <Box>
                    <Input
                      fullWidth
                      placeholder="0.0"
                      style={{
                        borderRadius: 10,
                        fontSize: 22,
                        width: "90%",
                        color: "#ffffff",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="space-around"
                  alignItems={"flex-end"}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      className={classes.para}
                      textAlign="left"
                      fontWeight={400}
                      fontSize={14}
                      letterSpacing={"0.02em"}
                      color={"#e0e0e0"}
                    >
                      Balance: 0.18
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="flex-end"
                    alignItems={"center"}
                  >
                    <button
                      className="btn "
                      style={{
                        width: "fit-content",
                        fontSize: 10,
                        borderRadius: 5,
                        background: "#7825D5",
                        padding: "1px 10px 1px 10px",
                        color: "white",
                        height: 25,
                        marginRight: 7,
                      }}
                    >
                      Max
                    </button>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
                      height="25px"
                    />
                    <Typography
                      variant="h6"
                      fontWeight={500}
                      ml={1}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      BNB
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.inputCard} mt={2}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="space-around"
                  alignItems={"flex-start"}
                >
                  <Box>
                    {" "}
                    <Typography
                      variant="h6"
                      textAlign="left"
                      fontWeight={600}
                      fontSize={16}
                      letterSpacing={"0.02em"}
                      color={"#e0e0e0"}
                    >
                      To:
                    </Typography>
                  </Box>
                  <Box>
                    <Input
                      fullWidth
                      placeholder="0.0"
                      style={{
                        borderRadius: 10,
                        fontSize: 22,

                        width: "90%",
                        color: "#ffffff",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems={"flex-end"}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      className={classes.para}
                      textAlign="left"
                      fontWeight={400}
                      fontSize={14}
                      letterSpacing={"0.02em"}
                      color={"#e0e0e0"}
                    >
                      Balance: 0.0
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent="flex-end">
                    <img
                      src="https://launchpad.polkabridge.org/img/tokens/arcade.png"
                      height="30px"
                    />
                    <Typography
                      variant="h6"
                      textAlign="left"
                      fontWeight={500}
                      ml={1}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      ARC
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="text-center mt-3">
                <Button
                  style={{
                    borderRadius: 10,
                    background: "#521B8F",
                    padding: "9px 50px 9px 50px",
                    color: "white",
                  }}
                >
                  Purchase Now
                </Button>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent="center">
            <ClaimSection />
          </Box>
          <Box mt={4}>
            <Typography
              variant="h6"
              fontSize={24}
              letterSpacing="0.02em"
              color="#ffffff"
              textAlign="center"
              fontWeight={500}
              mb={1}
            >
              Your Purchases
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent="center">
            <Box className={classes.activityCard}>
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  fontSize={12}
                  color={"#919191"}
                >
                  Total Purchases
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  fontWeight={600}
                  fontSize={28}
                  color={"#ffffff"}
                >
                  0 ARC
                </Typography>
              </Box>
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  fontSize={12}
                  color={"#919191"}
                >
                  Amount (USD)
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  fontWeight={600}
                  fontSize={28}
                  color={"#ffffff"}
                >
                  0.00 $
                </Typography>
              </Box>
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  fontSize={12}
                  color={"#919191"}
                >
                  Profit/Loss (%)
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  fontWeight={600}
                  fontSize={28}
                  color={"#ffffff"}
                >
                  0%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
