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

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
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

export default function ClaimSection() {
  const classes = useStyles();
  const theme = useTheme();

  const [claimEnable, setClaimEnable] = useState(true);

  return (
    <Box className={classes.purchaseCard} mt={3}>
      <Box className={classes.holdingCard}>
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
              textAlign="center"
              fontWeight={600}
              fontSize={28}
              color={"#919191"}
            >
              0 ARC
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
          Claim
        </Button>
      </Box>
    </Box>
  );
}
