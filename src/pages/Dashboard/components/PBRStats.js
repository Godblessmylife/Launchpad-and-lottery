import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Loader from "../../../common/Loader";
import { connect } from "react-redux";
import { fetchPbrMarketData } from "../../../actions/stakeActions";
import { Box, Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    height: "100%",
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
  buyButton: {
    width: "fit-content",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    border: "1px solid #7825D5",
    borderRadius: "15px",
    fontSize: 15,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 500,

    marginRight: 10,
    padding: "5px 25px 5px 25px",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      padding: "6px 20px 6px 20px",
      fontSize: 14,
    },
  },
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 10,
  },
  cardTitle: {
    fontWeight: 600,
    textAlign: "left",
    fontSize: 28,
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
}));

const PbrStats = ({
  account: { currentChain },
  stake: { pbrMarketData, poolLoading },
  fetchPbrMarketData,
  stats,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPbrMarketData();
  }, []);

  return (
    <Box className={classes.card}>
      {!poolLoading && (
        <Box>
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
                <img src="PBR_LOGO.png" alt="PBR" height="45px" />{" "}
              </Box>
              <Box
                display={"flex"}
                flexDirection="column"
                justifyContent="flex-start"
              >
                <Typography
                  variant="h5"
                  className={classes.cardTitle}
                  textAlign="left"
                  fontWeight={600}
                  ml={1}
                  fontSize={26}
                >
                  PBR
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="left"
                  fontWeight={400}
                  color={"#bdbdbd"}
                  ml={1}
                  fontSize={14}
                >
                  PolkaBridge
                </Typography>
              </Box>
            </Box>
            <a
              href="https://coinmarketcap.com/exchanges/uniswap-v2/"
              target="_blank"
            >
              {" "}
              <button className={classes.buyButton}>BUY PBR</button>
            </a>
          </Box>

          <hr
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#7825D5",
              color: "white",
            }}
          />
          <Grid container px={3}>
            <Grid item md={8} xs={12} sm={12}>
              <Grid container>
                <Grid item md={6} xs={6} sm={6}>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={600}
                      color={"#9267DB"}
                      fontSize={14}
                      style={{ paddingBottom: 4 }}
                    >
                      Market Cap
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.cardTitle}
                      textAlign="left"
                      fontWeight={600}
                      fontSize={28}
                    >
                      $
                      {pbrMarketData &&
                        parseFloat(pbrMarketData.mCap / 1000000).toFixed(2)}
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          paddingLeft: 5,
                        }}
                      >
                        M
                      </span>
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent="flex-start"
                    mt={4}
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={600}
                      color={"#9267DB"}
                      fontSize={16}
                      style={{ paddingBottom: 4 }}
                    >
                      TVL
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.cardTitle}
                      textAlign="left"
                      fontWeight={600}
                      fontSize={28}
                    >
                      $0.45
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          paddingLeft: 5,
                        }}
                      >
                        M
                      </span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={600}
                      color={"#9267DB"}
                      fontSize={14}
                      style={{ paddingBottom: 4 }}
                    >
                      24Hrs Change
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.cardTitle}
                      textAlign="left"
                      fontWeight={600}
                      fontSize={28}
                    >
                      {pbrMarketData && (
                        <span>
                          {pbrMarketData.change > 0
                            ? parseFloat(pbrMarketData.change).toFixed(2)
                            : parseFloat(pbrMarketData.change).toFixed(2)}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          paddingLeft: 5,
                        }}
                      >
                        %
                      </span>
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent="flex-start"
                    mt={4}
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={600}
                      color={"#9267DB"}
                      fontSize={14}
                      style={{ paddingBottom: 4 }}
                    >
                      Total Supply
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.cardTitle}
                      textAlign="left"
                      fontWeight={600}
                      fontSize={28}
                    >
                      77.8
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          paddingLeft: 5,
                        }}
                      >
                        M
                      </span>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} sm={12}>
              <Box
                display={"flex"}
                flexDirection="column"
                justifyContent="center"
                mt={3}
              >
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  color={"#f9f9f9"}
                  fontSize={26}
                >
                  Price
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="center"
                  fontWeight={700}
                  fontSize={32}
                  color={"rgba(146, 103, 219,1)"}
                >
                  ${pbrMarketData && pbrMarketData.tokenPrice}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {poolLoading && <Loader />}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  stake: state.stake,
});

export default connect(mapStateToProps, { fetchPbrMarketData })(
  React.memo(PbrStats)
);
