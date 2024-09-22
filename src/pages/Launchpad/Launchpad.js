import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";

import LaunchpadCard from "./components/LaunchpadCard";

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
  buttonWrapper: {
    width: "fit-content",
    padding: "10px 10px 10px 10px",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    backgroundColor: "rgba(39,14,68,0.1)",
  },
  buttonCard: {
    width: "fit-content",
    padding: "10px 20px 10px 20px",
    color: "#f5f5f5",
    fontWeight: 500,
    cursor: "pointer",
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

export default function Launchpad() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box>
      <Box className={classes.background}>
        <Box display={"flex"} justifyContent="space-between">
          <h3 variant="h1" className={classes.pageTitle}>
            Upcoming Pools
          </h3>
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
            <Box className={classes.buttonCard}>Tier System</Box>
            <Divider
              light
              variant="fullWidth"
              orientation="vertical"
              style={{ color: "white", height: "100%", width: 1 }}
            />
            <Box className={classes.buttonCard}>Apply for IDO</Box>
            <Divider
              light
              variant="fullWidth"
              orientation="vertical"
              style={{ color: "white", height: "100%", width: 1 }}
            />
            <Box className={classes.buttonCard}>FAQs</Box>
          </Box>
        </Box>

        <Container>
          <Grid container display={"flex"} justifyContent="center">
            <Grid item md={6}>
              <LaunchpadCard />
            </Grid>
            <Grid item md={6}>
              <LaunchpadCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
