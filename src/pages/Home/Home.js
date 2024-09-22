import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Container, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Stake from "../Stake/Stake";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import Dashboard from "pages/Dashboard/Dashboard";
import Launchpad from "pages/Launchpad/Launchpad";
import Ino from "pages/Ino/Ino";
import { Link, useParams, useNavigate } from "react-router-dom";
import LaunchpadDetails from "pages/Launchpad/LaunchpadDetails";
import LaunchpadPurchase from "pages/Launchpad/LaunchpadPurchase";
import InoDetails from "pages/Ino/InoDetails";
import InoPurchases from "pages/Ino/InoPurchases";

const useStyles = makeStyles((theme) => ({
  background: {
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
    color: "#ffffff",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      color: "#e5e5e5",
      fontSize: 32,
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

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { page, subpage, id } = useParams();

  const { menuTabIndex } = store.ui;

  const { active, account, chainId } = useActiveWeb3React();

  return (
    <Container>
      {parseInt(menuTabIndex) === 0 && <Dashboard />}
      {parseInt(menuTabIndex) === 1 && <Stake />}
      {parseInt(menuTabIndex) === 2 && <Launchpad />}
      {parseInt(menuTabIndex) === 3 && <Ino />}
    </Container>
  );
}
