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
  LinkedIn,
  Mail,
  Telegram,
  Twitter,
  Verified,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

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
}));

export default function LaunchpadDetails() {
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
                height="115px"
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
              <Verified style={{ color: "#81c784", padding: 3 }} /> Guaranteed
            </Button>
          </Box>
          <Box ml={5} style={{ width: "60%" }}>
            <Typography
              variant="h6"
              className={classes.title}
              textAlign="left"
              fontWeight={600}
            >
              Arcade Network
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              fontWeight={600}
              fontSize={16}
              color={"#919191"}
            >
              Metaverse Gaming Platform
            </Typography>
            {!saleStatus && (
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
                <Box className={classes.buttonCard}>16d : 01h : 50m : 10s</Box>
              </Box>
            )}
            {saleStatus && (
              <Box className="w-100">
                <div>
                  <Link to={"/purchase-launchpad"}>
                    <Button
                      style={{
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
                      }}
                    >
                      Join Pool
                    </Button>
                  </Link>
                </div>
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
            )}
          </Box>
        </Box>
        <Container>
          <Grid
            container
            display={"flex"}
            justifyContent="center"
            mt={2}
            spacing={5}
          >
            <Grid item md={6}>
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
                    fontWeight={400}
                    color="#9e9e9e"
                    ml={1}
                    textAlign="left"
                    fontSize={14}
                  >
                    Multicurrency and Cryptocollectibe wallet (web and mobile)
                    for holding, $ARC, NFTs, and other partner currencies.
                    Simplified UI, which enables players to deposit and withdraw
                    currencies on and from ArcadeNetwork Platform. 5 ARCVerse
                    Game developers who wish to launch and bring up their games
                    or metaverses, but lack the investment & resources to
                    develop them fully, can use ArcVerse.
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.description}
                    fontWeight={400}
                    ml={1}
                    mt={2}
                    color="#9e9e9e"
                    textAlign="left"
                    fontSize={14}
                  >
                    ArcVerse allows you to launch metaverses almost instantly
                    without having your assets and graphics.
                  </Typography>
                  <Box display={"flex"} justifyContent="flex-start" mt={2}>
                    <IconButton>
                      <Twitter style={{ color: "#7825D5" }} />
                    </IconButton>{" "}
                    <IconButton>
                      <Telegram style={{ color: "#7825D5" }} />
                    </IconButton>
                    <IconButton>
                      <LinkedIn style={{ color: "#7825D5" }} />
                    </IconButton>
                    <IconButton>
                      <Mail style={{ color: "#7825D5" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className={classes.aboutCard}>
                {" "}
                <Box mb={2}>
                  <Typography
                    mb={2}
                    variant="h6"
                    textAlign="left"
                    fontSize={20}
                    fontWeight={600}
                    ml={1}
                    color="#f9f9f9"
                  >
                    Pool Information
                  </Typography>

                  <Box mt={2}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Token Distribution
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        10% TGE, 3 months vesting
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Your Allocation
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        0.25 BNB
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Access Type
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        Guaranteed
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="center"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Network
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="center"
                        fontWeight={700}
                        ml={1}
                      >
                        Binance Smart Chain
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider
                  light
                  variant="fullWidth"
                  orientation="horizontal"
                  style={{
                    color: "#7825D5",
                    height: 1,
                    width: "100%",
                  }}
                />
                <Box mt={2}>
                  <Typography
                    mb={2}
                    variant="h6"
                    textAlign="left"
                    fontSize={16}
                    fontWeight={600}
                    ml={1}
                    color="#f9f9f9"
                  >
                    Contract Information
                  </Typography>

                  <Box mt={2}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Contract Name
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        ArcadeNetworkToken
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Address
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        0x3Fb2Adf90AD978151a2676323243a
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        variant="h6"
                        textAlign="left"
                        fontSize={13}
                        fontWeight={600}
                        ml={1}
                        color="#9e9e9e"
                      >
                        Token Supply
                      </Typography>

                      <Typography
                        variant="body2"
                        className={classes.para}
                        textAlign="right"
                        fontWeight={700}
                        ml={1}
                      >
                        222,500,000 ARC
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
