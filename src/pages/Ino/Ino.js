import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import InoCard from "./components/InoCard";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import localPools from "./data/poolsData";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "5%",
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

export default function Ino() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const { active, account, chainId } = useActiveWeb3React();

  return (
    <Box>
      <Box className={classes.background}>
        <Box
          display={"flex"}
          flexDirection={!sm ? "row" : "column-reverse"}
          justifyContent="space-between"
        >
          <h3 variant="h1" className={classes.pageTitle}>
            Upcoming Pools
          </h3>{" "}
          <Box
            display={"flex"}
            justifyContent="center"
            className={classes.buttonWrapper}
          >
            <Box className={classes.buttonCard}>How to Join</Box>

            <Divider
              light
              variant="fullWidth"
              orientation="vertical"
              style={{ color: "white", height: "100%", width: 1 }}
            />

            <Link to="/ino-purchases">
              <Box className={classes.buttonCard}>My Purchases</Box>
            </Link>
          </Box>
        </Box>

        <Container>
          <Grid container display={"flex"} justifyContent="center">
            {localPools.map((item) => {
              return (
                <Grid item md={6}>
                  <InoCard item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
