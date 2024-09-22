import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  circle: {
    color: "#C80C81",
    fontSize: 20,
  },
}));
export default function DotCircle() {
  const classes = useStyles();

  return <font className={classes.circle}>.</font>;
}
