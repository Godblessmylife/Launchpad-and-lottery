import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({}));

const Loader = ({ height }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress className={classes.numbers} />
    </div>
  );
};

export default React.memo(Loader);
