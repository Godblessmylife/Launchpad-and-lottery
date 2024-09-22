import React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { LinearProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));

export default function ProgressStatsBar({ value, maxValue }) {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[900],
    },
    bar: {
      borderRadius: 5,
      background: `linear-gradient(to right, #8247e5, #bd31d3)`,
    },
  }))(LinearProgress);

  let statsValue = (value * 100) / maxValue;
  return (
    <div>
      <BorderLinearProgress variant="determinate" value={statsValue} />
    </div>
  );
}
